import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Text, Paragraph } = Typography;

const FAQComponent = () => {
  return (
    <div style={{ margin: "20px 0" }}>
     
      <Collapse accordion>
        {/* PreDescription Section */}
        <Panel header="एप्प को डाउनलोड कैसे करे" key="1">
          <Paragraph>
            <Text strong>प्लेस्टोर में ई-मीलन या EMeelan सर्च करे :</Text> प्लेस्टोर में ई-मीलन या EMeelan सर्च करे जिसके बाद आप को दो स्क्रीन दिखेगी, आप को दूसरी वाली एप्लीकेशन डाउनलोड करना है 
          </Paragraph>
          
          <img
          width="100%" // Adjust width as needed
          height="auto" // Keep proportions
          controls // Enables playback controls
          src="https://hphmeelan.s3.us-east-1.amazonaws.com/Screenshot+2024-12-08+at+2.18.52%E2%80%AFPM.png"
        >
          
        </img>
        </Panel>
        <Panel header="नए यूजर  रजिस्टर कैसे करे" key="2">
        <Paragraph>
      <Text strong>रजिस्टर करे:</Text> 
      <a 
        href="https://emeelan.com/emeelan/register" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ marginLeft: "8px" }}
      >
        रजिस्टर करे(Click here to register)
      </a>
    </Paragraph>
          
          <video
          width="100%" // Adjust width as needed
          height="auto" // Keep proportions
          controls // Enables playback controls
          src="https://hphmeelan.s3.us-east-1.amazonaws.com/Screen+Recording+2024-12-08+at+1.56.07%E2%80%AFPM.mov"
        >
        
        </video>
        </Panel>

        {/* PreMinAge and PreMaxAge Section */}
        <Panel header="प्रोफाइल को कैसे देखना है" key="3">
          <Paragraph>
            <Text strong>प्रोफाइल को कैसे देखना है:</Text>,और कैसेफ़िल्टर करना है, रिक्वेस्ट कैसे भेजे और कैसे आप अपनी  रिक्वेस्ट को देखे .
          </Paragraph>
          <video
          width="100%" // Adjust width as needed
          height="auto" // Keep proportions
          controls // Enables playback controls
          src="https://us-east-1.console.aws.amazon.com/s3/object/hphmeelan?region=us-east-1&bucketType=general&prefix=profileView.mov"
        >
        
        </video>
        </Panel>

        {/* PreMinHeight and PreMaxHeight Section */}
        <Panel header=" हेल्प लाइन नंबर" key="4">
          <Paragraph>
            <Text strong>एडमिन से संपर्क:</Text>एडमिन (+91-9019905115)से संपर्क करने के लिए नंबर और टाइम  सुबह १० बजे से शाम के ५ बजे तक .
          </Paragraph>
        </Panel>

      

        {/* PreQualification Section */}
       

        {/* Profile Document Section */}
       
      </Collapse>
    </div>
  );
};

export default FAQComponent;
