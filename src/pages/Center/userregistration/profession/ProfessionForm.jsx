import React, { useState } from "react";
import { Card, Button, List, Modal, Tag, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProfessionFormModal from "./ProfessionFormModal";

const ProfessionForm = ({professionList,setProfessionList,activeTab,setActiveTab}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
    <Card title="Profession Details">
      {/* Button to Open Modal */}
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Add Professions
      </Button>

      {/* Profession List */}
      <List
        bordered
        dataSource={professionList}
        renderItem={(profession, index) => (
          <List.Item>
            <Tag color="blue">{profession.type}</Tag> {profession.name} {profession.company} - {profession.location}, {profession.income}
          </List.Item>
        )}
        style={{ marginTop: 20 }}
      />

      {/* Modal Component */}
      <ProfessionFormModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        professionList={professionList}
        setProfessionList={setProfessionList}
      />
    </Card>
        <Space>
         <Button type="primary"  onClick={()=>setActiveTab((prev)=>String(Number(prev)-1))}>
              {activeTab < 4 ? "Previous" : "Save Profile"}
            </Button>
           
            <Button type="primary"  onClick={()=>setActiveTab((prev)=>String(Number(prev)+1))}>
              {activeTab < 4 ? "Next" : "Save Profile"}
            </Button>
            </Space>
    </>
  );
};

export default ProfessionForm;
