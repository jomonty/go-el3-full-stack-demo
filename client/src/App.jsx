import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Customers from "./containers/Customers.jsx";
import Users from "./containers/Users.jsx";
import LogIn from "./containers/LogIn.jsx";
import SignUp from "./containers/SignUp.jsx";
import { initialAuth, logIn, validateAuth } from "./handlers/AuthHandler.jsx";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const [auth, setAuth] = useState({ ...initialAuth });
	const [signupSuccessful, setSignupSuccessful] = useState(false);

	useEffect(() => {
		const validatedAuth = validateAuth();
		if (!validatedAuth.isAuthenticated) {
			navigate("/login");
		}
		setAuth(validatedAuth);
	}, []);

	const handleLogIn = async (body) => {
		const response = await logIn(body);
		if (response.status === 200) {
			setAuth(response.auth);
		}
		return response;
	};

	const handleLogOut = () => {
		localStorage.clear();
		setAuth({ ...initialAuth });
		navigate("/login");
	};

	const checkAuthStatus = () => {
		const updatedAuth = validateAuth();
		setAuth(updatedAuth);
		return updatedAuth;
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Customers
						auth={auth}
						checkAuthStatus={checkAuthStatus}
						handleLogOut={handleLogOut}
					/>
				}
			/>
			<Route
				path="/users"
				element={
					<Users
						auth={auth}
						checkAuthStatus={checkAuthStatus}
						handleLogOut={handleLogOut}
					/>
				}
			/>
			<Route
				path="/login"
				element={
					<LogIn
						auth={auth}
						handleLogIn={handleLogIn}
						signupSuccessful={signupSuccessful}
						setSignupSuccessful={setSignupSuccessful}
					/>
				}
			/>
			<Route
				path="/signup"
				element={
					<SignUp auth={auth} setSignupSuccessful={setSignupSuccessful} />
				}
			/>
		</Routes>
	);
}

export default App;
