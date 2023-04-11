import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../handlers/AuthHandler.jsx";

const SignUp = ({ auth, handleSignup }) => {
	const navigate = useNavigate();
	const emptyForm = {
		email: "",
		username: "",
		password: "",
	};
	const initialStatus = "";
	const [form, setForm] = useState({ ...emptyForm });
	const [status, setStatus] = useState({ ...initialStatus });

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/home");
		}
	});

	const handleEmail = (event) => {
		const updatedForm = { ...form };
		updatedForm.email = event.target.value;
		setForm(updatedForm);
	};

	const handleUsername = (event) => {
		const updatedForm = { ...form };
		updatedForm.username = event.target.value;
		setForm(updatedForm);
	};

	const handlePassword = (event) => {
		const updatedForm = { ...form };
		updatedForm.password = event.target.value;
		setForm(updatedForm);
	};

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const handleSubmit = async (event) => {
		event.preventDefault();
		register(form).then(async (res) => {
			if (res.status === 201) {
				setStatus("Account created successfully");
				await delay(3000);
				navigate("/login");
			}
			res.json().then((data) => {
				console.log(data);
				setStatus(data.message);
			});
			// setStatus(res.json());
		});
		setForm(emptyForm);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">
					<p>Username: </p>
					<input
						id="username"
						name="username"
						value={form.username}
						onChange={handleUsername}
						type="text"
					/>
				</label>
				<label htmlFor="email">
					<p>Email: </p>
					<input
						id="email"
						name="email"
						value={form.email}
						onChange={handleEmail}
						type="text"
					/>
				</label>
				<label htmlFor="password">
					<p>Password</p>
					<input
						id="password"
						name="password"
						value={form.password}
						onChange={handlePassword}
						type="password"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			<p className={status === "" ? "hidden" : ""}>[status]</p>
		</div>
	);
};

export default SignUp;
