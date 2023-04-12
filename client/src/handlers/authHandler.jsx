import { getToken, registerUser } from "../api/AuthAPI.jsx";

export const initialAuth = {
	isAuthenticated: false,
	user: {
		id: null,
		created_at: null,
		username: null,
		email: null,
	},
	token: null,
	expiry: null,
};

export const logIn = async (body) => {
	const response = await getToken(body);
	const data = await response.json();
	if (response.status !== 200) {
		return {
			status: response.status,
			message: data.message,
		};
	}
	const auth = { ...initialAuth };
	auth.isAuthenticated = true;
	auth.user = data.user;
	auth.token = data.token;
	auth.expiry = genExpiryDateTime(1);

	setLocalStorage(auth);

	return {
		status: response.status,
		message: "Login Successful",
		auth: auth,
	};
};

export const register = async (body) => {
	const response = await registerUser(body);
	const data = await response.json();
	return {
		status: response.status,
		message: data.message,
	};
};

export const validateAuth = () => {
	const auth = { ...initialAuth };
	if (!getLocalStorage("isAuthenticated")) {
		localStorage.clear();
		return auth;
	} else {
		const expiry = new Date(getLocalStorage("expiry"));
		if (expiry < Date.now()) {
			localStorage.clear();
			return auth;
		}
		auth.isAuthenticated = getLocalStorage("isAuthenticated");
		auth.user = getLocalStorage("user");
		auth.token = getLocalStorage("token");
		auth.expiry = new Date(getLocalStorage("expiry"));

		return auth;
	}
};

const setLocalStorage = (auth) => {
	localStorage.setItem("isAuthenticated", JSON.stringify(auth.isAuthenticated));
	localStorage.setItem("user", JSON.stringify(auth.user));
	localStorage.setItem("token", JSON.stringify(auth.token));
	localStorage.setItem("expiry", JSON.stringify(auth.expiry));
};

const getLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

const genExpiryDateTime = (hours) => {
	const expiry = new Date(Date.now());
	expiry.setHours(expiry.getHours() + hours);
	return expiry;
};
