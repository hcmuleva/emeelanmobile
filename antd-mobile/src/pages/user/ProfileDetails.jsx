import React, { useContext, useState } from 'react';
import {
  Tabs,
  List,
  Input,
  Button,
  Divider,
  ProgressCircle,
} from 'antd-mobile';
import MobileImageUploader from '../../components/common/MobileImageUploader';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogoutOutlined } from '@ant-design/icons';

const profilePic = 'https://demo.adminkit.io/img/avatars/avatar-4.jpg';

const tabLinks = [
  { key: 'photos', label: 'Photos' },
  { key: 'basic', label: 'Basic Info' },
  { key: 'family', label: 'Family' },
  { key: 'education', label: 'Education' },
  { key: 'profession', label: 'Profession' },
  { key: 'mypreference', label: 'MyPreference' },
  { key: 'MyDetail', label: 'MyDetail' },
  { key: 'settings', label: 'My Settings' },
 
];

const ProfileDetails = () => {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    family: { fatherName: 'John Smith', motherName: 'Mary Smith' },
    education: { degree: 'M.Sc. Computer Science', institution: 'Oxford University' },
    profession: { company: 'ABC Corp', role: 'Software Engineer' },
    mypreference: { language: 'English', location: 'New York' },
    mydetail: { hobbies: 'Reading, Traveling', interests: 'Technology, Music' },
    settings: { notification: 'Enabled', darkMode: 'Disabled' },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log('Saved Data:', formData);
    setEditMode(false);
  };

  return (
    <div style={{ padding: 10 }}>
        <ProgressCircle
          percent={60}
          style={{
            '--fill-color': 'var(--adm-color-success)',
          }}
        >
          60%
        </ProgressCircle>
      <div style={{ display: 'flex', gap: 1 }}>
        {/* Sidebar Links */}
        <div style={{ textAlign: 'center', minWidth: 100 }}>
          <div style={{ marginTop: 20, textAlign: 'left' }}>
            {tabLinks.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  cursor: 'pointer',
                  margin: '6px 0',
                  color: activeTab === tab.key ? '#1677ff' : '#333',
                  fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 8 }}>Alyssa Lee Smith</h2>

          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <Tabs.Tab title="Photos" key="photos">
              <MobileImageUploader />
            </Tabs.Tab>

            <Tabs.Tab title="Basic Info" key="basic">
              <p>Name: Alyssa Lee Smith</p>
            </Tabs.Tab>

            <Tabs.Tab title="Family" key="family">
              <List>
                <List.Item title="Father's Name">
                  {editMode ? (
                    <Input
                      value={formData.family.fatherName}
                      onChange={(val) => handleChange('family', 'fatherName', val)}
                    />
                  ) : (
                    formData.family.fatherName
                  )}
                </List.Item>
                <List.Item title="Mother's Name">
                  {editMode ? (
                    <Input
                      value={formData.family.motherName}
                      onChange={(val) => handleChange('family', 'motherName', val)}
                    />
                  ) : (
                    formData.family.motherName
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

            <Tabs.Tab title="Education" key="education">
              <List>
                <List.Item title="Highest Degree">
                  {editMode ? (
                    <Input
                      value={formData.education.degree}
                      onChange={(val) => handleChange('education', 'degree', val)}
                    />
                  ) : (
                    formData.education.degree
                  )}
                </List.Item>
                <List.Item title="Institution">
                  {editMode ? (
                    <Input
                      value={formData.education.institution}
                      onChange={(val) => handleChange('education', 'institution', val)}
                    />
                  ) : (
                    formData.education.institution
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

            <Tabs.Tab title="Profession" key="profession">
              <List>
                <List.Item title="Company">
                  {editMode ? (
                    <Input
                      value={formData.profession.company}
                      onChange={(val) => handleChange('profession', 'company', val)}
                    />
                  ) : (
                    formData.profession.company
                  )}
                </List.Item>
                <List.Item title="Role">
                  {editMode ? (
                    <Input
                      value={formData.profession.role}
                      onChange={(val) => handleChange('profession', 'role', val)}
                    />
                  ) : (
                    formData.profession.role
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

            <Tabs.Tab title="My Preference" key="mypreference">
              <List>
                <List.Item title="Preferred Language">
                  {editMode ? (
                    <Input
                      value={formData.mypreference.language}
                      onChange={(val) => handleChange('mypreference', 'language', val)}
                    />
                  ) : (
                    formData.mypreference.language
                  )}
                </List.Item>
                <List.Item title="Preferred Location">
                  {editMode ? (
                    <Input
                      value={formData.mypreference.location}
                      onChange={(val) => handleChange('mypreference', 'location', val)}
                    />
                  ) : (
                    formData.mypreference.location
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

            <Tabs.Tab title="My Detail" key="MyDetail">
              <List>
                <List.Item title="Hobbies">
                  {editMode ? (
                    <Input
                      value={formData.mydetail.hobbies}
                      onChange={(val) => handleChange('mydetail', 'hobbies', val)}
                    />
                  ) : (
                    formData.mydetail.hobbies
                  )}
                </List.Item>
                <List.Item title="Interests">
                  {editMode ? (
                    <Input
                      value={formData.mydetail.interests}
                      onChange={(val) => handleChange('mydetail', 'interests', val)}
                    />
                  ) : (
                    formData.mydetail.interests
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

            <Tabs.Tab title="My Settings" key="settings">
              <List>
                <List.Item title="Notification">
                  {editMode ? (
                    <Input
                      value={formData.settings.notification}
                      onChange={(val) => handleChange('settings', 'notification', val)}
                    />
                  ) : (
                    formData.settings.notification
                  )}
                </List.Item>
                <List.Item title="Dark Mode">
                  {editMode ? (
                    <Input
                      value={formData.settings.darkMode}
                      onChange={(val) => handleChange('settings', 'darkMode', val)}
                    />
                  ) : (
                    formData.settings.darkMode
                  )}
                </List.Item>
              </List>
            </Tabs.Tab>

          
          </Tabs>

          {/* Edit/Save Buttons */}
          {activeTab !== 'photos' && activeTab !== 'logout' && (
            <div style={{ marginTop: 16 }}>
              {editMode ? (
                <Button color="primary" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button onClick={() => setEditMode(true)}>Edit</Button>
              )}
            </div>
          )}
        </div>
      </div>
      <Divider style={{ margin: '16px 0' }} />
      <Button 
     
     onClick={async ()=>{
        await authContext.logout()
        navigate('/login', { replace: true });
   }}
      >
               <LogoutOutlined style={{ fontSize: 24, color: '#212121' }} /> Logout
              </Button>
              <Divider style={{ margin: '16px 0' }} />
            
     
    </div>
  );
};

export default ProfileDetails;
