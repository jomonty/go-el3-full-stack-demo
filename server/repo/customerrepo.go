package repo

import (
	"jomonty/go-el3-full-stack-demo-server/database"
	"jomonty/go-el3-full-stack-demo-server/models"
)

func CreateCustomer(newCustomer *models.Customer) (models.Customer, error) {
	// Originally this function received a pointer and returned only an error.
	// However, gorm Create does not preload related entities (files), in this
	// case the 'File' property is nil, as opposed to [].
	// Solved by making the function return a new customer.
	var customer models.Customer
	// First create customer, returning an error on fail
	if err := database.DB.Create(&newCustomer).Error; err != nil {
		return customer, err
	}
	// Second fetch the customer, with a preload on Files
	if err := database.DB.Model(&models.Customer{}).Preload("Files").First(&customer, newCustomer.ID).Error; err != nil {
		return customer, err
	}
	return customer, nil
}

func FindAllCustomers() ([]models.Customer, error) {
	var customers []models.Customer
	if err := database.DB.Model(&models.Customer{}).Preload("Files").Find(&customers).Error; err != nil {
		return nil, err
	}
	return customers, nil
}

func FindOneCustomer(customerID int) (models.Customer, error) {
	var customer models.Customer
	if err := database.DB.Model(&models.Customer{}).Preload("Files").First(&customer, customerID).Error; err != nil {
		return customer, err
	}
	return customer, nil
}

func UpdateOneCustomer(customerID int, updatedCustomer models.Customer) (models.Customer, error) {
	var customer models.Customer
	if err := database.DB.Model(&models.Customer{}).Preload("Files").First(&customer, customerID).Error; err != nil {
		return customer, err
	}
	customer.FirstName = updatedCustomer.FirstName
	customer.LastName = updatedCustomer.LastName
	customer.DateOfBirth = updatedCustomer.DateOfBirth
	customer.Email = updatedCustomer.Email
	customer.PhoneNumber = updatedCustomer.PhoneNumber
	if err := database.DB.Save(&customer).Error; err != nil {
		return customer, err
	}
	return customer, nil
}

func DeleteOneCustomer(customerID int) error {
	var customer models.Customer
	if err := database.DB.Model(&models.Customer{}).Where("id = ?", customerID).Delete(&customer).Error; err != nil {
		return err
	}
	return nil
}

func CheckCustomerExistsByID(customerID int) bool {
	var exists bool
	database.DB.Raw("select count(*) > 0 from customers where id = ?", customerID).Scan(&exists)
	return exists
}
