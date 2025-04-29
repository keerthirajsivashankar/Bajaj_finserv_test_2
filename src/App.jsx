import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import DyanmicForm from "./components/DyanamicForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/form" element={<DyanmicForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
