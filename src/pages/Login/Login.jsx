import Header from "../../components/Header/Header";
import "./Login.scss";
import BeeImage from "../../assets/images/bee.png";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import UserService from "../../services/UserService";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
	const [token, setToken] = useAuth();

	const submit = async (event) => {
		event.preventDefault();

		let email = event.target[0].value;
		let password = event.target[1].value;

		if (!(email && password)) return;

		let res = await UserService.LoginAccount(email, password);

		if (res?.data?.token) setToken(res?.data?.token);
	};

	return (
		<div className="login">
			<Header />
			<section className="login__main-section">
				<img className="login__bee-image" src={BeeImage} alt="" />
				<div className="login__form-wrapper">
					<form onSubmit={submit} className="login__form">
						<h2 className="login__title">Log in</h2>

						<div className="login__form__inputs">
							<Input
								type="email"
								placeholder="Email"
								name="email"
								required
							/>

							<Input
								type="password"
								placeholder="Password"
								name="password"
								required
							/>
						</div>

						<Link
							className="login__form__forgot-password-link"
							to="/forgot-password"
						>
							Forgot your password?
						</Link>

						<Button>Login</Button>

						<div className="login__form__signup-text-wrapper">
							<p>Don’t have an account? </p>

							<Link
								className="login__form__forgot-password-link"
								to="/registration"
							>
								Sign up
							</Link>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}
