package repo

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/models"
)

func CreateFile(file *models.File) error {
	record := database.DB.Create(file)
	if record.Error != nil {
		return record.Error
	}
	return nil
}
