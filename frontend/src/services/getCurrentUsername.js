import { jwtDecode } from "jwt-decode";

export default function getCurrentUsername() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const decodedToken = jwtDecode(token);
  return decodedToken.username;
};