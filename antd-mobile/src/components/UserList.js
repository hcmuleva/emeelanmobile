import React from "react";
import { List, Avatar, Tag } from "antd-mobile";

const UserList = ({ users = [] }) => {
  return (
    <List header="User List">
      {users.length > 0 ? (
        users.map((user) => (
          <List.Item
            key={user.id}
            prefix={
              <Avatar 
                src={user.image || "https://via.placeholder.com/40"} 
                style={{ "--size": "40px" }} 
              />
            }
            description={user.email}
            extra={
              user.confirmed ? (
                <Tag color="success">Confirmed</Tag>
              ) : (
                <Tag color="warning">Pending</Tag>
              )
            }
          >
            {user.username}
          </List.Item>
        ))
      ) : (
        <List.Item>No users found</List.Item>
      )}
    </List>
  );
};

export default UserList;
