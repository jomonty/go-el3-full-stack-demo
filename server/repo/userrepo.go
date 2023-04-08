package repo

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/models"
)

func CreateUser(user *models.User) error {
	record := database.DB.Create(&user)
	if record.Error != nil {
		return record.Error
	}
	return nil
}
func FindAllUsers() ([]models.User, error) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func FindOneUser(email string) (models.User, error) {
	var user models.User
	if err := database.DB.Model(&models.User{}).Where("email = ?", email).First(&user).Error; err != nil {
		return user, err
	}
	return user, nil
}

func CheckUserExistsByUsername(username string) bool {
	var exists bool
	database.DB.Raw("select count(*) > 0 from users where username = ?", username).Scan(&exists)
	return exists
}

func CheckUserExistsByEmail(email string) bool {
	var exists bool
	database.DB.Raw("select count(*) > 0 from users where email = ?", email).Scan(&exists)
	return exists
}
