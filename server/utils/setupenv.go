package utils

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func SetupEnv() {
	// Using godotenv, load environment variables, log out failure
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file.")
	} else {
		log.Println(".env file loaded.")
	}
	if os.Getenv("MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}
	return
}
