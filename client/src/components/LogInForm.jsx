import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LogInForm = ({ handleLogIn }) => {
	const navigate = useNavigate();
	const emptyForm = {
		email: "",
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
		const res = await handleLogIn(form);
		if (res.status === 200) {
			navigate("/home");
		} else {
			setAlertOpen(true);
			setAlertValue(res.message);
			const updatedForm = { ...form };
			updatedForm.password = "";
			setForm(updatedForm);
		}
	};

	const WarningAlert = ({ message }) => {
		return (
			<div className="d-flex justify-content-between alert alert-warning fade show">
				<div>
					<strong>Unable to log in. </strong>
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

	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	return (
		<>
			<p className="text-muted">
				Please log in to continue or click <Link to="/signup">here</Link> to
				signup.
			</p>
			<form onSubmit={handleSubmit}>
				<div className="form-floating mb-3">
					<input
						id="email"
						name="email"
						type="text"
						value={form.email}
						onChange={handleFormFields}
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
						onChange={handleFormFields}
						className="form-control"
						placeholder="password"
						required
					/>
					<label htmlFor="password">Password</label>
				</div>
				{alertOpen ? <WarningAlert message={alertValue} /> : ""}
				<div className="d-flex">
					<button type="submit" className="btn btn-primary flex-fill">
						Submit
					</button>
				</div>
			</form>
		</>
	);
};
export default LogInForm;
