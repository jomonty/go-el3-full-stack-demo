export const templateCustomer = {
	id: null,
	created_at: null,
	first_name: null,
	last_name: null,
	date_of_birth: null,
	email: null,
	phone_number: null,
	Files: [
		{
			id: null,
			created_at: null,
			file_name: null,
			file_location: null,
			customer_id: null,
		},
	],
};
export const createCustomer = async (token, body) => {
	const response = await fetch("/api/secured/customers", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response;
};

export const getOneCustomer = async (token, id) => {
	const url = `/api/secured/customers/${id}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};

export const getAllCustomers = async (token, limit, page, lastName) => {
	const url = `/api/secured/customers?limit=${limit}&page=${page}&last_name=${lastName}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};

export const updateOneCustomer = async (token, body) => {
	const url = `/api/secured/customers/${body.id}`;
	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
	return response;
};

export const deleteOneCustomer = async (token, id) => {
	const url = `/api/secured/customers/${id}`;
	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};

export const getTotalCustomerCount = async (token) => {
	const response = await fetch("/api/secured/customers/count", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};
