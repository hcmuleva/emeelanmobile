import React, { useContext, useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { MeelanContext } from "../../contexts/meelan-contex";

const AdminList = ({ type }) => {
  const { userCustomDataMeta } = useContext(MeelanContext);
  const [dataSource, setDataSource] = useState();
  
  useEffect(() => {
    if (userCustomDataMeta) {
      if (type === "ADMIN") {
        setDataSource([userCustomDataMeta?.centerlist]);
      } else {
        setDataSource([...userCustomDataMeta?.adminlist]);
      }
    }
  }, [userCustomDataMeta]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={
              <div style={{ display: "flex", gap: "1rem" }}>
                <h4>
                  <a>{item.FirstName?.toUpperCase()}</a>
                </h4>
                <h4>
                  <a>{item.MobileNumber?.toUpperCase()}</a>
                </h4>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default AdminList;
