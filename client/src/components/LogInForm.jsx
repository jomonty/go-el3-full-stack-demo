import { useState } from "react";

const LogInForm = ({ handleLogIn }) => {
	const emptyForm = {
		email: "",
		password: "",
	};
	const [form, setForm] = useState({ ...emptyForm });

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
		<form onSubmit={handleSubmit}>
			<div className="form-floating mb-3">
				<input
					id="email"
					name="email"
					type="email"
					value={form.email}
					onChange={handleEmail}
					className="form-control"
					placeholder="name@example.com"
					required
				/>
				<label htmlFor="email">Email address</label>
			</div>
			<div className="form-floating mb-3">
				<input
					id="password"
					name="password"
					type="password"
					value={form.password}
					onChange={handlePassword}
					className="form-control"
					placeholder="password"
					required
				/>
				<label htmlFor="password">Password</label>
			</div>
			<div className="d-flex">
				<button type="submit" className="btn btn-primary flex-fill">
					Submit
				</button>
			</div>
		</form>
	);
};
export default LogInForm;
