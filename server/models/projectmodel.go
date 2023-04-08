package models

import "time"

type ProjectModel struct {
	ID        uint `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time `json:"-"`
	DeletedAt time.Time `json:"-"`
}
