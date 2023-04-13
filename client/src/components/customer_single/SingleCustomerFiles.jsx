import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { getAuth } from "../../handlers/AuthHandler.jsx";
import { getOneFile, deleteFile } from "../../api/FileAPI.jsx";
import AddFileModal from "./AddFileModal.jsx";

const SingleCustomerFiles = ({ customer, setCustomer, fetchCustomer }) => {
	const fetchFile = async (file) => {
		const response = await getOneFile(getAuth().token, file.file_location);
		if (response.status === 200) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.file_name;
			document.body.appendChild(a);
			a.click();
			a.remove();
		}
	};

	const handleDelete = async (id) => {
		const response = await deleteFile(getAuth().token, id);
		if (response.status === 200) {
			const updatedCustomer = { ...customer };
			updatedCustomer.Files = customer.Files.filter((file) => {
				return file.id !== id;
			});
			setCustomer(updatedCustomer);
		}
	};

	const handleDate = (strDate) => {
		const date = new Date(strDate);
		return date.toLocaleString();
	};

	const TableHeader = () => {
		return (
			<thead>
				<tr>
					<th>FileID</th>
					<th>Created At</th>
					<th>FileName</th>
					<th></th>
				</tr>
			</thead>
		);
	};

	const tableRows = customer.Files.map((file, index) => {
		return (
			<tr key={index}>
				<td>{file.id}</td>
				<td>{handleDate(file.created_at)}</td>
				<td>{file.file_name}</td>
				<td className="d-flex justify-content-evenly">
					<Button variant="secondary" onClick={() => fetchFile(file)}>
						Open
					</Button>
					<Button variant="warning">Edit</Button>
					<Button variant="danger" onClick={() => handleDelete(file.id)}>
						Delete
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<>
			<AddFileModal customer={customer} fetchCustomer={fetchCustomer} />
			<Table striped bordered hover responsive="md" className="mt-2">
				<TableHeader />
				<tbody>{tableRows}</tbody>
			</Table>
		</>
	);
};
export default SingleCustomerFiles;
