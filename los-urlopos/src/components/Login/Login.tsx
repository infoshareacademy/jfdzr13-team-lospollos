import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import image from "../../images/lps2.png";
import styles from "./Login.module.css";

const Login = () => {
  const { login, authUser } = useAuth();
  const [unsuccessLogin, setUnsuccessLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/settings");
    }
  }, [authUser, navigate]);

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
    <div className={styles.loginPanelWrapper}>
      <div className={styles.loginWrapper}>
        <div className={styles.contentCont}>
          <div className={styles.loginContent}>
            <h2 className={styles.loginH2}>Login</h2>
            <span
              className={`${styles.loginError} ${
                unsuccessLogin ? styles.loginErrorVisible : ""
              }`}
            >
              Login failed - invalid email or password
            </span>
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.inputsCont}>
                <label className={styles.emailLabel}>
                  Email
                  <input
                    className={styles.labelInput}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </label>
                <label className={styles.passwordLabel}>
                  Password
                  <input
                    className={styles.passwordInput}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </label>
              </div>
              <div className={styles.btnCont}>
                <button
                  className={styles.loginBtn}
                  type="submit"
                  formMethod="POST"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.imageCont}>
          <img src={image} className={styles.loginImage} alt="Work from home" />
        </div>
      </div>
    </div>
  );
};

export default Login;
