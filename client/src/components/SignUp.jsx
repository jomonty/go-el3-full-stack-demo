const SignUp = () => {
	return (
		<div>
			<form>
				<label htmlFor="username">
					<p>Username: </p>
					<input id="username" name="username" type="text" />
				</label>
				<label htmlFor="email">
					<p>Email: </p>
					<input id="email" name="email" type="text" />
				</label>
				<label htmlFor="password">
					<p>Password</p>
					<input id="password" name="password" type="password" />
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
