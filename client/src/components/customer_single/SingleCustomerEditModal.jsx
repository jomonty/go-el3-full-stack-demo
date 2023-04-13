import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { templateCustomer, updateOneCustomer } from "../../api/CustomerAPI.jsx";
import { getAuth } from "../../handlers/AuthHandler.jsx";

const SingleCustomerEditModal = ({ customer, fetchCustomer }) => {
	const templateForm = {
		id: "",
		created_at: "",
		first_name: "",
		last_name: "",
		date_of_birth: "",
		email: "",
		phone_number: "",
	};
	const [show, setShow] = useState(false);
	const [form, setForm] = useState({ ...templateForm });
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertValue, setAlertValue] = useState("");

	const handleClose = () => {
		const updatedForm = { ...templateForm };
		setForm(updatedForm);
		setShow(false);
	};

	const handleShow = () => {
		const updatedForm = { ...form };
		updatedForm.id = customer.id;
		updatedForm.created_at = customer.created_at;
		updatedForm.first_name = customer.first_name;
		updatedForm.last_name = customer.last_name;
		updatedForm.date_of_birth = strToISODate(customer.date_of_birth);
		updatedForm.email = customer.email;
		updatedForm.phone_number = customer.phone_number;
		setForm(updatedForm);
		setShow(true);
	};

	const handleFormChange = (event) => {
		const updatedForm = { ...form };
		updatedForm[event.target.name] = event.target.value;
		setForm(updatedForm);
		handleAlertClose();
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(customer.created_at);
		console.log(form.created_at);
		console.log(form);
		const response = await updateOneCustomer(getAuth().token, form);
		if (response.status === 200) {
			handleClose();
			fetchCustomer();
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

	const strToISODate = (strDate) => {
		const year = strDate.substring(0, 4);
		const month = strDate.substring(5, 7);
		const day = strDate.substring(8, 10);
		const date = new Date(year, month, day);
		return date.toISOString().substring(0, 10);
	};

	const handleDateDisplay = (strDate) => {
		const date = new Date(strDate);
		return date.toLocaleDateString();
	};

	return (
		<>
			<Button variant="warning" className="flex-fill" onClick={handleShow}>
				Edit
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Edit Customer</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleFormSubmit}>
					<Modal.Body>
						<Row className="mt-3">
							<Col>
								<Form.Control
									type="text"
									name="id"
									value={form.id}
									disabled
									readOnly
								/>
							</Col>
							<Col>
								<Form.Control
									type="text"
									name="created_at"
									value={handleDateDisplay(form.created_at)}
									disabled
									readOnly
								/>
							</Col>
						</Row>
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

export default SingleCustomerEditModal;
