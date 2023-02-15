import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTodo from "./components/add-todo";
import TodosList from "./components/todos-list";
import Signup from "./components/signup";
import Login from "./components/login";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import TodoDataService from "./services/todos_data_service";

function App() {
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [error, setError] = React.useState("");

  async function login(user = null) {
    TodoDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
        console.log(`${user.username} login success!`);
      })
      .catch((e) => {
        console.log("login", e);
        setError(e.toString());
      });
  }
  async function logout() {
    setToken("");
    setUser("");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }

  async function signup(user = null) {
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
        console.log(`${user.username} signup success!`);
      })
      .catch((e) => {
        console.log("signup", e);
        setError(e.toString());
      });
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Link class="nav-link" to={"/todos"}>
              Todos
            </Link>{" "}
            {user ? (
              <Link class="nav-link" onClick={logout}>
                Logout ({user})
              </Link>
            ) : (
              <>
                <Link class="nav-link" to={"/login"}>
                  Login
                </Link>{" "}
                <Link class="nav-link" to={"/signup"}>
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodosList token={token} />} />
          <Route path="/todos" element={<TodosList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />} />
          <Route
            path="/todos/:id"
            element={<AddTodo state={"ss"} token={token} />}
          />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright -{" "}
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://www.linkedin.com/in/rongde-yu-282193135/"
          >
            Rongde Yu
          </a>{" "}
        </div>{" "}
      </footer>
    </div>
  );
}

export default App;
