import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Admin.css";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess(`User "${username}" created successfully (mock)`);

    // For now, just log the data
    console.log({
      username,
      password
    });

    // Clear inputs
    setUsername("");
    setPassword("");
  };

  return (
    <div className="admin-page">
      <h3>Create User</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Create User</Button>
      </Form>
    </div>
  );
}

export default Admin;
