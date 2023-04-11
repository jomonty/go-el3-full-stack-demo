import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogInForm from "../components/LogInForm";

const LogIn = ({ auth, handleLogIn }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/home");
		}
	});

	return (
		<div className="container-fluid">
			<div className="row vh-100">
				<div className="col-md vh-50 md-vh-100">
					<div className=" d-flex flex-column justify-content-center align-content-center align-items-center h-100">
						<div>
							<img src="e3-logo.png" />
						</div>
						<div className="w-100 pt-xl-4 pt-2 px-md-5">
							<LogInForm handleLogIn={handleLogIn} />
						</div>
					</div>
				</div>
				<div className="col-md bg-light vh-50 md-vh-100 d-none d-md-block"></div>
			</div>
		</div>
	);
};
export default LogIn;
