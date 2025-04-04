import React, { useState ,useEffect} from "react";
import ProfessionFormModal from "./ProfessionFormModal";
import { Button, Card, Space } from "antd";

const ProfessionComponent = ({ nextStep, prevStep, updateFormData,formData, setFormData }) => {
  const [visible, setVisible] = useState(false);
  const [professionList, setProfessionList] = useState([]);

    useEffect(() => {
    if (formData && formData.profession) {
        setProfessionList(formData.profession); // Load existing profession details
    }
}, [formData]);
  // Handle "Next" button click
  const handleNext = () => {
    //updateFormData("profession", professionList);
    setFormData({ ...formData, profession: professionList });
    nextStep();
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    //updateFormData("profession", professionList);
    setFormData({ ...formData, profession: professionList });
    prevStep();
  };
  const resetProfessionfields = () => {
    setFormData({ ...formData, profession: [] });
    form.resetFields();
  }

  return (
    <>
      <h2>Profession Details</h2>
      {/* Add Profession Button */}
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Profession
      </Button>

      {/* ProfessionFormModal Component */}
      <ProfessionFormModal
        visible={visible}
        setVisible={setVisible}
        professionList={professionList}
        setProfessionList={setProfessionList}
      />

      {/* Display Profession List */}
      {professionList.map((profession, index) => (
        <Card
          key={index}
          style={{
            marginTop: "16px",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Profession Type: {profession.type}</h3>
          {profession.educationType && <p>Education Type: {profession.educationType}</p>}
          {profession.institute && <p>Institute: {profession.institute}</p>}
          {profession.passingYear && <p>Passing Year: {profession.passingYear}</p>}
          {profession.percentage && <p>Percentage/Grade: {profession.percentage}</p>}
          {profession.educationDescription && <p>Education Description: {profession.educationDescription}</p>}
          {profession.businessName && <p>Business Name: {profession.businessName}</p>}
          {profession.businessDescription && <p>Business Description: {profession.businessDescription}</p>}
          {profession.income && <p>Income: {profession.income}</p>}
           {profession.organization && <p>Organization: {profession.organization}</p>}
          {profession.designation && <p>Designation: {profession.designation}</p>}
          {profession.salary && <p>Salary: {profession.salary}</p>}
          {profession.serviceDescription && <p>Job Description: {profession.serviceDescription}</p>}
            {profession.landSize && <p>Land Size: {profession.landSize}</p>}
          {profession.Income && <p>Income: {profession.Income}</p>}
          {profession.Description && <p>Description: {profession.Description}</p>}
            {profession.currentlocation && <p>Currentlocation: {profession.currentlocation}</p>}
        </Card>
      ))}

      {/* Navigation Buttons */}
      <div>
        <Space>
        <Button onClick={resetProfessionfields}>Reset</Button>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
        </Space>
      </div>
    </>
  );
};

export default ProfessionComponent;
