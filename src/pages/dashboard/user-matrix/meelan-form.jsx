import {
  Upload,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Radio,
  InputNumber,
  notification,
} from "antd";
import gotra from "../../../utils/gotra.json";
import { Select } from "antd";
import { useCreate } from "@refinedev/core";

const API_URL = import.meta.env.VITE_APP_API_SERVER;
import moment from "moment";

export function MeelanForm() {
  const [form] = Form.useForm();

  const { mutate } = useCreate();

  function createMeelan(values) {
    let nullCount = 0;
    const timeFormat = "HH:mm:ss.SSS";
    for (let meelanValue in values) {
      const value = values[meelanValue];
      if (value === null || value === undefined) {
        nullCount++;
      }
      if (nullCount > 15) {
        return;
      }
    }

    const { manglik, have_child, birth_time } = values;
    const isManglik = manglik === "YES" ? true : false;
    const isHaveChild = have_child === "YES" ? true : false;
    let formatedTime = null;
    if (birth_time) {
      const momentObject = moment(birth_time?.$d, timeFormat);
      formatedTime = momentObject.format(timeFormat);
    }
    const { mother_photo, father_photo } = values;
    const mother_photo_id = mother_photo?.file?.response
      ? mother_photo?.file?.response[0]?.id
      : null;
    const father_photo_id = father_photo?.file?.response
      ? father_photo?.file?.response[0]?.id
      : null;

    mutate(
      {
        resource: "mysathis",
        values: {
          ...values,
          manglik: isManglik,
          have_child: isHaveChild,
          birth_time: formatedTime,
          mother_photo: mother_photo_id,
          father_photo: father_photo_id,
        },
      },
    );
    form.resetFields();
  }

  const formItemProps = {
    rules: [{ max: 20 }],
  };

  return (
    <Form name="meelan-form" colon={false} onFinish={createMeelan} form={form}>
      <div style={{ width: "50%", marginBottom: "1rem" }}>
        <Form.Item
          name="mother_photo"
          noStyle
          required={false}
          style={{ marginBottom: "1rem" }}
        >
          <Upload.Dragger
            style={{}}
            name="files"
            listType="picture-card"
            action={API_URL + `/api/upload`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem(
                "strapi-jwt-token"
              )}`,
            }}
            accept="*"
          >
            <p className="ant-upload-text">Upload Mother Image</p>
          </Upload.Dragger>
        </Form.Item>
      </div>
      <div style={{ width: "50%", marginBottom: "1rem" }}>
        <Form.Item name="father_photo" noStyle required={false}>
          <Upload.Dragger
            style={{}}
            name="files"
            listType="picture-card"
            action={API_URL + `/api/upload`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem(
                "strapi-jwt-token"
              )}`,
            }}
            accept="*"
          >
            <p className="ant-upload-text">Upload Father Image</p>
          </Upload.Dragger>
        </Form.Item>
      </div>
      <Form.Item
        name={"FatherName"}
        label="Father Name"
        {...formItemProps}
        style={{ marginTop: "1rem" }}
      >
        <Input></Input>
      </Form.Item>
      {/* to be confirmed */}
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
      <Form.Item name={"MotherName"} label="Mother Name" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name={"NanajiName"} label="Nanaji Name" {...formItemProps}>
        <Input></Input>
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
      <Form.Item name={"home_address"} label="Home Address" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name={"shop_address"} label="Shop Address" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item
        name={"father_occupation"}
        label="Father Occupation"
        {...formItemProps}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name={"MobileNumber"} label="Mobile" rules={[{ len: 10 }]}>
        <Input style={{ width: "274px" }} prefix={"+91"} />
      </Form.Item>
      <Form.Item name={"PhoneNumber"} label="Phone" rules={[{ len: 10 }]}>
        <Input style={{ width: "274px" }} prefix={"+91"} />
      </Form.Item>
      <Form.Item
        name={"FirstName"}
        label="Name of Son/Daughter"
        {...formItemProps}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name={"DOB"} label="Date of Birth">
        <DatePicker />
      </Form.Item>
      <Form.Item name={"birth_time"} label="Time of Birth">
        <TimePicker />
      </Form.Item>
      <Form.Item name={"birth_place"} label="Place of Birth" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name={"manglik"} label="is Manglik">
        <Radio.Group>
          <Radio value={"YES"}>Yes</Radio>
          <Radio value={"NO"}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* <Form.Item name={"naadi"} label="Naadi" {...formItemProps}>
        <Input />
      </Form.Item> */}
      <Form.Item name="school" label="Education School" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="College" label="Education College" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="Profession" label="Occupation" {...formItemProps}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="MeritalStatus" label="Marital Status">
        <Select style={{ width: "274px" }}>
          {[
            "SINGLE/UNMARRIED",
            "MARRIED",
            "SEPARATED",
            "DIVORCED",
            "WIDOWED",
            "ENGAGED",
            "ANNULLED",
            "OTHER",
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
      <Form.Item name={"Sex"} label={"Gender"}>
        <Select>
          <Select.Option value="MALE">Male</Select.Option>
          <Select.Option value="FEMALE">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="age" label="Age">
        <InputNumber min={18} max={100} />
      </Form.Item>
      {/* to be  confirmed */}
      <Form.Item name="relationship_type" label="Looking For Relationship type">
        <Select style={{ width: "274px" }}>
          <Select.Option value="KHULA">Khula</Select.Option>
          <Select.Option value="AMNE_SAMNE">Aamne Samne</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Profile
        </Button>
      </Form.Item>
    </Form>
  );
}
