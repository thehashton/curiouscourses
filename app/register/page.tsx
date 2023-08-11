'use client';
import React, { useState, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
      <form onSubmit={handleRegister}>
        <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
  );
};

export default RegistrationForm;

