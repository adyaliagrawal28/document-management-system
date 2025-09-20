import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Search.css";

function Search() {
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [tags, setTags] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!major && !tags && !fromDate && !toDate) {
      setError("Please enter at least one search criteria");
      return;
    }

    setError("");
    setResults([
      { id: 1, name: "Sample Document 1", date: "2025-09-20" },
      { id: 2, name: "Sample Document 2", date: "2025-09-18" },
    ]);
  };

  return (
    <div className="search-page card shadow-sm">
      <div className="card-header text-center search-header">Search Documents</div>
      <div className="card-body">
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3">
            <Form.Label>Major Category</Form.Label>
            <Form.Select value={major} onChange={(e) => setMajor(e.target.value)}>
              <option value="">Select Major Category</option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minor Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or department"
              value={minor}
              onChange={(e) => setMinor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </Form.Group>

          <Button type="submit" className="w-100">
            Search
          </Button>
        </Form>

        {results.length > 0 && (
          <div className="mt-4">
            <h6>Results:</h6>
            <ul>
              {results.map((res) => (
                <li key={res.id}>
                  {res.name} - {res.date}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
