import Pagination from "react-bootstrap/Pagination";

const CustomerPagination = ({ searchParams, totalPages, setSearchParams }) => {
	const handlePageClick = (updatedPage) => {
		const updatedSearchParams = { ...searchParams };
		updatedSearchParams.page = updatedPage;
		setSearchParams(updatedSearchParams);
	};

	const currentPage = searchParams ? searchParams.page : 1;

	const paginationItems = Array.from({ length: totalPages }).map((_, index) => {
		const pageNum = index + 1;
		return (
			<Pagination.Item
				key={index}
				active={pageNum === currentPage}
				onClick={() => handlePageClick(pageNum)}
			>
				{pageNum}
			</Pagination.Item>
		);
	});
	return <Pagination>{paginationItems}</Pagination>;
};
export default CustomerPagination;
