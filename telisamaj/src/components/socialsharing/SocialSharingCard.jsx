"use client"

import { useState } from "react"
import { Card, Avatar, Button, Tabs, Input, Badge, Dialog, Space, Divider, Toast } from "antd-mobile"
import {  RightOutline, SystemQRcodeOutline, TravelOutline } from "antd-mobile-icons"
import "./social-sharing-card.css"
import { AppstoreAddOutlined } from "@ant-design/icons"

const SocialSharingCard = ({
  name = "Harish Muleva",
  profileImage = "/placeholder.svg?height=100&width=100",
  occupation = "Software Architect",
  referralId = "REF123456",
  appUrl = "https://example.com/app",
  description = "Join our community and connect with thousands of like-minded individuals. Use my referral code to get started!",
  logoUrl = "logo.png",
}) => {
  const [copied, setCopied] = useState(false)
  const referralLink = `${appUrl}?ref=${referralId}`

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    Toast.show({
      content: "Copied to clipboard!",
      position: "bottom",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Connect with ${name}`,
          text: `Join using my referral: ${referralId}`,
          url: referralLink,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyToClipboard(referralLink)
    }
  }

  const showQRCode = () => {
    Dialog.show({
      title: "Scan QR Code to Connect",
      content: (
        <div className="qr-code-dialog">
          <div className="qr-code-large">
            <SystemQRcodeOutline />
          </div>
          <p className="qr-code-text">
            Scan this code to connect with {name} using referral ID: {referralId}
          </p>
        </div>
      ),
      closeOnAction: true,
      actions: [
        {
          key: "close",
          text: "Close",
        },
      ],
    })
  }

  return (
    <Card className="social-sharing-card">
      <div className="card-header">
        {logoUrl && (
          <div className="app-logo">
            <img src={logoUrl || "/placeholder.svg"} alt="App Logo" />
          </div>
        )}
        <div className="profile-section">
          <Avatar src={profileImage} className="profile-avatar" />
          <div className="profile-info">
            <h3 className="profile-name">{name}</h3>
            {occupation && <p className="profile-occupation">{occupation}</p>}
            <Badge content={`ID: ${referralId}`} className="referral-badge" />
          </div>
        </div>
      </div>

      <Divider />

      <div className="card-content">
        <p className="description">{description}</p>

        <Tabs>
          <Tabs.Tab title="Referral Link" key="link">
            <div className="referral-link-section">
              <Input value={referralLink} readOnly className="referral-input" placeholder="Referral Link" />
              <Button className="copy-button" onClick={() => copyToClipboard(referralLink)}>
                {copied ? <AppstoreAddOutlined /> : <AppstoreAddOutlined />}
              </Button>
            </div>
          </Tabs.Tab>
          <Tabs.Tab title="QR Code" key="qr">
            <div className="qr-code-section" onClick={showQRCode}>
              <div className="qr-code">
                <SystemQRcodeOutline />
              </div>
              <p className="qr-hint">Tap to enlarge</p>
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>

      <div className="card-footer">
        <Space block justify="around">
          <Button className="share-button" onClick={shareProfile}>
            <TravelOutline /> Share Profile
          </Button>
          <Button color="primary" className="connect-button" onClick={() => window.open(appUrl, "_blank")}>
            Connect Now <RightOutline />
          </Button>
        </Space>
      </div>
    </Card>
  )
}

export default SocialSharingCard
