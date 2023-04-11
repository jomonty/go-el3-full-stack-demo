import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ auth, handleLogIn }) => {
	const navigate = useNavigate();
	const emptyForm = {
		email: "",
		password: "",
	};
	const [form, setForm] = useState({ ...emptyForm });

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
	const handlePassword = (event) => {
		const updatedForm = { ...form };
		updatedForm.password = event.target.value;
		setForm(updatedForm);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleLogIn(form);
		setForm(emptyForm);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">
					<p>Email: </p>
					<input
						id="email"
						name="email"
						type="text"
						value={form.email}
						onChange={handleEmail}
					/>
				</label>
				<label htmlFor="password">
					<p>Password: </p>
					<input
						id="password"
						name="password"
						type="password"
						value={form.password}
						onChange={handlePassword}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
export default LogIn;
