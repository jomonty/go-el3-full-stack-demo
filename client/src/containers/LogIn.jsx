import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogInForm from "../components/registration/LogInForm";
import LoginWrapper from "../components/registration/LoginWrapper";

const LogIn = ({
	auth,
	handleLogIn,
	signupSuccessful,
	setSignupSuccessful,
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/");
		}
	});

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
