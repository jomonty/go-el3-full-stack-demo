package utils

import (
	"fmt"
	"jomonty/go-el3-full-stack-demo-server/models"
	"jomonty/go-el3-full-stack-demo-server/repo"
	"log"
)

func Seed() error {
	if err := createTestUser(); err != nil {
		return err
	}
	if err := createTestCustomers(25); err != nil {
		return err
	}
	log.Println("Database seeded.")
	return nil
}

func createTestUser() error {
	user := models.User{
		Username: "test_user",
		Email:    "test@email.com",
		// Password: "password",
	}
	user.HashPassword("password")
	if err := repo.CreateUser(&user); err != nil {
		return err
	}
	return nil
}

func createTestCustomers(count int) error {
	// var customers []models.Customer
	for i := 1; i <= count; i++ {
		customer := models.Customer{
			FirstName:   "Test",
			LastName:    fmt.Sprintf("Customer %d", i),
			DateOfBirth: "2000/01/01",
			Email:       fmt.Sprintf("test_customer_%d@email.com", i),
			PhoneNumber: "(123) 12-123123",
		}
		if _, err := repo.CreateCustomer(&customer); err != nil {
			return err
		}
		// customers = append(customers, customer)
	}
	return nil
}
