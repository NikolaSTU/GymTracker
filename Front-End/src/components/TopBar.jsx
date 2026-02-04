import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Navbar className="topbar shadow-sm">
      <Container fluid>
        <div />
        <div className="d-flex align-items-center">
          <span className="me-3 welcome">Welcome, {user?.firstName || user?.Username || user?.username || user?.email || 'Guest'}</span>
          <Button size="sm" className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
