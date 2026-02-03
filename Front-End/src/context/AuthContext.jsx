import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { API_BASE_URL } from '../config';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    } else if (storedToken) {
      // fallback: decode token if user profile not stored
      setToken(storedToken);
      try {
        const decoded = jwt_decode(storedToken);
        setUser(decoded);
      } catch (e) {
        console.warn('Invalid token in storage');
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      }
    }
  }, []);

  async function login(username, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, message: text || 'Login failed' };
      }

      const data = await res.json();
      const tok = data.token || data?.Token || data?.tokenString;
      if (!tok) {
        return { success: false, message: 'No token returned from server' };
      }

      localStorage.setItem('token', tok);
      setToken(tok);

      // Save full user profile returned by the API if available
      // Normalize user object to include username and role (extracted from token)
      let userObj = {};
      try {
        const decoded = jwt_decode(tok) || {};
        const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"];
        userObj = {
          ...data,
          username: data.Username || data.username || data.email || '',
          role: role || data.role || data.Role || null,
        };
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
      } catch (e) {
        // fallback: store raw data
        try {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
        } catch {
          setUser({});
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async function register(username, email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, message: text || 'Register failed' };
      }

      // Auto-login after successful registration
      return await login(username, password);
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
