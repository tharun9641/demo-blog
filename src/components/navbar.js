import { Link } from "react-scroll";
import "../stylesheet/navbar.css";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "./context";
import { auth, googleAuth } from "../firebase-config";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const { ShowLogin, ShowAdd } = useContext(UserContext);

  const Logout = async () => {
    await signOut(auth, googleAuth).then(console.log("logout!"));
  };
  return (
    <div>
      <Container>
        <Row className="navbar">
          <Col>
            {auth?.currentUser?.displayName ? (
              <div className="div-login-nav">
                <div className="div-add"></div>
                <p className="div-welcome">
                  {" "}
                  Welcome {auth?.currentUser?.displayName}{" "}
                </p>
                <span>
                  <a href="/" onClick={Logout}>
                    Logout
                  </a>
                </span>
              </div>
            ) : (
              <div className="div-login-nav">
                {auth.currentUser ? (
                  <div className="div-add"></div>
                ) : (
                  <div className="div-add">
                    <Link to="new" onClick={ShowAdd} smooth={true} spy={true}>
                      +
                    </Link>
                  </div>
                )}
                <p className="div-welcome"> Welcome to the site! </p>
                <span>
                  <Link to="Login" smooth={true} spy={true} onClick={ShowLogin}>
                    Login
                  </Link>
                </span>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default NavBar;
