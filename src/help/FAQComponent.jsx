import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Text, Paragraph } = Typography;

const FAQComponent = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Typography.Title level={4}>Form Filling Help</Typography.Title>
      <Collapse accordion>
        {/* PreDescription Section */}
        <Panel header="Description" key="1">
          <Paragraph>
            <Text strong>What to Enter:</Text> Provide a short description of your profile or lifestyle preferences. 
            Use plain text only, avoiding special characters.
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> "Looking for a dynamic and outgoing lifestyle."
          </Paragraph>
        </Panel>

        {/* PreMinAge and PreMaxAge Section */}
        <Panel header="Minimum and Maximum Age" key="2">
          <Paragraph>
            <Text strong>What to Enter:</Text> Specify the minimum and maximum age values in numbers.
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> Minimum Age: <Text code>25</Text>, Maximum Age: <Text code>35</Text>.
          </Paragraph>
          <Paragraph>
            Ensure the minimum age is less than the maximum age.
          </Paragraph>
        </Panel>

        {/* PreMinHeight and PreMaxHeight Section */}
        <Panel header="Minimum and Maximum Height" key="3">
          <Paragraph>
            <Text strong>What to Enter:</Text> Specify height values in centimeters (cm).
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> Minimum Height: <Text code>150</Text>, Maximum Height: <Text code>180</Text>.
          </Paragraph>
        </Panel>

        {/* PreProfession Section */}
        <Panel header="Profession" key="4">
          <Paragraph>
            <Text strong>What to Enter:</Text> Enter the preferred profession or occupation.
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> "Software Engineer," "Doctor," or "Teacher."
          </Paragraph>
        </Panel>

        {/* PreQualification Section */}
        <Panel header="Qualification" key="5">
          <Paragraph>
            <Text strong>What to Enter:</Text> Mention the preferred educational qualification.
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> "Bachelor's Degree," "Master's Degree," or "Ph.D."
          </Paragraph>
        </Panel>

        {/* Profile Document Section */}
        <Panel header="Profile Document Upload" key="6">
          <Paragraph>
            <Text strong>What to Upload:</Text> Upload an image or document file for the profile. 
            Accepted formats: <Text code>.jpg</Text>, <Text code>.png</Text>, <Text code>.pdf</Text>, <Text code>.doc</Text>, <Text code>.docx</Text>.
          </Paragraph>
          <Paragraph>
            <Text strong>File Size:</Text> Ensure the file is less than 5 MB.
          </Paragraph>
          <Paragraph>
            <Text strong>Example:</Text> A professional resume or profile picture.
          </Paragraph>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FAQComponent;
