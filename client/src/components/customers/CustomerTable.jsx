import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

const CustomerTable = ({ customers, handleEditCustomer }) => {
	const TableHeader = () => {
		return (
			<thead>
				<tr>
					<th>ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone #</th>
					<th>No. Files</th>
					<th></th>
				</tr>
			</thead>
		);
	};
	const tableRows = customers.map((customer, index) => {
		return (
			<tr key={index}>
				<td>{customer.id}</td>
				<td>{customer.first_name}</td>
				<td>{customer.last_name}</td>
				<td>{customer.email}</td>
				<td>{customer.phone_number}</td>
				<td>{customer.Files.length}</td>
				<td>
					<Link to={`/customers/${customer.id}`}>Details</Link>
				</td>
			</tr>
		);
	});

	return (
		<Table striped bordered hover responsive>
			<TableHeader />
			<tbody>{tableRows}</tbody>
		</Table>
	);
};
export default CustomerTable;
