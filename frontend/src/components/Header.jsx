import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image,
} from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaPersonShelter, FaPersonBreastfeeding } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  // admin
  const renderAdminLinks = () => {
    if (userInfo && userInfo.role === "admin") {
      return (
        <>
          <LinkContainer to="/agent-company">
            <Nav.Link active={location.pathname === "/agent-company"}>
              Agent Company
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/agent-list">
            <Nav.Link>Agent List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/banned">
            <Nav.Link>Banned</Nav.Link>
          </LinkContainer>
        </>
      );
    }
  };
  // agent company
  const renderAgentCompanyLinks = () => {
    if (userInfo && userInfo.role === "agentCompany") {
      return (
        <>
          <LinkContainer to="/add-agent">
            <Nav.Link>Add Agent</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/myagents">
            <Nav.Link active={location.pathname === "/myagents"}>
              My Agents
            </Nav.Link>
          </LinkContainer>
        </>
      );
    }
  };
  // users
  const renderMoneyLendingLinks = () => {
    if (
      userInfo &&
      (userInfo.role === "moneyLendingCompany" ||
        userInfo.role === "moneyLendingIndividual")
    ) {
      return (
        <>
          <LinkContainer to="/agent-list">
            <Nav.Link>Subscripton</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/report-agent">
            <Nav.Link>Report Agent</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/report-agent-company">
            <Nav.Link>Report Agent Company</Nav.Link>
          </LinkContainer> */}
        </>
      );
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Fraudulent</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {renderAdminLinks()}
                  {renderAgentCompanyLinks()}
                  {renderMoneyLendingLinks()}
                  <NavDropdown
                    // title={userInfo.name}
                    // title={`${userInfo.name} - ${userInfo.role}`}
                    title={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {userInfo.avatar ? (
                          <Image
                            src={userInfo.avatar}
                            rounded
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "5px",
                            }}
                          />
                        ) : (
                          <FaPersonShelter style={{ marginRight: "5px" }} />
                        )}
                        {`${userInfo.name} - ${userInfo.role}`}
                      </div>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
