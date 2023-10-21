import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";
import NavBar from "./components/NavBar.index";
import SideBar from "./components/SideBar.index";

function App() {
  const {
    state: { mode },
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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

      <SideBar
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer className="flex-end">
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
