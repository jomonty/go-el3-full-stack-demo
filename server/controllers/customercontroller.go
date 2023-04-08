package controllers

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllCustomers(context *gin.Context) {
	// func GetAllCustomers(context *gin.Context) (*[]models.Customer, error) {
	// // var customer models.Customer
	// var customers []models.Customer
	// result := database.Instance.Model(&models.Customer{}).Find(&customers)
	// if result.Error != nil {
	// 	msg := result.Error
	// 	return nil, msg
	// }
	// return &customers, nil
	var customers []models.Customer
	result := database.Instance.Model(&models.Customer{}).Find(&customers)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		context.Abort()
		return
	}
	context.IndentedJSON(http.StatusOK, customers)
}

func GetCustomer(context *gin.Context) {
	var customer models.Customer
	id := context.Param("id")

	// Check that param id can be parsed to an int
	intID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// execute query, store response in res and assign returned row to customer
	res := database.Instance.Model(&models.Customer{}).Preload("Files").First(&customer, intID)
	// check if rows affected = 0, return StatusNotFound
	if res.RowsAffected == 0 {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "no customer found"})
		return
	}
	// check if error found, return StatusInternalServerError
	if res.Error != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": res.Error.Error()})
		return
	}
	context.IndentedJSON(http.StatusOK, customer)

}

func CreateCustomer(context *gin.Context) {
	var customer models.Customer
	if err := context.ShouldBindJSON(&customer); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	record := database.Instance.Create(&customer)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	context.IndentedJSON(http.StatusCreated, customer)
}
