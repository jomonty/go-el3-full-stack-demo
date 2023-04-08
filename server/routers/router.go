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
		api.GET("/customers", controllers.GetAllCustomers)
		api.GET("/customers/:id", controllers.GetCustomer)
		api.POST("/customers", controllers.CreateCustomer)
		api.POST("/files", controllers.AddFile)

		secured := api.Group("/secured").Use(middlewares.AuthService())
		{
			secured.GET("/ping", controllers.Ping)
			secured.Static("/uploaded_docs", "./uploaded_docs")
		}
	}
	return router
}
