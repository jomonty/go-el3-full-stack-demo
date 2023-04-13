import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { updateOneCustomer } from "../../api/CustomerAPI.jsx";
import { getAuth } from "../../handlers/AuthHandler.jsx";

import ConfirmDelete from "../common/ConfirmDelete.jsx";

const SingleCustomerEditModal = ({ customer, fetchCustomer, handleDelete }) => {
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
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertValue, setAlertValue] = useState("");

	const handleClose = () => {
		const updatedForm = { ...templateForm };
		setForm(updatedForm);
		setShow(false);
	};

	const handleShow = () => {
		const updatedForm = {
			id: customer.id,
			created_at: customer.created_at,
			first_name: customer.first_name,
			last_name: customer.last_name,
			date_of_birth: strToISODate(customer.date_of_birth),
			email: customer.email,
			phone_number: customer.phone_number,
		};
		setForm(updatedForm);
		setAlertOpen(false);
		setSuccessAlertOpen(false);
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
		const response = await updateOneCustomer(getAuth().token, form);
		if (response.status === 200) {
			handleClose();
			fetchCustomer();
			setSuccessAlertOpen(true);
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
			<Row xs={1} md={2}>
				<Col className="pt-3">
					{successAlertOpen ? (
						<Alert
							variant="success"
							onClose={() => setSuccessAlertOpen(false)}
							dismissible
						>
							Updated Successfully
						</Alert>
					) : (
						""
					)}
				</Col>
			</Row>
			<Row xs={1} md={2} gap={2}>
				<Col className="d-flex justify-content-evenly ">
					<Button variant="warning" className="flex-fill" onClick={handleShow}>
						Edit
					</Button>
					<ConfirmDelete handleDelete={handleDelete} />
				</Col>
			</Row>
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
						<Row>
							{alertOpen ? <Alert variant={warning}>{alertValue}</Alert> : ""}
						</Row>
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
