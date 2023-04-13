import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getAuth } from "../../handlers/AuthHandler.jsx";
import { createCustomer } from "../../api/CustomerAPI.jsx";

const NewCustomer = ({ fetchCustomers }) => {
	const initialNewCustomer = {
		first_name: "",
		last_name: "",
		date_of_birth: "",
		email: "",
		phone_number: "",
	};
	const [show, setShow] = useState(false);
	const [form, setForm] = useState(initialNewCustomer);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertValue, setAlertValue] = useState("");

	const handleClose = () => {
		const updatedForm = { ...initialNewCustomer };
		setForm(updatedForm);
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const handleFormChange = (event) => {
		const updatedForm = { ...form };
		updatedForm[event.target.name] = event.target.value;
		setForm(updatedForm);
		handleAlertClose();
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const response = await createCustomer(getAuth().token, form);
		if (response.status === 201) {
			handleClose();
			fetchCustomers();
		} else {
			const data = await response.json();
			setAlertOpen(true);
			setAlertValue(data.message());
		}
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
		setAlertValue("");
	};

	const WarningAlert = ({ message }) => {
		return (
			<div className="d-flex justify-content-between alert alert-warning fade show">
				<div>
					<strong>{message}</strong>
				</div>
				<button
					type="button"
					className="btn-close"
					onClick={handleAlertClose}
				></button>
			</div>
		);
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				New Customer
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Create New Customer</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleFormSubmit}>
					<Modal.Body>
						<Row className="mt-3">
							<Col>
								<Form.Control
									type="text"
									name="first_name"
									value={form.first_name}
									placeholder="First Name"
									onChange={handleFormChange}
									required
								/>
							</Col>
							<Col>
								<Form.Control
									type="text"
									name="last_name"
									value={form.last_name}
									placeholder="Last Name"
									onChange={handleFormChange}
									required
								/>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col>
								<Form.Control
									type="date"
									name="date_of_birth"
									value={form.date_of_birth}
									placeholder="date_of_birth"
									onChange={handleFormChange}
									required
								/>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col>
								<Form.Control
									type="text"
									name="email"
									value={form.email}
									placeholder="email"
									onChange={handleFormChange}
								/>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col>
								<Form.Control
									type="text"
									name="phone_number"
									value={form.phone_number}
									placeholder="phone_number"
									onChange={handleFormChange}
								/>
							</Col>
						</Row>
						<Row>{alertOpen ? <WarningAlert message={alertValue} /> : ""}</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button type="submit" variant="primary">
							Save
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default NewCustomer;
