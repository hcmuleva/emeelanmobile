import { Card, Avatar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import './AutoScroll.css'; // custom CSS for animation

const Marquee = ({ mockSuggestion }) => {
  const navigate = useNavigate();
  console.log("Marquee mockSuggestion", mockSuggestion, " end") 
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h3 style={{ margin: '0', fontSize: '16px' }}>Suggestions</h3>
        <span style={{ color: '#D30000', fontWeight: 'bold' }}>22</span>
      </div>

      <Card style={{ borderRadius: '12px', marginBottom: '16px', padding: '0px' }}>
        <div className="scroll-container">
          <div className="scroll-content">
            {mockSuggestion.map((user) => (
              <div key={user.id} className="scroll-item">
                <Avatar
                  src={user.avatar}
                  style={{
                    '--size': '60px',
                    borderRadius: '8px',
                    marginBottom: '4px'
                  }}
                />
                <div style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }}>
                  {user.name}, {user.age}
                </div>
              </div>
            ))}

            <div
              className="scroll-item"
              onClick={() => navigate('/profiles')}
              style={{ fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer' }}
            >
              View More
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Marquee;
