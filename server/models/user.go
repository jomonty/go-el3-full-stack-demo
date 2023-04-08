package models

import (
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	BaseModel
	Username string `json:"username" gorm:"not null;unique"`
	Email    string `json:"email" gorm:"not null"`
	Password string `json:"-" gorm:"not null"`
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}
func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}
