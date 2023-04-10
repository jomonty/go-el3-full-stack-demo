package routers

import (
	"jomonty/go-el3-full-stack-demo-server/controllers"
	"jomonty/go-el3-full-stack-demo-server/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.SetTrustedProxies(nil)
	api := router.Group("/api")
	api.Use(cors.Default())
	{
		api.POST("/user/register", controllers.RegisterUser)
		api.POST("/token", controllers.GenerateToken)

		secured := api.Group("/secured")
		secured.Use(middlewares.AuthService())
		{
			customers := secured.Group("/customers")
			{
				customers.GET("", controllers.GetAllCustomers)
				customers.GET("/:id", controllers.GetCustomer)
				customers.POST("", controllers.CreateCustomer)
				customers.PUT("/:id", controllers.UpdateCustomer)
				customers.DELETE("/:id", controllers.DeleteCustomer)
			}
			files := secured.Group("/files")
			{
				files.POST("", controllers.AddFile)
				files.PUT("/:id", controllers.UpdateFile)
				files.DELETE("/:id", controllers.DeleteFile)
			}
			secured.GET("/ping", controllers.Ping)
			secured.Static("/uploaded_docs", "./uploaded_docs")
			secured.GET("/users", controllers.GetAllUsers) // to be secured
		}
	}
	return router
}
