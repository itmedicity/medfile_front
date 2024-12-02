// @ts-nocheck
import { Input } from "@mui/joy";
import React from "react";
import { forwardRef } from "react";
import { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // <--- Import css file
import "./componentStyle.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CustomDateFeild = ({ date, setDate }) => {
  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <Input
      startDecorator={<CalendarMonthIcon sx={{ cursor: "pointer" }} />}
      value={value}
      className={className}
      ref={ref}
      onClick={onClick}
      size="sm"
      variant="outlined"
      color="neutral"
      fullWidth
      sx={{
        cursor: "pointer",
        "--Input-focusedThickness": "1px",
      }}
    />
  ));

  return (
    <DatePicker
      closeOnScroll={true}
      selected={date}
      onChange={setDate}
      customInput={<CustomInput />}
      popperPlacement="top"
      className=" flex rounded-md px-0 py-[0.1rem]"
      dateFormat="dd/MM/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      calendarStartDay={1}
    />
  );
};

export default memo(CustomDateFeild);
