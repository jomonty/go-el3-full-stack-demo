import Table from "react-bootstrap/Table";

const CustomerTable = ({ customers }) => {
	const TableHeader = () => {
		return (
			<thead>
				<tr>
					<th>ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone #</th>
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
			</tr>
		);
	});
	return (
		<Table striped bordered hover responsive="md">
			<TableHeader />
			<tbody>{tableRows}</tbody>
		</Table>
	);
};
export default CustomerTable;