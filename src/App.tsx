import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";
import { useGetCategoriesQuery } from "./hooks/productHooks";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { getError } from "./utils";
import { ApiError } from "./types/ApiError";
import SearchBox from "./components/SearchBox";
import NavBar from "./components/NavBar.index";

function App() {
  const {
    state: { mode, userInfo },
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />

      <NavBar
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />

      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={userInfo ? `/profile` : `/signin`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
              </span>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categories</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
