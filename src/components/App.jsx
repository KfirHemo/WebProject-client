import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManagerPage from './ManagerPage';
import ManageUsers from './ManageUsers';
import ManageCourses from './ManageCourses';
import { checkUserExists } from '../data/apiService';
import '../styles/App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  const handleLogout = () => {
    setUser();
    setUsername("");
    setPassword("");
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(JSON.parse(foundUser));
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };

    // Send the username and password to the server
    let foundUser;
    try {
      const res = await checkUserExists(username, password);
      if (res)
        foundUser = res.data;
    } catch (e) {
      alert(e.response.data);
    }
    // set the state of the user

    //const foundUser = DB.filter(u => u.username === user.username && u.password === user.password);
    if (foundUser) {
      setUser(foundUser);
      // store the user in localStorage
      localStorage.setItem('user', JSON.stringify(foundUser));//response.data)
      console.log(foundUser);//response.data)
      await handleNavigation(foundUser);
    }
  };
  const navigate = useNavigate()

  const handleNavigation = async (user) => {
    switch (user.type) {
      case 'Manager':
        navigate('/manager');
        break;
      default:
        navigate('/');
        break;
    }
  }

  // if there's a user show the message below
  if (user) {
    return (
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
        <div className="fixed-top d-flex align-items-center justify-content-between bg-primary text-white p-2">
          <div>{user.name} is logged in</div>
          <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mt-3 pt-5">
          <Routes>
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/courses" element={<ManageCourses />} />
          </Routes>
        </div>
      </div>
    );
  }
  // if there's no user, show the login form
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-3">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
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
