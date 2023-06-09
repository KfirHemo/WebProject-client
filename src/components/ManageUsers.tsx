import React, { useEffect, useState, ChangeEvent, ChangeEventHandler } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import PaginationComponent from './PaginationComponent';
import { managerDataOperations } from '../data/manager';
import '../styles/ManageUsers.css';
import { User, UserType } from '../data/types';

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const [newUser, setNewUser] = useState<User>({ id: 0, name: '', type: UserType.Student, password: '' });
  const [userToRemove, setUserToRemove] = useState<User>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState({ name: '', type: '' });


  useEffect(() => {
    managerDataOperations.getUsers(undefined).then(fetchedUsers => setUsers(fetchedUsers));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.includes(filter.name) &&
          (filter.type === '' || user.type === filter.type)
      )
    );
  }, [users, filter]);

  const handleAddUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!newUser) {
        return;
      }
      console.log('Add User:', newUser);
      await managerDataOperations.addUser(newUser);
      managerDataOperations.getUsers(undefined).then(fetchedUsers => setUsers(fetchedUsers));
      setNewUser({ id: 0, name: '', type: UserType.Student, password: '' });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const handleRemoveUser = async () => {
    try {
      console.log('Remove User:', userToRemove);
      if (!userToRemove)
        return undefined;
      await managerDataOperations.removeUser(userToRemove);
      managerDataOperations.getUsers(undefined).then(fetchedUsers => setUsers(fetchedUsers));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDeleteConfirmation = (user: User) => {
    setUserToRemove(user);
    setShowDeleteModal(true);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
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
      <h1 className="mb-4 text-center">Manage Users</h1>
      <hr className="section-separator" />
      <div className="col-md-5 mb-3">
        <Form onSubmit={handleAddUser}>
          <h3>Add User</h3>
          <Row>
            <Form.Group className="mb-3" controlId="formGroupname">
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGrouptype">
              <Form.Select
                name="type"
                value={newUser.type}
                onChange={(e) => setNewUser({ ...newUser, type: e.target.value as UserType })}
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formGroupUserAdd">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form.Group>
          </Row>
        </Form>
        <hr className="section-separator" />
        <Form.Label>Filter users</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Filter by name"
              name="name"
              value={filter.name}
              onChange={handleFilterChange as ChangeEventHandler<HTMLInputElement>} />
          </Col>
          <Col>
            <Form.Select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.type}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(user)}
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
        itemsPerPage={usersPerPage}
        totalItems={filteredUsers.length}
        onPageChange={(currentPage) => setCurrentPage(currentPage)}
        onItemsPerPageChange={(itemsPerPage) => setUsersPerPage(itemsPerPage)}
        availableItemsPerPage={[10, 20, 50]} />
    </Container><ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveUser}
        confirmationText="Are you sure you want to delete this user?" /></>
  );
};

export default ManageUsers;