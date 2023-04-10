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

func FindOneFile(fileID int) (models.File, error) {
	var file models.File
	if err := database.DB.Model(&models.File{}).First(&file, fileID).Error; err != nil {
		return file, err
	}
	return file, nil
}

func UpdateOneFile(fileID int, updatedFile models.File) (models.File, error) {
	var file models.File
	if err := database.DB.Model(&models.File{}).First(&file, fileID).Error; err != nil {
		return file, err
	}
	file.FileName = updatedFile.FileName
	if err := database.DB.Save(&file).Error; err != nil {
		return file, err
	}
	return file, nil
}

func DeleteOneFile(fileID int) error {
	var file models.File
	if err := database.DB.Model(&models.File{}).Where("id = ?", fileID).Delete(&file).Error; err != nil {
		return err
	}
	return nil
}

func CheckFileExistsByID(fileID int) bool {
	var exists bool
	database.DB.Raw("select count(*) > 0 from files where id = ?", fileID).Scan(&exists)
	return exists
}
