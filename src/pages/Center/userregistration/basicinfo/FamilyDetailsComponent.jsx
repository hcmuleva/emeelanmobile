import React, { useState,useEffect } from "react";
import FamilyMemberModal from "./FamilyMemberModal";
import { Button, Card, Space } from "antd";

const FamilyDetailsComponent = ({ nextStep, prevStep, updateFormData,formData, setFormData }) => {
  const [visible, setVisible] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  useEffect(() => {
    if (formData && formData.family) {
        setFamilyMembers(formData.family); // Load existing family members
    }
}, [formData]);
  // Update parent with family members
  const handleNext = () => {
   // updateFormData("family", familyMembers); // Update parent state
    setFormData({ ...formData, family: familyMembers });

    nextStep(); // Move to the next step
  };

  const handleCancel = () => {
    setFormData({ ...formData, family: familyMembers });
    //updateFormData("family", familyMembers); // You can pass existing data on Cancel.
    prevStep();
  }
  const resetFamilyfields = () => {  
    setFormData({ ...formData, family: [] });
    form.resetFields();
  }
  return (
    <>
      <h2>Family Details</h2>
      {/* Add Member Button */}
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Family Member
      </Button>

      {/* Modal Component */}
      <FamilyMemberModal
        visible={visible}
        setVisible={setVisible}
        familyMembers={familyMembers}
        setFamilyMembers={setFamilyMembers}
      />

      {/* Display Family Members */}
      {familyMembers.map((member, index) => (
        <Card
          key={index}
          style={{
            marginTop: "16px",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            {member.firstName} {member.lastName}
          </h3>
          <p>
            <strong>Type:</strong> {member.type}
          </p>
          {member.age && (
            <p>
              <strong>Age:</strong> {member.age}
            </p>
          )}
          {member.maritalStatus && (
            <p>
              <strong>Marital Status:</strong> {member.maritalStatus}
            </p>
          )}
          {member.profession && (
            <p>
              <strong>Profession:</strong> {member.profession}
            </p>
          )}
          {member.location && (
            <p>
              <strong>Location:</strong> {member.location}
            </p>
          )}
          {member.businessDetail && (
            <p>
              <strong>Business Detail:</strong> {member.businessDetail}
            </p>
          )}
        </Card>
      ))}

      {/* Navigation Buttons */}
      <div>
        <Space>
         <Button onClick={resetFamilyfields}>Reset</Button> 
        <Button onClick={handleCancel}>Previous</Button>
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
        </Space>
      </div>
    </>
  );
};

export default FamilyDetailsComponent;
