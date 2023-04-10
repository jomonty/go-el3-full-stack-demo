export const logIn = async (email, password) => {
	const response = await fetch("api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	return response.json();
};
