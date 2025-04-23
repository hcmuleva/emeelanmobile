import { Avatar, Badge, Button, Card } from "antd-mobile";
import { HeartOutline, TeamOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export default function UserSuggestionBar({ users }) {
  const navigate = useNavigate();

  const viewProfile = (userId) => {
    if (userId) navigate(`/profile/${userId}`);
  };

  return (
    <div className="user-suggestions" style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h3 style={{ margin: 0, color: '#8b0000' }}>
          <TeamOutline /> Suggested Matches
        </h3>
        <Button
          size='small'
          color='primary'
          fill='none'
          style={{ color: '#b00000' }}
        // onClick={() => navigate('/all-matches')}
        >
          View All
        </Button>
      </div>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '10px',
        scrollbarWidth: 'none'
      }} className="scroll-hide">
        {users.map(user => (
          <Card
            key={user.id}
            // onClick={() => viewProfile(user.id)}
            style={{
              minWidth: '140px',
              marginRight: '12px',
              borderRadius: '8px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            bodyStyle={{ padding: '12px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Badge content={<HeartOutline fontSize={12} />} color='#b00000'>
                <Avatar
                  src={user.avatar}
                  style={{
                    width: '70px',
                    height: '70px',
                    border: '2px solid #b00000'
                  }}
                />
              </Badge>
              <div style={{
                marginTop: '8px',
                fontSize: '15px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user.name}, {user.age}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user.city}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}