import { useState } from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
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
			<Stack direction="horizontal" gap={3}>
				<Form.Control
					type="text"
					value={searchText}
					placeholder="Search by last name"
					onChange={handleFormChange}
				/>
				<Button variant="secondary" type="submit">
					Search
				</Button>
			</Stack>
		</Form>
	);
};
export default SearchBar;
