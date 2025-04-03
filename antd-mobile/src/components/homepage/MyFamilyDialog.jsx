import React, { useState } from "react";
import { Popup, Form, Input, Button, Space, Radio, List } from "antd-mobile";
import { CloseCircleOutline } from "antd-mobile-icons";

export const MyFamilyDialog = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [memberType, setMemberType] = useState('parent');
  const [familyData, setFamilyData] = useState({
    parents: [],
    siblings: [],
    maternal: []
  });

  const addMember = () => {
    const newMember = {
      name: '',
      fatherName: '',
      surname: '',
      age: '',
      mobile: '',
      address: '',
      businessLocation: '',
      maritalStatus: ''
    };

    setFamilyData(prev => ({
      ...prev,
      [memberType]: [...prev[memberType], newMember]
    }));
  };

  const removeMember = (type, index) => {
    setFamilyData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const updateMember = (type, index, field, value) => {
    setFamilyData(prev => {
      const updated = [...prev[type]];
      updated[index][field] = value;
      return { ...prev, [type]: updated };
    });
  };

  const handleSubmit = () => {
    console.log("Family Data:", familyData);
    onClose();
  };

  const renderMemberForm = (type) => {
    return familyData[type].map((member, index) => (
      <div key={`${type}-${index}`} style={listItemStyle}>
        <CloseCircleOutline
          onClick={() => removeMember(type, index)}
          style={closeIconStyle}
        />
        
        <h4 style={{ marginBottom: 12, textTransform: 'capitalize' }}>
          {type} #{index + 1}
        </h4>

        <Form.Item label="Full Name">
          <Input
            placeholder="Enter full name"
            value={member.name}
            onChange={(val) => updateMember(type, index, 'name', val)}
          />
        </Form.Item>

        <Form.Item label="Father's Name">
          <Input
            placeholder="Enter father's name"
            value={member.fatherName}
            onChange={(val) => updateMember(type, index, 'fatherName', val)}
          />
        </Form.Item>

        <Form.Item label="Surname">
          <Input
            placeholder="Enter surname"
            value={member.surname}
            onChange={(val) => updateMember(type, index, 'surname', val)}
          />
        </Form.Item>

        <Form.Item label="Age">
          <Input
            type="number"
            placeholder="Enter age"
            value={member.age}
            onChange={(val) => updateMember(type, index, 'age', val)}
          />
        </Form.Item>

        <Form.Item label="Mobile Number">
          <Input
            type="tel"
            placeholder="Enter mobile number"
            value={member.mobile}
            onChange={(val) => updateMember(type, index, 'mobile', val)}
          />
        </Form.Item>

        <Form.Item label="Address">
          <Input
            placeholder="Enter full address"
            value={member.address}
            onChange={(val) => updateMember(type, index, 'address', val)}
          />
        </Form.Item>

        <Form.Item label="Business Location">
          <Input
            placeholder="Enter business location"
            value={member.businessLocation}
            onChange={(val) => updateMember(type, index, 'businessLocation', val)}
          />
        </Form.Item>

        <Form.Item label="Marital Status">
          <Input
            placeholder="Married/Single/Divorced"
            value={member.maritalStatus}
            onChange={(val) => updateMember(type, index, 'maritalStatus', val)}
          />
        </Form.Item>
      </div>
    ));
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="bottom"
      bodyStyle={{ 
        height: "100vh", 
        overflowY: "auto", 
        padding: "16px" 
      }}
    >
      <h2 style={{ textAlign: "center" }}>Family Details</h2>

      {/* Member Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Select Family Member Type</h3>
        <Radio.Group
          value={memberType}
          onChange={(val) => setMemberType(val)}
          style={{
            '--font-size': '13px',
            '--gap': '8px',
            '--icon-size': '18px'
          }}
        >
          <Space wrap>
            <Radio value="parents" style={{ fontSize: 13 }}>Parent</Radio>
            <Radio value="siblings" style={{ fontSize: 13 }}>Sibling</Radio>
            <Radio value="maternal" style={{ fontSize: 13 }}>Maternal</Radio>
          </Space>
        </Radio.Group>
        <Button 
          block 
          type="primary" 
          onClick={addMember}
          style={{ marginTop: 12 }}
          size='small'
        >
          + Add Member
        </Button>
      </div>

      {/* Members List */}
      <Form form={form} layout="vertical">
        {/* Parents Section */}
        {familyData.parents.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3>Parents ({familyData.parents.length})</h3>
            {renderMemberForm('parents')}
          </div>
        )}

        {/* Siblings Section */}
        {familyData.siblings.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3>Siblings ({familyData.siblings.length})</h3>
            {renderMemberForm('siblings')}
          </div>
        )}

        {/* Maternal Section */}
        {familyData.maternal.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3>Maternal Relatives ({familyData.maternal.length})</h3>
            {renderMemberForm('maternal')}
          </div>
        )}

        {/* Submit & Cancel Buttons */}
        <Space style={{ width: "100%", marginTop: "16px" }}>
          <Button block onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button 
            block 
            type="primary" 
            onClick={handleSubmit} 
            style={{ flex: 1 }}
            disabled={
              familyData.parents.length === 0 && 
              familyData.siblings.length === 0 && 
              familyData.maternal.length === 0
            }
          >
            Save Family Data
          </Button>
        </Space>
      </Form>
    </Popup>
  );
};

const listItemStyle = {
  border: "1px solid #eee",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: "8px",
  position: "relative",
  backgroundColor: "#fafafa"
};

const closeIconStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  fontSize: "20px",
  cursor: "pointer",
  color: "#ff4d4f",
};