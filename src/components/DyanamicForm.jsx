import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "./section";

function DynamicForm() {
  const [formData, setFormData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});

  const rollNumber = localStorage.getItem("rollNumber") || "";

  useEffect(() => {
    axios
      .get(
        `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${RA2211008020128}`
      )
      .then((res) => setFormData(res.data.form))
      .catch(() => alert("Failed to fetch form"));
  }, [RA2211008020128]);

  const handleNext = (sectionData) => {
    setResponses({ ...responses, [currentSection]: sectionData });
    setCurrentSection((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const handleSubmit = (finalData) => {
    const allData = { ...responses, [currentSection]: finalData };
    console.log("Collected Form Data:", allData);
  };

  if (!formData) return <p>Loading...</p>;

  const sections = formData.sections;
  const isLast = currentSection === sections.length - 1;

  return (
    <div className="p-4">
      <h2>{formData.formTitle}</h2>
      <Section
        section={sections[currentSection]}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        showPrev={currentSection > 0}
        isLast={isLast}
      />
    </div>
  );
}

export default DynamicForm;
