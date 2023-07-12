import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { User, Course, Grade, UserType } from '../data/types';
import { teacherDataOperations } from '../data/teacher';
import { studentDataOperations } from '../data/student';
import '../styles/ManageGrades.css';
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
    const [gradeToUpdate, setGradeToUpdate] = useState<Grade | null>(null);
    const [updatedScore, setUpdatedScore] = useState<number>(0);
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
            teacherDataOperations.getCoursesOfTeacher(loggedInTeacher.id).then(courses => setCourses(courses));

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

    useEffect(() => {
        if (gradeToUpdate && updatedScore !== gradeToUpdate.score) {
            gradeToUpdate.score = updatedScore;
            handleUpdateGrade().then(() => {
                alert("Score successfully updated!");
            }).catch(
                () => { alert("Score failed to update!"); }
            );
        }
    }, [gradeToUpdate]);

    const handleDeleteConfirmation = (grade: Grade) => {
        setGradeToRemove(grade);
        setShowDeleteModal(true);
    };

    const fetchStudentsInCourse = async (teacher: User, course: Course) => {
        try {
            teacherDataOperations.getStudentsInCourse(teacher.id, course.id)
                .then(students => setStudentsInCourse(students));

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
            studentDataOperations.getGradesOfStudentInCourse(student.id, selectedCourse?.id)
                .then(grades => setGrades(grades));

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
    const handleUpdateGrade = async () => {
        if (selectedStudent && selectedCourse && gradeToUpdate) {
            try {
                await teacherDataOperations.updateGradeForStudent(selectedStudent.id, selectedCourse.id, gradeToUpdate.score, gradeToUpdate.description || '');
                fetchGradesForStudent(selectedStudent);
            } catch (error) {
                console.error(error);
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
        <>
            <h1 className="mb-4 text-center">Manage Grades</h1>
            <Container fluid>
                {viewMode === 'courses' && (
                    <>
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
                        </ListGroup></>
                )}

                {viewMode === 'students' && (
                    <>
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
                        </ListGroup></>
                )}

                {viewMode === 'grades' && (
                    <>
                        <Button variant="secondary" onClick={handleBack}>
                            <BsArrowLeft className="mr-2" />
                        </Button>
                        <h3>Grades for student: {selectedStudent.name}</h3>
                        <Form>
                            <ListGroup className="list-scrollable">
                                {grades.length > 0 ? (
                                    grades.map((grade) => (
                                        <ListGroup.Item key={grade.id} className="grade-item">
                                            <Col sm={8} >
                                                <strong className="grade-description">{grade.description}</strong>
                                            </Col>
                                            <Col sm={5} className='d-flex'>
                                                <Form.Control
                                                    type="number"
                                                    defaultValue={grade.score}
                                                    onChange={(e) =>
                                                        setUpdatedScore(parseInt(e.currentTarget.value))
                                                    }
                                                    min='0'
                                                    max='100'
                                                    step="any"
                                                    className={`w-50 grade-score ${grade.score >= 55 ? 'text-success' : 'text-danger'}`} />
                                                <Button size="sm" onClick={() => setGradeToUpdate(grade)}>
                                                    Update
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => handleDeleteConfirmation(grade)}>
                                                    Remove
                                                </Button>
                                            </Col>

                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p>No grades found for this student.</p>
                                )}
                            </ListGroup>
                            <Form.Group>
                                <Row className="align-items-center">
                                    <Form.Label>Add Grade</Form.Label>
                                    <Col sm={1}>
                                        <Form.Control
                                            type="number"
                                            placeholder="Grade"
                                            value={newGrade}
                                            onChange={(e) => setNewGrade(parseInt(e.target.value))}
                                            min={0}
                                            max={100} />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Description"
                                            value={newGradeDescription}
                                            onChange={(e) => setNewGradeDescription(e.target.value)} />
                                    </Col>
                                    <Col xs={12} sm={3}>
                                        <Button variant="primary" onClick={handleAddGrade} className="w-50">
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form></>
                )}
            </Container>
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveGrade}
                confirmationText={`Are you sure you want to remove the grade for ${gradeToRemove?.description}?`} />
        </>
    );
};

export default TeacherPage;
