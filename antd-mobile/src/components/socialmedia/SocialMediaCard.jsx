import { useState } from "react"
import { Card, Avatar, Button, Space, List, Divider, Toast, AutoCenter, Grid } from "antd-mobile"
import { ShareAltOutlined, DownloadOutlined } from "@ant-design/icons"
export default function SocialMediaCard() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Harish Muleva - Sr. Architect Dell",
        text: "Connect with Harish Muleva on सीखो गठजोड़",
        url: window.location.href,
      })
    } else {
      // Copy URL to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          Toast.show({
            content: "Link copied to clipboard!",
            position: "bottom",
          })
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          Toast.show({
            content: "Failed to copy link",
            position: "bottom",
          })
        })
    }
  }

  const bulletPoints = [
    "5000से ज़्यादा लड़के लड़कियों की प्रोफाइल",
    "देश विदेश हर जगह से रिश्ते",
    "रिश्ते बनाने के लिए पारिवारिक, व्यापारिक नौकरी सम्बंधित पूरी जानकारी के लिए हमारी 300 से ज्यादा एडमिन की टीम, आपकी मदद के लिए हर पल तैयार",
    "आपकी प्राइवेसी, गोपनीयता और सुरक्षा के तरीकों का विशेष ध्यान",
    "पहली बार आप किसी पसंद की प्रोफाइल को रिक्वेस्ट भेज सकते हैं और आपकी रिक्वेस्ट का डिटेल भी देख सकेंगे",
  ]

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <Avatar
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YGCpEYhIEVW3ZtLm1k1dOr8uT700sd.png"
            style={styles.avatar}
            fit="contain"
          />
          <Space direction="vertical" style={styles.headerText}>
            <div style={styles.name}>Harish Muleva</div>
            <div style={styles.title}>Sr. Architect Dell</div>
            <div style={styles.subtitle}>सीखो गठजोड़</div>
          </Space>
        </div>

        <Divider />
        <Avatar
            src="/logo.svg"
            style={styles.avatar}
            fit="contain"
          />
        {/* Content Section */}
       
          <AutoCenter>
            <div style={styles.heading}>मधुर सम्बन्ध जोड़ने की एक पहल</div>
          </AutoCenter>
          <div style={styles.content}>
          <List style={styles.list}>
            {bulletPoints.map((point, index) => (
              <List.Item key={index} prefix={<div style={styles.bullet}>•</div>} style={styles.listItem}>
                {point}
              </List.Item>
            ))}
          </List>
        </div>

        {/* Action Buttons */}
        <Grid columns={2} gap={8}>
          <Grid.Item>
            <Button color="primary" block onClick={handleShare} style={styles.shareButton}>
              <Space>
                <ShareAltOutlined />
                {copied ? "Copied!" : "Share"}
              </Space>
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button block style={styles.downloadButton}>
              <Space>
                <DownloadOutlined/>
                Download
              </Space>
            </Button>
          </Grid.Item>
        </Grid>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    background: "linear-gradient(to bottom right, #f0f7ff, #e6eeff)",
  },
  card: {
    maxWidth: "450px",
    width: "100%",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    background: "#ffffff",
    padding: "8px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    background: "#f5f7ff",
    borderRadius: "12px",
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%', // makes it round
    border: '2px solid #e5e7eb', // optional border
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: "16px",
    color: "#666",
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#4f46e5', // indigo
  },
  subtitle: {
    fontSize: "16px",
    color: "#4263eb",
    fontWeight: "500",
  },
  content: {
    padding: "16px 8px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4263eb",
    marginBottom: "16px",
  },
  list: {
    "--border-top": "none",
    "--border-bottom": "none",
    "--border-inner": "none",
    "--padding-left": "0",
  },
  listItem: {
    padding: "8px 0",
  },
  bullet: {
    color: "#4263eb",
    fontSize: "18px",
    marginRight: "8px",
  },
  shareButton: {
    "--background-color": "#4263eb",
    "--text-color": "#fff",
  },
  downloadButton: {
    "--background-color": "#fff",
    "--text-color": "#4263eb",
    "--border-color": "#4263eb",
    "--border-width": "1px",
    "--border-style": "solid",
  },
}