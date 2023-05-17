import React, { useState } from 'react';
import { Form, Button, Table, Col, Container, Row, Modal, Pagination } from 'react-bootstrap';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    userType: 'teacher',
  });
  const [removeUser, setRemoveUser] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [filter, setFilter] = useState({
    username: '',
    userType: '',
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    // Add logic to handle adding a new user
    console.log('Add User:', newUser);

    // Update the users list by adding the new user
    setUsers([...users, newUser]);

    // Reset the form
    setNewUser({ username: '', password: '', userType: 'teacher' });
  };

  const handleRemoveUser = () => {
    // Add logic to handle removing a user
    console.log('Remove User:', deleteUser);

    // Update the users list by removing the user
    const updatedUsers = users.filter((user) => user.username !== deleteUser);
    setUsers(updatedUsers);

    // Close the delete confirmation modal
    setShowDeleteModal(false);
  };

  const handleDeleteConfirmation = (username) => {
    setDeleteUser(username);
    setShowDeleteModal(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.includes(filter.username) &&
      (filter.userType === '' || user.userType === filter.userType)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleUsersPerPageChange = (e) => setUsersPerPage(Number(e.target.value));

  return (
    <div className="container d-flex flex-column">
      <Container fluid>
        <h1 className="mb-4 text-center">Manage Users</h1>
        <hr className="section-separator" />

        <div className="col-md-5 mb-3">
          <Form onSubmit={handleAddUser}>
            <h3>Add User</h3>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupUserType">
                <Form.Select
                  name="userType"
                  value={newUser.userType}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userType: e.target.value })
                  }
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
                placeholder="Filter by username"
                name="username"
                value={filter.username}
                onChange={handleFilterChange}
              />
            </Col>
            <Col>
              <Form.Select
                name="userType"
                value={filter.userType}
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
                <th>Username</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.userType}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDeleteConfirmation(user.username)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </div>
        <Row>
          <Form.Group className="mb-3" controlId="formGroupItemsPerPage">
            <Col>
              <Form.Label >Items per page:</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Select
                className="ml-2 custom-select-sm"
                name="usersPerPage"
                value={usersPerPage}
                onChange={handleUsersPerPageChange}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value={users.length}>All</option>
              </Form.Select>
            </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPagination">
            <Col>
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
            </Form.Group>
        </Row>

      </Container >


      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user: {deleteUser}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default ManageUsers;
