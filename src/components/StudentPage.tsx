import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { UserType,User  } from '../data/types';
import GetCoursesOfStudent from './GetCoursesOfStudent';

interface StudentPageProps {
    user: User;
  }

const StudentPage = () => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
        return null;
    }
    const user = JSON.parse(loggedInUser);
    if (user.type !== UserType.Student) {
        return (
        <div className="access-denied">
            <h1>Access Denied</h1>
            <p>Sorry, you do not have permission to access this page.</p>
        </div>
        );
    }
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
          <h1 className="mb-4">Welcome {user.name}</h1>
          <div className="d-flex flex-column align-items-center">
            <Link to="/GetCoursesOfStudent" className="mb-3">
              <button className="btn btn-primary btn-lg">Show Courses</button>
            </Link>
            <Link to="/grades" className="mb-3">
              <button className="btn btn-primary btn-lg">Show Grades in Course</button>
            </Link>
          </div>
        </div>
      );
  };
  
  export default StudentPage;