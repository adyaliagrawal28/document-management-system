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
      setError("Please fill both fields");
      return;
    }

    setError("");
    setSuccess("User created successfully! (mock)");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="admin-page card shadow-sm">
      <div className="card-header text-center admin-header">Create User</div>
      <div className="card-body">
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

          <Button type="submit" className="w-100">
            Create User
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Admin;
