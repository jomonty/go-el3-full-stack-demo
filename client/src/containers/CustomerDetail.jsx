import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";

import { templateCustomer, getOneCustomer } from "../api/CustomerAPI.jsx";

const CustomerDetail = ({ handleLogOut }) => {
	const navigate = useNavigate();
	const { cust_id } = useParams();
	const [customer, setCustomer] = useState({ ...templateCustomer });

	useEffect(() => {
		if (!isAuthorized) {
			navigate("/login");
		} else {
			fetchCustomer();
		}
	}, []);

	const fetchCustomer = async () => {
		console.log(cust_id);
		const response = await getOneCustomer(getAuth().token, cust_id);
		// console.log(response.body.getReader());
		const data = await response.json();

		if (response.status === 200) {
			console.log(data);
			setCustomer(data);
		}
	};

	return (
		<DashboardWrapper auth={getAuth()} handleLogOut={handleLogOut}>
			<h1>Customer Detail</h1>
			<h2>
				{customer.first_name} {customer.last_name}
			</h2>
		</DashboardWrapper>
	);
};
export default CustomerDetail;
