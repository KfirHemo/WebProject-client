import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManagerPage from './ManagerPage';
import ManageUsers from './ManageUsers';
import ManageCourses from './ManageCourses';
import { checkUserExists } from '../data/apiService';
import '../styles/App.css';
import { User, UserType } from '../data/types';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | undefined>();

  const handleLogout = () => {
    setUser(undefined);
    setUsername('');
    setPassword('');
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser) as User;
      setUser(foundUser);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      await handleNavigation(foundUser);
    }
  };

  const navigate = useNavigate();

  const handleNavigation = async (user: User) => {
    switch (user.type) {
      case UserType.Manager:
        navigate('/manager');
        break;
      default:
        navigate('/');
        break;
    }
  };

  if (user) {
    return (
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
        <div className="fixed-top d-flex align-items-center justify-content-between bg-primary text-white p-2">
          <div>{user.name} is logged in</div>
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
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
