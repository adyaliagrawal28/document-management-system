import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import loginImage from "../../assets/login-illustrain.svg";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (!mobile.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    console.log("OTP sent to:", mobile);
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    setError("");
    console.log("OTP verified:", otp);
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
