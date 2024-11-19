import React, { useEffect, useState } from 'react';
import { Layout, Card, Button, Tabs, Form, Input, Upload, message, Row, Col, Spin } from 'antd';
import { EnvironmentOutlined, UserOutlined, CalendarOutlined, PhoneOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useOne, useUpdate } from "@refinedev/core";
import PhotoComponent from './PhotoComponent';
import ProfileCard from './ProfileCard';
import EditProfile from './EditProfile'
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function MyProfile() {
  const userid = localStorage.getItem("userid");
  const [images, setImages] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);
  const [profilePhotos,setProfilePhotos]=useState([])
  const [user, setUser] = useState({
    FirstName: "Harish",
    LastName: "Muleva",
    profilePicture: "https://picsum.photos/seed/picsum/200/300",
    photos: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100"
    ],
    home_address: "Bangalore",
    State: "NY",
    Sex: "Male",
    marital: "Single",
    Language: "English",
    Height: "5'10\"",
    Samaj: "Seervi Samaj",
    Gotra: "Muleva",
    DOB: "1990-01-01",
    mobile: "+91234567890",
    email: "harish@hph.com",
    HighestDegree: "Bachelor's",
    Profession: "Software Engineer",
    AboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat"
  });
  
  console.log("Before",user)
  
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
  useEffect(() => {
    if (data?.data) {
      setProfilePhotos(data?.data?.photos??[
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100"
      ])
      
      setUser({...user,...data.data});
    }
    console.log("DATA ",data?.data)
  }, [data]);
  console.log("after",user)

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = (values) => {
    setUser({ ...user, ...values });
    setEdit(false);
    message.success('Profile updated successfully');
  };

  const customProfileRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("files", file);

    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((response) => {
        const img = {
          uid: response?.data?.[0]?.id,
          name: response?.data?.[0]?.name,
          url: response?.data?.[0]?.url,
        };
        setProfilePicture([img]);
        flag1 = true;
        onSuccess(response?.data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
        onError(error);
      });
  };
  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("files", file);

    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((response) => {
        const img = {
          uid: response?.data?.[0]?.id,
          name: response?.data?.[0]?.name,
          url: response?.data?.[0]?.url,
        };
        let newImages = images.filter((user) => typeof user.uid === "number");
        newImages.push(img);
        setImages(newImages);
        flag = true;
        onSuccess(response?.data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
        onError(error);
      });
  };
  const handleProfileChange = ({fileList}) => {
    if (!flag1){
      setProfilePicture(fileList)
    }
    flag1 = false
  }
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log("user object", user)  /** 
  Profile has three section:
  1) Image:
      How to take a form component when user can simply call this component
  2) View Profile
  3) Edit Profile


 */

  return (
    <Layout>
      <Content style={{ padding: '10px' }}>
        {/* <ProfileCard user={user}/> */}
        <EditProfile user={user}/>

        {/* <PhotoComponent user={user}/> */}
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