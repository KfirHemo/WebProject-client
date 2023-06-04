import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { studentDataOperations } from '../data/student';
import { Course, User, UserType } from '../data/types';

const GetCoursesOfStudent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await studentDataOperations.getCoursesOfStudent(6);
        if (!fetchedCourses || fetchedCourses.status !== 200 || !fetchedCourses.data) {
          console.error('Error when getting courses.');
          return;
        }
        setCourses(fetchedCourses.data);
      } catch (error) {
        console.error(`Error when getting courses: ${error}`);
      }
    };

    fetchCourses();
  }, []);import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { studentDataOperations } from '../data/student';
import { Course } from '../data/types';

const GetCoursesOfStudent = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await studentDataOperations.getCoursesOfStudent(6);
        if (!fetchedCourses || fetchedCourses.status !== 200 || !fetchedCourses.data) {
          console.error('Error when getting courses.');
          return;
        }
        setCourses(fetchedCourses.data);
      } catch (error) {
        console.error(`Error when getting courses: ${error}`);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1>Student Courses</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetCoursesOfStudent;


  return (
    <div className="container">
      <h1>Student Courses</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetCoursesOfStudent;
