import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
});
//api test
export const getTest = () =>
  instance.get("signup/").then((response) => response.data);

// ���������� ������
export const getMe = () =>
  instance.get(`user/me`).then((response) => response.data);
