import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { getAuth } from "../../handlers/AuthHandler.jsx";
import { addFile } from "../../api/FileAPI.jsx";

const AddFileModal = ({ customer, fetchCustomer }) => {
	const [show, setShow] = useState(false);
	const [file, setFile] = useState();
	const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
	const [alertWarningOpen, setAlertWarningOpen] = useState(false);
	const [alertWarningValue, setAlertWarningValue] = useState("");

	const handleShow = () => {
		setAlertSuccessOpen(false);
		setAlertWarningOpen(false);
		setShow(true);
	};

	const handleClose = () => {
		setAlertWarningOpen(false);
		fetchCustomer();
		setShow(false);
	};

	const handleFileChange = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (!file) {
			return;
		}
		const response = await addFile(getAuth().token, customer.id, file);
		if (response.status === 201) {
			setAlertSuccessOpen(true);
			setFile();
			handleClose();
		} else {
			const data = response.json();
			setAlertWarningOpen(true);
			setAlertWarningValue(data.message);
		}
	};

	const SuccessAlert = () => {
		return (
			<Alert
				variant="success"
				className="mt-3"
				dismissible
				onClose={() => {
					setAlertSuccessOpen(false);
				}}
			>
				File uploaded successfully
			</Alert>
		);
	};

	const WarningAlert = ({ message }) => {
		<Alert
			variant="warning"
			className="mt-3"
			dismissible
			onClose={() => {
				setAlertWarningOpen(false);
			}}
		>
			{message}
		</Alert>;
	};
	return (
		<>
			<Button variant="secondary" onClick={handleShow} className="mt-5">
				Add File
			</Button>
			{alertSuccessOpen ? <SuccessAlert /> : ""}
			{alertWarningOpen ? <WarningAlert>{alertWarningValue}</WarningAlert> : ""}
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Add File</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Upload File</Form.Label>
						<Form.Control type="file" id="file" onChange={handleFileChange} />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleFormSubmit} variant="primary">
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default AddFileModal;
