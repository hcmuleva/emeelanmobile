import { Image, Input, List, Table } from "antd";
import LoaderPage from "../../../components/loader";
import { useTable } from "@refinedev/antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";

function MyAdminList() {
  const {
    tableProps: { dataSource, loading },
  } = useTable({ resource: "getadmins" });

  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      dataIndex: "Pictures",
      title: "Photo",
      render: (value, record, index) => {
        const photo = record?.Pictures.replace(/[\[\]']/g, "").split(", ");
        return <Image src={photo} alt="Admin" width={100} height={100} />;
      },
    },
    {
      dataIndex: "name",
      title: "Name",
      render(value, record, index) {
        return (
          <p>
            {record?.FirstName} {record?.FatherName} {record?.LastName}
          </p>
        );
      },
    },
    {
      dataIndex: "Gotra",
      title: "Gotra",
    },
    {
      dataIndex: "MobileNumber",
      title: "Mobile",
    },
    {
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "Address",
      title: "Address",
    },
    {
      dataIndex: "district",
      title: "District",
    },
    {
      dataIndex: "State",
      title: "State",
    },
    {
      dataIndex: "City",
      title: "City",
    },
  ];

  if (loading) {
    return <LoaderPage />;
  }

  const filteredDataSource = dataSource.adminlist?.filter((data) => {
    const searchKeys = columns.map((col) => col.dataIndex).filter(Boolean); // Extract dataIndex from columns
    return searchKeys?.some((key) => {
      const value = data[key] ?? "";
      let stringValue = "";
      if (Array.isArray(value)) {
        stringValue = value.join(" ");
      } else if (typeof value === "object" && value !== null) {
        stringValue = Object.values(value).join(" ");
      } else {
        stringValue = value.toString();
      }
      return stringValue?.toLowerCase()?.includes(searchQuery.toLowerCase());
  });
  });

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <List>
        <Table columns={columns} dataSource={filteredDataSource}></Table>
      </List>
    </div>
  );
}

export default MyAdminList;
