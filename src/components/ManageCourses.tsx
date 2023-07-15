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
    const [coursesForUser, setCoursesForUser] = useState<Course[]>([]);
    const [filteredCourses, setFilterdCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course>();
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage, setCoursesPerPage] = useState<number>(10);
    const [courseToRemove, setCourseToRemove] = useState<Course>({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        managerDataOperations.getUsers(undefined).then(fetchedTeachers => setUsers(fetchedTeachers))
        managerDataOperations.getCourses().then(fetchedCourses => setCourses(fetchedCourses));
    }, []);


    useEffect(() => {
        if (!selectedUser)
            return;
        managerDataOperations.getCoursesOfTeacher(selectedUser.id).then(fetchedCourses => setCoursesForUser(fetchedCourses))
    }, [selectedUser, courses]);

    useEffect(() => {
        const filtered = courses.filter((c: Course) => {
            if (coursesForUser.find(c1 => c1.id === c.id))
                return false;
            return true;
        });
        setFilterdCourses(filtered);
    }, [coursesForUser]);

    const handleUserChange = (selectedOption: User | null) => {
        setSelectedUser(selectedOption);
    };
    const handleAddCourse = async () => {
        if (!selectedUser || !selectedCourse)
            return;
        try {
            await managerDataOperations.addCourseForTeacher(selectedUser?.id, selectedCourse?.id);
        } catch (error) {
            console.error(`Error when adding course: ${error}`);
        }
        alert(`${selectedCourse.name} successfully added to ${selectedUser.name}!`);
        managerDataOperations.getCourses().then(fetchedCourses => setCourses(fetchedCourses));
    }
    const handleRemoveCourse = async () => {
        console.log('Remove Course:', courseToRemove);

        setShowDeleteModal(false);

        try {
            await managerDataOperations.removeCourse(courseToRemove.id);
        } catch (error) {
            console.error(`Error when removing course: ${error}`);
        }
        managerDataOperations.getCourses().then(fetchedCourses => setCourses(fetchedCourses));
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
        <><Container fluid>
            <h1 className="mb-4 text-center">Manage Courses</h1>
            <hr className="section-separator" />

            <Row className='form-row'>
                <Col sm={5} className='form-item'>
                        <Select
                            options={users}
                            value={selectedUser}
                            onChange={handleUserChange}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id.toString()}
                        placeholder="Select Teacher or Student..."
                        isClearable />
                </Col>
                {selectedUser && (
                    <><Col sm={5} className='form-item'>
                        <Select
                            options={filteredCourses}
                            value={selectedCourse}
                            onChange={(course) => setSelectedCourse(course || undefined)}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id.toString()}
                            placeholder="Select Course..." />
                    </Col>
                        <Col className='form-item'>
                            <Button onClick={handleAddCourse}>Add</Button>
                        </Col></>
                )}
            </Row>

            {selectedUser && (
                <><div className="table-wrapper">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesForUser
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
                </div><PaginationComponent
                        currentPage={currentPage}
                        itemsPerPage={coursesPerPage}
                        totalItems={coursesForUser.length}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(itemsPerPage) => setCoursesPerPage(itemsPerPage)}
                        availableItemsPerPage={[10, 20, 50]} /></>
            )}
        </Container>
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveCourse}
                confirmationText="Are you sure you want to remove this course?" /></>
    );
};

export default ManageCourses;
