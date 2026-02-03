import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container fluid>
        <div />
        <div className="d-flex align-items-center">
          <span className="me-3">Welcome, {user?.username || user?.Username || user?.email || 'Guest'}</span>
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
