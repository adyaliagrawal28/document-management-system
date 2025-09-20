import axios from "axios";

// Replace with your actual base URL from Postman
const BASE_URL = "https://apis.allsoft.co/api/documentManagement/";

export const generateOtp = async (mobile) => {
  try {
    const response = await axios.post(`${BASE_URL}/generateOTP`, { mobile });
    return response.data; // Usually returns success message or OTP status
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate OTP" };
  }
};

export const validateOtp = async (mobile, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/validateOTP`, { mobile, otp });
    return response.data; // Should return token
  } catch (error) {
    throw error.response?.data || { message: "OTP validation failed" };
  }
};

// Example authenticated request for later use
export const fetchTags = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch tags" };
  }
};
