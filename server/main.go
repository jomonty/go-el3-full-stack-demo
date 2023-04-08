package main

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/routers"
	"jomonty/go-el3-full-stack-demo-server/utils"
	"os"
)

func main() {
	// Run environment config
	utils.SetupEnv()

	// Initialise database
	// Drop all tables if env set to dev
	// Then execute Migrate
	database.Connect()
	if os.Getenv("MODE") == "dev" {
		database.DropAll()
	}
	database.Migrate()

	// Initialise router
	runport := ":" + os.Getenv("RUN_PORT")
	router := routers.InitRouter()
	router.Run(runport)
}
