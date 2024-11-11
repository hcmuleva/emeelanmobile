import { useTable } from "@refinedev/core";
import { Segmented } from "antd";
import { useContext, useEffect, useState } from "react";
import UserTable from "../user-matrix/user-table";
import { MeelanContext } from "../../../contexts/meelan-contex";

function SuperAdminPage() {
  const [usertype, setUserType] = useState("ADMIN");
  const { setUserMeelanIDs, userMeelanIDs } = useContext(MeelanContext);
  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const {
    tableQueryResult: { refetch, data },
  } = useTable({
    resource: "users",
    filters: {
      defaultBehavior: "replace",
      permanent: [
        {
          field: "emeelanrole",
          operator: "eq",
          value: usertype,
        },
      ],
    },
    meta: {
      fields: ["ids"],
    },
  });

  useEffect(() => {
    const newIds = data?.data?.map((el) => el.id);
    setUserMeelanIDs(newIds);
  }, [usertype]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Segmented
        options={["CENTER", "ADMIN", "MEELAN"]}
        onChange={handleUserTypeChange}
      />
      {userMeelanIDs && <UserTable />}
    </div>
  );
}

export default SuperAdminPage;
