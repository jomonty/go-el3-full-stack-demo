package controllers

import (
	"fmt"
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/models"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func AddFile(context *gin.Context) {
	// Assign multipart form, abort if error raised
	form, err := context.MultipartForm()
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Check that length of []string at position "customer_id" is > 0, abort on error
	// This will also produce 0 if there is no field "customer_id" provided
	if len(form.Value["customer_id"]) == 0 {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no customer_id provided"})
		return
	}
	// Check that customer_id can be parsed to an int
	custID, parseErr := strconv.Atoi(form.Value["customer_id"][0])
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "unable to parse customer_id"})
		return
	}
	// Check that length of []*FileHeader at position "file" is > 0, abort on error
	if len(form.File["file"]) == 0 {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no file provided"})
		return
	}
	uploadedFile := form.File["file"][0]
	// Assign file save location, custID + timestamp
	fileSaveLocation := fmt.Sprintf("uploaded_docs/%d_%s", custID, timeStamp())
	// Attempt to save file, abort on error
	if err := context.SaveUploadedFile(uploadedFile, fileSaveLocation); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Initialise file model
	file := models.File{
		FileName:     uploadedFile.Filename,
		FileLocation: fileSaveLocation,
		CustomerID:   uint(custID),
	}
	// Persist to database
	record := database.DB.Create(&file)
	if record.Error != nil {
		fmt.Println("here")
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		return
	}
	// Return Success
	context.IndentedJSON(http.StatusCreated, file)
}

func timeStamp() string {
	ts := time.Now().UTC().Format(time.RFC3339)
	return strings.Replace(ts, ":", "", -1)
}
