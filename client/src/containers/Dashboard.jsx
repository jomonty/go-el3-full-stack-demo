import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ auth, handleLogOut }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth.isAuthenticated) {
			navigate("/");
		}
	});

	// if (!auth.isAuthenticated) {
	// 	navigate("/");
	// }

	return (
		<>
			<p>Dashboard</p>
			<p>{auth.user.username} is logged in.</p>
			<button onClick={() => authContext.handleLogOut()}>Log Out</button>
		</>
	);
};

export default Dashboard;
