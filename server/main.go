package main

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/routers"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	setupEnv()

	// Initialise database
	dbsource := os.Getenv("DB_SOURCE")
	database.Connect(dbsource)
	if os.Getenv("MODE") == "dev" {
		database.DropAll()
	}
	database.Migrate()

	// Initialise router
	runport := ":" + os.Getenv("RUN_PORT")
	router := routers.InitRouter()
	router.Run(runport)
}

func setupEnv() {
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
}
