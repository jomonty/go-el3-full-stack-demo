package controllers

import (
	"errors"
	"jomonty/go-el3-full-stack-demo-server/models"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCustomer(context *gin.Context) {
	// Bind to customer model, abort on error
	var customer models.Customer
	if err := context.ShouldBindJSON(&customer); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Persist customer
	if err := repo.CreateCustomer(&customer); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Return sucess
	context.IndentedJSON(http.StatusCreated, customer)
}

func GetAllCustomers(context *gin.Context) {
	// Fetch customers
	var customers, fetchError = repo.FindAllCustomers()
	if fetchError != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": fetchError.Error()})
	}
	// Return success
	context.IndentedJSON(http.StatusOK, customers)
}

func GetCustomer(context *gin.Context) {
	// Check that param id can be parsed to an int, abort on error
	id := context.Param("id")
	intID, parseErr := strconv.Atoi(id)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": parseErr.Error()})
		return
	}
	// Fetch customer
	var customer, fetchError = repo.FindOneCustomer(intID)
	// Check for errors, handling not found separately to return 404
	if fetchError != nil {
		if errors.Is(fetchError, gorm.ErrRecordNotFound) {
			context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "no customer found"})
		} else {
			context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": fetchError.Error()})
		}
		return
	}
	// Return success
	context.IndentedJSON(http.StatusOK, customer)

}

func UpdateCustomer(context *gin.Context) {
	// Check that param id can be parsed to an int, abort on error
	id := context.Param("id")
	intID, parseErr := strconv.Atoi(id)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": parseErr.Error()})
		return
	}
	// Bind to customer model, abort on error
	var updatedCustomer models.Customer
	if err := context.ShouldBindJSON(&updatedCustomer); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Check that customer id exists, abort if not
	if !repo.CheckCustomerExistsByID(intID) {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "resource does not exist"})
		return
	}
	// Update customer, abort on error
	customer, err := repo.UpdateOneCustomer(intID, updatedCustomer)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Return sucess
	context.IndentedJSON(http.StatusOK, customer)
}

func DeleteCustomer(context *gin.Context) {
	// Check that param id can be parsed to an int, abort on error
	id := context.Param("id")
	intID, parseErr := strconv.Atoi(id)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": parseErr.Error()})
		return
	}
	// Check that customer id exists
	if !repo.CheckCustomerExistsByID(intID) {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "resource does not exist"})
		return
	}
	// Delete customer, abort on error
	if err := repo.DeleteOneCustomer(intID); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Return sucess
	context.IndentedJSON(http.StatusOK, gin.H{"message": "resource deleted"})
}
