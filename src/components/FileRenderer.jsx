import React from "react";

function FieldRenderer({ field, value, onChange, error }) {
  const handleInputChange = (e) => {
    onChange(field.fieldId, e.target.value);
  };

  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={handleInputChange}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={value}
            onChange={handleInputChange}
          />
        );
      case "dropdown":
        return (
          <select value={value} onChange={handleInputChange}>
            <option value="">Select</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return field.options.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={handleInputChange}
            />
            {opt.label}
          </label>
        ));
      case "checkbox":
        return field.options.map((opt) => (
          <label key={opt.value}>
            <input
              type="checkbox"
              checked={value?.includes(opt.value)}
              onChange={(e) => {
                const newValue = value || [];
                if (e.target.checked) newValue.push(opt.value);
                else newValue.splice(newValue.indexOf(opt.value), 1);
                onChange(field.fieldId, [...newValue]);
              }}
            />
            {opt.label}
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="mb-2">
      <label>{field.label}</label>
      {renderInput()}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FieldRenderer;
