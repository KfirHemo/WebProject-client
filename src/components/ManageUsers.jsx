import React, { useState } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';

const ManageUsers = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    userType: 'teacher',
  });
  const [removeUser, setRemoveUser] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    // Add logic to handle adding a new user
    console.log('Add User:', newUser);
    // Reset the form
    setNewUser({ username: '', password: '', userType: 'teacher' });
  };

  const handleRemoveUser = (e) => {
    e.preventDefault();
    // Add logic to handle removing a user
    console.log('Remove User:', removeUser);
    // Reset the form
    setRemoveUser('');
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
    <Container className="manage-users-wrapper p-4 p-md-5 overflow-auto">
      <h1 className="mb-4 text-center">Manage Users</h1>
      <hr className="section-separator" />
      <Row>
        <Col md={6} className="mb-4">
          <div className="section">
            <h3>Add User</h3>
            <Form onSubmit={handleAddUser}>
              {/* Add form fields */}
              <Form.Group controlId="addUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="addPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="addUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  value={newUser.userType}
                  onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Add
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div className="section">
            <h3>Remove User</h3>
            <Form onSubmit={handleRemoveUser}>
              {/* Add form fields */}
              <Form.Group controlId="removeUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={removeUser}
                  onChange={(e) => setRemoveUser(e.target.value)}
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Remove
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default ManageUsers;
