import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import PaginationComponent from './PaginationComponent';
import { managerDataOperations } from '../data/manager';
import '../styles/ManageCourses.css';
import Select from 'react-select';
import { User, Course, UserType } from '../data/types';

const ManageCourses = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage, setCoursesPerPage] = useState<number>(10);
    const [courseToRemove, setCourseToRemove] = useState<Course>({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedTeachers = await managerDataOperations.getUsers(undefined);
                if (!fetchedTeachers || fetchedTeachers.status !== 200 || !fetchedTeachers.data) {
                    console.error('Error when getting users.');
                    return;
                }

                //.filter is for testing because mock server doesn't filter user type
                setUsers(fetchedTeachers.data.filter(u => u.type !== UserType.Manager));
            } catch (error) {
                console.error(`Error when getting users: ${error}`);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (selectedUser) {
                try {
                    const fetchedCourses = await managerDataOperations.getCoursesOfTeacher(selectedUser.id);
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
    }, [selectedUser]);

    const handleUserChange = (selectedOption: User | null) => {
        setSelectedUser(selectedOption);
    };

    const handleRemoveCourse = async () => {
        console.log('Remove Course:', courseToRemove);

        setCourses(courses.filter((course) => course.id !== courseToRemove.id));
        setShowDeleteModal(false);

        try {
            await managerDataOperations.removeCourse(courseToRemove.id);
        } catch (error) {
            console.error(`Error when removing course: ${error}`);
        }
    };

    const handleDeleteConfirmation = (course: Course) => {
        setCourseToRemove(course);
        setShowDeleteModal(true);
    };

    const loggedInUser = localStorage.getItem("user");
    // if user is not logged in and tried to navigate to this page, don't display
    if (!loggedInUser) {
        return null;
    }
    const user = JSON.parse(loggedInUser);
    if (user.type !== UserType.Manager) {
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
                <h1 className="mb-4 text-center">Manage Courses</h1>
                <hr className="section-separator" />

                <div className="col-md-5 mb-3">
                    <Row>
                        <Col>
                            <Select
                                options={users}
                                value={selectedUser}
                                onChange={handleUserChange}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id.toString()}
                                placeholder="Select Teacher or Student"
                                isClearable
                            />
                        </Col>
                    </Row>
                </div>

                <div className="table-wrapper">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
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
