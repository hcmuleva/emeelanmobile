import { List, Popup, SearchBar } from "antd-mobile";
import { CloseOutline, MailOutline, UserOutline } from "antd-mobile-icons";
import React, { useEffect, useState } from "react";
import { getPaginatedAdminUsers } from "../../services/api";
import { PhoneOutlined, MessageOutlined } from "@ant-design/icons";

export const AdminListDialog = ({ visible, onClose }) => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async (searchQuery) => {
    try {
      setLoading(true);
      const data = await getPaginatedAdminUsers(); 
      setAdmins(data?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchAdmins(search);
    }
  }, [search, visible]);

  // Filter users based on search
  const filteredAdmins = admins.filter(user => {
    const searchLower = search.toLowerCase();
    return (
      (user?.username && user.username.toLowerCase().includes(searchLower)) ||
      (user?.FirstName && user.FirstName.toLowerCase().includes(searchLower)) ||
      (user?.LastName && user.LastName.toLowerCase().includes(searchLower)) ||
      (user?.email && user.email.toLowerCase().includes(searchLower)) ||
      (user?.Gotra && user.Gotra.toLowerCase().includes(searchLower)) ||
      (user?.PhoneNumber && user.PhoneNumber.includes(searchLower))
    );
  });

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleMessage = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber}`;
    }
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="bottom"
      bodyStyle={{
        height: "80vh",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        paddingTop: "8px",
        paddingBottom: "24px",
        backgroundColor: "#F8F9FA",
        overflowY: "auto"
      }}
    >
      <div>
        {/* Header with close button */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #EAEAEA"
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: "18px", 
            fontWeight: "600",
            color: "#333" 
          }}>
            Admin List
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CloseOutline fontSize={22} color="#666" />
          </button>
        </div>

        {/* Search bar */}
        <div style={{ padding: "12px 16px" }}>
          <SearchBar
            placeholder="Search admin..."
            onChange={(value) => setSearch(value)}
            style={{ 
              "--border-radius": "8px",
              "--background": "#FFFFFF",
              "--height": "36px",
              "--padding-left": "12px"
            }}
          />
        </div>
        
        {/* Status indicator */}
        <div style={{ padding: "0 16px 8px" }}>
          <p style={{ 
            margin: 0, 
            fontSize: "13px", 
            color: "#666"
          }}>
            {loading ? "Loading..." : `${filteredAdmins.length} admins found`}
          </p>
        </div>
        
        {/* Admin List */}
        <List style={{ 
          "--border-inner": "none", 
          "--border-top": "none", 
          "--border-bottom": "none",
          "--padding-left": "16px",
          "--padding-right": "16px"
        }}>
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((user) => (
              <List.Item
                key={user?.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
                }}
                prefix={
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: "8px", 
                    overflow: "hidden",
                    backgroundColor: "#EAEAEA",
                    marginRight: "12px"
                  }}>
                    <img
                      src={user?.profilePicture?.url || "https://dummyimage.com/48x48/ccc/fff&text=NA"}
                      alt="profile"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover" 
                      }}
                    />
                  </div>
                }
                extra={
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <button
                      onClick={() => handleCall(user?.PhoneNumber)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        backgroundColor: "#e6f7ff",
                        cursor: "pointer"
                      }}
                    >
                      <PhoneOutlined style={{ color: "#1890ff", fontSize: 16 }} />
                    </button>
                    <button
                      onClick={() => handleMessage(user?.PhoneNumber)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        backgroundColor: "#f6ffed",
                        cursor: "pointer"
                      }}
                    >
                      <MessageOutlined style={{ color: "#52c41a", fontSize: 16 }} />
                    </button>
                  </div>
                }
              >
                <div>
                  <div style={{ marginBottom: "2px" }}>
                    <span style={{ 
                      fontSize: "15px", 
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      {[user?.FirstName, user?.LastName].filter(Boolean).join(" ")}
                    </span>
                  </div>
                  
                  {user?.username && (
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#666",
                      marginBottom: "2px" 
                    }}>
                      @{user.username}
                    </div>
                  )}
                  
                  {user?.email && (
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginBottom: "2px"
                    }}>
                      <MailOutline fontSize={12} color="#888" />
                      {user?.email}
                    </div>
                  )}
                  
                  {user?.PhoneNumber && (
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <PhoneOutlined style={{ fontSize: 12, color: "#888" }} />
                      {user?.PhoneNumber}
                    </div>
                  )}
                </div> 
              </List.Item>
            ))
          ) : (
            <div style={{ 
              padding: "20px 16px", 
              textAlign: "center", 
              color: "#666",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              marginTop: "8px"
            }}>
              {loading ? "Loading admins..." : "No admins found"}
            </div>
          )}
        </List>
      </div>
    </Popup>
  );
};