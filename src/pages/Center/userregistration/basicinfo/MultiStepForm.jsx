import React, { useState } from "react";
import PersonalFormComponent from "./PersonalFormComponent";
import FamilyDetailsComponent from "./FamilyDetailsComponent";
import ProfessionComponent from "./ProfessionComponent";
import AboutMeComponent from "./AboutMeComponent"; // Import AboutMeComponent
import MyChoice from "./MyChoice";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    family: [],
    profession: [],
    aboutMe: {}, // About me details section 
    mychoice: {}, // MyChoice details section
    
  });

  // Move to the next step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Move to the previous step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Update form data
  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  // Submit all data
  const handleSubmit = () => {
    console.log("Submitting Data:", formData);
    // Make API request here
    // fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("Success:", data))
    //   .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {step === 1 && (
        <PersonalFormComponent nextStep={nextStep} updateFormData={updateFormData} formData={formData} setFormData={setFormData} />
      )}
      {step === 2 && (
        <FamilyDetailsComponent
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData} setFormData={setFormData} 
        />
      )}
      {step === 3 && (
        <ProfessionComponent
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData} setFormData={setFormData} 
        />
      )}
      {step === 4 && (
        <AboutMeComponent // Add AboutMeComponent here
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData} setFormData={setFormData} 
        />
      )}
            {step === 5 && (
        <MyChoice
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData} setFormData={setFormData} 
          handleSubmit={handleSubmit}

        />
      )}
    </div>
  );
};

export default MultiStepForm;
