import { useCustom, useUpdate } from "@refinedev/core";
import { Alert, Select, Table, Tag } from "antd";
import LoaderPage from "../../../components/loader";
import { useContext, useEffect, useState } from "react";
import userdatapendingtype from "../../../utils/pending-list-dt";
import { MeelanContext } from "../../../contexts/meelan-contex";
const API_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

function PendingTable() {
  const { setUserCustomDataMeta, userCustomDataMeta } =
    useContext(MeelanContext);
  const token = localStorage.getItem(TOKEN_KEY);
  const [pendingDataSource, setDataSource] = useState([]);
  const { data, isLoading, refetch } = useCustom({
    url: API_URL + "/api/custom-meelan",
    method: "post",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        ids: [],
      },
    },
  });

  const { mutate } = useUpdate();

  const handleSelectChange = (value, option, record) => {
    mutate(
      {
        resource: "users",
        id: record?.id,
        values: {
          userstatus: value,
        },
      },
      {
        onSuccess(data, variables, context) {
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (data?.data) {
      setUserCustomDataMeta({
        centerlist: data?.data?.centerlist,
        error: data?.data?.error,
        message: data?.data?.message,
        userrole: data?.data?.userrole,
        userstatus: data?.data?.userstatus,
      });
    }
    if (data?.data?.pendinguserlist) {
      setDataSource(data?.data?.pendinguserlist);
    }
  }, [data]);

  if (isLoading) {
    return <LoaderPage />;
  }

  if (userCustomDataMeta?.userstatus !== "APPROVED") {
    return (
      <div style={{ marginTop: "2.2rem" }}>
        <Alert
          message={userCustomDataMeta?.error}
          style={{ fontSize: "1.1rem" }}
          banner
        />
        <Alert
          message={userCustomDataMeta?.message}
          style={{ fontSize: "1.1rem" }}
          banner
        />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "2.2rem" }}>
      <Table
        bordered={true}
        dataSource={pendingDataSource}
        virtual={true}
        scroll={{ x: 5000, y: 1000 }}
      >
        {Object.keys(userdatapendingtype).map((field, index) => {
          if (field === "userstatus") {
            return (
              <Table.Column
                title={field.toUpperCase()}
                key={index}
                dataIndex={field}
                render={(value, record, index) => (
                  <Select
                    value={value}
                    onChange={(value, option) =>
                      handleSelectChange(value, option, record)
                    }
                  >
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
                )}
              />
            );
          } else {
            return (
              <Table.Column
                key={index}
                title={field.toUpperCase()}
                dataIndex={field}
              />
            );
          }
        })}
      </Table>
    </div>
  );
}

export default PendingTable;
