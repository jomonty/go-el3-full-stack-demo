package utils

import (
	"errors"
	"fmt"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"mime/multipart"
	"strconv"
	"strings"
	"time"
)

func MultiPartFormCheckBadRequest(form *multipart.Form) error {
	// Check that length of []string at position "customer_id" is > 0, abort on error
	// This will also produce 0 if there is no field "customer_id" provided
	if len(form.Value["customer_id"]) == 0 {
		return errors.New("no customer_id present")
	}
	// Check that customer_id can be parsed to an int
	custID, parseErr := strconv.Atoi(form.Value["customer_id"][0])
	if parseErr != nil {
		return errors.New("unable to parse customer_id")
	}
	// Check that customer_id exists
	if !repo.CheckCustomerExistsByID(custID) {
		return errors.New("customer_id does not exist")
	}
	// Check that file property of multipart contains data
	if len(form.File["file"]) == 0 {
		return errors.New("no file provided")
	}
	// TODO: Check file type provided
	// TODO: Check if file below a certain threshold
	return nil
}

func MultiPartFormGetCustomerID(form *multipart.Form) int {
	custID, _ := strconv.Atoi(form.Value["customer_id"][0])
	return custID
}

func MultiPartFormGetFile(form *multipart.Form) *multipart.FileHeader {
	file := form.File["file"][0]
	return file
}

func MultiPartFormFileSaveLocation(custID int) string {
	ts := time.Now().UTC().Format(time.RFC3339)
	fileSaveLocation := fmt.Sprintf("uploaded_docs/%d_%s.pdf", custID, ts)
	return strings.Replace(fileSaveLocation, ":", "", -1)
}
