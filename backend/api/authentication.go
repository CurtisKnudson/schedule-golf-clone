package api

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	authv1 "gitlab.com/schedule-golf/nicklaus/backend/gen/proto/go/schedule_golf/authentication/v1alpha1"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/genproto/googleapis/rpc/code"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"

	m "gitlab.com/schedule-golf/nicklaus/backend/middleware"
	"google.golang.org/genproto/googleapis/rpc/status"
)

type User struct {
	user_id, first_name, last_name, company_name, email, hash string
}

type Claims struct {
	email string
	jwt.StandardClaims
}

type ForeUpAuthResponse struct {
	Data struct {
		Response_type string   `json:"type"`
		Id            string   `json:"id"`
		Attributes    []string `json:"attributes"`
	}
}

func (f ForeUpAuthResponse) TextOutput() string {
	p := fmt.Sprintf(
		"ResponseType:  %v \n Id: %v \n",
		f.Data.Response_type, f.Data.Id)
	return p
}

func authenticateJwt(tknStr string) bool {
	var jwtKey = []byte(m.MustGetenv("JWT"))

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return false
	}
	return tkn.Valid
}
func generateJwt(email string) (string, time.Time) {
	var jwtKey = []byte(m.MustGetenv("JWT"))

	expirationTime := time.Now().Add(60 * time.Minute)

	claims := &Claims{
		email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		fmt.Printf("There was an error signing JWT: %v", err)
	}

	return tokenString, expirationTime
}

func hashAndSalt(pwd []byte) string {
	// Use GenerateFromPassword to hash & salt pwd.
	// MinCost is just an integer constant provided by the bcrypt
	// package along with DefaultCost & MaxCost.
	// The cost can be any value you want provided it isn't lower
	// than the MinCost (4)
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	// GenerateFromPassword returns a byte slice so we need to
	// convert the bytes to a string and return it
	return string(hash)
}

func comparePasswords(hashedPwd string, plainPwd []byte) bool {
	// Since we'll be getting the hashed password from the DB it
	// will be a string so we'll need to convert it to a byte slice
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	if err != nil {
		log.Println(err)
		return false
	}

	return true
}

func (s *AuthenticatorServiceServer) CreateNewUser(ctx context.Context, in *authv1.CreateNewUserRequest) (*authv1.CreateNewUserResponse, error) {

	db, err := m.InitTCPConnectionPool()

	if err != nil {
		fmt.Printf("There was an error initializing database connection in CreateNewUser %v\n", err)
	}

	// ON another ticket outside the scope of establishing a session

	//  Check if the user already exists

	// Determine if we want to sign them in automatically to their existing account, or reroute them to the login page.

	// IF newuser doesn't already exist, then create a new user

	var newUser User
	newUser.user_id = in.GetUserId()
	newUser.first_name = in.GetFirstName()
	newUser.last_name = in.GetLastName()
	newUser.company_name = in.GetCompanyName()
	newUser.email = in.GetEmail()
	newUser.hash = hashAndSalt([]byte(in.GetPassword()))

	insertUserQuery := `INSERT INTO schedule_golf.schedule_golf_users
	(user_id, company_name, first_name, last_name, email, hash)
	VALUES(?,?,?,?,?,?)`

	res1, err := db.Query(insertUserQuery, newUser.user_id, newUser.company_name, newUser.first_name, newUser.last_name, newUser.email, newUser.hash)

	if err != nil {
		fmt.Printf("There was an erory querying a new user to the database %v", err)
	}

	defer res1.Close()

	jwt, expirationTime := generateJwt(newUser.email)
	// Sent JWT with Creation of User
	headers := metadata.Pairs("token", jwt, "expiration", expirationTime.Format(time.UnixDate))

	grpc.SendHeader(ctx, headers)

	return &authv1.CreateNewUserResponse{
		UserId:      in.UserId,
		CompanyName: in.CompanyName,
		FirstName:   in.FirstName,
		LastName:    in.LastName,
		Email:       in.Email,
	}, nil
}

func (s *AuthenticatorServiceServer) UserLogin(ctx context.Context, in *authv1.UserLoginRequest) (*authv1.UserLoginResponse, error) {

	in.GetEmail()

	db, err := m.InitTCPConnectionPool()

	if err != nil {
		fmt.Printf("There was an error initializing database connection in CreateNewUser %v\n", err)
	}

	userQuery := `SELECT * FROM schedule_golf.schedule_golf_users WHERE email = ?`

	var user User

	err1 := db.QueryRow(userQuery, in.GetEmail()).Scan(&user.user_id, &user.company_name, &user.first_name, &user.last_name, &user.email, &user.hash)

	if err1 != nil {
		fmt.Printf("There was an error querying userQuery %v", err1.Error())
	}

	res := comparePasswords(user.hash, []byte(in.Password))

	if !res {
		return &authv1.UserLoginResponse{}, errors.New("invalid credentials")
	}
	jwt, expirationTime := generateJwt(user.email)
	// Need to update Proto to pass JWT as a value and stop using headers to pass data. Will be TLS encrypted.
	// Sent JWT with Creation of User
	headers := metadata.Pairs("token", jwt, "expiration", expirationTime.Format(time.UnixDate))

	grpc.SendHeader(ctx, headers)

	return &authv1.UserLoginResponse{
		UserId:      user.user_id,
		CompanyName: user.company_name,
		FirstName:   user.first_name,
		LastName:    user.last_name,
		Email:       user.email,
	}, nil
}

func (s *AuthenticatorServiceServer) UserTokenRefresh(ctx context.Context, in *authv1.UserTokenRefreshRequest) (*authv1.UserTokenRefreshResponse, error) {

	var jwtKey = []byte(m.MustGetenv("JWT"))

	// Need tokenString name later in function
	tknStr := in.GetJwt()

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if !tkn.Valid {
		fmt.Printf("Invalid Token")
		return &authv1.UserTokenRefreshResponse{
			Status: &status.Status{
				Code:    int32(code.Code_UNAUTHENTICATED),
				Message: "Invalid Token",
			},
		}, nil
	}

	if err != nil {
		fmt.Printf("There was en error parsing JWT %v", ctx)
		return &authv1.UserTokenRefreshResponse{
			Status: &status.Status{
				Code:    int32(code.Code_INTERNAL),
				Message: "jwt.ParseWithClaims threw an error",
			},
		}, nil

	}
	if time.Until(time.Unix(claims.ExpiresAt, 0)) > 10*time.Minute {
		fmt.Print("not expired yet \n")
		return &authv1.UserTokenRefreshResponse{
			Status: &status.Status{
				Code:    int32(code.Code_CANCELLED),
				Message: "JWT does not need refreshed",
			},
		}, nil
	}

	expirationTime := time.Now().Add(60 * time.Minute)

	claims.ExpiresAt = expirationTime.Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		log.Printf("There was an error signing web token %v", ctx)
		return &authv1.UserTokenRefreshResponse{
			Status: &status.Status{
				Code:    int32(code.Code_INTERNAL),
				Message: "token.SignedString threw an error",
			},
		}, nil
	}

	fmt.Printf("Token generated: \n %v, \n %v \n", time.Now(), tokenString)

	return &authv1.UserTokenRefreshResponse{
		Jwt:        tokenString,
		Expiration: expirationTime.Format(time.UnixDate),
		Status: &status.Status{
			Code: int32(code.Code_OK),
		},
	}, nil
}

func (s *AuthenticatorServiceServer) ForeUpAuthentication(ctx context.Context, in *authv1.ForeUpAuthenticationRequest) (*authv1.ForeUpAuthenticationResponse, error) {
	isValid := authenticateJwt(in.ScheduleGolfJwt)

	if !isValid {
		return &authv1.ForeUpAuthenticationResponse{
			Status: &status.Status{
				Code: int32(code.Code_UNAUTHENTICATED),
			},
		}, nil
	}

	postBody, _ := json.Marshal(map[string]string{
		"email":    in.Email,
		"password": in.Password,
	})

	// Mock Api foreup
	URL := "https://private-anon-6d096aca80-foreup.apiary-mock.com/api_rest/index.php/tokens"

	resp, err := http.Post(URL, "application/json", bytes.NewBuffer(postBody))

	if err != nil {
		log.Printf("An Error Occured %v", err)
	}

	defer resp.Body.Close()

	var foreUpAuthResponse ForeUpAuthResponse

	if err := json.NewDecoder(resp.Body).Decode(&foreUpAuthResponse); err != nil {
		log.Print(err)
	}

	log.Print(foreUpAuthResponse.Data.Id)

	// Save Token

	return &authv1.ForeUpAuthenticationResponse{
		Status: &status.Status{
			Code: int32(code.Code_OK),
		},
	}, nil
}
