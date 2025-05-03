"use client"

import { useState } from "react"
import { Card, Avatar, Input, Button, Space, Grid, Divider, Toast } from "antd-mobile"
import { SmileOutline, HeartOutline, UserAddOutline } from "antd-mobile-icons"
import { findConnectionRequest, updateConnectionRequest } from "../../services/api";

const EngagementCard = () => {
  const [senderId, setSenderId] = useState("")
  const [receiverId, setReceiverId] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async() => {
    if (!senderId || !receiverId) {
      Toast.show({
        content: "Please enter both IDs",
        position: "bottom",
      })
      return
    }

    setLoading(true)
    // Simulate API call
   
    try {
        console.log("sender", senderId, "receiver", receiverId)
  
  
        const result = await updateConnectionRequest({ sender: senderId, receiver: receiverId, status: "ENGGAGED", message: `Congratulation for engaggement of ${receiverId} with ${senderId}` });
  
        if (result) {
          Toast.show({ content: "Status updated to ENGGAGED ✅" });
          setSenderId("");
          setReceiverId("");
        }
      } catch (error) {
        Toast.show({ content: "Something went wrong ❌" });
      } finally {
        setLoading(false);
      }
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>
          <HeartOutline fontSize={28} color="#ff4d4f" />
          <h2 style={styles.title}>Mark Connection as ENGAGED</h2>
          <HeartOutline fontSize={28} color="#ff4d4f" />
        </div>

        <Divider style={styles.divider}>
          <span style={styles.dividerText}>❤️ Connect Two Hearts ❤️</span>
        </Divider>

        <Grid columns={2} gap={16}>
          {/* Bride Side */}
          <Grid.Item>
            <div style={styles.personContainer}>
              <div style={styles.avatarContainer}>
                <Avatar
                  src="https://placeholder.svg?height=80&width=80"
                  style={{
                    ...styles.avatar,
                    background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
                    border: "2px solid #ff9a9e",
                  }}
                >
                  <span style={styles.avatarText}>👰</span>
                </Avatar>
                <div style={styles.label}>Bride</div>
              </div>

              <Input
                value={senderId}
                onChange={setSenderId}
                placeholder="Enter Bride ID"
                clearable
                style={styles.input}
                prefix={<UserAddOutline fontSize={18} />}
              />
            </div>
          </Grid.Item>

          {/* Groom Side */}
          <Grid.Item>
            <div style={styles.personContainer}>
              <div style={styles.avatarContainer}>
                <Avatar
                  src="https://placeholder.svg?height=80&width=80"
                  style={{
                    ...styles.avatar,
                    background: "linear-gradient(45deg, #a1c4fd, #c2e9fb)",
                    border: "2px solid #a1c4fd",
                  }}
                >
                  <span style={styles.avatarText}>🤵</span>
                </Avatar>
                <div style={styles.label}>Groom</div>
              </div>

              <Input
                value={receiverId}
                onChange={setReceiverId}
                placeholder="Enter Groom ID"
                clearable
                style={styles.input}
                prefix={<UserAddOutline fontSize={18} />}
              />
            </div>
          </Grid.Item>
        </Grid>

        <div style={styles.buttonContainer}>
          <Button color="primary" loading={loading} onClick={handleUpdate} block size="large" style={styles.button}>
            <Space>
              <HeartOutline fontSize={20} />
              Mark as ENGAGED
              <HeartOutline fontSize={20} />
            </Space>
          </Button>
        </div>

        <div style={styles.footer}>
          <SmileOutline fontSize={16} /> Wishing a lifetime of happiness <SmileOutline fontSize={16} />
        </div>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    padding: "16px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(to bottom, #ffffff, #fafafa)",
    overflow: "hidden",
    padding: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  divider: {
    color: "#ff4d4f",
    borderColor: "#ffccc7",
    margin: "16px 0",
  },
  dividerText: {
    fontSize: "14px",
    color: "#ff4d4f",
    padding: "0 12px",
  },
  personContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "16px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    fontSize: "32px",
    marginBottom: "8px",
  },
  avatarText: {
    fontSize: "32px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "8px",
  },
  input: {
    marginBottom: "16px",
    width: "100%",
    "--border-radius": "8px",
  },
  buttonContainer: {
    marginTop: "16px",
  },
  button: {
    "--border-radius": "8px",
    background: "linear-gradient(45deg, #ff9a9e, #ff4d4f)",
    height: "48px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
}

export default EngagementCard
