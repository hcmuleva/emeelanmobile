

    import React, { useState } from 'react';
    import { Form, Picker, Button, Toast } from 'antd-mobile';
    
    const educationData = [
      
        { "Id": "UNEDUCATED", "EName": "UNEDUCATED", "HName": "अशिक्षित" },
        { "Id": "PRIMARY", "EName": "PRIMARY", "HName": "प्राथमिक" },
        { "Id": "HIGHSCHOOL", "EName": "HIGHSCHOOL", "HName": "हाईस्कूल" },
        { "Id": "UG", "EName": "UG", "HName": "स्नातक" },
        { "Id": "PG", "EName": "PG", "HName": "स्नातकोत्तर" },
        { "Id": "PHD", "EName": "PHD", "HName": "पीएचडी" },
        { "Id": "DIPLOMA", "EName": "DIPLOMA", "HName": "डिप्लोमा" }
      
    ];

    const EducationSelector = ({customdata,setCustomdata}) => {
      const [name, label] = ["education", "education"]; 
      
      const [visible, setVisible] = useState(false);
      const [form] = Form.useForm();
    
      const handleConfirm = (value) => {
        form.setFieldsValue({ [name]: value[0] });
        setVisible(false);
        const selectedEducation = educationData.find(g => g.EName === value[0]);
         setCustomdata({...customdata, HighestDegree: selectedEducation.Id}) 
        Toast.show(`Selected: ${selectedEducation?.EName}`);
      };
    
      return (
        <Form.Item name={name} label={label}>
          <div 
            onClick={() => setVisible(true)}
            style={{ 
              padding: '6px 0',
              color: 'var(--adm-color-text)',
              cursor: 'pointer'
            }}
          >
            {(() => {
              const selectedValue = form.getFieldValue(name);
              const selectedEducation = educationData.find(g => g.EName === selectedValue);
              return selectedEducation 
                ? `${selectedEducation.EName} (${selectedEducation.HName})` 
                : 'Select Education';
            })()}
          </div>
          
          <Picker
            columns={[
              educationData.map(educationItem => ({
                label: `${educationItem.EName} (${educationItem.HName})`, // Display format
                value: educationItem.EName // Store only EName
              }))
            ]}
            visible={visible}
            onClose={() => setVisible(false)}
            onConfirm={handleConfirm}
          />
        </Form.Item>
      );
    };
    export default EducationSelector;
    