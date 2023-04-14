import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import {
	templateCustomer,
	getOneCustomer,
	deleteOneCustomer,
} from "../api/CustomerAPI.jsx";

import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import CustomerInfo from "../components/customer_detail/CustomerInfo.jsx";
import Files from "../components/customer_detail/Files.jsx";
import EditModal from "../components/customer_detail/EditModal.jsx";

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
			<CustomerInfo customer={customer} />
			<EditModal
				customer={customer}
				fetchCustomer={fetchCustomer}
				handleDelete={handleDelete}
			/>
			<Files
				customer={customer}
				setCustomer={setCustomer}
				fetchCustomer={fetchCustomer}
			/>
		</DashboardWrapper>
	);
};
export default CustomerDetail;
