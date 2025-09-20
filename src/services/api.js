import axios from "axios";

const BASE_URL = "https://apis.allsoft.co/api/documentManagement/"; 

export const generateOtp = async (mobile) => {
  try {
    const response = await axios.post(`${BASE_URL}/generateOTP`, 
      { mobile_number: mobile },  
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate OTP" };
  }
};


export const validateOtp = async (mobile, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/validateOTP`, 
      { mobile_number: mobile, otp },  
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "OTP validation failed" };
  }
};

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
