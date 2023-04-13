import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthorized, logIn } from "../handlers/AuthHandler.jsx";

import LogInForm from "../components/registration/LogInForm.jsx";
import LoginWrapper from "../components/registration/LoginWrapper.jsx";

const LogIn = ({ signupSuccessful, setSignupSuccessful }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthorized()) {
			navigate("/");
		}
	});

	const handleLogIn = async (body) => {
		const response = await logIn(body);
		if (response.status === 200) {
			navigate("/");
		}
		return response;
	};

	return (
		<LoginWrapper>
			<LogInForm
				handleLogIn={handleLogIn}
				signupSuccessful={signupSuccessful}
				setSignupSuccessful={setSignupSuccessful}
			/>
		</LoginWrapper>
	);
};
export default LogIn;
