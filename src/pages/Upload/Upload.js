import { useState, useEffect, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Upload.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const BASE_URL = "https://apis.allsoft.co/api/documentManagement/"; 

const majorCategories = ["Personal", "Professional"];
const minorData = {
  Personal: ["John", "Tom", "Emily"],
  Professional: ["Accounts", "HR", "IT", "Finance"]
};

function Upload() {
  const { token } = useContext(AuthContext); // get token from context

  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedMinor, setSelectedMinor] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSelectedMinor(""); 
  }, [selectedMajor]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type.includes("image") || selected.type === "application/pdf")) {
      setFile(selected);
      setError("");
    } else {
      setError("Only image and PDF files are allowed");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !selectedMajor || !selectedMinor || !file) {
      setError("Please fill all required fields and select a file");
      return;
    }

    setError("");
    setSuccess("");

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", date);
    formData.append("major_head", selectedMajor);
    formData.append("minor_head", selectedMinor);
    formData.append("remarks", remarks);
    formData.append("tags", JSON.stringify(tags)); // send tags as array

    try {
      const response = await axios.post(`${BASE_URL}/saveDocumentEntry`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("File uploaded successfully");
      console.log(response.data);
      // Reset form
      setDate("");
      setSelectedMajor("");
      setSelectedMinor("");
      setTags([]);
      setRemarks("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload file");
    }
  };

  return (
    <div className="upload-page">
      <h3>Upload Document</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
            <option value="">Select Major Category</option>
            {majorCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedMajor && (
          <Form.Group className="mb-3">
            <Form.Label>{selectedMajor === "Personal" ? "Name" : "Department"}</Form.Label>
            <Form.Select value={selectedMinor} onChange={(e) => setSelectedMinor(e.target.value)}>
              <option value="">Select {selectedMajor === "Personal" ? "Name" : "Department"}</option>
              {minorData[selectedMajor].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags separated by commas"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
          />
          <small className="text-muted">Enter new or existing tags separated by commas</small>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Button type="submit">Upload</Button>
      </Form>
    </div>
  );
}

export default Upload;
