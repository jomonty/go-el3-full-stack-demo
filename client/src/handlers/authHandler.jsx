import { getToken, registerUser } from "../api/AuthAPI.jsx";

export const initialAuth = {
	isAuthenticated: false,
	user: null,
	token: null,
	expiry: null,
};

export const logIn = async (body) => {
	const response = await getToken(body);
	if (response.status !== 200) {
		return;
	}
	const data = await response.json();

	const auth = { ...initialAuth };
	auth.isAuthenticated = true;
	auth.user = data.user;
	auth.token = data.token;
	auth.expiry = genExpiryDateTime(1);

	setLocalStorage(auth);
	return auth;
};

export const checkLocalStorage = () => {
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
		console.log("valid");
		console.log(auth);

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
