import { Box, Button, Typography } from "@mui/joy";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { baseColor, screenHeight } from "../Constant/Constant";
import icons from "../assets/icons.webp";

// @ts-ignore
import OTPInput, { ResendOTP } from "otp-input-react"

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const RoootLayouts = () => {

  const [OTP, setOTP] = useState(0);

  const renderButton = (buttonProps) => {
    return (
      buttonProps.remainingTime !== 0 ? (
        <Typography level="body-xs" className="p-5" >Resend Authorisation code in {buttonProps.remainingTime} sec</Typography>
      ) : (
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          tabIndex={2}
          {...buttonProps}
        >Resend OTP</Button>
      )
    )
  }

  const renderTime = (remainingTime) => {
    return <span></span>
  }


  return (
    <Box
      className="flex flex-grow flex-grow-1 flex-col justify-center items-center"
      sx={{ height: screenHeight, bgcolor: baseColor.secondarylight }}
    >
      <Box
        className="flex border w-[75%]  sm:w-[75%] md:w-[50%] lg:w-[30%] xl:[30%] h-96 rounded-2xl drop-shadow shadow-md bg-[#edede9] flex-col p-8 gap-2"
        sx={{ backgroundColor: baseColor.secondarylight, borderColor: baseColor.secondary }}
      >
        <Box className="flex h-30 mb-5" >
          <img alt="icons" src={icons} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" />
          <Box className="flex items-end" >
            <Typography level="h1" textAlign="start" sx={{ color: baseColor.primary, fontSize: { xs: "2.5rem", md: "2.5rem", lg: "3rem" } }} >MediVault</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col justify-center">
          <Typography level="body-sm" sx={{ color: baseColor.primary, textAlign: 'center', pb: 1 }} >Verify your Phone number</Typography>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            secure={false}
            className="flex items-center justify-center gap-2"
            inputClassName="!mr-0 py-5 !w-[2.5rem] rounded-lg outline-1 outline-[#508D4E] text-[#001C30] text-xl"
          />
          <Box className="flex pt-1 flex-1 justify-center mt-4" >
            <Button
              onClick={function () { }}
              size="md"
              variant="outlined"
              color="neutral"
              className="w-[17.5rem] h-10"
              sx={{ color: baseColor.primary, borderColor: baseColor.primary, borderRadius: 12, "&:hover": { borderColor: baseColor.primary, backgroundColor: baseColor.primarylight } }}
            >Verify OTP</Button>
          </Box>
          <Box>
            <ResendOTP
              onResendClick={function () { }}
              className="flex"
              style={{ color: baseColor.primary, fontSize: "1rem", fontWeight: "500", display: "flex", justifyContent: "center" }}
              maxTime={10}
              onTimerComplete={function () { }}
              timeInterval={1000}
              renderButton={renderButton}
              renderTime={renderTime}
            />
          </Box>
        </Box>
        <Box>
          {/* <PhoneInput
            country={'in'}
            onlyCountries={['in']}
            autoFormat
          // value={this.state.phone}
          // onChange={phone => this.setState({ phone })}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};
export default RoootLayouts;
