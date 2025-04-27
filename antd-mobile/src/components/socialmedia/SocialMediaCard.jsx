import { useState, useRef } from "react"
import {
  Card,
  Avatar,
  Button,
  Space,
  List,
  Divider,
  Toast,
  AutoCenter,
  Grid,
  Collapse
} from "antd-mobile"
import { ShareAltOutlined, DownloadOutlined } from "@ant-design/icons"
import { AuthContext } from "../../context/AuthContext"
import { useOutletContext } from "react-router-dom"

export default function SocialMediaCard() {
  const {user} = useOutletContext(AuthContext)
  const [copied, setCopied] = useState(false)
  const cardRef = useRef(null)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Harish Muleva - Sr. Architect Dell',
        text: 'Connect with Harish Muleva on सीखो गठजोड़',
        url: window.location.href,
      })
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          Toast.show({ content: 'Link copied to clipboard!', position: 'bottom' })
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(() => {
          Toast.show({ content: 'Failed to copy link', position: 'bottom' })
        })
    }
  }

  const bulletPoints = [
    '5000से ज़्यादा लड़के लड़कियों की प्रोफाइल',
    'देश विदेश हर जगह से रिश्ते',
    'रिश्ते बनाने के लिए पारिवारिक, व्यापारिक नौकरी सम्बंधित पूरी जानकारी के लिए हमारी 300 से ज्यादा एडमिन की टीम, आपकी मदद के लिए हर पल तैयार',
    'आपकी प्राइवेसी, गोपनीयता और सुरक्षा के तरीकों का विशेष ध्यान',
    'पहली बार आप किसी पसंद की प्रोफाइल को रिक्वेस्ट भेज सकते हैं और आपकी रिक्वेस्ट का डिटेल भी देख सकेंगे',
  ]

  const lockScrollPosition = () => {
    const scrollY = window.scrollY
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY })
    })
  }

  const Header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YGCpEYhIEVW3ZtLm1k1dOr8uT700sd.png"
        style={{ '--size': '56px' }}
        fit="contain"
      />
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Harish Muleva</div>
        <div style={{ fontSize: 14, color: '#666' }}>Sr. Architect Dell</div>
        <div style={{ fontSize: 13, color: '#888' }}>सीखो गठजोड़</div>
      </div>
    </div>
  )

  return (
    <div>
      <div ref={cardRef}>
        <Card style={{ borderRadius: 16, boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }}>
          <Collapse
            defaultActiveKey={['1']}
            bordered={true}
            onChange={lockScrollPosition}
            expandIconPosition="end"
          >
            <Collapse.Panel key="1" title={Header} >
              <Divider style={{ margin: '16px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Avatar src="/logo.svg" style={{ '--size': '56px' }} />
                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#1d1d1f' }}>
                  मधुर सम्बन्ध जोड़ने की एक पहल
                </div>
              </div>

              <List style={{ '--padding-left': '16px' }}>
                {bulletPoints.map((point, index) => (
                  <List.Item key={index} prefix={<span style={{ color: '#4f46e5', fontSize: 20 }}>•</span>}>
                    <span style={{ fontSize: 15, color: "#444444" }}>{point}</span>
                  </List.Item>
                ))}
              </List>

              <Grid columns={2} gap={12} style={{ marginTop: 24 }}>
                <Grid.Item>
                  <Button
                    color="primary"
                    block
                    style={{
                      borderRadius: 24,
                      fontWeight: 600,
                      fontSize: 16,
                      padding: '10px 0'
                    }}
                    onClick={handleShare}
                  >
                    <Space>
                      <ShareAltOutlined />
                      {copied ? 'Copied!' : 'Share'}
                    </Space>
                  </Button>
                </Grid.Item>
                <Grid.Item>
                  <Button
                    block
                    style={{
                      borderRadius: 24,
                      fontWeight: 600,
                      fontSize: 16,
                      padding: '10px 0',
                      border: '1px solid #4f46e5',
                      color: '#4f46e5'
                    }}
                  >
                    <Space>
                      <DownloadOutlined />
                      Download
                    </Space>
                  </Button>
                </Grid.Item>
              </Grid>
            </Collapse.Panel>
          </Collapse>
        </Card>
      </div>
    </div>
  )
}
