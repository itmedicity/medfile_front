import { Box, Button, Typography } from "@mui/joy";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { baseColor, screenHeight } from "../Constant/Constant";
import icons from "../assets/icons.webp";
import icon1 from "../assets/medivault01.png"
import icon2 from "../assets/medivault02.png"
import icon3 from "../assets/medivault03.png"
import icon4 from "../assets/medivault04.png"

// @ts-ignore
import OTPInput, { ResendOTP } from "otp-input-react"

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const RoootLayouts = () => {

  const [OTP, setOTP] = useState(0);

  const renderButton = (buttonProps) => {
    return (
      buttonProps.remainingTime !== 0 ? (
        <Typography level="body-xs" className="p-5 text-[#001C30]" >Resend Authorisation code in {buttonProps.remainingTime} sec</Typography>
      ) : (
        <Box
          tabIndex={2}
          {...buttonProps}
          onClick={() => { }}
          className="pt-5 font-semibold text-[#001C30] cursor-pointer text-sm"
        > Regenerate OTP</Box>
      )
    )
  }

  const renderTime = (remainingTime) => {
    return <span></span>
  }

  return (
    <Box
      className="flex flex-grow flex-grow-1 flex-col justify-center items-center bg-gradient-to-r from-[#80AF81] to-[#D6EFD8]"
      sx={{ height: screenHeight, }}
    >
      <Box
        className="flex border w-[85%]  sm:w-[75%] md:w-[60%] lg:w-[34rem] xl:[30%] 2xl:[30%] h-96 rounded-2xl drop-shadow-lg shadow-lg bg-[#edede9] flex-col p-4 gap-2"
        sx={{ backgroundColor: baseColor.secondarylight, borderColor: baseColor.secondary }}
      >
        <Box className="flex h-32 mb-1 justify-center" >
          {/* <img alt="icons" src={icon1} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          {/* <img alt="icons" src={icon2} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          {/* <img alt="icons" src={icon3} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          <img alt="icons" src={icon4} className="w-15 sm:w-18 md:w-25 lg:w-50 h-32" />
          {/* <Box className="flex items-end" > */}
          {/* <Typography level="h1" textAlign="start" sx={{ color: baseColor.primary, fontSize: { xs: "2.5rem", md: "2.5rem", lg: "3rem" } }} >MediVault</Typography> */}
          {/* </Box> */}
        </Box>

        {/* OTP Verification form start here */}

        {/* <Box className="flex flex-col justify-center">
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
              className="w-[17.5rem] h-10 "
              sx={{ color: baseColor.primary, borderColor: baseColor.primary, borderRadius: 12, "&:hover": { borderColor: baseColor.primary, backgroundColor: baseColor.primarylight, transition: "all 0.5s ease-in-out" } }}
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
        </Box> */}

        {/* OTP verification form end here */}

        {/* Phone Input start here */}
        <Box className="flex flex-1 flex-col ">
          <Box className="flex flex-1 items-center flex-col  " >
            <Typography level="body-sm" sx={{ color: baseColor.primary, textAlign: 'center', pb: 1 }} >Verify your Phone number</Typography>
            <Box>
              <PhoneInput
                country={'in'}
                onlyCountries={['in']}
                autoFormat
                // alwaysDefaultMask={true}
                // containerStyle={{ height: 50 }}
                inputStyle={{ height: 50, width: 300 }}
              // value={this.state.phone}
              // onChange={phone => this.setState({ phone })}
              />
            </Box>
            <Box className="flex mt-2 border border-[#507a4f] drop-shadow-lg justify-center items-center"
              sx={{
                width: 300, height: 50, borderRadius: 10, cursor: "pointer",
                "&:hover": { backgroundColor: baseColor.ultralight, transition: "all 0.5s ease-in-out" },
                color: baseColor.primaryfont,
                backgroundColor: baseColor.primarylight,
                fontWeight: 500, fontSize: "0.9rem"
              }}
              onClick={function () { }}
            >
              Generate OTP
            </Box>
          </Box>

          <Box
            className="flex flex-1 justify-end items-end"
            sx={{ fontSize: "0.9rem" }}
          >
            <Box onClick={function () { }} sx={{ cursor: "pointer", color: baseColor.primary, fontWeight: 600 }} >login with user credentials</Box>
          </Box>
        </Box>

        {/* Phone Input end here */}
      </Box>
    </Box>
  );
};
export default RoootLayouts;
