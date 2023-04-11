import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./containers/Dashboard.jsx";
import LogIn from "./containers/LogIn.jsx";
import SignUp from "./containers/SignUp.jsx";
import "./App.css";
import {
	initialAuth,
	logIn,
	register,
	checkLocalStorage,
} from "./handlers/AuthHandler.jsx";

function App() {
	const [auth, setAuth] = useState({ ...initialAuth });
	const [signupSuccessful, setSignupSuccessful] = useState(false);

	useEffect(() => {
		const updatedAuth = checkLocalStorage();
		setAuth(updatedAuth);
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
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Dashboard auth={auth} handleLogOut={handleLogOut} />}
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
		</Router>
	);
}

export default App;
