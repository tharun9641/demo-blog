import { Container, Row, Col } from "react-bootstrap";
import "../stylesheet/login.css";
import { useContext, useState } from "react";
import { auth, googleAuth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { UserContext } from "./context";

const Login = () => {
  const { ShowLogin, getUserName, SetUser } = useContext(UserContext);
  const [getTab, setTab] = useState(true);
  const [getvalidation, setValidation] = useState(true);
  const [getInput, setInput] = useState({
    username: "",
    password: "",
  });

  const SwitchTab = (e) => {
    if (e.target.id === "Login") {
      setTab(true);
    } else {
      setTab(false);
    }
  };
  const handleChange = (e) => {
    setInput({ ...getInput, [e.target.id]: e.target.value });
  };

  const checkPassword = (e) => {
    if (getInput.password === e.target.value) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const SignInWithMail = async () => {
    const userCreds = await signInWithEmailAndPassword(
      auth,
      getInput.username,
      getInput.password
    );
    SetUser({ ...getUserName, email: userCreds.email });
    ShowLogin();
  };

  const CreateUser = async () => {
    await createUserWithEmailAndPassword(
      auth,
      getInput.username,
      getInput.password
    )
      .then(console.log("User Created!"))
      .catch(console.log("Error occured!"));
  };

  const LoginWithGoogle = async () => {
    await signInWithPopup(auth, googleAuth).then((res) => {
      SetUser({
        ...getUserName,
        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
      });
      ShowLogin();
    });
  };

  return (
    <div id="Login" className="login-conatiner">
      <div className="login-border">
        <div className="login-header">
          <div id="Login" onClick={SwitchTab}>
            Log in
          </div>
          <div id="Signup" onClick={SwitchTab}>
            Sign Up
          </div>
        </div>
        {getTab ? (
          <div className="login-form-container">
            <Container>
              <Row>
                <Col>
                  <label>Username : </label>
                </Col>
                <Col>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Password:</label>
                </Col>
                <Col>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <br></br>
                <div className="justify-button">
                  <button onClick={SignInWithMail}>Login</button>
                  <button onClick={LoginWithGoogle}>Login with Google</button>
                </div>
                <br></br>
                <div className="justify-button">
                  <button>Reset Password</button>
                </div>
              </Row>
            </Container>
          </div>
        ) : (
          <div className="login-form-container">
            <Container>
              <Row>
                <Col>
                  <label>First Name : </label>
                </Col>
                <Col>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Last Name : </label>
                </Col>
                <Col>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>email : </label>
                </Col>
                <Col>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Password : </label>
                </Col>
                <Col>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Confirm Password : </label>
                </Col>
                <Col>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    onBlur={checkPassword}
                    required
                  />
                </Col>
                {!getvalidation && (
                  <div className="danger">Password does not match.</div>
                )}
              </Row>
              <Row>
                <br></br>
                <div className="justify-button">
                  <button onClick={CreateUser}>Sign Up</button>
                </div>
                <p style={{ textAlign: "center", padding: 0 }}>Or</p>
                <div className="justify-button">
                  <button onClick={CreateUser}>Sign Up with Google</button>
                </div>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
