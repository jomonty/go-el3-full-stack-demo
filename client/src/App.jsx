import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./containers/Landing.jsx";
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

	useEffect(() => {
		const updatedAuth = checkLocalStorage();
		setAuth(updatedAuth);
	}, []);

	const handleLogIn = (body) => {
		logIn(body).then((res) => setAuth(res));
	};

	const handleLogOut = () => {
		localStorage.clear();
		setAuth({ ...initialAuth });
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing auth={auth} />} />
				<Route
					path="login"
					element={<LogIn auth={auth} handleLogIn={handleLogIn} />}
				/>
				<Route path="signup" element={<SignUp auth={auth} />} />
				<Route
					path="/home"
					element={<Dashboard auth={auth} handleLogOut={handleLogOut} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
