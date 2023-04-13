import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { isAuthorized, getAuth } from "../handlers/AuthHandler.jsx";
import {
	templateCustomer,
	getAllCustomers,
	getTotalCustomerCount,
} from "../api/CustomerAPI";

import DashboardWrapper from "../components/dashboard/DashboardWrapper.jsx";
import CustomerTable from "../components/customers/CustomerTable.jsx";
import CustomerPagination from "../components/customers/Pagination.jsx";
import SearchBar from "../components/customers/SearchBar.jsx";
import NewCustomer from "../components/customers/NewCustomer.jsx";

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
			fetchCustomers();
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
			<Container fluid="md">
				<Row>
					<h1>Customers</h1>
				</Row>
				<Row className="mt-4">
					<Col>
						<SearchBar
							searchParams={searchParams}
							setSearchParams={setSearchParams}
						/>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<NewCustomer fetchCustomers={fetchCustomers} />
					</Col>
					<Col className="d-flex justify-content-end">
						<CustomerPagination
							totalPages={totalPages}
							searchParams={searchParams}
							setSearchParams={setSearchParams}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<CustomerTable customers={customers} />
				</Row>
				<Row className="">
					<Col>
						<CustomerPagination
							totalPages={totalPages}
							searchParams={searchParams}
							setSearchParams={setSearchParams}
						/>
					</Col>
				</Row>
			</Container>
		</DashboardWrapper>
	);
};
export default Customers;
