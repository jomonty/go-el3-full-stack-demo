import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import SingleCustomerDetail from "../components/customer_single/SingleCustomerDetail.jsx";
import SingleCustomerFiles from "../components/customer_single/SingleCustomerFiles.jsx";
import SingleCustomerEditModal from "../components/customer_single/SingleCustomerEditModal.jsx";

import {
	templateCustomer,
	getOneCustomer,
	deleteOneCustomer,
} from "../api/CustomerAPI.jsx";

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
		const response = await getOneCustomer(getAuth().token, cust_id);
		const data = await response.json();

		if (response.status === 200) {
			setCustomer(data);
		}
	};

	const handleDelete = async () => {
		const response = await deleteOneCustomer(getAuth().token, cust_id);
		if (response.status === 200) {
			navigate("/");
		}
	};

	return (
		<DashboardWrapper auth={getAuth()} handleLogOut={handleLogOut}>
			<SingleCustomerDetail customer={customer} />
			<SingleCustomerEditModal
				customer={customer}
				fetchCustomer={fetchCustomer}
				handleDelete={handleDelete}
			/>
			<SingleCustomerFiles
				customer={customer}
				setCustomer={setCustomer}
				fetchCustomer={fetchCustomer}
			/>
		</DashboardWrapper>
	);
};
export default CustomerDetail;
