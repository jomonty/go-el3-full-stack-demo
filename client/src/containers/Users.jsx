import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardWrapper from "../components/dashboard/DashboardWrapper";

const Users = ({ auth, checkAuthStatus, handleLogOut }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const updatedAuth = checkAuthStatus();
		if (!updatedAuth.isAuthenticated) {
			navigate("/login");
		}
	}, []);

	return (
		<DashboardWrapper auth={auth} handleLogOut={handleLogOut}>
			<h1>Users</h1>
		</DashboardWrapper>
	);
};
export default Users;
