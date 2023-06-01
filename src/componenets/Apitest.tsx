import React, { useState } from "react";
import axios from "axios";

// interface LoginForm {
//   email: string;
//   password: string;
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/auth/login",
        {
          email,
          password,
        }
      );
      const access_token = response.data.token.access_token;
      const userInfo = response.data.member_info;
      console.log("Access Token:", access_token);
      console.log("userInfo:", userInfo);
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
