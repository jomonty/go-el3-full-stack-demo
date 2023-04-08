package routers

import (
	"jomonty/go-el3-full-stack-demo-server/controllers"
	"jomonty/go-el3-full-stack-demo-server/middlewares"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.SetTrustedProxies(nil)
	api := router.Group("/api")
	{
		api.POST("/user/register", controllers.RegisterUser)
		api.POST("/token", controllers.GenerateToken)
		api.GET("/customers", controllers.GetAllCustomers)       // to be secured
		api.GET("/customers/:id", controllers.GetCustomer)       // to be secured
		api.POST("/customers", controllers.CreateCustomer)       // to be secured
		api.PUT("/customers/:id", controllers.UpdateCustomer)    // to be secured
		api.DELETE("/customers/:id", controllers.DeleteCustomer) // to be secured
		api.POST("/files", controllers.AddFile)                  // to be secured
		api.GET("/users", controllers.GetAllUsers)               // to be secured

		secured := api.Group("/secured").Use(middlewares.AuthService())
		{
			secured.GET("/ping", controllers.Ping)
			secured.Static("/uploaded_docs", "./uploaded_docs")
		}
	}
	return router
}
