package main

import (
	"jomonty/go-el3-full-stack-demo-server/controllers"
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/middleware"
	"log"
	"os"

	"github.com/gin-gonic/gin"
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
	runport := ":" + os.Getenv("RUN_PORT")

	// Initialise database
	database.Connect(dbsource)
	database.Migrate()

	// Initialise router
	router := initRouter()
	router.Run(runport)
}

func initRouter() *gin.Engine {
	router := gin.Default()
	api := router.Group("/api")
	{
		api.POST("/user/register", controllers.RegisterUser)
		api.POST("/token", controllers.GenerateToken)
		secured := api.Group("/secured").Use(middleware.AuthService())
		{
			secured.GET("/ping", controllers.Ping)
		}
	}
	return router
}
