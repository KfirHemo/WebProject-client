import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { User, Course, Grade, UserType } from '../data/types';
import { teacherDataOperations } from '../data/teacher';
import { studentDataOperations } from '../data/student';
import '../styles/TeacherPage.css';
import ConfirmModal from './ConfirmModal';

const TeacherPage: React.FC = () => {
    const [loggedInTeacher, setLoggedInTeacher] = useState<User | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course>({ id: -1, name: '' });
    const [selectedStudent, setSelectedStudent] = useState<User>({ id: -1, name: '', type: UserType.Student, password: '' });
    const [studentsInCourse, setStudentsInCourse] = useState<User[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [newGrade, setNewGrade] = useState<number>(0);
    const [newGradeDescription, setNewGradeDescription] = useState<string>('');
    const [gradeToRemove, setGradeToRemove] = useState<Grade | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [viewMode, setViewMode] = useState<'courses' | 'students' | 'grades'>('courses');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        // Fetch logged-in user from local storage
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setLoggedInTeacher(user);
        }
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!loggedInTeacher) return;
            try {
                const response = await teacherDataOperations.getCoursesOfTeacher(loggedInTeacher.id);
                const courses = response.data;
                setCourses(courses);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, [loggedInTeacher]);

    useEffect(() => {
        if (selectedCourse.id !== -1 && loggedInTeacher) {
            fetchStudentsInCourse(loggedInTeacher, selectedCourse);
        }
    }, [loggedInTeacher, selectedCourse]);

    useEffect(() => {
        if (selectedStudent.id !== -1) {
            fetchGradesForStudent(selectedStudent);
        }
    }, [selectedStudent]);

    const handleDeleteConfirmation = (grade: Grade) => {
        setGradeToRemove(grade);
        setShowDeleteModal(true);
    };

    const fetchStudentsInCourse = async (teacher: User, course: Course) => {
        try {
            const response = await teacherDataOperations.getStudentsInCourse(teacher.id, course.id);
            const students = response.data;
            setStudentsInCourse(students);
            setSelectedStudent({ id: -1, name: '', type: UserType.Student, password: '' });
            setGrades([]);
            setViewMode('students');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGradesForStudent = async (student: User) => {
        if (!selectedCourse)
            return;
        try {
            const response = await studentDataOperations.getGradesOfStudentInCourse(student.id, selectedCourse?.id);
            const grades = response.data;
            setGrades(grades);
            setViewMode('grades');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        setViewMode('students');
    };

    const handleStudentSelect = (student: User) => {
        setSelectedStudent(student);
        setViewMode('grades');
    };

    const handleAddGrade = async () => {
        if (selectedStudent && selectedCourse) {
            try {
                await teacherDataOperations.addGradeForStudent(
                    selectedStudent.id,
                    selectedCourse.id,
                    newGrade,
                    newGradeDescription
                );
                fetchGradesForStudent(selectedStudent);
                setNewGrade(0);
                setNewGradeDescription('');
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRemoveGrade = async () => {
        if (selectedStudent && selectedCourse && gradeToRemove) {
            try {
                await teacherDataOperations.removeGradeForStudent(selectedStudent.id, selectedCourse.id, gradeToRemove.description || '');
                fetchGradesForStudent(selectedStudent);
            } catch (error) {
                console.error(error);
            }
            finally {
                setShowDeleteModal(false);
            }
        }
    };

    const handleBack = () => {
        if (viewMode === 'students') {
            setViewMode('courses');
        } else if (viewMode === 'grades') {
            setViewMode('students');
        }
    };

    if (!loggedInTeacher)
        return <></>;
    if (![UserType.Manager, UserType.Teacher].includes(loggedInTeacher.type)) {
        return (
            <div className="access-denied">
                <h1>Access Denied</h1>
                <p>Sorry, you do not have permission to access this page.</p>
            </div>
        );
    }

    return (
        <div className="container d-flex flex-column">
            <Container fluid>
                <h1 className="mb-4 text-center">Manage Grades</h1>
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

                {viewMode === 'students' && (
                    <Row>
                        <Col xs={12} className='narrow-list'>
                            <Button variant="secondary" className="mb-3" onClick={handleBack}>
                                <BsArrowLeft className="mr-2" />
                            </Button>
                            <h3>Students in course: {selectedCourse.name}</h3>
                            <ListGroup className="mb-3 list-scrollable">
                                {studentsInCourse.length > 0 ? (
                                    studentsInCourse.map((student) => (
                                        <ListGroup.Item
                                            key={student.id}
                                            action
                                            onClick={() => handleStudentSelect(student)}
                                            active={selectedStudent && selectedStudent.id === student.id}
                                            className="cursor-pointer"
                                        >
                                            {student.name}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p>No students found in this course.</p>
                                )}
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
                            <h3>Grades for student: {selectedStudent.name}</h3>

                            <ListGroup className="mb-3 list-scrollable ">
                                {grades.length > 0 ? (
                                    grades.map((grade) => (
                                        <ListGroup.Item key={grade.id} className="grade-item">
                                            <Col>
                                                <strong className="grade-description">{grade.description}</strong>
                                            </Col>
                                            <Col>
                                                Grade:
                                                <span
                                                    className={`grade-score ${grade.score >= 55 ? 'text-success' : 'text-danger'}`}
                                                >
                                                    {grade.score}
                                                </span>
                                            </Col>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteConfirmation(grade)}>
                                                Remove
                                            </Button>
                                        </ListGroup.Item>

                                    ))
                                ) : (
                                    <p>No grades found for this student.</p>
                                )}
                            </ListGroup>
                            <Form className="mt-3 mb-3">
                                <Form.Group>
                                    <Form.Label className='mb-3'>Add Grade</Form.Label>
                                    <Row className="align-items-center">
                                        <Col xs={12} sm={3} className="mb-2 mb-sm-0">
                                            <Form.Control
                                                type="number"
                                                placeholder="Grade"
                                                value={newGrade}
                                                onChange={(e) => setNewGrade(parseInt(e.target.value))}
                                                min={0}
                                                max={100} />
                                        </Col>
                                        <Col xs={12} sm={6} className="mb-2 mb-sm-0">
                                            <Form.Control
                                                type="text"
                                                placeholder="Description"
                                                value={newGradeDescription}
                                                onChange={(e) => setNewGradeDescription(e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} sm={3}>
                                            <Button variant="primary" onClick={handleAddGrade} className="w-100">
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                )}
            </Container>
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveGrade}
                confirmationText={`Are you sure you want to remove the grade for ${gradeToRemove?.description}?`}
            />
        </div>
    );
};

export default TeacherPage;
