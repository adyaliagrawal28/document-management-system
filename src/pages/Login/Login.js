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

    setError("");
    try {
      const response = await generateOtp(mobile);
      console.log("Generate OTP response:", response); 
      if (response.status) {
        setOtpSent(true);
      } else {
        setError(response.data || "Failed to generate OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate OTP (network or server error)");
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setError("");
    try {
      const result = await validateOtp(mobile, otp);
      if (result.status) {
        login(result.data.token); 
        navigate("/upload");
      } else {
        setError(result.data || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed (network or server error)");
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
