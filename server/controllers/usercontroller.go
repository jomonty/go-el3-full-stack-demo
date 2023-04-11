package controllers

import (
	"jomonty/go-el3-full-stack-demo-server/models"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Registration struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterUser(context *gin.Context) {
	// Bind to registration struct, abort on error
	var registration Registration
	if err := context.ShouldBindJSON(&registration); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Check if username exists
	if repo.CheckUserExistsByUsername(registration.Username) {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"message": "username already exists"})
		return
	}
	// Check if email exists
	if repo.CheckUserExistsByEmail(registration.Email) {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"message": "email already exists"})
	}
	// Initialise user struct
	user := models.User{
		Username: registration.Username,
		Email:    registration.Email,
		Password: registration.Password,
	}
	// Hash password
	if err := user.HashPassword(user.Password); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Persist user
	if err := repo.CreateUser(&user); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Return success
	context.JSON(http.StatusCreated, gin.H{
		"message": "user created successfully",
		"user": gin.H{
			"username": user.Username,
			"email":    user.Email,
		},
	},
	)
}

func GetAllUsers(context *gin.Context) {
	var users, err = repo.FindAllUsers()

	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.IndentedJSON(http.StatusOK, users)
}
