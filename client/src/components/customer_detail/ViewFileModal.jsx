import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getAuth } from "../../handlers/AuthHandler.jsx";
import { getOneFile } from "../../api/FileAPI";

const ViewFileModal = ({ file }) => {
	const [show, setShow] = useState(false);
	const [fileURL, setFileURL] = useState("");

	const handleShow = () => {
		setShow(true);
		getFile();
	};
	const handleClose = () => {
		setShow(false);
	};

	const getFile = async () => {
		if (file.file_location == null) {
			return;
		}
		const response = await getOneFile(getAuth().token, file.file_location);
		if (response.status === 200) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			setFileURL(url);
		}
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow} className="">
				Open
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				// backdrop="static"
				// keyboard="false"
				size="lg"
			>
				<Modal.Header>
					<Modal.Title>{file.file_name}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="embed-responsive embed-responsive-1by1">
					<iframe
						src={fileURL}
						className="embed-responsive-item"
						width="100%"
						height="600vh"
					></iframe>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default ViewFileModal;
