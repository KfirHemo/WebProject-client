import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import PaginationComponent from './PaginationComponent';
import { getUsers, addUser, removeUser } from '../data/manager';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const [newUser, setNewUser] = useState({
    name: '',
    type: 'teacher',
    password: ''
  });
  const [userToRemove, setUserToRemove] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState({
    name: '',
    type: '',
  });

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers()
      if (!fetchedUsers || fetchedUsers?.status !== 200 || !fetchedUsers?.data) {
        console.error(`Error when getting users.`);
        return null;
      }
      return fetchedUsers.data;
    } catch (e) {
      console.error(`Error when getting users: ${e}`);
    }
  };


  //use this hook to fetch the users at page load.
  useEffect(() => {
    const getInitialUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      //onPaginationUpdate(1);
    };
    getInitialUsers();
  }, []);
  //hook to update filtered users when users or the filter changes.
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.includes(filter.name) &&
          (filter.type === '' || user.type === filter.type)
      )
    );
  }, [users, filter]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Add logic to handle adding a new user
    console.log('Add User:', newUser);

    const res = await addUser(newUser.name, newUser.password, newUser.type);
    if (!res || res?.status !== 200 || !res?.data.id) {
      console.error(`Error when adding user :${newUser.name}`);
      return;
    }
    const updatedUsers = await fetchUsers();
    // // Update the users list by adding the new user
    //for testing, only changes the users locally.
    //setUsers([...users, newUser]);
    setUsers(updatedUsers)
    // Reset the form
    setNewUser({ name: '', password: '', type: 'teacher' });
  };

  const handleRemoveUser = async () => {
    // Add logic to handle removing a user
    console.log('Remove User:', userToRemove);

    // Update the users list by removing the user
    const res = await removeUser(userToRemove.name)
    if (!res || res?.status !== 200 || !res?.data.id) {
      console.error(`Error when removing user :${userToRemove.name}`);
      return;
    }
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers.filter((user) => user.name !== userToRemove));
    // Close the delete confirmation modal
    setShowDeleteModal(false);
  };

  const handleDeleteConfirmation = (user) => {
    setUserToRemove(user);
    setShowDeleteModal(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="container d-flex flex-column">
      <Container fluid>
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
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
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
              <Form.Group className="mb-3" controlId="formGrouptype">
                <Form.Select
                  name="type"
                  value={newUser.type}
                  onChange={(e) =>
                    setNewUser({ ...newUser, type: e.target.value })
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
                placeholder="Filter by name"
                name="name"
                value={filter.name}
                onChange={handleFilterChange}
              />
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
                <th>name</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user, index) => (
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.type}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDeleteConfirmation(user.name)
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
        <PaginationComponent
          currentPage={1}
          itemsPerPage={usersPerPage}
          totalItems={filteredUsers.length}
          onPageChange={(currentPage) => { setCurrentPage(currentPage) }}
          onItemsPerPageChange={(itemsPerPage) => {
            setUsersPerPage(itemsPerPage);
          }}
          availableItemsPerPage={[10, 20, 50]}
        />


      </Container >
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveUser}
        confirmationText="Are you sure you want to delete this user?"
      />
    </div >
  );
};

export default ManageUsers;
