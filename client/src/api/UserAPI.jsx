export const templateUser = {
	id: null,
	created_at: null,
	username: null,
	email: null,
};

export const getAllUsers = async (token) => {
	/*
	/api/secured/users takes a GET request with no body.
	and returns a status code 200 on success with an array of type templateUser
	*/
	const response = await fetch("api/secured/users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};
