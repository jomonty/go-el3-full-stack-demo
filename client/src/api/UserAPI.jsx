export const templateUser = {
	id: null,
	created_at: null,
	username: null,
	email: null,
};

export const getAllUsers = async (token) => {
	const response = await fetch("api/secured/users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});
	return response;
};
