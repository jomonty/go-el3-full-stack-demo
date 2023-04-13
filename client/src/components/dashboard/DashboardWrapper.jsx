import Container from "react-bootstrap/Container";

import DashboardHeader from "./DashboardHeader.jsx";

const DashboardWrapper = ({ auth, handleLogOut, children }) => {
	return (
		<Container fluid className="p-0">
			<DashboardHeader auth={auth} handleLogOut={handleLogOut} />

			<Container className="pt-5">{children}</Container>
		</Container>
	);
};
export default DashboardWrapper;
