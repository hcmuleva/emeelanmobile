import { Button, Segmented, Table } from "antd";
import { TableProps } from "antd/lib";
import { MeelanContext } from "../../../contexts/meelan-contex";
import { useContext, useMemo, useState } from "react";
import { useCan } from "@refinedev/core";

function UserDashboardTables() {
  const {
    setGenderGroupf,
    setAgeGroupf,
    setProfessionGroupf,
    setMaritalGroupf,
    setEducationGroupf,
    userMeelanData,
  } = useContext(MeelanContext);
  const [currentSegment, setCurrentSegment] = useState("Age");

  const { ageGroups, gotracount, highestDegree, maritalstatuscount } =
    userMeelanData;

  const { data: canUseBtnClickEvent } = useCan({
    resource: "usermeelans",
    action: "field",
    params: { field: "normal-btn-actn" },
  });

  const ages = Object.keys(ageGroups);
  const ageDataSource = useMemo(
    () =>
      ages.map((age, index) => ({
        ageGroup: age,
        male: ageGroups[age]["Male"].count,
        female: ageGroups[age]["Female"].count,
        key: index,
      })),
    [userMeelanData]
  );

  const gotras = Object.keys(gotracount);
  const gotraCountSource = useMemo(
    () =>
      gotras.map((gotra, index) => ({
        gotra: gotra,
        male: gotracount[gotra]["Male"].count,
        female: gotracount[gotra]["Female"].count,
        key: index,
      })),
    [userMeelanData]
  );

  const highestDegrees = Object.keys(highestDegree);
  const highestDegreeSource = useMemo(
    () =>
      highestDegrees.map((high, index) => ({
        education: high,
        male: highestDegree[high]["Male"].count,
        female: highestDegree[high]["Female"].count,
        key: index,
      })),
    [userMeelanData]
  );

  const maritalstatusKeys = Object.keys(maritalstatuscount);
  const maritalStatusSource = useMemo(
    () =>
      maritalstatusKeys.map((status, index) => ({
        marital: status,
        male: maritalstatuscount[status]["Male"].count,
        female: maritalstatuscount[status]["Female"].count,
        key: index,
      })),
    [userMeelanData]
  );

  const ageGroupsColumns = [
    {
      key: "Age Group",
      dataIndex: "ageGroup",
      title: "Age Group",
    },
    {
      key: "Male",
      dataIndex: "male",
      title: "Male",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setAgeGroupf(record.ageGroup);
              setGenderGroupf("Male");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
    {
      key: "Female",
      dataIndex: "female",
      title: "Female",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setAgeGroupf(record.ageGroup);
              setGenderGroupf("Female");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
  ];

  const gotraColumns = [
    {
      key: "Gotra",
      dataIndex: "gotra",
      title: "gotra",
    },
    {
      key: "Male",
      dataIndex: "male",
      title: "Male",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setProfessionGroupf(record.gotra);
              setGenderGroupf("Male");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
    {
      key: "Female",
      dataIndex: "female",
      title: "Female",
      render(value, record, index) {
        const ids = gotracount[record.gotra].Female.ids;
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setProfessionGroupf(record.gotra);
              setGenderGroupf("Female");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
  ];

  const highestDegreeColumn = [
    {
      key: "Education",
      dataIndex: "education",
      title: "Education",
    },
    {
      key: "Male",
      dataIndex: "male",
      title: "Male",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setEducationGroupf(record.education);
              setGenderGroupf("Male");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
    {
      key: "Female",
      dataIndex: "female",
      title: "Female",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setEducationGroupf(record.education);
              setGenderGroupf("Female");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
  ];

  const meritalColumns = [
    {
      key: "marital",
      dataIndex: "marital",
      title: "Marital Status",
    },
    {
      key: "Male",
      dataIndex: "male",
      title: "Male",
      render(value, record, index) {
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setMaritalGroupf(record.marital);
              setGenderGroupf("Male");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
    {
      key: "Female",
      dataIndex: "female",
      title: "Female",
      render(value, record, index) {
        const ids = maritalstatuscount[record.marital].Female.ids;
        return (
          <Button
            type="text"
            style={{ color: "#0000FF" }}
            onClick={() => {
              setMaritalGroupf(record.marital);
              setGenderGroupf("Female");
              window.location.replace("#user-table");
            }}
            disabled={!canUseBtnClickEvent?.can || value === 0}
          >
            {value}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Segmented
        options={["Age", "Gotra", "Education", "Marital"]}
        onChange={(value) => {
          setCurrentSegment(value);
        }}
        size="large"
      />
      {currentSegment === "Age" && (
        <div style={{ flex: "1" }}>
          <Table
            columns={ageGroupsColumns}
            dataSource={ageDataSource}
            id="id"
          />
        </div>
      )}
      {currentSegment === "Gotra" && (
        <div style={{ flex: "1" }}>
          <Table columns={gotraColumns} dataSource={gotraCountSource} id="id" />
        </div>
      )}
      {currentSegment === "Education" && (
        <div style={{ flex: "1" }}>
          <Table
            columns={highestDegreeColumn}
            dataSource={highestDegreeSource}
            id="id"
          />
        </div>
      )}
      {currentSegment === "Marital" && (
        <div style={{ flex: "1" }}>
          <Table
            columns={meritalColumns}
            dataSource={maritalStatusSource}
            id="id"
          />
        </div>
      )}
    </div>
  );
}

export default UserDashboardTables;
