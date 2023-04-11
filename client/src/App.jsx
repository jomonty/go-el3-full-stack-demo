import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./containers/Landing.jsx";
import Dashboard from "./containers/Dashboard.jsx";
import "./App.css";
import {
	initialAuth,
	logIn,
	checkLocalStorage,
} from "./handlers/AuthHandler.jsx";

function App() {
	const [auth, setAuth] = useState({ ...initialAuth });

	useEffect(() => {
		const updatedAuth = checkLocalStorage();
		setAuth(updatedAuth);
	}, []);

	const handleLogIn = (login) => {
		logIn(login).then((res) => setAuth(res));
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
					element={<Landing auth={auth} handleLogIn={handleLogIn} />}
				/>
				<Route
					path="/home"
					element={<Dashboard auth={auth} handleLogOut={handleLogOut} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
