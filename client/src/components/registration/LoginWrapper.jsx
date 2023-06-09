const LoginWrapper = ({ children }) => {
	return (
		<div className="container-fluid">
			<div className="row vh-100">
				<div className="col-lg vh-50 md-vh-100">
					<div className=" d-flex flex-column justify-content-center align-content-center align-items-center h-100">
						<div>
							<img src="e3-logo.png" />
						</div>
						<div className="w-100 pt-xl-4 pt-2 px-md-5">
							<h2>Go & React EL3 Full Stack Demo</h2>
							{children}
						</div>
					</div>
				</div>
				<div className="col-lg bg-light vh-50 lg-vh-100 d-none d-lg-block"></div>
			</div>
		</div>
	);
};
export default LoginWrapper;
