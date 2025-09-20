import { useState, useEffect, useContext } from "react";
import { Form, Button, Alert, Badge } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Upload.css";

const BASE_URL = "https://apis.allsoft.co/api/documentManagement/";

const majorCategories = ["Personal", "Professional"];
const minorData = {
  Personal: ["John", "Tom", "Emily"],
  Professional: ["Accounts", "HR", "IT", "Finance"],
};


const majorMapping = {
  Personal: "Company",        // backend expects "Company" for Personal
  Professional: "Company",    // backend expects "Company" for Professional
};

const minorMapping = {
  Personal: {
    John: "Work Order",
    Tom: "Invoice",
    Emily: "Report",
  },
  Professional: {
    Accounts: "Finance",
    HR: "HR Doc",
    IT: "IT Doc",
    Finance: "Finance Doc",
  },
};

function Upload() {
  const { token } = useContext(AuthContext);

  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedMinor, setSelectedMinor] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
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
    }
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedMajor || !selectedMinor || !file) {
      setError("Please fill all required fields and select a file");
      return;
    }

    if (!token) {
      setError("You are not logged in or token is missing");
      return;
    }

    setError("");
    setSuccess("");

    // Convert date to DD-MM-YYYY
    const formattedDate = date.split("-").reverse().join("-");

    // Convert tags to array of objects
    const formattedTags = tags.map((tag) => ({ tag_name: tag }));

    const payload = {
      major_head: majorMapping[selectedMajor],
      minor_head: minorMapping[selectedMajor][selectedMinor],
      document_date: formattedDate,
      document_remarks: remarks,
      tags: formattedTags,
      user_id: "nitin", // hardcoded for now
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(payload));

    try {
      const response = await axios.post(`${BASE_URL}/saveDocumentEntry`, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);
      if (response.data.status) {
        setSuccess("File uploaded successfully!");
        setSelectedMajor("");
        setSelectedMinor("");
        setDate("");
        setFile(null);
        setTags([]);
        setRemarks("");
      } else {
        setError(response.data.data || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err.response || err);
      setError(err.response?.data?.data || "Network or server error during upload");
    }
  };

  return (
    <div className="upload-page card shadow-sm">
      <div className="card-header text-center upload-header">Upload Document</div>
      <div className="card-body">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>

          {/* Major & Minor */}
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

          {/* Tags */}
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div className="tag-input-container">
              <Form.Control
                type="text"
                placeholder="Enter tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="tags-display">
                {tags.map((t) => (
                  <Badge
                    key={t}
                    bg="primary"
                    className="tag-badge"
                    onClick={() => handleRemoveTag(t)}
                  >
                    {t} &times;
                  </Badge>
                ))}
              </div>
            </div>
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

          <Button type="submit" className="w-100">Upload</Button>
        </Form>
      </div>
    </div>
  );
}

export default Upload;
