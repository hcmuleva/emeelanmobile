import React, { useContext, useState } from 'react'
import { UnderConstruction } from '../UnderConstructionProps'
import { Button } from 'antd-mobile'
import DynamicUPIPaymentQR from '../../payment/QRCodeWithLogo'
import { AuthContext } from '../../../context/AuthContext'

export default function Donation() {
  const { user } = useContext(AuthContext)
  const [showConstruction, setShowConstruction] = useState(true)
  console.log("Donation Page called")
  const handleBack = () => {
    setShowConstruction(false)
  }

  return (
    <>
      {(user?.emeelanrole === "SUPERADMIN") ? (
        <DynamicUPIPaymentQR />
      ) : (
        <h1>DONATION PAGE</h1>
      )}

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
  )
}

