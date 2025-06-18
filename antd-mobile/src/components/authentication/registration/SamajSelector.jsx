import React, { useState, useMemo, useRef, useEffect } from "react";
import { Popup, SearchBar, Toast, List, Button } from "antd-mobile";

const SamajSelector = ({
  form,
  samajData,
  selectedSamaj,
  setSelectedSamaj,
  enableSearch = true,
  getSamaj, // Pass the getSamaj function to fetch additional data
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const fieldName = "Samaj";
  const searchBarRef = useRef(null);

  // Safely get the selected value from the form or selectedSamaj
  const selectedValue = form?.getFieldValue?.(fieldName) || selectedSamaj || "";
  const selectedSamajItem = samajData.find(
    (s) => s.attributes?.samaj_type === selectedValue
  );

  // Filter samajData based on search text
  const filteredSamajData = useMemo(() => {
    if (!searchText) return samajData;
    const lowerSearchText = searchText.toLowerCase();
    return samajData.filter((samaj) =>
      samaj.attributes?.title?.toLowerCase().includes(lowerSearchText)
    );
  }, [searchText, samajData]);

  const handleConfirm = async (samaj) => {
    const selected = samajData.find(
      (s) => s.attributes?.samaj_type === samaj.attributes?.samaj_type
    );

    // Update the form field value
    if (form?.setFieldValue) {
      form.setFieldValue(fieldName, samaj.attributes?.samaj_type);
    }

    // Update the selectedSamaj state
    if (samaj.attributes?.samaj_type) {
      try {
        const res = await getSamaj({
          samaj_type: samaj.attributes?.samaj_type,
        });
        setSelectedSamaj(samaj.attributes?.samaj_type);
      } catch (error) {
        console.error("Error fetching Samaj data:", error);
        Toast.show({ icon: "fail", content: "Failed to fetch Samaj data" });
      }
    }

    setVisible(false);
    setSearchText("");
    Toast.show({ content: `Selected: ${selected.attributes?.title}` });
  };

  // Focus the search bar when the popup opens
  useEffect(() => {
    if (visible && enableSearch && searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [visible, enableSearch]);

  return (
    <>
      {/* Trigger to open the popup */}
      <div
        onClick={() => setVisible(true)}
        role="button"
        aria-label="Select Samaj"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setVisible(true);
          }
        }}
        style={{
          padding: "0px 12px",
          color: selectedSamajItem ? "var(--adm-color-text)" : "#888",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          fontSize: "16px",
          lineHeight: "1.5",
          cursor: "pointer",
          minHeight: "44px", // Touch-friendly height
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          transition: "border-color 0.3s",
        }}
      >
        <span>
          {selectedSamajItem
            ? selectedSamajItem.attributes?.title
            : "Select Samaj"}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Popup with search bar and list */}
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
          setSearchText("");
        }}
        position="bottom" // Bottom-sheet style for mobile
        bodyStyle={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "100%",
          "@media (min-width: 768px)": {
            height: "50vh",
            maxWidth: "400px",
            margin: "0 auto",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Select Samaj
          </h3>
          <Button
            size="small"
            onClick={() => {
              setVisible(false);
              setSearchText("");
            }}
            style={{
              padding: "4px 12px",
              fontSize: "14px",
              color: "#ff4d4f",
              border: "none",
            }}
          >
            Close
          </Button>
        </div>

        {/* Search bar (conditionally rendered) */}
        {enableSearch && (
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #eee",
              position: "sticky",
              top: "54px",
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <SearchBar
              ref={searchBarRef}
              placeholder="Search Samaj"
              value={searchText}
              onChange={(value) => setSearchText(value)}
              onClear={() => setSearchText("")}
              style={{
                "--background": "#f5f5f5",
                "--border-radius": "8px",
                "--height": "40px",
                "--padding": "0 12px",
              }}
              aria-label="Search Samaj"
            />
          </div>
        )}

        {/* Scrollable list of samaj */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0",
          }}
        >
          <List
            style={{
              "--border-top": "none",
              "--border-bottom": "none",
            }}
          >
            {filteredSamajData.length > 0 ? (
              filteredSamajData.map((samaj) => (
                <List.Item
                  key={samaj.id}
                  onClick={() => handleConfirm(samaj)}
                  role="option"
                  aria-selected={
                    selectedSamajItem?.attributes?.samaj_type ===
                    samaj.attributes?.samaj_type
                  }
                  style={{
                    cursor: "pointer",
                    padding: "14px 16px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    minHeight: "48px",
                    color:
                      selectedSamajItem?.attributes?.samaj_type ===
                      samaj.attributes?.samaj_type
                        ? "#ff4d4f"
                        : "#333",
                    backgroundColor:
                      selectedSamajItem?.attributes?.samaj_type ===
                      samaj.attributes?.samaj_type
                        ? "rgba(255, 77, 79, 0.05)"
                        : "transparent",
                    transition: "background-color 0.2s",
                  }}
                >
                  {samaj.attributes?.title}
                </List.Item>
              ))
            ) : (
              <List.Item
                style={{
                  textAlign: "center",
                  color: "#888",
                  padding: "16px",
                  fontSize: "14px",
                }}
              >
                No matching Samaj found
              </List.Item>
            )}
          </List>
        </div>
      </Popup>
    </>
  );
};

export default SamajSelector;
