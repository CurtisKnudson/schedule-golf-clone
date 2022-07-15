package middleware

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"
)

//DOCS: https://github.com/GoogleCloudPlatform/golang-samples/blob/2cb1fe462ec798626cd0f586cfc8008cd4a29881/cloudsql/mysql/database-sql/cloudsql.go

func MustGetenv(k string) string {
	v := os.Getenv(k)
	if v == "" {
		log.Panicf("%s environment variable not set.", k)
	}
	return v
}

func InitTCPConnectionPool() (*sql.DB, error) {
	var (
		dbUser    = MustGetenv("MYSQL_RW_USER")          // e.g. 'my-db-user'
		dbPwd     = MustGetenv("MYSQL_RW_USER_PASSWORD") // e.g. 'my-db-password'
		dbTCPHost = MustGetenv("MYSQL_HOST")             // e.g. '127.0.0.1'
		dbPort    = MustGetenv("MYSQL_PORT")             // e.g. '3306'
		dbName    = MustGetenv("MYSQL_DATABASE")         // e.g. 'my-database'
	)

	dbURI := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPwd, dbTCPHost, dbPort, dbName)

	dbPool, err := sql.Open("mysql", dbURI)

	if err != nil {
		return nil, fmt.Errorf("sql.Open: %v", err)
	}

	dbPool.SetMaxIdleConns(5)
	dbPool.SetMaxOpenConns(7)
	dbPool.SetConnMaxLifetime(1800 * time.Second)

	return dbPool, nil
}
