import { useState, useEffect } from "react";
import { useGetIdentity, useLogout, useUpdate } from "@refinedev/core";
import {
  Card,
  Image,
  Tag,
  Descriptions,
  Row,
  Col,
  Button,
  Input,
  Form,
  Tabs,
  Select,
  DatePicker,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import dayjs from "dayjs";

function UserProfile() {
  const { data: userData } = useGetIdentity();
  const { mutate } = useUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("usermeelan");
  const [form] = Form.useForm();
  const [width, setWidth] = useState(window.innerWidth);
  const [usermeelan, setUserMeelan] = useState(null);
  const { mutate: logout } = useLogout();
  useEffect(() => {
    if (userData?.usermeelan) {
      setUserMeelan({
        ...userData.usermeelan,
        ...userData,
      });
      form.setFieldsValue({
        ...userData.usermeelan,
        userData: { userData, usermeelan: null },
      });
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
    const DOB = usermeelan.DOB ? dayjs(usermeelan.DOB) : null;
    const values = { ...usermeelan, ...userData, DOB };
    form.setFieldsValue(values);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      mutate({
        resource: "usermeelans",
        values,
        id: usermeelan.id,
      });
      setUserMeelan({ ...usermeelan, ...values });
      setIsEditing(false);
    });
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderField = (label, field) => (
    <Descriptions.Item label={label}>
      {field && usermeelan ? usermeelan[field] : ""}
    </Descriptions.Item>
  );

  const renderFormField = (label, field) => {
    if (field === "Sex") {
      return (
        <Form.Item name={field} label={label}>
          <Select>
            <Select value={"Male"}></Select>
            <Select value={"Female"}></Select>
          </Select>
        </Form.Item>
      );
    }

    if (field === "DOB") {
      return (
        <Form.Item name={field} label={label}>
          <DatePicker />
        </Form.Item>
      );
    }

    return (
      <Form.Item name={field} label={label}>
        <Input />
      </Form.Item>
    );
  };

  const handleSignOut = () => {
    logout();
  };

  const renderTabContent = (tabKey) => {
    const fields = {
      usermeelan: [
        { label: "Name", field: "FirstName" },
        { label: "Username", field: "username" },
        { label: "Email", field: "email" },
        { label: "Role", field: "emeelanrole" },
        { label: "Gender", field: "Sex" },
        { label: "DOB", field: "DOB" },
        { label: "Marital Status", field: "MeritalStatus" },
        { label: "Profession", field: "Profession" },
        { label: "Mobile", field: "MobileNumber" },
        { label: "Phone", field: "PhoneNumber" },
        { label: "Gotra", field: "Gotra" },
        { label: "City", field: "City" },
        { label: "District", field: "district" },
        { label: "Village", field: "Village" },
        { label: "Area", field: "area" },
        { label: "Bera", field: "bera" },
        { label: "Father's Name", field: "FatherName" },
        { label: "Father's Occupation", field: "father_occupation" },
        { label: "Mother's Name", field: "MotherName" },
        { label: "Grandfather's Name", field: "GrandFatherName" },
        { label: "Nanaji's Name", field: "NanajiName" },
        { label: "Birth Time", field: "birth_time" },
        { label: "Birth Place", field: "birth_place" },
        { label: "Manglik", field: "manglik" },
        { label: "Have Children", field: "have_child" },
        { label: "Relationship Type", field: "relationship_type" },
        { label: "Home Address", field: "home_address" },
        { label: "Shop Address", field: "shop_address" },
      ],
      address: [
        { label: "Home Address", field: "home_address" },
        { label: "Shop Address", field: "shop_address" },
        { label: "City", field: "City" },
        { label: "District", field: "district" },
        { label: "Village", field: "Village" },
        { label: "Area", field: "area" },
      ],
      education: [
        { label: "Highest Degree", field: "HighestDegree" },
        { label: "Last College", field: "LastCollege" },
        { label: "Additional Qualification", field: "AdditionalQualification" },
      ],
      business: [
        { label: "Company Name", field: "CompanyName" },
        { label: "Role", field: "Role" },
        { label: "Income", field: "Income" },
      ],
      job: [
        { label: "Profession", field: "Profession" },
        { label: "Designation", field: "Designation" },
        { label: "Working City", field: "WorkingCity" },
      ],
    };

    const selectedFields = fields[tabKey] || [];

    return (
      <>
        {isEditing ? (
          selectedFields.map(({ label, field }) =>
            renderFormField(label, field)
          )
        ) : (
          <Descriptions
            column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
            layout="vertical"
          >
            {selectedFields.map(({ label, field }) =>
              renderField(label, field)
            )}
          </Descriptions>
        )}
      </>
    );
  };

  // if (!usermeelan) {
  //   return <LoaderPage />;
  // }

  return (
    <>
      <Button style={{ marginBottom: "1rem" }} onClick={handleSignOut}>
        SignOut
      </Button>
      <Card
        title={`${
          userData?.username ? String(userData?.username).toUpperCase() : "Your"
        } Details`}
        extra={
          isEditing ? (
            <Form>
              <Button
                htmlType="submit"
                type="primary"
                style={{ marginRight: 8 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Tag color="blue" style={{ marginRight: 8 }}>
                {userData?.userstatus}
              </Tag>
              <Button onClick={handleEdit}>Edit</Button>
            </>
          )
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Image
              style={{
                borderRadius: "50%",
                width: 160,
                height: 160,
                maxWidth: 200,
                marginBottom: 16,
              }}
              src={usermeelan?.photos?.[0]?.url}
            />
            <Tabs
              tabPosition={width < 500 ? "top" : "left"}
              onChange={setActiveTab}
            >
              <TabPane tab="UserMeelan" key="usermeelan" />
              <TabPane tab="Address" key="address" />
              <TabPane tab="Education" key="education" />
              <TabPane tab="Business" key="business" />
              <TabPane tab="Job" key="job" />
            </Tabs>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                initialValues={usermeelan}
                component={false}
              >
                {renderTabContent(activeTab)}
              </Form>
            ) : (
              renderTabContent(activeTab)
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default UserProfile;
