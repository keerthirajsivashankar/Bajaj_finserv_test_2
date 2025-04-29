import React, { useState } from "react";
import axios from "axios";
import "./loginForm.css";

function LoginForm() {
  const [rollNumber, setRollNumber] = useState("");
  const [formData, setFormData] = useState(null); 
  const [formResponse, setFormResponse] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.get(
        `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
      );

      setFormData(response.data.form); // Store the form data
    } catch (err) {
      alert("Failed to fetch form data");
    }
  };

  const handleChange = (fieldId, value) => {
    setFormResponse((prev) => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "date":
        return (
          <input
            type={field.type}
            id={field.fieldId}
            placeholder={field.placeholder}
            value={formResponse[field.fieldId] || ""}
            onChange={(e) => handleChange(field.fieldId, e.target.value)}
            required={field.required}
            className="input-field"
          />
        );
      case "radio":
        return (
          <div className="radio-group">
            {field.options.map((opt) => (
              <label key={opt.value}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={opt.value}
                  checked={formResponse[field.fieldId] === opt.value}
                  onChange={(e) => handleChange(field.fieldId, e.target.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Dynamic Form</h2>
        <input
          className="input-field"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Fetch Form
        </button>

        {formData && (
          <div className="dynamic-form">
            <h3>{formData.formTitle}</h3>
            {formData.sections.map((section) => (
              <div key={section.sectionId} className="section">
                <h4>{section.title}</h4>
                <p>{section.description}</p>
                {section.fields.map((field) => (
                  <div key={field.fieldId} className="form-field">
                    <label>{field.label}</label>
                    {renderField(field)}
                    {field.validation?.message && (
                      <p className="error-message">
                        {field.validation.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
