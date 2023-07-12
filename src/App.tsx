import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, NavbarBrand } from 'react-bootstrap';
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ManageUsers from './components/ManageUsers';
import ManageCourses from './components/ManageCourses';
import { User, UserType } from './data/types';
import { navData } from './lib/navData';
import TeacherPage from './components/TeacherPage';
import apiService from './data/apiService';
import StudentPage from './components/StudentPage';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();
  const navigate = useNavigate();

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
    let foundUser;
    try {
      const res = await apiService.get('/CheckUserLogin', { params: { username, password } });
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


  if (loggedInUser) {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" fixed='top'>
          <NavbarBrand>
            <img src={require('./logo.png')} />
            <Navbar.Text className="text-light ml-2">Welcome {loggedInUser.name}</Navbar.Text>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Nav style={{ alignItems: 'center' }}>
              {navData
                .filter((nav) => nav.userType.includes(loggedInUser.type))
                .map((nav) => (
                  <Nav.Link key={nav.link} href={nav.link}>{nav.text}</Nav.Link>
                ))}
              <Button variant="primary" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div id="content" className='ui container'>
          {window.location.pathname === '/' && (
            <div className='btn-group-vertical' style={{ alignItems: 'center' }}>
              <h1 className="mb-4">Welcome {loggedInUser.name}</h1>
              {navData
                .filter((nav) => nav.userType.includes(loggedInUser.type))
                .map((nav) => (
                  <Link to={nav.link} className="mb-3">
                    <button className="btn btn-primary btn-lg">{nav.text}</button>
                  </Link>
                ))}
            </div>
          )}
          <Routes>
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/courses" element={<ManageCourses />} />
            <Route path="/manageGrades" element={<TeacherPage />} />
            <Route path="/student" element={<StudentPage />} />
          </Routes>
        </div>
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
