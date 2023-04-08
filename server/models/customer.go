package models

type Customer struct {
	BaseModel
	FirstName   string `json:"first_name" gorm:"not null"`
	LastName    string `json:"last_name" gorm:"not null"`
	DateOfBirth string `json:"date_of_birth" gorm:"not null"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Files       []File
}
