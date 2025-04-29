import React, { useState } from "react";
import FieldRenderer from "./FileRenderer";

function Section({ section, onNext, onPrev, onSubmit, showPrev, isLast }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    section.fields.forEach((field) => {
      if (field.required && !values[field.fieldId]) {
        newErrors[field.fieldId] = field.validation?.message || "Required";
      } else if (
        field.minLength &&
        values[field.fieldId]?.length < field.minLength
      ) {
        newErrors[field.fieldId] = `Min length is ${field.minLength}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (id, value) => {
    setValues({ ...values, [id]: value });
  };

  const handleNext = () => {
    if (validate()) onNext(values);
  };

  const handleFinalSubmit = () => {
    if (validate()) onSubmit(values);
  };

  return (
    <div className="p-2">
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.fields.map((field) => (
        <FieldRenderer
          key={field.fieldId}
          field={field}
          value={values[field.fieldId] || ""}
          onChange={handleChange}
          error={errors[field.fieldId]}
        />
      ))}
      {showPrev && <button onClick={onPrev}>Previous</button>}
      {!isLast && <button onClick={handleNext}>Next</button>}
      {isLast && <button onClick={handleFinalSubmit}>Submit</button>}
    </div>
  );
}

export default Section;
