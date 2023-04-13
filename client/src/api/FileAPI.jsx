export const getOneFile = async (token, id) => {
	const url = `/api/secured/${id}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: token,
		},
	});
	return response;
};

export const addFile = async (token, customer_id, file) => {
	const formData = new FormData();
	formData.append("customer_id", customer_id);
	formData.append("file", file);
	const url = `/api/secured/files`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: formData,
	});
	return response;
};

// export const updateFile = async (token, body) => {};

export const deleteFile = async (token, id) => {
	const url = `/api/secured/files/${id}`;
	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: token,
		},
	});
	return response;
};
