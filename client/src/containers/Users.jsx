import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import UserTable from "../components/users/UserTable.jsx";
import { templateUser, getAllUsers } from "../api/UserAPI";

const Users = ({ handleLogOut }) => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([templateUser, templateUser]);

	useEffect(() => {
		if (!isAuthorized) {
			navigate("/login");
		} else {
			fetchUsers(getAuth().token);
		}
	}, []);

	const fetchUsers = async (token) => {
		const response = await getAllUsers(token);
		const data = await response.json();
		if (response.status === 200) {
			setUsers(data);
		}
	};

	return (
		<DashboardWrapper auth={getAuth()} handleLogOut={handleLogOut}>
			<h1>Users</h1>
			<div className="pt-5">
				<UserTable users={users} />
			</div>
		</DashboardWrapper>
	);
};
export default Users;
