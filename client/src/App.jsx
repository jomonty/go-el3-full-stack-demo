import { useState, useEffect } from "react";
import "./App.css";

import { logIn } from "./handlers/authHandler.jsx";

function App() {
	const [auth, setAuth] = useState(
		() => JSON.parse(localStorage.getItem("auth")) || false
	);

	useEffect(() => {
		localStorage.setItem("auth", JSON.stringify(auth));
	}, [auth]);

	const handleLogIn = () => {
		logIn("test_email", "password").then((data) => console.log(data));
	};

	return (
		<div className="App">
			<div>
				<a href="https://www.element3.tech" rel="noreferrer" target="_blank">
					<img src="/e3-logo.png" className="logo" alt="" />
				</a>
			</div>
			<button onClick={() => handleLogIn()}>Button</button>
		</div>
	);
}

export default App;
