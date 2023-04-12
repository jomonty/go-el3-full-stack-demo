import { useState } from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SearchBar = ({ searchParams, setSearchParams }) => {
	const [searchText, setSearchText] = useState("");

	const handleFormChange = (event) => {
		let updatedSearchText = { ...searchText };
		updatedSearchText = event.target.value;
		setSearchText(updatedSearchText);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const updatedSearchParams = { ...searchParams };
		updatedSearchParams.lastName = searchText;
		setSearchParams(updatedSearchParams);
	};

	return (
		<Form onSubmit={handleFormSubmit}>
			<InputGroup>
				<FloatingLabel controlId="searchInput" label="Search by last name">
					<Form.Control
						type="text"
						value={searchText}
						placeholder="some text"
						onChange={handleFormChange}
					/>
				</FloatingLabel>
				<Button variant="secondary" type="submit">
					Search
				</Button>
			</InputGroup>
		</Form>
	);
};
export default SearchBar;
