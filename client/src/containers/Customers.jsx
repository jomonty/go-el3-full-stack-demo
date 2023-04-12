import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import CustomerTable from "../components/customers/CustomerTable.jsx";
import {
	templateCustomer,
	getAllCustomers,
	getTotalCustomerCount,
} from "../api/CustomerAPI";

const Customers = ({ auth, checkAuthStatus, handleLogOut }) => {
	const initialSearchParams = {
		limit: 10,
		page: 1,
		lastName: "",
		totalCount: 0,
	};
	const navigate = useNavigate();
	const [customers, setCustomers] = useState([templateCustomer]);
	const [searchParams, setSearchParams] = useState(initialSearchParams);

	useEffect(() => {
		const updatedAuth = checkAuthStatus();
		if (!updatedAuth.isAuthenticated) {
			navigate("/login");
		} else {
			fetchCustomerCount(updatedAuth.token).then(() => {
				fetchCustomers(updatedAuth.token).then((res) => {
					console.log(searchParams);
					console.log(res);
				});
			});
		}
	}, []);

	const fetchCustomerCount = async (token) => {
		const response = await getTotalCustomerCount(token);
		const data = await response.json();
		if (response.status === 200) {
			const updatedParams = { ...searchParams };
			updatedParams.totalCount = data.customer_count;
			setSearchParams(updatedParams);
		}
	};

	const fetchCustomers = async (token) => {
		const response = await getAllCustomers(
			token,
			searchParams.limit,
			searchParams.page,
			searchParams.lastName
		);
		const data = await response.json();
		if (response.status === 200) {
			setCustomers(data);
			return data;
		}
	};
	return (
		<DashboardWrapper auth={auth} handleLogOut={handleLogOut}>
			<h1>Customers</h1>
			<div>
				<CustomerTable customers={customers} />
			</div>
		</DashboardWrapper>
	);
};
export default Customers;
