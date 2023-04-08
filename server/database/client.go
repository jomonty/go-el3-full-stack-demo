package database

import (
	"jomonty/go-el3-full-stack-demo-server/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB
var dbError error

func Connect() {
	DB, dbError = gorm.Open(mysql.Open(DbURL(BuildConfig())), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if dbError != nil {
		log.Fatal(dbError)
		panic("Cannot connect to DB")
	}
	log.Println("Connected to database.")
}
func Migrate() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Customer{})
	DB.AutoMigrate(&models.File{})
	log.Println("Database migration completed.")
}
func DropAll() {
	DB.Migrator().DropTable(&models.User{})
	DB.Migrator().DropTable(&models.Customer{})
	DB.Migrator().DropTable(&models.File{})
	log.Println("Database tables dropped.")
}
