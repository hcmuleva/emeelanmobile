import React, { useContext, useEffect, useState } from "react";
import gotra from "../../utils/gotra.json";
import AdminList from "../../components/dashboard/admin-list";
import {
  Alert,
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Statistic,
  Tabs,
  TimePicker,
  Upload,
} from "antd";
import { useCan, useCreate, useCustom, useNotification } from "@refinedev/core";
import { UploadOutlined } from "@ant-design/icons";
import { StatisticProps } from "antd/lib";
import CountUp from "react-countup";
import LoaderPage from "../../components/loader";
import UserTable from "./user-matrix/user-table";
import { MeelanContext } from "../../contexts/meelan-contex";
import PendingTable from "./user-matrix/pending-table";
import SuperAdminPage from "./super-admin";
import moment from "moment";
import MyAdminList from "./super-admin/admin-list";
import Icon from "@ant-design/icons/lib/components/Icon";
import Banner from "../../components/banner";

const API_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const USER_ROLE = import.meta.env.VITE_USERROLE;
const USER_STATUS = import.meta.env.VITE_USERSTATUS;

const Dashboard = () => {
  console.log("Reached to Dashboard page")
  const {
    setUserMeelanIDs,
    setUserMeelanData,
    userMeelanData,
    userCustomDataMeta,
    setUserStatusGroup,
  } = useContext(MeelanContext);

  const token = localStorage.getItem(TOKEN_KEY);
  const userrole = localStorage.getItem(USER_ROLE) || "";
  const userstatus = localStorage.getItem(USER_STATUS);
  const [form] = Form.useForm();
  const { mutate } = useCreate();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const { open } = useNotification();

  const formItemProps = {
    rules: [{ max: 120 }],
    style: { marginBottom: "1rem" },
  };

  const { data: userMeelanCustom } = useCustom({
    url: API_URL + "/api/usermeelancustom",
    method: "get",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: normalBtnAccess } = useCan({
    resource: "usermeelans",
    action: "field",
    params: { field: "normal-btn-actn" },
  });

  const { data: canCreateUser } = useCan({
    resource: "usermeelans",
    action: "field",
    params: { field: "details-btn-actn" },
  });

  const handleCreateNewUser = () => {
    setShowCreateUserModal(true);
  };
console.log("dsfdsfdsf", userMeelanCustom)
  const onSubmit = (values) => {
    let email = values.email;
    let username = values.username;
    let password = values.password;
    if (userrole == "MEELAN"){
      open?.({
        type: "error",
        message: "You are not authorized to do this action",
        description: "Please contact your admin",
      });
      return;
    }
    if (!email) {
      if (values.mobile) {
        email = `${values.mobile}@hph.com`;
      }
      if (values.username) {
        email = `${values.username}@hph.com`;
      }
    }
    const timeFormat = "HH:mm:ss.SSS";
    let formatedTime = null;
    if (values?.birth_time) {
      const momentObject = moment(values?.birth_time?.$d, timeFormat);
      formatedTime = momentObject.format(timeFormat);
    }
    if (!username && email) {
      username = email.match(/^([^@]*)@/)[1];
    }
    if (!password) {
      password = "Welcome@123";
    }
    let finalvalues = {
      mobile: values?.MobileNumber,
      FirstName: values?.FirstName,
      LastName: values?.LastName,
      Gotra: values?.Gotra,
      MotherName: values?.MotherName,
      FatherName: values?.FatherName,
      GrandFatherName: values?.GrandFatherName,
      NanajiName: values?.NanajiName,
      LastCollege: values?.College,
      DOB: values?.DOB,
      manglik: values?.manglik === "YES" ? true : false,
      have_child: values?.have_child === "YES" ? true : false,
      marital: values?.MeritalStatus,
      MeritalStatus: values?.MeritalStatus,
      Sex: values?.Sex,
      Profession: values?.Profession,
      emeelanrole: "MEELAN",
      userstatus: "APPROVED",
      record_created_by: localStorage.getItem("userid"), 
      mother_photo: values?.mother_photo?.file?.response[0]?.id,
      father_photo: values?.father_photo?.file?.response[0]?.id,
      photos: values?.self_image?.file?.response[0]?.id,
      birth_time: formatedTime,
      age: values?.age ? String(values?.age) : "",
      role: 1,
      email,
      username,
      password,
    };

    mutate(
      {
        resource: "users",
        values: finalvalues,
      },
      {
        onSuccess(data, variables, context) {
          form.resetFields();
          setShowCreateUserModal(false);
        },
      }
    );
  };

  useEffect(() => {
    if (userMeelanCustom) {
      setUserMeelanData(userMeelanCustom.data);
    }
    if (userMeelanCustom && userstatus === "APPROVED") {
      setUserMeelanIDs(userMeelanCustom.data.gendercount.Female.ids);
    }
  }, [userMeelanCustom]);
  
  const formatter = (value) => (
    <CountUp end={value} separator="," />
  );

  const handleSelectStatics = (value) => {
    if (!normalBtnAccess?.can) {
      return;
    }
    if (value === "MALE") {
      setUserMeelanIDs(userMeelanCustom?.data.gendercount.Male.ids);
      window.location.replace("#user-table");
    } else {
      setUserMeelanIDs(userMeelanCustom?.data?.gendercount.Female.ids);
      window.location.replace("#user-table");
    }
  };
  console.log("userMeelanCustom data",userMeelanCustom)

  if (!userMeelanCustom?.data) {
    return <LoaderPage />;
  }

  return (
    <div id="dashboard">
      {userstatus !== "APPROVED" && (
        <Alert
          message={userCustomDataMeta?.error}
          banner
          style={{ marginBottom: "2rem" }}
          description={
            <div>
              <p>{userCustomDataMeta?.message}</p>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: userrole === "MEELAN" ? "Admin List" : "Center List",
                    children: <AdminList key={"admin-list"} type={userrole} />,
                  },
                ]}
              ></Collapse>
            </div>
          }
        />
      )}
      {/* <Banner /> */}
      {/* <div id="header-temple-banner">
        <Image
          src="aaimata.jpeg"
          id="aaimata-mandir"
          alt="shree-aai-mata-ji"
          className="shree-aai-mata-mandir"
          height={"100%"}
          width={180}
        ></Image>
        <div id="aai-mata-description">
          <div id="header-subheadings">
            <p className="header-subheadings-pt">|| श्री गणेशाय नमः ||</p>
            <Image src="ganpati.jpeg" width={100} height={100}></Image>
            <p className="header-subheadings-pt">|| श्री आईजी प्रसादत ||</p>
          </div>
          <h1 id="aai-mata-description-h">
            श्री सिरवी समाज कर्नाटक ट्रस्ट बालेपेटे बैंगलोर
          </h1>
          <div id="aai-mata-mandir-contact">
            <p className="aai-mata-mandir-contact-para">9880681107</p>
            <p className="aai-mata-mandir-contact-para">9845400324</p>
          </div>
          <div className="aai-mata-mandir-address">
            <p> SKR Ln, Balepete, Chickpet, Bengaluru, Karnataka 560053</p>
          </div>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee--inner">
          <span className="marquee-inner-span">
            <div>
              सेवा उपलब्ध करने का एक प्रयास जिससे आपको सिर्वी समाज के विवाह
              योग्य लड़के लड़किया की जानकारी एकमित्र कर समाज के कार्यालय में
              उपलब्ध कराइ जाएगी
            </div>
          </span>
          <span className="marquee-inner-span">
            <div>
              सभी भाइयो से निवेदन नम्र निवेदन है की इस सेवा की जानकारी समाज के
              ज्यादा से ज्यादा परिवारों में उपलब्ध करने मेंअपना अमूल्य योगदान दे
              .
            </div>
          </span>
        </div>
      </div> */}
      <div id="hero">
        <main id="main">
          {(userrole == "ADMIN" || userrole == "CENTER") && (
            <div>
              <Button onClick={() => handleCreateNewUser()}>Add User</Button>
              <Modal
                open={showCreateUserModal}
                onCancel={() => setShowCreateUserModal(false)}
                width={"80%"}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
              >
                <Form
                  name="meelan-form"
                  colon={false}
                  onFinish={onSubmit}
                  form={form}
                  id="meelan-form"
                  layout="vertical"
                  style={{ display: "grid" }}
                >
                  <div style={{ width: "50%", marginBottom: "1rem" }}>
                    <Form.Item name={"self_image"} noStyle required={false}>
                      <Upload
                        name="files"
                        listType="picture"
                        accept="*"
                        action={API_URL + "/api/upload"}
                        headers={{ Authorization: `Bearer ${token}` }}
                      >
                        <Button icon={<UploadOutlined />}>
                          Upload Self Image
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                  <div></div>
                  <div style={{ width: "50%", marginBottom: "1rem" }}>
                    <Form.Item name="mother_photo" noStyle required={false}>
                      <Upload
                        listType="picture"
                        name="files"
                        accept="*"
                        action={API_URL + "/api/upload"}
                        headers={{ Authorization: `Bearer ${token}` }}
                      >
                        <Button icon={<UploadOutlined />}>
                          Upload Father Image
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                  <div></div>
                  <div style={{ width: "50%", marginBottom: "1rem" }}>
                    <Form.Item name="father_photo" noStyle required={false}>
                      <Upload
                        listType="picture"
                        name="files"
                        accept="*"
                        action={API_URL + "/api/upload"}
                        headers={{ Authorization: `Bearer ${token}` }}
                      >
                        <Button icon={<UploadOutlined />}>
                          Upload Mother Image
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                  <div></div>
                  <Form.Item name={"FirstName"} label="Name" {...formItemProps}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"LastName"}
                    label="LastName"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label={"Username"} name={"username"}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label={"Email"} name={"email"}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"FatherName"}
                    label="Father Name"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"MotherName"}
                    label="Mother Name"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"GrandFatherName"}
                    label="GrandFather Name"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"Gotra"} label="Gotra">
                    <Select style={{ width: "274px" }} showSearch>
                      {gotra?.Gotra.map((gotra_value, index) => (
                        <Select.Option key={index} value={gotra_value?.Id}>
                          {gotra_value?.HName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"NanajiName"}
                    label="Nanaji Name"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"NanajiSurname"}
                    label="Nanaji Surname"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"Sex"} label={"Gender"}>
                    <Select>
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="age" label="Age">
                    <InputNumber min={18} max={100} />
                  </Form.Item>
                  <Form.Item name={"DOB"} label="Date of Birth">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item name={"birth_time"} label="Time of Birth">
                    <TimePicker />
                  </Form.Item>
                  <Form.Item
                    name={"Village"}
                    label="Village"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"bera"} label="Bera" {...formItemProps}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"tehsil"} label="Tehsil" {...formItemProps}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"district"}
                    label="District"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"City"} label="City" {...formItemProps}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name={"area"} label="area" {...formItemProps}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"home_address"}
                    label="Home Address"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"shop_address"}
                    label="Shop Address"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"father_occupation"}
                    label="Father Occupation"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name={"MobileNumber"}
                    label="Mobile"
                    rules={[{ len: 10 }]}
                  >
                    <Input style={{ width: "274px" }} prefix={"+91"} />
                  </Form.Item>
                  <Form.Item
                    name={"PhoneNumber"}
                    label="Phone"
                    rules={[{ len: 10 }]}
                  >
                    <Input style={{ width: "274px" }} prefix={"+91"} />
                  </Form.Item>
                  <Form.Item
                    name={"birth_place"}
                    label="Place of Birth"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name="school"
                    label="Education School"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name="College"
                    label="Education College"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item
                    name="Profession"
                    label="Occupation"
                    {...formItemProps}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item name="MeritalStatus" label="Marital Status">
                    <Select style={{ width: "274px" }} showSearch>
                      {[
                        "Never Married",
                        "MARRIED",
                        "SEPARATED",
                        "Divorcee",
                        "Widowed",
                        "ENGAGED",
                        "ANNULLED",
                        "Awaiting Divorce",
                        "Other",
                      ].map((status, index) => (
                        <Select.Option key={index} value={status}>
                          {status}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="have_child" label="Have a Child (YES/NO)">
                    <Radio.Group>
                      <Radio value={"YES"}>Yes</Radio>
                      <Radio value={"NO"}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="relationship_type"
                    label="Looking For Relationship type"
                  >
                    <Select style={{ width: "274px" }}>
                      <Select.Option value="KHULA">Khula</Select.Option>
                      <Select.Option value="AMNE_SAMNE">
                        Aamne Samne
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={"manglik"} label="is Manglik">
                    <Radio.Group>
                      <Radio value={"YES"}>Yes</Radio>
                      <Radio value={"NO"}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={"naadi"} label="Naadi" {...formItemProps}>
                    <Input />
                  </Form.Item>
                  <Form.Item label={"Password"} name={"password"}>
                    <Input type="password"></Input>
                  </Form.Item>

                  <div id="user-register-form-atn">
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Register
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
            </div>
          )}
          <div id="matrix-counter-cards">
            <Card
              bordered={false}
              style={{
                cursor: normalBtnAccess?.can ? "pointer" : "not-allowed",
              }}
              onClick={() => handleSelectStatics("MALE")}
            >
              <Statistic
                title="Male"
                formatter={formatter}
                value={userMeelanCustom.data.gendercount.Male.count}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
            <Card
              bordered={false}
              onClick={() => handleSelectStatics("FEMALE")}
              style={{
                cursor: normalBtnAccess?.can ? "pointer" : "not-allowed",
              }}
              aria-disabled={true}
            >
              <Statistic
                formatter={formatter}
                title="Females"
                value={userMeelanCustom.data.gendercount.Female.count}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </div>
        </main>
      </div>
      {/* <div style={{ display: userrole === "ADMIN" ? "block" : "none" }}>
        {userrole === "ADMIN" && <PendingTable />}
      </div> */}
      <div style={{ display: userrole === "SUPER_ADMIN" ? "block" : "none" }}>
        {userrole === "SUPER_ADMIN" && <SuperAdminPage />}
      </div>
      <div
        id="user-table"
      >
        {
          <>
            <Tabs
              defaultActiveKey="UserList"
              onChange={(key) => {
                if (key === "PendingList") {
                  setUserStatusGroup("PENDING");
                } else {
                  setUserStatusGroup(undefined);
                }
              }}
              items={[
                {
                  key: "UserList",
                  label: "UserList",
                  children: <UserTable />,
                  icon: "",
                },
                {
                  key: "AdminList",
                  label: `AdminList`,
                  children: <MyAdminList />,
                  icon: <Icon />,
                },
                {
                  key: "PendingList",
                  label: "PendingList",
                  children: <UserTable />,
                  icon: <Icon />,
                  disabled: !canCreateUser?.can,
                },
              ]}
            />
          </>
        }
      </div>
    </div>
  );
};

export default Dashboard;
