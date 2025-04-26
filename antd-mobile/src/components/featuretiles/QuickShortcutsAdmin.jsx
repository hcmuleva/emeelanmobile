import { Card, Grid } from "antd-mobile";
import { TeamOutline, UserAddOutline } from "antd-mobile-icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function QuickShortcutsAdmin() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const shortcuts = [
    { icon: <TeamOutline />, text: 'Verify Profiles', path: '/profiles' },
    { icon: <UserAddOutline />, text: 'Create News', path: '/create-news' },
  ];
  return (
    <Card style={{
      marginBottom: '16px',
      borderRadius: '8px',
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#8b0000' }}>Quick Actions</h3>
      <Grid columns={2} gap={8}>
        {shortcuts.map((item, index) => (
          <Grid.Item key={index}>
            <div
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                backgroundColor: index === 0 ? 'rgba(180, 0, 0, 0.07)' : '#f5f5f5',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '24px',
                color: '#b00000',
                marginBottom: '8px',

              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '12px', textAlign: "center" }}>{item.text}</div>
            </div>
          </Grid.Item>
        ))}
      </Grid>
    </Card>
  )
}