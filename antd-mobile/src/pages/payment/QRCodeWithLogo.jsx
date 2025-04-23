import React, { useEffect, useState } from 'react';
import {
  SafeArea,
  Button,
  Input,
  Toast,
  Card,
  Form,
  Space,
  Switch,
  List,
  NavBar,
} from 'antd-mobile';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUserData, uploadImage } from '../../services/api';

const DynamicUPIPaymentQR = () => {
  const jwt = localStorage.getItem('jwt');
  const [form] = Form.useForm();
  const [merchantForm] = Form.useForm();
  const [qrValue, setQrValue] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [showQR, setShowQR] = useState(false);
  const [isFixedAmount, setIsFixedAmount] = useState(false);
  const [merchantData, setMerchantData] = useState(null);
  const navigate = useNavigate();

  // const checkAdminId = async () => {
  //   const res = await getUserById(merchantData?.adminId, jwt)
  //   if (!res) {
  //     Toast.show("No Admin / SuperAdmin associated with this ID")
  //     return
  //   } else {
  //     handleMerchantSetup()
  //   }
  // }
  // useEffect(() => {
  //   if (!merchantData) { return }
  //   checkAdminId()
  // }, [merchantData]);

  const generateUPILink = (merchantInfo, amount = null, note = '') => {
    const upiUrl = new URL('upi://pay');
    upiUrl.searchParams.append('pa', merchantInfo.upiId);
    upiUrl.searchParams.append('pn', merchantInfo.payeeName);
    if (amount) upiUrl.searchParams.append('am', amount.toString());
    if (note) upiUrl.searchParams.append('tn', note);
    return upiUrl.toString();
  };


  const handleMerchantSetup = async (values) => {
    const user = await getUserById(values.adminId, jwt);
    if (!user || !["ADMIN", "SUPERADMIN"].includes(user.emeelanrole)) {
      Toast.show({ content: 'Admin ID is invalid or unauthorized.' });
      return;
    }

    setMerchantData(values);

    const upiLink = generateUPILink(
      values,
      isFixedAmount ? values.defaultAmount : null,
      values.defaultNote
    );

    setQrValue(upiLink);
    setLogoUrl(values.logoUrl || '');
    setShowQR(true);

    Toast.show({ content: 'UPI Payment QR Code generated successfully!' });
  };

  const handleQrUpdate = async () => {
    const svg = document.getElementById('upi-qrcode-svg');
    if (!svg) return Toast.show({ content: 'QR code not found.' });

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = async () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        try {
          const file = new File([blob], `upi-qr-${Date.now()}.png`, {
            type: 'image/png',
          });
          const formData = new FormData();
          formData.append('files', file);

          const uploaded = await uploadImage(formData, jwt);
          const uploadedFile = uploaded[0];
          await updateUserData({ qrimage: uploadedFile.id }, merchantData.adminId);
          const updated = { ...merchantData, qrimage: uploadedFile };
          localStorage.setItem('user', JSON.stringify(updated));
          Toast.show({ content: 'Admin QR image uploaded successfully!' });
        } catch (err) {
          Toast.show({ content: 'Failed to upload QR image' });
        }
      }, 'image/png');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const regenerateQR = () => {
    if (!merchantData) return;
    const values = form.getFieldsValue();
    const amount = isFixedAmount ? values.amount : null;
    const note = values.note || merchantData.defaultNote;
    const upiLink = generateUPILink(merchantData, amount, note);
    setQrValue(upiLink);
    setShowQR(true);
    Toast.show({ content: 'QR Code updated with new details!' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue).then(() => {
      Toast.show({ content: 'UPI link copied to clipboard!' });
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = qrValue;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      Toast.show({ content: 'UPI link copied!' });
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

  const commonStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    paddingBottom: '5rem',
  };

  const wrapperStyle = {
    maxWidth: '768px',
    margin: '0 auto',
    padding: '1rem',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const verticalGap = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
    marginTop: '1.5rem',
  };

  const linkStyle = {
    backgroundColor: '#f3f4f6',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    wordBreak: 'break-all',
  };

  const infoText = {
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#4b5563',
    textAlign: 'center',
  };

  if (!merchantData) {
    return (
      <div style={commonStyle}>
        <SafeArea position="top" />
        <NavBar
          onBack={() => navigate(-1)}
          style={{
            zIndex: 100,
            position: 'sticky',
            top: 0,
            background: 'brown',
            color: 'white',
          }}
        >
          Create QrCode
        </NavBar>
        <div style={wrapperStyle}>
          <h1 style={titleStyle}>UPI Payment Setup</h1>
          <Card title="Merchant Details">
            <Form form={merchantForm} onFinish={handleMerchantSetup} mode="card" layout="vertical">
              <Form.Item label="Admin ID" name="adminId" rules={[{ required: true, message: 'Please enter Admin ID' }]}>
                <Input placeholder="Enter Admin ID (e.g., 1234)" />
              </Form.Item>
              <Form.Item label="UPI ID" name="upiId" rules={[{ required: true, message: 'Please enter UPI ID' }]}>
                <Input placeholder="Enter UPI ID (e.g., example@upi)" />
              </Form.Item>
              <Form.Item label="Business Name" name="payeeName" rules={[{ required: true, message: 'Please enter business name' }]}>
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
              <Button block color="primary" type="submit" style={{ marginTop: '1rem' }}>
                Generate Payment QR
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={commonStyle}>
      <SafeArea position="top" />
      <NavBar
        onBack={() => navigate(-1)}
        style={{
          zIndex: 100,
          position: 'sticky',
          top: 0,
          background: 'brown',
          color: 'white',
        }}
      >
        Create QrCode
      </NavBar>
      <div style={wrapperStyle}>
        <h1 style={titleStyle}>{merchantData.payeeName}</h1>

        {isFixedAmount && (
          <Card title="Transaction Details" style={{ marginBottom: '1.5rem' }}>
            <Form form={form} mode="card" layout="vertical">
              <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter amount' }]}>
                <Input type="number" placeholder="Enter payment amount" />
              </Form.Item>
              <Form.Item label="Note" name="note">
                <Input placeholder="Enter transaction note" />
              </Form.Item>
              <Button block color="primary" onClick={regenerateQR} style={{ marginTop: '1rem' }}>
                Update QR Code
              </Button>
            </Form>
          </Card>
        )}

        {showQR && (
          <Card title={isFixedAmount ? "Fixed Amount QR" : "Dynamic Amount QR"}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

              <div style={verticalGap}>
                <Button block onClick={copyToClipboard}>Copy UPI Link</Button>
                <Button block color="primary" onClick={downloadQR}>Download QR Code</Button>
                <Button block color="primary" onClick={handleQrUpdate}>Update Admin</Button>
                <Button block onClick={() => setMerchantData(null)}>Reset Setup</Button>
              </div>

              <div style={{ ...infoText, width: '100%' }}>
                <p>UPI Link:</p>
                <p style={linkStyle}>{qrValue}</p>
              </div>

              <div style={infoText}>
                <p>{isFixedAmount ? 'Fixed amount QR code - preset amount' : 'Dynamic QR code - customer enters amount'}</p>
                <p style={{ marginTop: '0.5rem' }}>Scan with any UPI app to make payment</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DynamicUPIPaymentQR;
