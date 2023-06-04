import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import ManageUsers from './ManageUsers';
import ManageCourses from './ManageCourses';
import { checkUserExists } from '../data/apiService';
import '../styles/App.css';
import { User } from '../data/types';
import { navData } from '../lib/navData';
import TeacherPage from './TeacherPage';
const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    localStorage.clear();
    setLoggedInUser(undefined);
    navigate('/');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser) as User;
      setLoggedInUser(foundUser);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };

    let foundUser;
    try {
      const res = await checkUserExists(username, password);
      if (res) foundUser = res.data;
    } catch (e) {
      alert((e as Error).message);
    }

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setLoggedInUser(foundUser);
      navigate('/');
    }
  };

  const navigate = useNavigate();

  if (loggedInUser) {
    return (
      <>
        <Navbar collapseOnSelect style={{ position: "sticky" }} expand="md" bg="primary" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <span className="text-light ml-2">Welcome {loggedInUser.name}</span>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" navbarScroll>
                {navData
                  .filter((nav) => nav.userType.includes(loggedInUser.type))
                  .map((nav) => (
                    <Nav.Link key={nav.link} href={nav.link}>{nav.text}</Nav.Link>
                  ))}
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/courses" element={<ManageCourses />} />
          <Route path="/grades" element={<TeacherPage />} />
        </Routes>
      </>

    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-3">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
