package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Use godotenv to manage environment variables
	// Load environment variables, log out failure
	// Assign environment varibles to local variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbsource := os.Getenv("DB_SOURCE")
	runport := os.Getenv("RUN_PORT")

}
