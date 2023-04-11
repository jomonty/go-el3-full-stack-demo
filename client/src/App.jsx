import { useState, useEffect } from "react";
import "./App.css";

import LogIn from "./components/LogIn.jsx";

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

	// if (auth && !auth.isAuthenticated) {
	// 	return <LogIn />;
	// }

	return (
		<div className="App">
			<div>
				<a href="https://www.element3.tech" rel="noreferrer" target="_blank">
					<img src="/e3-logo.png" className="logo" alt="" />
				</a>
			</div>
			<button
				onClick={() =>
					handleLogIn({ email: "test_email", password: "password" })
				}
			>
				Log In
			</button>
			<button onClick={() => handleLogOut()}>Log Out</button>
			<p>
				{auth && auth.isAuthenticated
					? `Logged In: ${auth.user.username}`
					: "Not Logged In"}
			</p>
		</div>
	);
}

export default App;
