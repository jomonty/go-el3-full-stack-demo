import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import SingleCustomerDetail from "../components/customer_details/SingleCustomerDetail.jsx";
import SingleCustomerFiles from "../components/customer_details/SingleCustomerFiles.jsx";

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
			<Row xs={1} md={2}>
				<Col className="d-flex justify-content-evenly p-3">
					<Button variant="warning" className="flex-fill">
						Edit
					</Button>
					<Button variant="danger" className="flex-fill" onClick={handleDelete}>
						Delete
					</Button>
				</Col>
			</Row>
			<SingleCustomerFiles
				customer={customer}
				setCustomer={setCustomer}
				fetchCustomer={fetchCustomer}
			/>
		</DashboardWrapper>
	);
};
export default CustomerDetail;
