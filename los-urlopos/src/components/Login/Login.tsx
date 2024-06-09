import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

const Login = () => {
  const { login, authUserId } = useAuth();
  const [unsuccessLogin, setUnsuccessLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUserId) {
      navigate("/");
    }
  }, [authUserId, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      setUnsuccessLogin(false);
    } catch (error) {
      setUnsuccessLogin(true);
      event.currentTarget.reset();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {unsuccessLogin && <span>Login failed - invalid email or password</span>}
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit" formMethod="POST">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
