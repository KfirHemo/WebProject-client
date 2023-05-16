import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManagerPage from './ManagerPage';
import ManageUsers from './ManageUsers';


const App = () => {
  const DB = [
    { role: "manager", username: "man", password: "1234" },
    { role: "teacher", username: "teach1", password: "4532" },
    { role: "teacher", username: "teach2", password: "235wd" },
    { role: "student", username: "stu1", password: "12345" },
    { role: "student", username: "stu2", password: "12343" },
  ];

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
      // send the username and password to the server
      /*const response = await axios.post(
        "http://blogservice.herokuapp.com/api/login",
        user
      );*/
      // set the state of the user
      //setUser(response.data)
      const foundUser = DB.filter(u => u.username === user.username && u.password === user.password);
      if (foundUser.length) {
        setUser(foundUser[0]);
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify(foundUser[0]));//response.data)
        console.log(foundUser);//response.data)
        await handleNavigation(foundUser);
      }
      else {
        console.log(`${user.username} not found`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const navigate = useNavigate()

  const handleNavigation = async (user) => {
    switch (user[0].role) {
      case 'manager':
        navigate('/manager');
        break;
      case 'teacher':
      case 'student':
        break;
    }
  }


  // if there's a user show the message below
  if (user) {
    return (
      <div class="fixed-top fixed-right border p-3">
        <div class="mb-3">{user.username} is logged in</div>
        <button class="btn btn-primary" onClick={handleLogout}>Logout</button>
        <Routes>
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/users" element={<ManageUsers />} />
        </Routes>
      </div>
    );
  }
  // if there's no user, show the login form
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
