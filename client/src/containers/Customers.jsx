import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import DashboardWrapper from "../components/dashboard/DashboardWrapper.jsx";
import CustomerTable from "../components/customers/CustomerTable.jsx";
import CustomerPagination from "../components/customers/Pagination.jsx";
import {
	templateCustomer,
	getAllCustomers,
	getTotalCustomerCount,
} from "../api/CustomerAPI";

const Customers = ({ handleLogOut }) => {
	const navigate = useNavigate();
	const initialSearchParams = {
		limit: 10,
		page: 1,
		lastName: "",
	};
	const [customers, setCustomers] = useState([templateCustomer]);
	const [searchParams, setSearchParams] = useState(initialSearchParams);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		if (!isAuthorized()) {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		if (!isAuthorized()) {
			navigate("/login");
		} else {
			fetchCustomers(getAuth().token);
		}
	}, [searchParams]);

	useEffect(() => {
		if (!isAuthorized()) {
			navigate("/login");
		} else {
			fetchTotalPages();
		}
	}, [customers]);

	const fetchTotalPages = async () => {
		const response = await getTotalCustomerCount(getAuth().token);
		const data = await response.json();
		if (response.status === 200) {
			if (data.customer_count && searchParams.limit) {
				const pages = Math.ceil(data.customer_count / searchParams.limit);
				setTotalPages(pages);
			} else {
				setTotalPages(1);
			}
		}
	};

	const fetchCustomers = async () => {
		const response = await getAllCustomers(
			getAuth().token,
			searchParams.limit,
			searchParams.page,
			searchParams.lastName
		);
		const data = await response.json();
		if (response.status === 200) {
			setCustomers(data);
		}
	};
	return (
		<DashboardWrapper auth={getAuth()} handleLogOut={handleLogOut}>
			<h1>Customers</h1>
			<div className="pt-5">
				<CustomerTable customers={customers} />
			</div>
			<div className="d-flex justify-content-start">
				<CustomerPagination
					totalPages={totalPages}
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
			</div>
		</DashboardWrapper>
	);
};
export default Customers;
