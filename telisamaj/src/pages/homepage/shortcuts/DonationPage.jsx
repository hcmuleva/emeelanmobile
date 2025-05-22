import React, { useContext, useState } from "react";
import { UnderConstruction } from "../UnderConstructionProps";
import { Button } from "antd-mobile";
import DynamicUPIPaymentQR from "../../payment/QRCodeWithLogo";
import { AuthContext } from "../../../context/AuthContext";
import Donation from "../../../components/featuretiles/Donation";

export default function DonationPage() {
  const { user } = useContext(AuthContext);
  const [showConstruction, setShowConstruction] = useState(true);
  const handleBack = () => {
    setShowConstruction(false);
  };

  return (
    <>
      <Donation />
      {/*     
          {showConstruction ? (
            <UnderConstruction
              title="Feature Coming Soon"
              description="Our team is working on this exciting new feature. We appreciate your patience!"
              estimatedCompletion="Expected: May 2025"
              onBackClick={handleBack}
              backText="Return to Home"
            />
          ) : (
            <div className="p-4">
              <h1 className="mb-4 text-xl font-bold">Welcome to the App</h1>
              <p className="mb-4">This is the main content of your application.</p>
              <Button color="primary" onClick={() => setShowConstruction(true)}>
                Show Construction Page
              </Button>
            </div>
          )} */}
    </>
  );
}
