import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../handlers/AuthHandler";

const SignupForm = ({ setSignupSuccessful }) => {
	const navigate = useNavigate();
	const emptyForm = {
		email: "",
		username: "",
		password: "",
	};
	const [form, setForm] = useState({ ...emptyForm });
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertValue, setAlertValue] = useState("");

	const handleFormFields = (event) => {
		const updatedForm = { ...form };
		updatedForm[event.target.name] = event.target.value;
		setForm(updatedForm);
		setAlertOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(form);
		const response = await register(form);
		if (response.status === 201) {
			setSignupSuccessful(true);
			navigate("/");
		} else {
			setAlertOpen(true);
			setAlertValue(response.message);
			const updatedForm = { ...form };
			updatedForm.password = "";
			setForm(updatedForm);
		}
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const WarningAlert = ({ message }) => {
		return (
			<div className="d-flex justify-content-between alert alert-warning fade show">
				<div>
					<strong>Unable to sign up. </strong>
					{message}
				</div>
				<button
					type="button"
					className="btn-close"
					onClick={handleAlertClose}
				></button>
			</div>
		);
	};

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	return (
		<>
			<p className="text-muted">
				Please sign up or click <Link to="/login">here</Link> to log in.
			</p>
			{alertOpen ? <WarningAlert message={alertValue} /> : ""}
			<form onSubmit={handleSubmit}>
				<div className="form-floating mb-3">
					<input
						id="username"
						name="username"
						value={form.username}
						onChange={handleFormFields}
						type="text"
						className="form-control"
						placeholder="username"
						required
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="form-floating mb-3">
					<input
						id="email"
						name="email"
						value={form.email}
						onChange={handleFormFields}
						type="text"
						className="form-control"
						placeholder="name@example.com"
						required
					/>
					<label htmlFor="email">Email</label>
				</div>
				<div className="form-floating mb-3">
					<input
						id="password"
						name="password"
						value={form.password}
						onChange={handleFormFields}
						type="password"
						className="form-control"
						placeholder="password"
						required
					/>
					<label htmlFor="password">Password</label>
				</div>
				<div className="d-flex">
					<button type="submit" className="btn btn-secondary flex-fill">
						Sign Up
					</button>
				</div>
			</form>
		</>
	);
};

export default SignupForm;
