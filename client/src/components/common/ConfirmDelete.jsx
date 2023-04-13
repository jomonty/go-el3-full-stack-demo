import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmDelete = ({ handleDelete }) => {
	const [show, setShow] = useState(false);

	const cancelDelete = () => {
		setShow(false);
	};
	const confirmDelete = () => {
		handleDelete();
	};
	return (
		<>
			<Button
				variant="danger"
				className="flex-fill"
				onClick={() => setShow(true)}
			>
				Delete
			</Button>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => cancelDelete()}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => confirmDelete()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default ConfirmDelete;
