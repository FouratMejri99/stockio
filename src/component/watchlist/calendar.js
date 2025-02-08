import { Box } from "@mui/material";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import dayjs from "dayjs";
import { useState } from "react";

export default function BasicDateCalendar({ selectedRange, setSelectedRange }) {
  const [tempRange, setTempRange] = useState(selectedRange);

  const handleConfirm = () => {
    setSelectedRange(tempRange);
  };

  const handleCancel = () => {
    setTempRange(selectedRange); // Reset to the initial selected range
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: "#cfdbf2",
          borderRadius: 5,
          p: 2,
          boxShadow: 3,
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <StaticDateRangePicker
          startText="Start Date"
          endText="End Date"
          value={tempRange}
          onChange={(newRange) => {
            if (newRange[0] && newRange[1]) {
              setTempRange([dayjs(newRange[0]), dayjs(newRange[1])]);
            }
          }}
          onAccept={() => handleConfirm()} // Confirm when the "OK" button is clicked
          onClose={() => handleCancel()} // Cancel when the "Cancel" button is clicked
          renderInput={(startProps, endProps) => (
            <Box sx={{ display: "flex", gap: 2 }}>
              <input
                {...startProps}
                style={{
                  padding: "10px",
                  width: "45%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="Start Date"
              />
              <input
                {...endProps}
                style={{
                  padding: "10px",
                  width: "45%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="End Date"
              />
            </Box>
          )}
          sx={{
            [`.${pickersLayoutClasses.contentWrapper}`]: {
              alignItems: "center",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
