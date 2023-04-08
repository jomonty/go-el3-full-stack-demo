package models

type File struct {
	BaseModel
	FileName     string `json:"file_name" gorm:"not null"`
	FileLocation string `json:"file_location"`
	CustomerID   uint   `json:"customer_id"`
}
