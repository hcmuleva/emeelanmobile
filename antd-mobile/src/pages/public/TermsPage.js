import React from 'react';
import { useNavigate } from "react-router-dom";

export const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: 'auto', background: '#fff' }}>
      <h1>Terms and Conditions</h1>
      <p>Last updated: April 13, 2025</p>
      <p>Welcome to our application. By accessing or using this app, you agree to the following terms and conditions.</p>

      <h2>1. Purpose of the App</h2>
      <p>This application is developed and maintained by <strong>Emeelan Pvt. Ltd.</strong> and is intended solely to facilitate social collaboration, problem-solving, and personal communication among users.</p>

      <h2>2. Disclaimer of Liability</h2>
      <ul>
        <li>The content shared by users within the application.</li>
        <li>The accuracy, integrity, or legality of user-submitted data.</li>
        <li>Any damages, losses, or legal claims arising from the use of this platform.</li>
        <li>Protection of personally identifiable information or messages shared by users.</li>
      </ul>

      <h2>3. User Age Requirement</h2>
      <p>By using this application, you confirm that you are at least <strong>18 years of age</strong>.</p>

      <h2>4. Data Privacy</h2>
      <p>We do not guarantee data security or compliance with laws like GDPR or CCPA. Do not share sensitive information.</p>

      <h2>5. Changes to Terms</h2>
      <p>We may update these terms at any time without prior notice. Continued use constitutes acceptance of changes.</p>

      <h2>6. Contact</h2>
      <p>Contact us at <a href="mailto:business@emeelan.com">business@emeelan.com</a>.</p>
       {/* 👇 Back to Login button */}
       <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          backgroundColor: "#1677ff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Login
      </button>
    </div>
  );
};
