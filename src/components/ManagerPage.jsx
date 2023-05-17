import React from 'react';
import {Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManagerPage = () => {
  const loggedInUser = localStorage.getItem("user");
  // if user is not logged in and tried to navigate to this page, don't display
  if(!loggedInUser){
    return;
  }
  const user = JSON.parse(loggedInUser);
  if (user.type !== 'Manager') {
    return (
      <div className="access-denied">
        <h1>Access Denied</h1>
        <p>Sorry, you do not have permission to access this page.</p>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">Welcome {user ? user.name : "Blank"}</h1>
      <div className="d-flex flex-column align-items-center">
        <Link to="/users" className="mb-3">
          <button className="btn btn-primary btn-lg">Manage Users</button>
        </Link>
        <Link to="/courses">
          <button className="btn btn-primary btn-lg">Manage Courses</button>
        </Link>
      </div>

    </div>
  );

}
export default ManagerPage;
