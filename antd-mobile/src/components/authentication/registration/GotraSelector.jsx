import React, { useState, useMemo, useRef, useEffect } from "react";
import { Popup, SearchBar, Toast, List, Button } from "antd-mobile";

const GotraSelector = ({
  form,
  gotra_for,
  gotraData,
  customdata,
  setCustomdata,
  enableSearch = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const fieldName = "gotra";
  const searchBarRef = useRef(null);

  // Safely get the selected value from the form or customdata
  const selectedValue = form?.getFieldValue?.(fieldName) || "";
  const selectedGotra =
    gotraData.find((g) => g.EName === selectedValue) ||
    gotraData.find((g) => g.Id === customdata?.gotra);

  // Filter gotraData based on search text
  const filteredGotraData = useMemo(() => {
    if (!searchText) return gotraData;
    const lowerSearchText = searchText.toLowerCase();
    return gotraData.filter(
      (gotra) =>
        gotra.EName.toLowerCase().includes(lowerSearchText) ||
        gotra.HName.toLowerCase().includes(lowerSearchText)
    );
  }, [searchText, gotraData]);

  const handleConfirm = (gotra) => {
    const selected = gotraData.find((g) => g.EName === gotra.EName);

    if (form?.setFieldValue) {
      form.setFieldValue(fieldName, gotra.EName);
    }

    setCustomdata({
      ...customdata,
      ...(gotra_for
        ? { matranal_gotra: selected?.Id }
        : { gotra: selected?.Id }),
    });

    setVisible(false);
    setSearchText("");
    Toast.show({ content: `Selected: ${selected?.EName}` });
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
        aria-label="Select Gotra"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setVisible(true);
          }
        }}
        style={{
          padding: "0px 12px",
          color: selectedGotra ? "var(--adm-color-text)" : "#888",
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
          {selectedGotra
            ? `${selectedGotra.EName} (${selectedGotra.HName})`
            : "Select Gotra"}
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
          height: "70vh", // Fixed height for consistency
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          // Mobile-first styles
          width: "100%",
          maxWidth: "100%",
          // Responsive styles for larger screens
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
            Select Gotra
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
              top: "54px", // Height of the header
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <SearchBar
              ref={searchBarRef}
              placeholder="Search Gotra"
              value={searchText}
              onChange={(value) => setSearchText(value)}
              onClear={() => setSearchText("")}
              style={{
                "--background": "#f5f5f5",
                "--border-radius": "8px",
                "--height": "40px",
                "--padding": "0 12px",
              }}
              aria-label="Search Gotra"
            />
          </div>
        )}

        {/* Scrollable list of gotras */}
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
            {filteredGotraData.length > 0 ? (
              filteredGotraData.map((gotra) => (
                <List.Item
                  key={gotra.Id}
                  onClick={() => handleConfirm(gotra)}
                  role="option"
                  aria-selected={selectedGotra?.Id === gotra.Id}
                  style={{
                    cursor: "pointer",
                    padding: "5px 16px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    minHeight: "48px", // Touch-friendly height
                    color: selectedGotra?.Id === gotra.Id ? "#ff4d4f" : "#333",
                    backgroundColor:
                      selectedGotra?.Id === gotra.Id
                        ? "rgba(255, 77, 79, 0.05)"
                        : "transparent",
                    transition: "background-color 0.2s",
                  }}
                >
                  {gotra.EName} ({gotra.HName})
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
                No matching gotras found
              </List.Item>
            )}
          </List>
        </div>
      </Popup>
    </>
  );
};

export default GotraSelector;
