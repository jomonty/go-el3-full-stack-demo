import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

const SingleCustomerDetail = ({ customer }) => {
	const StyledRow = ({ children }) => {
		return (
			<Row xs={2} md={4}>
				{children}
			</Row>
		);
	};
	const StyledCol = ({ children }) => {
		return <Col className=" border-bottom">{children}</Col>;
	};
	const StyledP = ({ children }) => {
		return <p className="m-3">{children}</p>;
	};
	const handleDate = (strDate) => {
		const date = new Date(strDate);
		return date.toLocaleDateString();
	};
	return (
		<Container>
			<Row className="mb-5">
				<h1>
					{customer.first_name} {customer.last_name}
				</h1>
			</Row>
			<StyledRow className="bg-light border">
				<StyledCol>
					<StyledP>ID: </StyledP>
				</StyledCol>
				<StyledCol>
					<StyledP>{customer.id}</StyledP>
				</StyledCol>
			</StyledRow>
			<StyledRow>
				<StyledCol>
					<StyledP>Created At: </StyledP>
				</StyledCol>
				<StyledCol>
					<StyledP>{handleDate(customer.created_at)}</StyledP>
				</StyledCol>
			</StyledRow>
			<StyledRow>
				<StyledCol>
					<StyledP>Email: </StyledP>
				</StyledCol>
				<StyledCol>
					<StyledP>{customer.email}</StyledP>
				</StyledCol>
			</StyledRow>
			<StyledRow>
				<StyledCol>
					<StyledP>Telephone: </StyledP>
				</StyledCol>
				<StyledCol>
					<StyledP>{customer.phone_number}</StyledP>
				</StyledCol>
			</StyledRow>
			<StyledRow>
				<StyledCol>
					<StyledP>Date of Birth: </StyledP>
				</StyledCol>
				<StyledCol>
					<StyledP>{handleDate(customer.date_of_birth)}</StyledP>
				</StyledCol>
			</StyledRow>
		</Container>
	);
};
export default SingleCustomerDetail;
