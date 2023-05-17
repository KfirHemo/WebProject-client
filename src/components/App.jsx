import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManagerPage from './ManagerPage';
import axios from 'axios';
import ManageUsers from './ManageUsers';
import '../styles/App.css';
import { AxiosResponse, AxiosError } from 'axios'

const App = () => {
  // const DB = [
  //   { role: "manager", username: "man", password: "1234" },
  //   { role: "teacher", username: "teach1", password: "4532" },
  //   { role: "teacher", username: "teach2", password: "235wd" },
  //   { role: "student", username: "stu1", password: "12345" },
  //   { role: "student", username: "stu2", password: "12343" },
  // ];

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
    try {
      e.preventDefault();
    const user = { username, password };

    // Send the username and password to the server
    
    let foundUser;
    const response = await axios.get("https://localhost:7187/CheckUserLogin?username=" + username +"&password=" + password).then((response) => {
       foundUser = response.data;
    }).catch((e) => {
      alert("Connection error")
    });
   
    
      // set the state of the user
      
      //const foundUser = DB.filter(u => u.username === user.username && u.password === user.password);
      if (foundUser) {
        setUser(foundUser);
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));//response.data)
        console.log(foundUser);//response.data)
        await handleNavigation(foundUser);
      }
      else {
        alert("Invalid login details")
      }
    } catch (e) {
      console.log(e);
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
          <div>{user.username} is logged in</div>
          <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mt-3 pt-5">
          <Routes>
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/users" element={<ManageUsers />} />
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
