const Landing = ({ auth, handleLogIn }) => {
	return (
		<>
			<p>Landing</p>
			<div>
				<a href="https://www.element3.tech" rel="noreferrer" target="_blank">
					<img src="/e3-logo.png" className="logo" alt="" />
				</a>
			</div>
			<button
				onClick={() =>
					handleLogIn({ email: "test_email", password: "password" })
				}
			>
				Log In
			</button>
		</>
	);
};

export default Landing;
