import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const DashboardHeader = ({ auth, handleLogOut }) => {
	return (
		<Navbar bg="light" expand="md" className="p-3">
			<Container>
				<Navbar.Brand href="/">Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto pb-4 pb-md-0 pt-4 pt-md-0">
						<Nav.Link href="/">Customers</Nav.Link>
						<Nav.Link href="/users">Users</Nav.Link>
					</Nav>
					<div className="d-flex justify-content-between align-items-center">
						<Navbar.Text className="pe-md-3">{auth.user.username}</Navbar.Text>
						<Navbar.Text>
							<Button variant="secondary" onClick={() => handleLogOut()}>
								Log Out
							</Button>
						</Navbar.Text>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default DashboardHeader;
