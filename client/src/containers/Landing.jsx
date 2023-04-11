import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Landing = ({ auth, handleLogIn }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/home");
		}
	});

	return (
		<>
			<p>Landing</p>
			<div>
				<a href="https://www.element3.tech" rel="noreferrer" target="_blank">
					<img src="/e3-logo.png" className="logo" alt="" />
				</a>
			</div>
			<Link to="/login">Log In</Link>
			<br />
			<Link to="/signup">Sign up</Link>
		</>
	);
};

export default Landing;
