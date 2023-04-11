package controllers

import (
	"jomonty/go-el3-full-stack-demo-server/auth"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func GenerateToken(context *gin.Context) {
	// Bind to TokenRequest struct, abort on error
	var request TokenRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// Check that user with supplied email address exists, abort on error
	if !repo.CheckUserExistsByEmail(request.Email) {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "email address not found"})
		return
	}
	// Fetch user for supplied email address, abort on error
	user, fetchErr := repo.FindOneUser(request.Email)
	if fetchErr != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": fetchErr.Error()})
		return
	}
	// Check that the supplied password matches the stored one
	if err := user.CheckPassword(request.Password); err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid credentials"})
		return
	}
	// Generate a token
	tokenString, err := auth.GenerateJWT(user.Email, user.Username)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	// Return user details (for display on login) plus a token.
	context.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":         user.ID,
			"created_at": user.CreatedAt,
			"username":   user.Username,
			"email":      user.Email,
		},
		"token": tokenString,
	})
}
