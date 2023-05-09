import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
// m for margin  me : margin end   , ms : magin start 
const Header = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();
    const Logout = () => {
      removeAuthUser();
      navigate("/");
    };
  
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link className="nav-link" to={"/"}>
                Jop App
              </Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link className="nav-link" to={"/"}>
                List Jops
              </Link>
  
              {/* unAuthenticated Route  */}
              {!auth && (
                <>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </>
              )}
  
              {/* Admin Routes  */}
  
              {auth && auth.type === 1 && (
                <>
                  <Link className="nav-link" to={"/manage-jops"}>
                    Manage Jops
                  </Link>
                  <Link className="nav-link" to={"/manage-app"}>
                    Manage Users
                  </Link>
                  <Link className="nav-link" to={"/AppReq"}>
                    Applicant Request
                  </Link>
                  <Link className="nav-link" to={"/history"}>
                    History Request
                  </Link>
                </>
              )}
            </Nav>
  
            <Nav className="ms-auto">
              {/* Authenticated Routes  */}
              {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  };
  
  export default Header;