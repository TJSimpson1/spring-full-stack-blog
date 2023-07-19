import jwt_decode from "jwt-decode";

const decodeToken = (token) => {
  try {
    const decoded = jwt_decode(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export default decodeToken;
