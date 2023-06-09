package main

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/routers"
	"jomonty/go-el3-full-stack-demo-server/utils"
	"log"
	"os"
)

func main() {
	// Run environment config
	utils.SetupEnv()

	// Initialise database
	database.Connect()
	// Drop all tables and remove stored files if env set to dev
	if os.Getenv("MODE") == "seed" {
		database.DropAll()
		os.RemoveAll("uploaded_docs/")
		database.Migrate()
		if err := utils.Seed(); err != nil {
			log.Fatal("Unable to seed database.")
		}
	} else {
		database.Migrate()
	}

	// Initialise router
	runport := ":" + os.Getenv("RUN_PORT")
	router := routers.InitRouter()
	router.Run(runport)
}
