package database

import (
	"jomonty/go-el3-full-stack-demo-server/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Instance *gorm.DB
var dbError error

func Connect(connectionString string) {
	Instance, dbError = gorm.Open(mysql.Open(connectionString), &gorm.Config{})
	if dbError != nil {
		log.Fatal(dbError)
		panic("Cannot connect to DB")
	}
	log.Println("Connected to database.")
}
func Migrate() {
	Instance.AutoMigrate(&models.User{})
	Instance.AutoMigrate(&models.Customer{})
	Instance.AutoMigrate(&models.File{})
	log.Println("Database migration completed.")
}
func DropAll() {
	Instance.Migrator().DropTable(&models.User{})
	Instance.Migrator().DropTable(&models.Customer{})
	Instance.Migrator().DropTable(&models.File{})
	log.Println("Database tables dropped.")
}
