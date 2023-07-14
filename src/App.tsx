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
        <Navbar collapseOnSelect expand="md" variant="dark" bg='primary' fixed="top" >
          <NavbarBrand>
            <Link to="/" className="logo-link">
              <img src={require('./logo.png')} alt="Logo" className="logo" />
            </Link>
            <Navbar.Text className="text-light ml-2">Welcome {loggedInUser.name}</Navbar.Text>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Nav style={{ alignItems: 'center', width: 'auto' }}>
              {navData
                .filter((nav) => nav.userType.includes(loggedInUser.type))
                .map((nav) => (
                  <Nav.Link key={nav.link} href={nav.link}>{nav.text}</Nav.Link>
                ))}
              <Nav.Item className="d-md-none">
                <Nav.Link href='/' onClick={handleLogout} className='logout'>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Nav className="d-none d-md-flex" style={{ marginRight: '20px' }} >
            <Nav.Link href='/' onClick={handleLogout} className='logout'>Logout</Nav.Link>
          </Nav>
        </Navbar>
        <div id="content" className="main-container">
          {window.location.pathname === '/' && (
            <div className="welcome-container">
              <h1 className="title">Welcome to Grade Management!</h1>
              <p>Grade Management is a powerful tool for accessing and organizing your academic grades and degree data.</p>
              <p>Our mission is to provide you with a user-friendly interface to effortlessly manage your grades and students.</p>
              <p>Get started now and experience our exceptional interface!</p>

              <div className="btn-group">
              {navData
                .filter((nav) => nav.userType.includes(loggedInUser.type))
                .map((nav) => (
                  <Link to={nav.link} className="mb-3">
                    <Button className="btn btn-primary btn-lg" variant='primary'>{nav.text}</Button>
                  </Link>
                ))}
              </div>
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
    <div id="content" className="login-container">
      <div className="title-container">
        <img className="logo" src={require("./logo.png")} alt="Logo" />
        <h1 className="title">Grade Management</h1>
      </div>
      <h3 className="text-left">Login</h3>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default App;
