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
					<div className=" d-flex justify-content-center align-items-center h-100">
						<div className="flex-fill p-xl-5 m-xl-5 p-lg-4 m-lg-4 p-md-2 m-md-2">
							<LogInForm handleLogIn={handleLogIn} />
						</div>
					</div>
				</div>
				<div className="col-md bg-light vh-50 md-vh-100"></div>
			</div>
		</div>
	);
};
export default LogIn;
