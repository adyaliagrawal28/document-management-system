import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import "./Preview.css";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();

  const documents = location.state?.documents;

  if (!documents || documents.length === 0) {
    return <p>No documents found. Go back and try a different search.</p>;
  }

  const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

  return (
    <div className="preview-page container mt-4">
     <Button className="btn-back mb-3" onClick={() => navigate(-1)}>
        ← Back to Search
    </Button>

      
      {documents.map((doc) => (
        <Card key={doc.document_id} className="mb-3 shadow-sm">
          <Card.Header>
            Document {doc.row_num || doc.document_id}
          </Card.Header>
          <Card.Body>
            <p><strong>Date:</strong> {formatDate(doc.document_date)}</p>
            <p><strong>Major:</strong> {doc.major_head}</p>
            <p><strong>Minor:</strong> {doc.minor_head}</p>
            <p>
              <strong>Tags:</strong>{" "}
              {doc.tags?.length
                ? doc.tags.map((t) => (
                    <Badge bg="primary" className="me-1" key={t.tag_name}>
                      {t.tag_name}
                    </Badge>
                  ))
                : "No tags"}
            </p>
            <p><strong>Remarks:</strong> {doc.document_remarks || "None"}</p>

            
            {doc.file_url ? (
              doc.file_url.endsWith(".pdf") ? (
                <iframe
                  src={doc.file_url}
                  width="100%"
                  height="400px"
                  title={`PDF Preview ${doc.document_id}`}
                />
              ) : (
                <img
                  src={doc.file_url}
                  alt={`Document ${doc.row_num}`}
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              )
            ) : (
              <p>No preview available for this file type.</p>
            )}

            
            {doc.file_url && (
              <div className="mt-2">
                <a href={doc.file_url} download>
                    <Button className="btn-download mt-2">Download</Button>
                </a>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Preview;
