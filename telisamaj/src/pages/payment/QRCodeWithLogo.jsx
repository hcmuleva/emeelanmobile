import React, { useState } from 'react';
import { SafeArea, Button, Input, Toast, Card, Form, Space, Switch, List } from 'antd-mobile';
import { QRCodeSVG } from 'qrcode.react';

const DynamicUPIPaymentQR = () => {
  const [form] = Form.useForm();
  const [merchantForm] = Form.useForm();
  const [qrValue, setQrValue] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [showQR, setShowQR] = useState(false);
  const [isFixedAmount, setIsFixedAmount] = useState(false);
  const [merchantData, setMerchantData] = useState(null);

  const generateUPILink = (merchantInfo, amount = null, note = '') => {
    const upiUrl = new URL('upi://pay');
    
    // Required parameters
    upiUrl.searchParams.append('pa', merchantInfo.upiId);
    upiUrl.searchParams.append('pn', merchantInfo.payeeName);
    
    // Optional parameters
    if (amount) {
      upiUrl.searchParams.append('am', amount.toString());
    }
    if (note) {
      upiUrl.searchParams.append('tn', note);
    }
    
    return upiUrl.toString();
  };

  const handleMerchantSetup = (values) => {
    setMerchantData(values);
    
    // Generate QR code based on fixed amount preference
    const upiLink = generateUPILink(values, isFixedAmount ? values.defaultAmount : null, values.defaultNote);
    setQrValue(upiLink);
    setLogoUrl(values.logoUrl || '');
    setShowQR(true);
    
    Toast.show({
      content: 'UPI Payment QR Code generated successfully!',
    });
  };

  const regenerateQR = () => {
    if (!merchantData) return;
    
    const values = form.getFieldsValue();
    const amount = isFixedAmount ? values.amount : null;
    const note = values.note || merchantData.defaultNote;
    
    const upiLink = generateUPILink(merchantData, amount, note);
    setQrValue(upiLink);
    setShowQR(true);
    
    Toast.show({
      content: 'QR Code updated with new details!',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue).then(() => {
      Toast.show({
        content: 'UPI link copied to clipboard!',
      });
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = qrValue;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      Toast.show({
        content: 'UPI link copied!',
      });
    });
  };

  const downloadQR = () => {
    const svg = document.getElementById('upi-qrcode-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = qrSize;
        canvas.height = qrSize;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'upi-payment-qr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  if (!merchantData) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <SafeArea position="top" />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">UPI Payment Setup</h1>
          
          <Card title="Merchant Details">
            <Form form={merchantForm} onFinish={handleMerchantSetup} mode="card" layout="vertical">
              <Form.Item 
                label="UPI ID" 
                name="upiId"
                rules={[{ required: true, message: 'Please enter UPI ID' }]}
              >
                <Input placeholder="Enter UPI ID (e.g., example@upi)" />
              </Form.Item>
              
              <Form.Item 
                label="Business Name" 
                name="payeeName"
                rules={[{ required: true, message: 'Please enter business name' }]}
              >
                <Input placeholder="Enter your business name" />
              </Form.Item>
              
              <Form.Item label="Default Note" name="defaultNote">
                <Input placeholder="Enter default transaction note" />
              </Form.Item>
              
              <Form.Item label="Default Amount (for fixed QR)" name="defaultAmount">
                <Input type="number" placeholder="Enter default amount" />
              </Form.Item>
              
              <Form.Item label="Logo URL" name="logoUrl">
                <Input placeholder="Enter logo URL (optional)" />
              </Form.Item>
              
              <Form.Item>
                <List.Item
                  title="Fixed Amount QR"
                  description="Generate QR with a specific amount"
                  extra={
                    <Switch
                      checked={isFixedAmount}
                      onChange={(checked) => setIsFixedAmount(checked)}
                    />
                  }
                />
              </Form.Item>
              
              <Button block color="primary" type="submit" className="mt-4">
                Generate Payment QR
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SafeArea position="top" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {merchantData.payeeName}
        </h1>
        
        {isFixedAmount && (
          <Card title="Transaction Details" className="mb-6">
            <Form form={form} mode="card" layout="vertical">
              <Form.Item 
                label="Amount" 
                name="amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <Input type="number" placeholder="Enter payment amount" />
              </Form.Item>
              
              <Form.Item label="Note" name="note">
                <Input placeholder="Enter transaction note" />
              </Form.Item>
              
              <Button block color="primary" onClick={regenerateQR} className="mt-4">
                Update QR Code
              </Button>
            </Form>
          </Card>
        )}
        
        {showQR && (
          <Card title={isFixedAmount ? "Fixed Amount QR" : "Dynamic Amount QR"}>
            <div className="flex flex-col items-center">
              <div className="qr-code-preview">
                <QRCodeSVG
                  id="upi-qrcode-svg"
                  value={qrValue}
                  size={qrSize}
                  level="H"
                  includeMargin={true}
                  imageSettings={logoUrl ? {
                    src: logoUrl,
                    height: 50,
                    width: 50,
                    excavate: true,
                  } : null}
                />
              </div>
              
              <Space direction="vertical" className="w-full mt-6">
                <Button 
                  block 
                  onClick={copyToClipboard}
                >
                  Copy UPI Link
                </Button>
                
                <Button 
                  block 
                  color="primary"
                  onClick={downloadQR}
                >
                  Download QR Code
                </Button>
                
                <Button 
                  block 
                  onClick={() => setMerchantData(null)}
                >
                  Reset Setup
                </Button>
              </Space>
              
              <div className="mt-6 text-sm text-gray-600 w-full">
                <p>UPI Link:</p>
                <p className="bg-gray-100 p-3 rounded mt-2 text-xs break-all">
                  {qrValue}
                </p>
              </div>
              
              <div className="mt-4 text-sm text-center text-gray-600">
                <p>
                  {isFixedAmount 
                    ? "Fixed amount QR code - preset amount" 
                    : "Dynamic QR code - customer enters amount"
                  }
                </p>
                <p className="mt-2">Scan with any UPI app to make payment</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DynamicUPIPaymentQR;