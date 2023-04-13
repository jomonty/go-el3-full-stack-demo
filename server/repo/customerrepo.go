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

func FindAllCustomers(pagination *models.Pagination, lastNameSearch string) ([]models.Customer, error) {
	var customers []models.Customer
	lastNameLike := "%" + lastNameSearch + "%"
	offset := (pagination.Page - 1) * pagination.Limit
	queryBuilder := database.DB.Limit(pagination.Limit).Offset(offset).Order(pagination.Sort)
	if err := queryBuilder.Model(&models.Customer{}).Where("last_name LIKE ?", lastNameLike).Preload("Files").Find(&customers).Error; err != nil {
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
	// Fetch Customer to facilitate file deletion
	var customer models.Customer
	if err := database.DB.Model(&models.Customer{}).Preload("Files").First(&customer, customerID).Error; err != nil {
		return err
	}
	// Loop over and delete related files
	for _, element := range customer.Files {
		if err := DeleteOneFile(int(element.ID)); err != nil {
			return err
		}
	}
	// Remove customer from database
	if err := database.DB.Delete(&models.Customer{}, customerID).Error; err != nil {
		return err
	}
	return nil
}

func CheckCustomerExistsByID(customerID int) bool {
	var exists bool
	database.DB.Raw("select count(*) > 0 from customers where id = ?", customerID).Scan(&exists)
	return exists
}

func TotalCustomerCount() (int64, error) {
	var count int64
	if err := database.DB.Model(&models.Customer{}).Count(&count).Error; err != nil {
		return count, err
	}
	return count, nil
}
