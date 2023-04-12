import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Customers from "./containers/Customers.jsx";
import Users from "./containers/Users.jsx";
import LogIn from "./containers/LogIn.jsx";
import SignUp from "./containers/SignUp.jsx";
import { isAuthorized, logOut } from "./handlers/AuthHandler.jsx";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const [signupSuccessful, setSignupSuccessful] = useState(false);

	useEffect(() => {
		if (!isAuthorized()) {
			navigate("/login");
		}
	}, []);

	const handleLogOut = () => {
		navigate("/login");
		logOut();
	};

	return (
		<Routes>
			<Route path="/" element={<Customers handleLogOut={handleLogOut} />} />
			<Route path="/users" element={<Users handleLogOut={handleLogOut} />} />
			<Route
				path="/login"
				element={
					<LogIn
						signupSuccessful={signupSuccessful}
						setSignupSuccessful={setSignupSuccessful}
					/>
				}
			/>
			<Route
				path="/signup"
				element={<SignUp setSignupSuccessful={setSignupSuccessful} />}
			/>
		</Routes>
	);
}

export default App;
