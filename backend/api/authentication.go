package api

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	authv1 "gitlab.com/schedule-golf/nicklaus/backend/gen/proto/go/schedule_golf/authentication/v1alpha1"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"

	m "gitlab.com/schedule-golf/nicklaus/backend/middleware"
)

type User struct {
	user_id, first_name, last_name, company_name, email, hash string
}

type Claims struct {
	email string
	jwt.StandardClaims
}

func generateJwt(email string) string {
	var jwtKey = []byte(m.MustGetenv("JWT"))

	expirationTime := time.Now().Add(5 * time.Minute)

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

	return tokenString
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

	// Create Schema/Database for Company here ??

	// Drop Table before creating it while in production
	db.Query(`DROP TABLE schedule_golf.schedule_golf_users`)

	createTableQuery := `CREATE TABLE IF NOT EXISTS schedule_golf.schedule_golf_users
	(
		sql_id INT PRIMARY KEY AUTO_INCREMENT INVISIBLE,
		user_id VARCHAR(36),
		company_name VARCHAR(255),
	 	first_name VARCHAR(255),
		last_name VARCHAR(255),
		email VARCHAR(255),
		hash CHAR(60)
	)`

	res, err := db.Query(createTableQuery)

	if err != nil {
		fmt.Printf("There was an error calling createTableQuery: %v", err)
	}

	defer res.Close()

	insertUserQuery := `INSERT INTO schedule_golf.schedule_golf_users
	(user_id, company_name, first_name, last_name, email, hash)
	VALUES(?,?,?,?,?,?)`

	res1, err := db.Query(insertUserQuery, newUser.user_id, newUser.company_name, newUser.first_name, newUser.last_name, newUser.email, newUser.hash)

	if err != nil {
		fmt.Printf("There was an erory querying a new user to the database %v", err)
	}

	defer res1.Close()

	// Sent JWT with Creation of User
	header := metadata.Pairs("token", generateJwt((newUser.email)))

	grpc.SendHeader(ctx, header)

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

	header := metadata.Pairs("token", generateJwt((user.email)))

	grpc.SendHeader(ctx, header)

	return &authv1.UserLoginResponse{
		UserId:      user.user_id,
		CompanyName: user.company_name,
		FirstName:   user.first_name,
		LastName:    user.last_name,
		Email:       user.email,
	}, nil
}
