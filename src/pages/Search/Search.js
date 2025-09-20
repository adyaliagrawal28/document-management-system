import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Search.css";

const BASE_URL = "https://apis.allsoft.co/api/documentManagement/";

function Search() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [tags, setTags] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const formatDate = (dateStr) => (dateStr ? dateStr.split("-").reverse().join("-") : "");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!major && !minor && !tags && !fromDate && !toDate) {
      setError("Please enter at least one search criteria");
      return;
    }
    setError("");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
      .map((t) => ({ tag_name: t }));

    const payload = {
      major_head: major || "",
      minor_head: minor || "",
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),
      tags: tagsArray,
      uploaded_by: "nitin",
      start: 0,
      length: 10,
      filterId: "",
      search: { value: "" },
    };

    try {
      const response = await axios.post(`${BASE_URL}/searchDocumentEntry`, payload, {
        headers: { token },
      });

      console.log("Search API response:", response.data.data);

      if (response.data.status && response.data.data.length > 0) {
        navigate("/preview", { state: { documents: response.data.data } });
      } else {
        setError("No documents found");
      }
    } catch (err) {
      console.error("Search error:", err.response || err);
      setError("Network or server error");
    }
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

          <Button type="submit" className="w-100">Search</Button>
        </Form>
      </div>
    </div>
  );
}

export default Search;
