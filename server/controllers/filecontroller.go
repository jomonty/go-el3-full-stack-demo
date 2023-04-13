package controllers

import (
	"jomonty/go-el3-full-stack-demo-server/models"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"jomonty/go-el3-full-stack-demo-server/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddFile(context *gin.Context) {
	// Assign multipart form, abort if error raised
	form, err := context.MultipartForm()
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// Check form is well constructed
	if err := utils.MultiPartFormCheckBadRequest(form); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// Extract and assign form info
	custID := utils.MultiPartFormGetCustomerID(form)
	uploadedFile := utils.MultiPartFormGetFile(form)
	fileSaveLocation := utils.MultiPartFormFileSaveLocation(custID)
	// Attempt to save file, abort on error
	if err := context.SaveUploadedFile(uploadedFile, fileSaveLocation); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	// Initialise file model
	file := models.File{
		FileName:     uploadedFile.Filename,
		FileLocation: fileSaveLocation,
		CustomerID:   uint(custID),
	}
	// Persist to database
	if err := repo.CreateFile(&file); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	// Return Success
	context.IndentedJSON(http.StatusCreated, file)
}

func UpdateFile(context *gin.Context) {
	// Check that param id can be parsed to an int, abort on error
	id := context.Param("id")
	intID, parseErr := strconv.Atoi(id)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": parseErr.Error()})
		return
	}
	// Bind to file mode, abort on error
	var updatedFile models.File
	if err := context.ShouldBindJSON(&updatedFile); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// Check that file id exists, abort if not
	if !repo.CheckFileExistsByID(intID) {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "resource does not exist"})
		return
	}
	// Update file, abort on error
	file, err := repo.UpdateOneFile(intID, updatedFile)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	// Return success
	context.IndentedJSON(http.StatusOK, file)
}

func DeleteFile(context *gin.Context) {
	// Check that param id can be parsed to an int, abort on error
	id := context.Param("id")
	intID, parseErr := strconv.Atoi(id)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": parseErr.Error()})
		return
	}
	// Check that file id exists, abort if not
	if !repo.CheckFileExistsByID(intID) {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "resource does not exist"})
		return
	}
	// Fetch file to facilitate deletion of actual document
	_, fetchErr := repo.FindOneFile(intID)
	if fetchErr != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": fetchErr.Error()})
		return
	}
	// Delete file, abort on error
	if err := repo.DeleteOneFile(intID); err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	// Return success
	context.IndentedJSON(http.StatusOK, gin.H{"message": "resource deleted"})
}
