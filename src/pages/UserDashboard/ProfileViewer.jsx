import React from "react";
import { Button, Typography } from "antd";

const { Text } = Typography;

const ProfileViewer = ({ profileData }) => {
  const pdfUrl = profileData?.myProfile?.pdf; // URL to the PDF file
  const wordUrl = profileData?.myProfile?.doc; // URL to the Word file

  return (
    <div>
      <Text strong>Download Options:</Text>
      <div style={{ marginBottom: "20px" }}>
        {/* Download PDF */}
        {pdfUrl && (
          <Button type="primary" style={{ marginRight: "10px" }}>
            <a href={pdfUrl} download="Profile.pdf" target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </Button>
        )}

        {/* Download Word */}
        {wordUrl && (
          <Button type="primary">
            <a href={wordUrl} download="Profile.docx" target="_blank" rel="noopener noreferrer">
              Download Word
            </a>
          </Button>
        )}
      </div>

      <Text strong>Document Viewer:</Text>

      {/* Viewer Section */}
      <div style={{ marginTop: "20px", border: "1px solid #ccc", height: "600px" }}>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
          />
        ) : wordUrl ? (
          <iframe
            src={`https://docs.google.com/gview?url=${wordUrl}&embedded=true`}
            title="Word Document Viewer"
            width="100%"
            height="100%"
          />
        ) : (
          <p>No document available to view.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileViewer;
