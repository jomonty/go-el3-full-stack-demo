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
	form, err := context.MultipartForm()
	// file, err := context.FormFile("file")
	// custID := context.FormFile("")
	// custID := context.Param("id")

	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	custID, idExists := form.Value["customer_id"]
	if !idExists {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no customer_id provided"})
		return
	}
	intCustID, parseErr := strconv.ParseUint(custID[0], 10, 64)
	if parseErr != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "unable to parse customer_id"})
		return
	}
	uploadedFile, uploadedFileExists := form.File["file"]
	if !uploadedFileExists {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no file provided"})
		return
	}

	fileSaveLocation := fmt.Sprintf("uploaded_docs/%s_%s", custID[0], timeStamp())
	saveError := context.SaveUploadedFile(uploadedFile[0], fileSaveLocation)
	if saveError != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": saveError.Error()})
		return
	}
	// var file models.File
	// uintCustID := (uintintCustID
	file := models.File{
		FileName:     uploadedFile[0].Filename,
		FileLocation: fileSaveLocation,
		CustomerID:   uint(intCustID),
	}
	record := database.Instance.Create(&file)
	if record.Error != nil {
		fmt.Println("here")
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		return
	}
	context.IndentedJSON(http.StatusCreated, file)

	// file := form.File["file"]

	// if custID == "" {
	// 	context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no customer_id provided"})
	// }
	// if file == nil {
	// 	context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "no file provided"})
	// }
	// custID := form.Value["customer_id"]

	// file, file_err := context.FormFile("file")
	// custID, id_err := context.Form.Value["customer_id"]
	// if file_err != nil {
	// 	context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": file_err.Error()})
	// } else if id_err != nil {
	// 	context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": id_err.Error()})
	// }

}

func timeStamp() string {
	ts := time.Now().UTC().Format(time.RFC3339)
	return strings.Replace(ts, ":", "", -1)
}

func checkCustID(custID int) error {
	var customer models.Customer
	record := database.Instance.Where("id = ?", custID).First(&customer)
	if record.Error != nil {
		return record.Error
	}
	return nil
}
