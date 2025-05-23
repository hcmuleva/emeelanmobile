"use client";

import { useState } from "react";
import {
  Card,
  Avatar,
  Input,
  Button,
  Space,
  Grid,
  Divider,
  Toast,
  List,
} from "antd-mobile";
import { SmileOutline, HeartOutline, UserAddOutline } from "antd-mobile-icons";
import {
  findConnectionRequest,
  updateConnectionStatus,
} from "../../services/api";

const EngagementCard = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(null);

  const handleSearch = async () => {
    // Validate input: ensure IDs are numeric
    if (!senderId || !receiverId || isNaN(senderId) || isNaN(receiverId)) {
      Toast.show({
        content: "Please enter valid numeric IDs for both users",
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    try {
      const foundConnection = await findConnectionRequest(senderId, receiverId);
      if (
        foundConnection &&
        foundConnection?.data?.attributes?.status.toUpperCase() === "ACCEPTED"
      ) {
        setConnection(foundConnection?.data);
        Toast.show({
          content: `Accepted connection found (ID: ${foundConnection.id})`,
          position: "top",
        });
      } else {
        setConnection(null);
        Toast.show({
          content: "No accepted connection found between these users",
          position: "top",
        });
      }
    } catch (error) {
      Toast.show({
        content: `Error fetching connection: ${error.message}`,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (
      !connection ||
      connection?.attributes?.status.toUpperCase() !== "ACCEPTED"
    ) {
      Toast.show({
        content: "No valid ACCEPTED connection to update",
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await updateConnectionStatus(connection.id, {
        status: "ENGAGED",
        message: `Congratulations on the engagement of ${
          connection?.attributes?.sender?.id || "User"
        } with ${connection?.attributes?.receiver?.id || "User"}`,
      });

      if (result) {
        Toast.show({
          content: `Status updated to ENGAGED for connection ID: ${connection.id} ✅`,
          position: "top",
        });
        setSenderId("");
        setReceiverId("");
        setConnection(null);
      }
    } catch (error) {
      Toast.show({
        content: `Error updating status: ${error.message} ❌`,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

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
                onChange={(value) => setSenderId(value.trim())}
                placeholder="Enter Bride ID"
                clearable
                type="number" // Restrict to numeric input
                style={styles.input}
                prefix={<UserAddOutline fontSize={18} />}
              />
            </div>
          </Grid.Item>
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
                onChange={(value) => setReceiverId(value.trim())}
                placeholder="Enter Groom ID"
                clearable
                type="number" // Restrict to numeric input
                style={styles.input}
                prefix={<UserAddOutline fontSize={18} />}
              />
            </div>
          </Grid.Item>
        </Grid>

        <div style={styles.buttonContainer}>
          <Button
            color="primary"
            loading={loading}
            disabled={loading}
            onClick={handleSearch}
            block
            style={styles.button}
          >
            <Space>
              <HeartOutline fontSize={20} />
              Find Accepted Connection
              <HeartOutline fontSize={20} />
            </Space>
          </Button>
        </div>

        {connection && (
          <div style={{ marginTop: "16px" }}>
            <h3
              style={{ fontSize: "16px", color: "#333", textAlign: "center" }}
            >
              Accepted Connection (ID: {connection.id})
            </h3>
            <List>
              {/* Sender Details */}
              <List.Item
                title={`Bride: ${
                  connection.attributes.sender.FirstName ||
                  connection.attributes.sender.username
                }`}
                description={
                  <div>
                    <div>ID: {connection.attributes.sender.id}</div>
                    <div>Age: {connection.attributes.sender.age}</div>
                    <div>Height: {connection.attributes.sender.Height}</div>
                    <div>
                      Status: {connection.attributes.sender.MeritalStatus}
                    </div>
                    <div>Gotra: {connection.attributes.sender.Gotra}</div>
                  </div>
                }
              />

              {/* Receiver Details */}
              <List.Item
                title={`Groom: ${
                  connection.attributes.receiver.FirstName ||
                  connection.attributes.receiver.username
                }`}
                description={
                  <div>
                    <div>ID: {connection.attributes.receiver.id}</div>
                    <div>Age: {connection.attributes.receiver.age}</div>
                    <div>Height: {connection.attributes.receiver.Height}</div>
                    <div>
                      Status: {connection.attributes.receiver.MeritalStatus}
                    </div>
                    <div>Gotra: {connection.attributes.receiver.Gotra}</div>
                  </div>
                }
              />

              {/* Connection Details */}
              <List.Item
                title="Status"
                description={connection.attributes.status}
              />
              <List.Item
                title="Message"
                description={connection.attributes.message || "No message"}
              />
              <List.Item
                title="Created At"
                description={new Date(
                  connection.attributes.createdAt
                ).toLocaleString()}
              />
            </List>
            <Button
              color="success"
              loading={loading}
              disabled={loading}
              onClick={handleUpdate}
              block
              size="large"
              style={styles.button}
            >
              <Space>
                <HeartOutline fontSize={20} />
                Mark as ENGAGED
                <HeartOutline fontSize={20} />
              </Space>
            </Button>
          </div>
        )}

        <div style={styles.footer}>
          <SmileOutline fontSize={16} /> Wishing a lifetime of happiness{" "}
          <SmileOutline fontSize={16} />
        </div>
      </Card>
    </div>
  );
};

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
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
};

export default EngagementCard;
