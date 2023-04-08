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
		secured := api.Group("/secured").Use(middlewares.AuthService())
		{
			secured.GET("/ping", controllers.Ping)
		}
	}
	return router
}
