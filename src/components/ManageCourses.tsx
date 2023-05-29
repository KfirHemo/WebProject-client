import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import PaginationComponent from './PaginationComponent';
import { managerDataOperations } from '../data/manager';
import '../styles/ManageCourses.css';
import Select from 'react-select';
import { User, Course, UserType } from '../data/types';

const ManageCourses = () => {
    const [teachers, setTeachers] = useState<User[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage, setCoursesPerPage] = useState<number>(10);
    const [courseToRemove, setCourseToRemove] = useState<Course>({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const fetchedTeachers = await managerDataOperations.getUsers(UserType.Teacher);
                if (!fetchedTeachers || fetchedTeachers.status !== 200 || !fetchedTeachers.data) {
                    console.error('Error when getting teachers.');
                    return;
                }

                //.filter is for testing because mock server doesn't filter user type
                setTeachers(fetchedTeachers.data.filter(u => u.type === UserType.Teacher));
            } catch (error) {
                console.error(`Error when getting teachers: ${error}`);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (selectedTeacher) {
                try {
                    const fetchedCourses = await managerDataOperations.getCoursesOfTeacher(selectedTeacher);
                    if (!fetchedCourses || fetchedCourses.status !== 200 || !fetchedCourses.data) {
                        console.error('Error when getting courses.');
                        return;
                    }
                    setCourses(fetchedCourses.data);
                } catch (error) {
                    console.error(`Error when getting courses: ${error}`);
                }
            } else {
                setCourses([]);
            }
        };

        fetchCourses();
    }, [selectedTeacher]);

    const handleTeacherChange = (selectedOption: User | null) => {
        setSelectedTeacher(selectedOption);
    };

    const handleRemoveCourse = async () => {
        console.log('Remove Course:', courseToRemove);

        setCourses(courses.filter((course) => course.id !== courseToRemove.id));
        setShowDeleteModal(false);

        try {
            await managerDataOperations.removeCourse(courseToRemove);
        } catch (error) {
            console.error(`Error when removing course: ${error}`);
        }
    };

    const handleDeleteConfirmation = (course: Course) => {
        setCourseToRemove(course);
        setShowDeleteModal(true);
    };

    return (
        <div className="container d-flex flex-column">
            <Container fluid>
                <h1 className="mb-4 text-center">Manage Courses</h1>
                <hr className="section-separator" />

                <div className="col-md-5 mb-3">
                    <Form.Label>Select Teacher</Form.Label>
                    <Row>
                        <Col>
                            <Select
                                options={teachers}
                                value={selectedTeacher}
                                onChange={handleTeacherChange}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id.toString()}
                                placeholder="Select Teacher"
                                isClearable
                            />
                        </Col>
                    </Row>
                </div>

                <div className="table-wrapper">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses
                                .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
                                .map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.id}</td>
                                        <td>{course.name}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteConfirmation(course)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>

                <PaginationComponent
                    currentPage={currentPage}
                    itemsPerPage={coursesPerPage}
                    totalItems={courses.length}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(itemsPerPage) => setCoursesPerPage(itemsPerPage)}
                    availableItemsPerPage={[10, 20, 50]}
                />
            </Container>

            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveCourse}
                confirmationText="Are you sure you want to remove this course?"
            />
        </div>
    );
};

export default ManageCourses;
