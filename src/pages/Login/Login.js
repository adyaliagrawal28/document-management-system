import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/login-illustrain.svg";
import { generateOtp, validateOtp } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";


function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
  e.preventDefault();
  if (!mobile.match(/^\d{10}$/)) {
    setError("Please enter a valid 10-digit mobile number");
    return;
  }

  try {
    setError("");
    const result = await generateOtp(mobile);
    console.log("OTP generation response:", result);
    setOtpSent(true);
  } catch (err) {
    setError(err.message || "Failed to generate OTP");
  }
};


  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if (!otp) {
    setError("Please enter OTP");
    return;
  }

  try {
    setError("");
    const result = await validateOtp(mobile, otp);
    console.log("OTP validation response:", result);

    // Save token in context
    login(result.token);

    // Optional: also save in localStorage for persistence
    localStorage.setItem("authToken", result.token);

    // Redirect to upload page
    navigate("/upload");
  } catch (err) {
    setError(err.message || "OTP verification failed");
  }
};


  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-card">
          <h3 className="mb-4">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            {!otpSent && (
              <Button className="w-100 login-button" onClick={handleSendOtp}>
                Send OTP
              </Button>
            )}

            {otpSent && (
              <>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <Button className="w-100 login-button" onClick={handleVerifyOtp}>
                  Verify OTP
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>

      <div className="login-right">
        <img src={loginImage} alt="Welcome" />
        <h2>Welcome to Document Manager</h2>
        <p>Login to upload, search, and manage your documents securely.</p>
      </div>
    </div>
  );
}

export default Login;
