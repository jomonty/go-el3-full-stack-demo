export const templateCustomer = {
	id: null,
	created_at: null,
	first_name: null,
	last_name: null,
	date_of_birth: null,
	email: null,
	phone_number: null,
	Files: [null, null],
};
export const createCustomer = async (token, body) => {};

export const getOneCustomer = async (token, id) => {};

export const getAllCustomers = async (token, limit, page, lastName) => {
	/*
/api/secured/customers takes a GET request with no body
optional query params of limit, page, last_name
*/
	// const url = "api/secured/customers";
	const url = `api/secured/customers?limit=${limit}&page=${page}&last_name=${lastName}`;
	// const urlLimit = limit ? `?limit=${limit}` : "";
	// const urlPage = page ? `?page=${page}` : "";
	// const urlLastName = lastName ? `?last_name=${lastName}` : "";
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};

export const updateOneCustomer = async (token, body, id) => {};

export const deleteOneCustomer = async (token, id) => {};

export const getTotalCustomerCount = async (token) => {
	const response = await fetch("api/secured/customers/count", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};
