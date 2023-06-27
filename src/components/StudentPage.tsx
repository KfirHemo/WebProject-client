import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { UserType,User, Course, Grade  } from '../data/types';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { studentDataOperations } from '../data/student';


const StudentPage  = () => {
    const[student,setStudent] = useState<User>();  
    const [grades, setGrades] = useState<Grade[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course>({ id: -1, name: '' });
    const [courses, setCourses] = useState<Course[]>([]);
    const [viewMode, setViewMode] = useState<'courses' | 'students' | 'grades'>('courses');
    
    useEffect(() => {
      // Fetch logged-in student from local storage
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
          const student = JSON.parse(loggedInUser);
          setStudent(student);
      }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
        if (!student) return;
        studentDataOperations.getCoursesOfStudent(student.id).then(courses => setCourses(courses));

    };
    fetchCourses();
}, [student]);

useEffect(() => {
  if (selectedCourse.id !== -1 && student) {
    fetchGradesForStudent();
  }
}, [selectedCourse, student]);


    const fetchGradesForStudent = async () => {
      if (!selectedCourse || !student)
          return;
      try {
          studentDataOperations.getGradesOfStudentInCourse(student.id, selectedCourse?.id)
          .then((grades)=> setGrades(grades));
          setViewMode('grades');
      } catch (error) {
          console.error(error);
      }
  };
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setViewMode('grades');
  };
  const handleBack = () => {
    if (viewMode === 'grades') {
      setViewMode('courses');
    } 
  };
  
  if (!student)
        return <></>;


    if (student.type !== UserType.Student) {
        return (
        <div className="access-denied">
            <h1>Access Denied</h1>
            <p>Sorry, you do not have permission to access this page.</p>
        </div>
        );
    }
    // return (
    //     <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
    //       <h1 className="mb-4">Welcome {student.name}</h1>
    //       <div className="d-flex flex-column align-items-center">
    //         <Link to="/GetCoursesOfStudent" className="mb-3">
    //           <button className="btn btn-primary btn-lg">Show Courses</button>
    //         </Link>
    //         <Link to="/grades" className="mb-3">
    //           <button className="btn btn-primary btn-lg">Show Grades in Course</button>
    //         </Link>
    //       </div>
    //     </div>
    //   );
    return (
      <div className="container d-flex flex-column">
          <Container fluid>
              <h1 className="mb-4 text-center">Courses</h1>
              <hr className="section-separator" />

              {viewMode === 'courses' && (
                  <Row>
                      <Col xs={12} className='narrow-list'>
                          <h3>Courses</h3>
                          <ListGroup className="mb-3 list-scrollable">
                              {courses.map((course) => (
                                  <ListGroup.Item
                                      key={course.id}
                                      action
                                      onClick={() => handleCourseSelect(course)}
                                      active={selectedCourse && selectedCourse.id === course.id}
                                      className="cursor-pointer"
                                  >
                                      {course.name}
                                  </ListGroup.Item>
                              ))}
                          </ListGroup>
                      </Col>
                  </Row>
              )}

              

              {viewMode === 'grades' && (
                <Row>
                  <Col xs={12} className='narrow-list'>
                    <Button variant="secondary" onClick={handleBack}>
                      <BsArrowLeft className="mr-2" />
                    </Button>
                    <h3>Grades for student: {student.name}</h3>

                    <ListGroup className="mb-3 list-scrollable ">
                      {grades.length > 0 ? (
                        grades.map((grade) => (
                          <ListGroup.Item key={grade.id} className="grade-item">
                            <div className="d-flex justify-content-between">
                              
                              <span
                                className={`grade-score ${grade.score >= 55 ? 'text-success' : 'text-danger'}`}
                              >
                                Grade: {grade.score}
                              </span>
                              <span
                                className={"grade-description"}
                              >
                                 Description : {grade.description}
                              </span>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p>No grades found for this student.</p>
                      )}
                    </ListGroup>
                  </Col>
                </Row>
              )}

          </Container>
          
      </div>
  );



  };
  
  export default StudentPage;