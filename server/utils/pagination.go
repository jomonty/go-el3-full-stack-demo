package utils

import (
	"errors"
	"jomonty/go-el3-full-stack-demo-server/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ParsePaginationFromRequest(context *gin.Context) (models.Pagination, error) {
	pagination := models.Pagination{
		Limit: 10,
		Page:  1,
		Sort:  "created_at asc",
	}
	query := context.Request.URL.Query()

	for key, value := range query {
		queryValue := value[len(value)-1]
		switch key {
		case "limit":
			strLimit, err := strconv.Atoi(queryValue)
			if err != nil {
				return pagination, errors.New("parse error on limit query value")
			}
			pagination.Limit = strLimit
		case "page":
			strPage, err := strconv.Atoi(queryValue)
			if err != nil {
				return pagination, errors.New("parse error on page limit value")
			}
			pagination.Page = strPage
		case "sort":
			pagination.Sort = queryValue
		}
	}
	return pagination, nil
}
