import React, { useEffect, useState } from 'react';
import { Layout, Card, Button, Tabs, Form, Input,Space, Upload, message, Row, Col, Spin } from 'antd';
import { EnvironmentOutlined, UserOutlined, CalendarOutlined, PhoneOutlined, BookOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useLogout, useOne, useUpdate } from "@refinedev/core";
//import PhotoComponent from './PhotoComponent';
//import ProfileCard from './ProfileCard';
//import EditProfile from './EditProfile'
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function MyProfile() {
  console.log("Myprofile called")
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [isEditProfile,setIsEditProfile]= useState(false);
  const userid = localStorage.getItem("userid");
  const [images, setImages] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);
  const [profilePhotos,setProfilePhotos]=useState([])
  
  //const { id } = useParams();
  const { data, isLoading } = useOne({
    resource: "users",
    id:userid,
    meta: {
      populate: ["photos","profilePicture", "user_setting"],
    },
  });
  if(isLoading){
    <Spin>
      Page Loading
    </Spin>
  }
    const user=data?.data
  const handleLogout = () => {
    logout(); // Triggers the logout process
  };

  
  return (
    <Layout>
      <Content style={{ padding: '10px' }}>
        <Space>
          <Button color="danger" variant="dashed" onClick={() => navigate('/dashboard')}>Back</Button>
          {!isEditProfile&&<Button color="danger" variant="dashed"   onClick={()=>{setIsEditProfile(true)}}>
            EditProfile
          </Button>}

         {isEditProfile&& <Button color="danger" variant="dashed"   onClick={()=>{setIsEditProfile(false)}}>
            Back To Profile
          </Button>}
          <Button color="danger" variant="dashed"       icon={<LogoutOutlined/>}
 onClick={handleLogout}>Logout</Button>
        </Space>
      
        {/* {!isEditProfile&& <ProfileCard user={user} setIsEditProfile={setIsEditProfile}/>}
        {isEditProfile&&<EditProfile user={user} setIsEditProfile={setIsEditProfile}/>} */}
        <Space>
        {/* <PhotoComponent user={user}/> */}
        </Space>
        {/* <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              <img
                src={user?.profilePicture}
                alt="Profile"
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
              />
            </Col>
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>{user.FirstName} {user.LastName}</h1>
              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col>
                  <Button onClick={handleEdit}>{edit ? 'Cancel' : 'Edit Profile'}</Button>
                </Col>
                <Col>
                  <Button>Photos</Button>
                </Col>
              </Row>
              <Upload
                listType="picture-card"
                fileList={profilePhotos.map((photo, index) => ({
                  uid: index,
                  name: `photo-${index}`,
                  status: 'done',
                  url: photo,
                }))}
              >
                {profilePhotos.length >= 8 ? null : uploadButton}
              </Upload>
           
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Info" key="1">
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <InfoItem icon={<EnvironmentOutlined />} label="Location" value={`${user.home_address}, ${user.State}`} />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <InfoItem icon={<UserOutlined />} label="Personal" value={`${user.Sex}, ${user.marital}, ${user.Language}`} />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <InfoItem icon={<CalendarOutlined />} label="Birthday" value={user.DOB} />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <InfoItem icon={<PhoneOutlined />} label="Contact" value={`${user.mobile}, ${user.email}`} />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <InfoItem icon={<BookOutlined />} label="Education" value={`${user.HighestDegree}, ${user.Profession}`} />
                </Col>
              </Row>
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>About Me</h3>
                <p>{user.AboutMe}</p>
              </div>
            </TabPane>
            <TabPane tab="Family & Other Info" key="2">
              <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Family Information</h3>
              <p>Family information would go here...</p>
            </TabPane>
            <TabPane tab="Preferences" key="3">
              <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Preferences</h3>
              <p>User preferences would go here...</p>
            </TabPane>
          </Tabs>
        </Card> 

        {edit && (
          <Card style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Edit Profile</h2>
            <Form
              name="edit-profile"
              initialValues={user}
              onFinish={handleSave}
              layout="vertical"
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="FirstName" label="First Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="LastName" label="Last Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="email" label="Email">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="mobile" label="Phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="home_address" label="Location">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item name="State" label="State">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="AboutMe" label="About Me">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Save Changes</Button>
              </Form.Item>
            </Form>
          </Card>
        )} */}
      </Content>
    </Layout>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: 8, marginTop: 4 }}>{icon}</div>
      <div>
        <h4 style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}