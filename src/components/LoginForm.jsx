import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginForm.css";

function LoginForm() {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          RA2211008020128,
          KeerthiRaj,
        }
      );
      localStorage.setItem("rollNumber", rollNumber);
      navigate("/form");
    } catch (err) {
      alert("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <h2>Login</h2>
      <input
        className="inputd"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
      />
      <input
        className="inputd"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
