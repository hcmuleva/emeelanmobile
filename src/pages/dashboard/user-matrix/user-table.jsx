import {
  EditOutlined,
  EyeOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import utc from "dayjs/plugin/utc";
import {
  useCan,
  useCustom,
  useGetIdentity,
  useList,
  useLogout,
  useUpdate,
} from "@refinedev/core";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Tag,
  Select,
  Table,
  TimePicker,
  Typography,
  Upload,
  List,
  Spin,
  Slider,
  Pagination,
} from "antd";

import { useContext, useEffect, useState } from "react";
import { MeelanContext } from "../../../contexts/meelan-contex";
import calculateAge from "../../../utils/age-finder";
import gotra from "../../../utils/gotra.json";
import LoaderPage from "../../../components/loader";
import dayjs from "dayjs";
import UserCardView from "../../../utils/user-card-view";
import hasLikedPost from "../../../utils/like-mapper";
import hasRequest from "../../../utils/request-mapper";
import { useTable } from "@refinedev/antd";
import DetailsCard from "../../../utils/details-card";

const API_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const USERROLE = import.meta.env.VITE_USERROLE;
const USERSTATUS = import.meta.env.VITE_USERSTATUS;

const { Title, Text } = Typography;

dayjs.extend(utc);

function UserTable() {
  const {
    userMeelanIDs,
    userMeelanData,
    setUserMeelanIDs,
    genderGroupf,
    setGenderGroupf,
    ageGroupf,
    setAgeGroupf,
    professionGroupf,
    setProfessionGroupf,
    maritalGroupf,
    setMaritalGroupf,
    educationGroupf,
    setEducationGroupf,
    gotraExcludeGroupf,
    setGotraExcludeGroupf,
    setUserCustomDataMeta,
    userCustomDataMeta,
    resetUserDataState,
    setResetUserDataState,
    setUserStatusGroup,
    userStatusGroup,
  } = useContext(MeelanContext);
  const [dataSource, setDataSource] = useState();
  const [openMeelanUserDetailedView, setOpenMeelanUserDetailedView] =
    useState(false);
  const [meelanUserDetails, setMeelanUserDetails] = useState();
  const [filtersError, setFiltersError] = useState();
  const [form] = Form.useForm();
  const [showEditMeelanForm, setShowEditMeelanForm] = useState(false);
  const [updatingUserRecord, setUpdatingUserRecord] = useState(null);
  const [lower, setLower] = useState("20");
  const [upper, setUpper] = useState("50");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [checked, setChecked] = useState(null);
  const { data: myDetails } = useGetIdentity();
  const userrole = localStorage.getItem(USERROLE);
  const access = userrole === "CENTER" || userrole === "ADMIN";
  const { mutate: signout } = useLogout()

  const { mutate } = useUpdate();

  const token = localStorage.getItem(TOKEN_KEY);

  const formItemProps = {
    rules: [{ max: 125 }],
    style: { marginBottom: "1rem" },
  };
  const calculateDOB = (yearsBack) => {
    const currentDate = new Date();
    const pastDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - yearsBack)
    );
    const day = String(pastDate.getDate()).padStart(2, "0");
    const month = String(pastDate.getMonth() + 1).padStart(2, "0");
    const year = pastDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const { data, isLoading, isFetching, refetch } = useCustom({
    url: `${API_URL}/api/custom-user`,
    method: "get",
    config: {
      headers: {
        "x-custom-header": "foo-bar",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      query: {
        pagination: {
          page: current,
          pageSize: pageSize,
        },
        filters: {
          id: localStorage.getItem("userid"),
          sex: genderGroupf,
          checked: checked,
          search_string: searchString,
          dob_gte: calculateDOB(upper),
          dob_lte: calculateDOB(lower),
          profession: professionGroupf,
          merital_status: maritalGroupf,
          education: educationGroupf,
          gotra_not_in: gotraExcludeGroupf,
        },
      },
    },
  });
  useEffect(() => {
    setDataSource(data?.data?.data);
  }, [data, isFetching]);
  const { data: canAccess } = useCan({
    resource: "usermeelans",
    action: "field",
    params: { field: "details-btn-actn" },
  });

  const handleAgeGroup = (option) => {
    setLower(option[0]);
    setUpper(option[1]);
  };

  const handleGenderGroupChange = (option) => {
    setGenderGroupf(option);
  };

  const handleProfessionSelection = (option) => {
    if (option === undefined) {
      setProfessionGroupf("");
    } else {
      setProfessionGroupf(option);
    }
  };

  const handleMaritalStatusChange = (option) => {
    setMaritalGroupf(option);
  };

  const handleEducationChange = (option) => {
    setEducationGroupf(option);
  };

  const handleGotraExcludeChange = (option) => {
    setGotraExcludeGroupf(option);
  };

  const handleResetState = () => {
    setAgeGroupf("20-24");
    setGenderGroupf("Female");
    setGotraExcludeGroupf(undefined);
    setProfessionGroupf(undefined);
    setMaritalGroupf(undefined);
    setEducationGroupf(undefined);
  };

  useEffect(() => {
    if (resetUserDataState) {
      handleResetState();
      setResetUserDataState(false);
    }
  }, [resetUserDataState]);

  const handleUpdateUserForm = async (values) => {
    const { id } = updatingUserRecord;
    const {
      manglik,
      have_child,
      mother_photo,
      father_photo,
      self_photo,
      userstatus,
      email,
      username,
    } = values;
    let self_photo_to_upload_id = null;
    let mother_photo_to_upload_id = null;
    let father_photo_to_upload_id = null;

    if (!Array.isArray(mother_photo)) {
      mother_photo_to_upload_id = values?.mother_photo?.file?.response[0]?.id;
    } else {
      mother_photo_to_upload_id = mother_photo[0]?.id;
    }

    if (!Array.isArray(father_photo)) {
      father_photo_to_upload_id = values?.father_photo?.file?.response[0]?.id;
    } else {
      father_photo_to_upload_id = father_photo[0]?.id;
    }

    if (!Array.isArray(self_photo)) {
      self_photo_to_upload_id = values?.photos?.file?.response[0]?.id;
    } else {
      self_photo_to_upload_id = values?.photos[0]?.id;
    }

    const have_child_user_record = have_child === "YES" ? true : false;
    const manglikStatus = manglik === "YES" ? true : false;
    const finalMeelanUserRecord = {
      ...values,
      manglik: manglikStatus,
      have_child: have_child_user_record,
      photos: self_photo_to_upload_id,
      mother_photo: mother_photo_to_upload_id,
      father_photo: father_photo_to_upload_id,
    };
    const user_core_id = updatingUserRecord?.id;

    await mutate({
      resource: "users",
      id: user_core_id,
      values: finalMeelanUserRecord,
    });
    form.resetFields();
    setShowEditMeelanForm(false);
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  const handleCancleUserDetailedView = () => {
    setOpenMeelanUserDetailedView(false);
  };

  const handleAfterCloseFilterNotFound = () => {
    setFiltersError(null);
  };

  const handleEditDetails = async (userrecord) => {
    const dob = dayjs.utc(userrecord?.DOB);
    const birth_time = dayjs.utc(userrecord?.birth_time, "HH:mm:ss") ?? "";
    const transformeduserrecord = {
      ...userrecord,
      dob: dob,
      birth_time: birth_time,
      have_child: userrecord?.have_child ? "YES" : "NO",
      manglik: userrecord?.manglik ? "YES" : "NO",
      photos: userrecord?.photos,
    };

    await form.setFieldsValue({
      ...transformeduserrecord,
      profile_checked: userrecord?.profile_checked
        ? userrecord?.profile_checked
        : false,
      userstatus: userrecord?.userstatus ?? "UNAPPROVED",
      email: userrecord?.email,
      username: userrecord?.username,
    });
    setShowEditMeelanForm(true);
    setUpdatingUserRecord(userrecord);
  };

  const handleViewDetails = (userrecord) => {
    let photo = null;
    let father_photo = null;
    let mother_photo = null;
    if (userrecord?.Pictures) {
      photo = userrecord?.Pictures.replace(/[\[\]']/g, "").split(", ");
    }
    if (userrecord?.father_photo) {
      father_photo = userrecord?.father_photo[0]?.url;
    }

    if (userrecord?.mother_photo) {
      mother_photo = userrecord?.mother_photo[0]?.url;
    }

    if (userrecord?.photos) {
      photo = userrecord?.photos[0]?.url;
    }

    const transformeduserrecord = {
      ...userrecord,
      have_child: userrecord?.have_child ? "YES" : "NO",
      manglik: userrecord?.manglik ? "YES" : "NO",
    };

    setMeelanUserDetails({
      ...transformeduserrecord,
      photo: photo,
      father_photo: father_photo,
      mother_photo: mother_photo,
    });
    setOpenMeelanUserDetailedView(true);
  };

  const getFileIcon = (extension) => {
    switch (extension) {
      case "pdf":
        return <FilePdfOutlined style={{ color: "red" }} />;
      case "doc":
      case "docx":
        return <FileWordOutlined style={{ color: "blue" }} />;
      case "ppt":
      case "pptx":
        return <FilePptOutlined style={{ color: "orange" }} />;
      default:
        return <FileOutlined />;
    }
  };

  // const handleFilter = (yearsBack: any) => {
  //   console.log(calculateDOB(yearsBack[0]));
  //   setFilters([
  //     {
  //       field: 'dob',
  //       operator: 'gte',
  //       value: calculateDOB(yearsBack[0]),
  //     },
  //     {
  //       field: 'dob',
  //       operator: 'lte',
  //       value: calculateDOB(yearsBack[1]),
  //     },
  //   ]);
  // };
  // if (userCustomDataMeta?.userstatus !== "APPROVED") {
  //   return (
  //     <div style={{ marginTop: "2.2rem" }}>
  //       <Alert
  //         message={userCustomDataMeta?.error}
  //         style={{ fontSize: "1.1rem" }}
  //         banner
  //       />
  //       <Alert
  //         message={userCustomDataMeta?.message}
  //         style={{ fontSize: "1.1rem" }}
  //         banner
  //       />
  //     </div>
  //   );
  // }
  const professions = [
    {
      key: "Business/Self-Employed",
      value: "Business/Self-Employed",
    },
    {
      key: "Engineer",
      value: "Engineer",
    },
    {
      key: "Doctor",
      value: "Doctor",
    },
    {
      key: "Lawyer",
      value: "Lawyer",
    },
    {
      key: "CA",
      value: "CA",
    },
    {
      key: "HouseWork",
      value: "HouseWork",
    },
    {
      key: "BusinessMan",
      value: "BusinessMan",
    },
    {
      key: "",
      value: "Others",
    },
  ];
  const merital_status = [
    {
      key: "Divorcee",
      value: "Divorcee",
    },
    {
      key: "Married",
      value: "Married",
    },
    {
      key: "Never Married",
      value: "Never Married",
    },
  ];
  const highest_degree = [
    {
      key: "Primary",
      value: "Primary",
    },
    {
      key: "Secondary",
      value: "Secondary",
    },
    {
      key: "Higher Secondary",
      value: "Higher Secondary",
    },
    {
      key: "College",
      value: "College",
    },
    {
      key: "PHD",
      value: "PHD",
    },
  ];
  // const { data: userData, isLoading: loading } = useList({
  //   resource: "users",
  //   meta: {
  //     populate: ["usermeelan"]
  //   }
  // })
  // const {mutate: updateUser} = useUpdate();
  // if (loading){
  //   return <p>Loading...</p>
  // }
  // const handleTrigger = (i = 0) => {
  //   if (userData !== undefined && i >= userData?.data?.length){
  //     return;
  //   }
  //   console.log("yeah");
  //   updateUser({
  //     resource: "users",
  //     values: {
  //       FirstName: userData?.data[i]?.usermeelan?.FirstName,
  //       LastName: userData?.data[i]?.usermeelan?.LastName,
  //       Profession: userData?.data[i]?.usermeelan?.Profession,
  //       FatherName: userData?.data[i]?.usermeelan?.FatherName,
  //       MeritalStatus: userData?.data[i]?.usermeelan?.MeritalStatus,
  //       CreatedFor: userData?.data[i]?.usermeelan?.CreatedFor,
  //       ProfileVerified: userData?.data[i]?.usermeelan?.ProfileVerified,
  //       FatherMobileNumber: userData?.data[i]?.usermeelan?.FatherMobileNumber,
  //       Height: userData?.data[i]?.usermeelan?.Height,
  //       HighestDegree: userData?.data[i]?.usermeelan?.HighestDegree,
  //       Language:  userData?.data[i]?.usermeelan?.Language,
  //       MobileNumber: userData?.data[i]?.usermeelan?.MobileNumber,
  //       PreMaxHeight: userData?.data[i]?.usermeelan?.PreMaxHeight,
  //       PreMinHeight: userData?.data[i]?.usermeelan?.PreMinHeight,
  //       PreMaxAge: userData?.data[i]?.usermeelan?.PreMaxAge,
  //       PreMinAge: userData?.data[i]?.usermeelan?.PreMinAge,
  //       Samaj: userData?.data[i]?.usermeelan?.Samaj,
  //       State: userData?.data[i]?.usermeelan?.State,
  //       home_address: userData?.data[i]?.usermeelan?.home_address,
  //       Address: userData?.data[i]?.usermeelan?.Address,
  //       TotalReferred: userData?.data[i]?.usermeelan?.TotalReferred,
  //       Pictures: userData?.data[i]?.usermeelan?.Pictures,
  //     },
  //     id: userData?.data[i]?.id || "",
  //     successNotification: false
  //   },
  //   {
  //    onSuccess: () => {
  //     handleTrigger(i + 1);
  //    }
  //   }
  // )
  // }
  const handleSearchString = debounce((e) => {
    setSearchString(e.target.value);
  });

  function debounce(cb, delay = 1000) {
    let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  const onChange = (e) => {
    setChecked(e.target.value);
  };

  return (
    <>
      {/* <Button onClick={() => handleTrigger(0)}>Trigger</Button> */}
      {filtersError && (
        <div>
          <Alert
            message={filtersError?.error}
            description={filtersError?.message}
            style={{ fontSize: "1.1rem" }}
            afterClose={handleAfterCloseFilterNotFound}
            banner
            closable
          />
        </div>
      )}
      <Button onClick={() => signout()}>Sign Out</Button>
      {!userStatusGroup && (
        <Card
          style={{
            margin: "1rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {/* <div>
              <p>
                {" "}
                Gender Group (लिंग समूह) : <FilterOutlined />
              </p>{" "}
              <Select
                style={{ width: "140px" }}
                showSearch
                defaultValue={"Female"}
                onChange={handleGenderGroupChange}
              >
                {["Male", "Female"].map((gender, index) => (
                  <Select.Option key={index} value={gender}>
                    {gender === "Male" ? `लडके` : "लड़किया"}
                  </Select.Option>
                ))}
              </Select>
            </div> */}
            <div>
              <p>
                {" "}
                Age Group (आयु वर्ग) : <FilterOutlined />
              </p>{" "}
              <Slider
                range
                defaultValue={[20, 50]}
                onChange={handleAgeGroup}
                style={{ width: "120px" }}
              />
            </div>
            <div>
              <p>
                {" "}
                Profession : <FilterOutlined />
              </p>{" "}
              <Select
                style={{ width: "200px" }}
                showSearch
                placeholder="select profession..."
                onChange={handleProfessionSelection}
                allowClear={true}
                options={professions}
              ></Select>
            </div>
            <div>
              <p>
                {" "}
                Marital Status (वैवाहिक स्थिति) : <FilterOutlined />
              </p>{" "}
              <Select
                style={{ width: "200px" }}
                placeholder="select merital status"
                showSearch
                onChange={handleMaritalStatusChange}
                allowClear
                options={merital_status}
              ></Select>
            </div>
            <div>
              <p>
                {" "}
                Education (शिक्षा) : <FilterOutlined />
              </p>{" "}
              <Select
                style={{ width: "200px" }}
                placeholder="select education level"
                showSearch
                onChange={handleEducationChange}
                allowClear
                options={highest_degree}
              ></Select>
            </div>
            <div>
              <p>
                Gotra Not Include (गोत्र नहीं) : <FilterOutlined />
              </p>{" "}
              <Select
                style={{ width: "200px" }}
                mode="multiple"
                showSearch
                placeholder="select gotra not include"
                onChange={handleGotraExcludeChange}
                value={gotraExcludeGroupf}
                allowClear
              >
                {gotra.Gotra.map((gotratype, index) => (
                  <Select.Option
                    key={index}
                    value={gotratype.EName}
                  >{`${gotratype.EName} (${gotratype.HName})`}</Select.Option>
                ))}
              </Select>
            </div>
            {(userrole == "ADMIN" || userrole == "CENTER") && (
              <div>
                <p>
                  {" "}
                  Profile Checked : <FilterOutlined />
                </p>{" "}
                <Radio.Group onChange={onChange} value={checked}>
                  <Radio value={true}>Checked</Radio>
                  <Radio value={null}>Not Checked</Radio>
                </Radio.Group>
              </div>
            )}
            <div>
              <p>Reload </p>
              <Button onClick={handleResetState}>
                <ReloadOutlined />
              </Button>
            </div>
          </div>
        </Card>
      )}
      {/* {
        <>
          <Input
            onChange={handleSearchString}
            placeholder="search by id, firstname, lastname, mobile number, state...."
          ></Input>
          <div className="normal-user-card-list">
            <List
              dataSource={dataSource}
              loading={isLoading}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20, 25],
                total: data?.data?.meta?.pagination?.total,
                current: current,
                pageSize: pageSize,
                onChange: (current, pageSize) => {
                  setCurrent(current), setPageSize(pageSize);
                },
                style: { padding: "1rem" },
                showTotal(total, range) {
                  return `TOTAL: ${total}`;
                },
              }}
              renderItem={(item: any, index: number) => (
                <UserCardView
                  userdata={item}
                  key={index}
                  myDetails={myDetails}
                  refetchDetails={null}
                />
              )}
            />
          </div>
        </>
      } */}
      {
        <>
          <Input
            onChange={handleSearchString}
            placeholder="search by id, firstname, lastname, mobile number, state...."
          ></Input>
          {isFetching ? (
            <Spin></Spin>
          ) : (
            <Table
              dataSource={dataSource}
              scroll={{ x: 1000 }}
              pagination={{
                total: data?.data?.meta?.pagination?.total,
                current: current,
                pageSize: pageSize,
                onChange: (current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                },
              }}
              loading={false}
              style={{ width: "100%" }}
            >
              <Table.Column
                key="photo"
                dataIndex="Pictures"
                render={(value, record, index) => {
                  const imageStyle = {
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%",
                  };
                  if (value) {
                    const [photos] = value?.replace(/[\[\]']/g, "").split(", ");
                    return (
                      <Image
                        src={`${photos}`}
                        loading="eager"
                        width={80}
                        height={80}
                        style={{ ...imageStyle, objectFit: "cover" }}
                      />
                    );
                  }
                  if (record?.photos) {
                    const photo = record?.photos[0].url;
                    return (
                      <Image
                        src={photo}
                        loading="eager"
                        width={80}
                        height={80}
                        style={{ ...imageStyle, objectFit: "cover" }}
                      />
                    );
                  }
                  return <div>No Old Image</div>;
                }}
              />
              <Table.Column key="id" dataIndex="id" title="ID" />
              <Table.Column
                key="FirstName"
                dataIndex="FirstName"
                title="FirstName"
              />
              <Table.Column
                key="FatherName"
                dataIndex="FatherName"
                title="FatherName"
              />
              <Table.Column key="gotra" dataIndex="Gotra" title="Gotra" />
              <Table.Column
                key="MeritalStatus"
                dataIndex="MeritalStatus"
                title="Marital Status"
              />
              <Table.Column
                key="Profession"
                dataIndex="Profession"
                title="Occupation"
              />
              <Table.Column
                key="CreatedFor"
                dataIndex="CreatedFor"
                title="CreatedFor"
              />
              <Table.Column
                key="ProfileVerified"
                dataIndex="ProfileVerified"
                title="Profile Verification"
              />
              {access && (
                <Table.Column
                  key="profile_checked"
                  dataIndex="profile_checked"
                  title="Profile Checked"
                  render={(value, record, index) => {
                    return value === true ? (
                      <Tag color="green">Checked</Tag>
                    ) : (
                      <Tag color="red">Not Checked</Tag>
                    );
                  }}
                />
              )}
              <Table.Column
                key={"Age"}
                dataIndex={"DOB"}
                title={"Age"}
                render={(value, record, index) => {
                  let date = null;
                  if (value) {
                    date = calculateAge(value);
                  }
                  return <p>{date}</p>;
                }}
              />

              <Table.Column
                dataIndex={""}
                key={"usermeelan-details"}
                title={"View Details"}
                render={(value, record, index) => (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={() => handleViewDetails(record)}>
                      View <EyeOutlined />
                    </Button>
                    { access && 
                      <Button onClick={() => handleEditDetails(record)}>
                        Edit <EditOutlined />
                      </Button>
                    }
                  </div>
                )}
              ></Table.Column>

              {access && (
                <Table.Column
                  title="MobileNumber"
                  dataIndex={"MobileNumber"}
                ></Table.Column>
              )}
            </Table>
          )}
        </>
      }
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        open={openMeelanUserDetailedView}
        onCancel={handleCancleUserDetailedView}
        style={{ width: "100%" }}
        width={"90%"}
      >
        <div style={{ padding: "20px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Image src={meelanUserDetails?.photo} width={200} height={200} />
              <Image
                src={meelanUserDetails?.father_photo}
                width={200}
                height={200}
              />
              <Image
                src={meelanUserDetails?.mother_photo}
                width={200}
                height={200}
              />
            </div>
          </div>
          <Title
            style={{
              textTransform: "uppercase",
              marginTop: "2rem",
              textAlign: "center",
            }}
            level={2}
          >{`${meelanUserDetails?.FirstName} ${meelanUserDetails?.LastName}`}</Title>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Profession:</Text> {meelanUserDetails?.Profession}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>City:</Text> {meelanUserDetails?.City}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Country:</Text> {meelanUserDetails?.Country}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Height:</Text> {meelanUserDetails?.Height}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Marital Status:</Text>{" "}
              {meelanUserDetails?.MeritalStatus}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Language:</Text> {meelanUserDetails?.Language}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {access && (
              <Col xs={24} sm={12} md={8}>
                <Text strong>Mobile Number:</Text>{" "}
                {meelanUserDetails?.MobileNumber}
              </Col>
            )}
            {access && <Col xs={24} sm={12} md={8}>
              <Text strong>Email:</Text> {/* Add email if available */}
            </Col>}
            <Col xs={24} sm={12} md={8}>
              <Text strong>Date of Birth:</Text> {meelanUserDetails?.dob}
            </Col>
          </Row>
          <Divider />
          <Title level={4}>Additional Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Father's Name:</Text> {meelanUserDetails?.FatherName}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Father's Mobile Number:</Text>{" "}
              {meelanUserDetails?.FatherMobileNumber}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Additional Qualification:</Text>{" "}
              {meelanUserDetails?.AdditionalQualification}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Profile Download:</Text>{" "}
              {meelanUserDetails?.profile_doc_Url ? (
                <a href={meelanUserDetails?.profile_doc_Url} download>
                  Download File
                </a>
              ) : (
                "No file available"
              )}
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Profile Download:</Text>{" "}
              {!meelanUserDetails?.profile_doc_Url ? (
                <a href={meelanUserDetails?.profile_doc_Url} download>
                  {getFileIcon("ppt")} Download File
                </a>
              ) : (
                "No file available"
              )}
            </Col>
          </Row>
        </div>
      </Modal>
      {access && (
        <Modal
          open={showEditMeelanForm}
          onCancel={() => setShowEditMeelanForm(false)}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          width={"70%"}
        >
          <Form
            form={form}
            name="form"
            layout="vertical"
            style={{ display: "grid" }}
            onFinish={handleUpdateUserForm}
          >
            <div style={{ width: "50%", marginBottom: "1rem" }}>
              <Form.Item name={"photos"} noStyle required={false}>
                <Upload
                  name="files"
                  listType="picture"
                  accept="*"
                  action={API_URL + `/api/upload`}
                  headers={{ Authorization: `Bearer ${token}` }}
                >
                  <Button icon={<UploadOutlined />}>Upload Self Image</Button>
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
                  <Button icon={<UploadOutlined />}>Upload Father Image</Button>
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
                  <Button icon={<UploadOutlined />}>Upload Mother Image</Button>
                </Upload>
              </Form.Item>
            </div>
            <div></div>
            <Form.Item name={"userstatus"} label={"User Status"}>
              <Select showSearch>
                <Select.Option key={0} value={"PENDING"}>
                  <Tag color="yellow">PENDING</Tag>
                </Select.Option>
                <Select.Option key={4} value={"APPROVED"}>
                  <Tag color="green">APPROVED</Tag>
                </Select.Option>
                <Select.Option key={1} value={"UNAPPROVED"}>
                  <Tag color="pink">UNAPPROVED</Tag>
                </Select.Option>
                <Select.Option key={2} value={"REJECTED"}>
                  <Tag color="red">REJECTED</Tag>
                </Select.Option>
                <Select.Option key={3} value={"BLOCKING"}>
                  <Tag color="black">BLOCKED</Tag>
                </Select.Option>
              </Select>
            </Form.Item>
            <div>
              <Form.Item name={"profile_checked"} label={"Checked"}>
                <Select value={true}>
                  <Select.Option key={0} value={true}>
                    <Tag color="green">CHECKED</Tag>
                  </Select.Option>
                  <Select.Option key={1} value={false}>
                    <Tag color="red">NOT CHECKED</Tag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item name={"FirstName"} label="Name" {...formItemProps}>
              <Input></Input>
            </Form.Item>
            <Form.Item name={"LastName"} label="LastName" {...formItemProps}>
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
            <Form.Item
              name="dob"
              label="Date of Birth"
              {...formItemProps}
              rules={[{ required: false }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={"birth_time"}
              label="Time of Birth"
              {...formItemProps}
              rules={[{ required: false }]}
            >
              <TimePicker />
            </Form.Item>
            <Form.Item name={"Village"} label="Village" {...formItemProps}>
              <Input></Input>
            </Form.Item>
            <Form.Item name={"bera"} label="Bera" {...formItemProps}>
              <Input></Input>
            </Form.Item>
            <Form.Item name={"tehsil"} label="Tehsil" {...formItemProps}>
              <Input></Input>
            </Form.Item>
            <Form.Item name={"district"} label="District" {...formItemProps}>
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
            <Form.Item name={"PhoneNumber"} label="Phone" rules={[{ len: 10 }]}>
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
            <Form.Item name="Profession" label="Profession" {...formItemProps}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="MeritalStatus"
              label="Marital Status"
              {...formItemProps}
            >
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
            <Form.Item
              name="have_child"
              label="Have a Child (YES/NO)"
              {...formItemProps}
            >
              <Radio.Group>
                <Radio value={"YES"}>Yes</Radio>
                <Radio value={"NO"}>No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="relationship_type"
              label="Looking For Relationship type"
              {...formItemProps}
            >
              <Select style={{ width: "274px" }}>
                <Select.Option value="KHULA">Khula</Select.Option>
                <Select.Option value="AMNE_SAMNE">Aamne Samne</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="manglik" label="is Manglik" {...formItemProps}>
              <Radio.Group>
                <Radio value={"YES"}>Yes</Radio>
                <Radio value={"NO"}>No</Radio>
              </Radio.Group>
            </Form.Item>
            <div id="user-register-form-atn">
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UserTable;
