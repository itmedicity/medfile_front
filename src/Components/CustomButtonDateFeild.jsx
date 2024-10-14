// @ts-nocheck
import { Button } from '@mui/joy';
import React, { forwardRef, memo, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";// <--- Import css file
import "./componentStyle.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CustomButtonDateFeild = ({ date, setDate }) => {

    const CustomButton = forwardRef(
        ({ value, onClick, className }, ref) => (
            <Button
                startDecorator={<CalendarMonthIcon sx={{ cursor: "pointer" }} />}
                className={className}
                onClick={onClick}
                ref={ref}
                size='sm'
                variant='outlined'
                color='neutral'
                fullWidth
            >
                {value}
            </Button>
        ),
    );

    return (
        <DatePicker
            closeOnScroll={true}
            selected={date}
            onChange={(date) => setDate(date)}
            popperPlacement="top"
            customInput={<CustomButton />}
            className='w-full'
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            calendarStartDay={1}
        />
    )
}

export default memo(CustomButtonDateFeild)