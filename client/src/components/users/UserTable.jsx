import Table from "react-bootstrap/Table";

const UserTable = ({ users }) => {
	const TableHeader = () => {
		return (
			<thead>
				<tr>
					<th>ID</th>
					<th>Username</th>
					<th>Email</th>
					<th>Created At</th>
				</tr>
			</thead>
		);
	};
	const tableRows = users.map((user, index) => {
		const createdAt = new Date(user.created_at).toLocaleDateString();
		return (
			<tr key={index}>
				<td>{user.id}</td>
				<td>{user.username}</td>
				<td>{user.email}</td>
				<td>{createdAt}</td>
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
export default UserTable;
