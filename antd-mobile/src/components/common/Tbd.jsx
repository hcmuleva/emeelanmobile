import React, { useState } from "react";
import { Button, Popup, SearchBar, List, Toast } from "antd-mobile";

const options = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
];

export default function Tbd() {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>
        {selected ? `Selected: ${selected}` : "Pick a fruit"}
      </Button>
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ padding: "16px" }}
      >
        <SearchBar
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search..."
        />
        <List>
          {filtered.map((item) => (
            <List.Item
              key={item}
              onClick={() => {
                setSelected(item);
                setVisible(false);
                Toast.show({ content: `You picked: ${item}` });
              }}
            >
              {item}
            </List.Item>
          ))}
        </List>
      </Popup>
    </>
  );
}
