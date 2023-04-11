import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginWrapper from "../components/LoginWrapper.jsx";
import SignupForm from "../components/SignupForm.jsx";

const SignUp = ({ auth, setSignupSuccessful }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/");
		}
	});

	return (
		<LoginWrapper>
			<SignupForm setSignupSuccessful={setSignupSuccessful} />
		</LoginWrapper>
	);
};
export default SignUp;
