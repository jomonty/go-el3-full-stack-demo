export const getToken = async (body) => {
	// /api/token takes a POST request with body of type
	// {
	// 	"email": "",
	// 	"password": ""
	// }
	// and returns status code 200 on success with a body of type
	// {
	// 	"token": "",
	// 	"user": {
	// 		"id": "",
	// 		"created_at": "",
	// 		"username": "",
	// 		"email": ""
	// 	}
	// }
	const response = await fetch("api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: body.email,
			password: body.password,
		}),
	});
	return response;
};

export const registerUser = async (body) => {
	// /api/register takes a POST request with body of type
	// {
	// 	"username": "",
	// 	"email": "",
	// 	"password": ""
	// }
	// and returns a status code 201 on success with a body of type
	// 	{
	// 		"message": "",
	// 		"user": {
	// 			"email": "",
	// 			"username": ""
	// 		}
	// 	}
	// }
	const response = await fetch("api/user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: body.username,
			email: body.email,
			body: body.password,
		}),
	});
	return response;
};
