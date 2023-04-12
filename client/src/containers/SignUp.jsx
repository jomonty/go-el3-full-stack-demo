import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginWrapper from "../components/registration/LoginWrapper.jsx";
import SignupForm from "../components/registration/SignupForm.jsx";
import { isAuthorized, register } from "../handlers/AuthHandler.jsx";

const SignUp = ({ setSignupSuccessful }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthorized()) {
			navigate("/");
		}
	});

	const handleRegistration = async (body) => {
		const response = await register(body);
		if (response.status === 201) {
			setSignupSuccessful(true);
			navigate("/login");
		}
		return response;
	};

	return (
		<LoginWrapper>
			<SignupForm
				handleRegistration={handleRegistration}
				setSignupSuccessful={setSignupSuccessful}
			/>
		</LoginWrapper>
	);
};
export default SignUp;
