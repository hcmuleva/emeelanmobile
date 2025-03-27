import React, { useState } from "react";
import { Card, Button, List, Modal, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FamilyMemberModal from "./FamilyMemberModal";

const FamilyForm = ({familyMembers,setFamilyMembers}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Card title="Family Details">
      {/* Button to Open Modal */}
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Add Family Member
      </Button>

      {/* Family Member List */}
      <List
        bordered
        dataSource={familyMembers}
        renderItem={(member, index) => (
          <List.Item>
            <Tag color="blue">{member.type}</Tag> {member.firstName} {member.lastName} - {member.profession}, {member.location}
          </List.Item>
        )}
        style={{ marginTop: 20 }}
      />

      {/* Modal Component */}
      <FamilyMemberModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        familyMembers={familyMembers}
        setFamilyMembers={setFamilyMembers}
      />
    </Card>
  );
};

export default FamilyForm;
