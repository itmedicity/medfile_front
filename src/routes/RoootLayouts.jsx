// @ts-nocheck
import React, { useCallback, useState, memo } from "react";
import { Box, Button, CircularProgress, Input, Typography } from "@mui/joy";
import { Outlet, useNavigate } from "react-router-dom";
import {
  baseColor,
  errorNofity,
  isValidMobileNumber,
  isValidOTPMobileNumber,
  sanitizeInput,
  screenHeight,
  succesNofity,
  warningNofity,
} from "../Constant/Constant";
import icons from "../assets/icons.webp";
import icon1 from "../assets/medivault01.png";
import icon2 from "../assets/medivault02.png";
import icon3 from "../assets/medivault03.png";
import icon4 from "../assets/medivault04.png";

// @ts-ignore
import OTPInput, { ResendOTP } from "otp-input-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import axiosApi from "../Axios/Axios";
import { ToastContainer } from "react-toastify";
import { getTime } from "date-fns";
import CustomBackDrop from "../Components/CustomBackDrop";

const RoootLayouts = () => {
  // import functions
  const navigate = useNavigate();

  // state mangement
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState(0);
  const [onclickGenerateOTPbtn, setonclickGenerateOTPbtn] = useState(false);
  const [loginwithUserCred, setloginwithUserCred] = useState(false);

  // GENERATE OTP FUNCTION
  const generateOtp = useCallback(() => {
    if (mobileNumber === "") {
      warningNofity("Mobile Number cannot be empty");
      return;
    }

    if (!isValidOTPMobileNumber(mobileNumber)) {
      //validity checking for 12 digit mobile number
      warningNofity("Invalid Mobile Number");
      return;
    }
    setLoading(true);
    const sanitizedMobileNumber = sanitizeInput(mobileNumber);
    axiosApi.get("/generateOTP/" + sanitizedMobileNumber).then((res) => {
      const { message, success } = res.data;
      if (success === 0) {
        errorNofity(message);
      } else if (success === 1) {
        warningNofity(message);
        setLoading(false);
      } else if (success === 2) {
        succesNofity(message);
        setonclickGenerateOTPbtn(true);
        setLoading(false);
      } else {
        errorNofity(message);
        setLoading(false);
      }
    });
  }, [mobileNumber]);

  // VERIFY OTP FUNCTION
  const verifyOTPFunction = useCallback(() => {
    const sanitizedOTP = sanitizeInput(OTP);
    const mobNumber = sanitizeInput(mobileNumber);

    const slicedMobileNMumber = mobNumber.slice(2);

    const postDataToVerifyOTP = {
      otp: sanitizedOTP,
      mobile: slicedMobileNMumber,
    };

    // after verify OTP page redirected to dashboard

    axiosApi.post("/user/verifyOTP", postDataToVerifyOTP).then((res) => {
      const { message, success, userInfo } = res.data;

      // after verify OTP page redirected to dashboard
      if (success === 0) {
        errorNofity(message); // database error
      } else if (success === 1) {
        warningNofity(message); // incorrected OTP
      } else if (success === 2) {
        succesNofity(message); // OTP Verified
        const { user_slno, name, token, login_type, tokenValidity } =
          JSON.parse(userInfo);
        const authData = {
          authNo: btoa(user_slno),
          authName: btoa(name),
          authToken: token,
          authType: btoa(login_type),
          authTimeStamp: getTime(new Date(tokenValidity)),
        };
        localStorage.setItem("app_auth", JSON.stringify(authData));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/Home/Dashboard", { replace: true });
        }, 2000);
      } else {
        errorNofity(message);
      }
    });
  }, [OTP, mobileNumber]);

  // RESEND OTP FUNCTION
  const resendOTPFunction = useCallback(() => {
    setonclickGenerateOTPbtn(false);
  }, []);

  // LOGIN FUNCTION WITH USER CREDENTIALS
  const loginwithCredentials = useCallback(() => {
    setloginwithUserCred(true);
  }, []);

  // return function for regerate OTP form

  const handleReturnToOTPLoginPage = useCallback(() => {
    setloginwithUserCred(false);
  }, []);

  // render function for regerate OTP button

  const renderButton = (buttonProps) => {
    return buttonProps.remainingTime !== 0 ? (
      <Typography level="body-xs" className="p-5 text-[#001C30]">
        Resend Authorisation code in {buttonProps.remainingTime} sec
      </Typography>
    ) : (
      <Box
        tabIndex={2}
        {...buttonProps}
        onClick={resendOTPFunction}
        className="pt-5 font-semibold text-[#001C30] cursor-pointer text-sm"
      >
        {" "}
        Regenerate OTP
      </Box>
    );
  };

  const renderTime = () => {
    return <span></span>;
  };

  return (
    <Box
      className="flex flex-grow flex-grow-1 flex-col justify-center items-center bg-gradient-to-r from-[#80AF81] to-[#D6EFD8]"
      sx={{ height: screenHeight }}
    >
      <ToastContainer />
      <CustomBackDrop setOpen={setOpen} open={open} />
      <Box
        className="flex border w-[85%]  sm:w-[75%] md:w-[60%] lg:w-[34rem] xl:[30%] 2xl:[30%] h-96 drop-shadow-lg shadow-lg bg-[#edede9] flex-col p-4 gap-2"
        sx={{
          backgroundColor: baseColor.secondarylight,
          borderColor: baseColor.secondary,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "60px",
          borderBottomLeftRadius: "80px",
          borderBottomRightRadius: "40px",
        }}
      >
        <Box className="flex h-32 mb-1 justify-center">
          {/* <img alt="icons" src={icon1} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          {/* <img alt="icons" src={icon2} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          {/* <img alt="icons" src={icon3} className="w-15 sm:w-18 md:w-25 lg:w-31 h-28" /> */}
          <img
            alt="icons"
            src={icon4}
            className="w-15 sm:w-18 md:w-25 lg:w-50 h-32"
          />
          {/* <Box className="flex items-end" > */}
          {/* <Typography level="h1" textAlign="start" sx={{ color: baseColor.primary, fontSize: { xs: "2.5rem", md: "2.5rem", lg: "3rem" } }} >MediVault</Typography> */}
          {/* </Box> */}
        </Box>

        {loginwithUserCred === false ? (
          onclickGenerateOTPbtn ? (
            // {/* OTP Verification form start here */}
            <Box className="flex flex-col justify-center">
              <Typography
                level="body-sm"
                sx={{ color: baseColor.primary, textAlign: "center", pb: 1 }}
              >
                Verify your Phone number
              </Typography>
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
              <Box className="flex pt-1 flex-1 justify-center mt-4">
                <Button
                  onClick={verifyOTPFunction}
                  size="md"
                  variant="outlined"
                  color="neutral"
                  className="w-[17.5rem] h-10 "
                  sx={{
                    color: baseColor.primary,
                    borderColor: baseColor.primary,
                    borderRadius: 12,
                    "&:hover": {
                      borderColor: baseColor.primary,
                      backgroundColor: baseColor.primarylight,
                      transition: "all 0.5s ease-in-out",
                    },
                  }}
                >
                  Verify OTP
                </Button>
              </Box>
              <Box>
                <ResendOTP
                  onResendClick={function () {}}
                  className="flex"
                  style={{
                    color: baseColor.primary,
                    fontSize: "1rem",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  maxTime={12000}
                  onTimerComplete={() => setonclickGenerateOTPbtn(false)}
                  timeInterval={1000}
                  renderButton={renderButton}
                  renderTime={renderTime}
                />
              </Box>
            </Box>
          ) : (
            // {/* OTP verification form end here */}
            // {/* Phone Input start here */}
            <Box className="flex flex-1 flex-col ">
              <Box className="flex flex-1 items-center flex-col  ">
                <Typography
                  level="body-sm"
                  sx={{ color: baseColor.primary, textAlign: "center", pb: 1 }}
                >
                  Verify your Phone number
                </Typography>
                <Box>
                  <PhoneInput
                    country={"in"}
                    onlyCountries={["in"]}
                    autoFormat
                    // alwaysDefaultMask={true}
                    // containerStyle={{ height: 50 }}
                    inputStyle={{
                      height: 50,
                      width: 300,
                      borderColor: baseColor.primary,
                      borderRadius: 10,
                    }}
                    buttonStyle={{
                      borderRadius: 10,
                      height: 50,
                      overflow: "hidden",
                      borderColor: baseColor.primary,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    value={mobileNumber}
                    onChange={(phone) => setMobileNumber(phone)}
                  />
                </Box>
                <Box
                  className="flex mt-2 border border-[#507a4f] drop-shadow-lg justify-center items-center"
                  sx={{
                    width: 300,
                    height: 50,
                    borderRadius: 10,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: baseColor.ultralight,
                      transition: "all 0.5s ease-in-out",
                    },
                    color: baseColor.primaryfont,
                    backgroundColor: baseColor.primarylight,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                  onClick={generateOtp}
                >
                  Generate OTP
                </Box>
              </Box>
              {loading && (
                <>
                  <Box className="flex flex-1 justify-center items-center">
                    <CircularProgress
                      sx={{
                        paddingX: "0.8rem",
                        "--CircularProgress-size": "18px",
                        "--CircularProgress-trackThickness": "1px",
                        "--CircularProgress-progressThickness": "2px",
                      }}
                    />
                    <div className="text-center font-semibold text-sm">
                      validating login credential
                    </div>
                  </Box>
                </>
              )}
              <Box
                className="flex flex-1 justify-end items-end"
                sx={{ fontSize: "0.9rem" }}
              >
                <Box
                  onClick={loginwithCredentials}
                  sx={{
                    cursor: "pointer",
                    color: baseColor.primary,
                    fontWeight: 600,
                    ":hover": {
                      color: baseColor.primarylight,
                      transition: "all 0.5s ease-in-out",
                    },
                  }}
                >
                  login with user credentials
                </Box>
              </Box>
            </Box>
            // {/* Phone Input end here */}
          )
        ) : (
          <Box
            className="flex flex-col gap-2"
            sx={{
              // backgroundColor: baseColor.secondary,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className="flex justify-center w-[60%] flex-col">
              <Typography
                sx={{
                  color: baseColor.primary,
                  fontSize: 12,
                  fontWeight: 600,
                  pl: 0.5,
                }}
              >
                Mobile Number
              </Typography>
              <Input
                fullWidth
                type="number"
                sx={{
                  "&::before": {
                    border: "1.5px solid var(--Input-focusedHighlight)",
                    transform: "scaleX(0)",
                    left: "2.5px",
                    right: "2.5px",
                    bottom: 0,
                    top: "unset",
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                    borderBottomLeftRadius: "64px 20px",
                    borderBottomRightRadius: "64px 20px",
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              />
            </Box>
            <Box className="flex flex-col justify-center w-[60%]">
              <Typography
                sx={{
                  color: baseColor.primary,
                  fontSize: 12,
                  fontWeight: 600,
                  pl: 0.5,
                }}
              >
                Password
              </Typography>
              <Input
                type="password"
                fullWidth
                sx={{
                  "&::before": {
                    border: "1.5px solid var(--Input-focusedHighlight)",
                    transform: "scaleX(0)",
                    left: "2.5px",
                    right: "2.5px",
                    bottom: 0,
                    top: "unset",
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                    borderBottomLeftRadius: "64px 20px",
                    borderBottomRightRadius: "64px 20px",
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              />
            </Box>
            <Box className="flex flex-col flex-1  items-end  w-[60%] ">
              <Box
                className="flex border  px-8 m-1 py-[0.1rem] rounded-[13px] drop-shadow-lg"
                sx={{
                  backgroundColor: baseColor.primarylight,
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: baseColor.ultralight,
                    transition: "all 0.5s ease-in-out",
                  },
                }}
              >
                <Typography
                  level="body-md"
                  fontWeight={600}
                  sx={{
                    color: baseColor.primaryfont,
                    borderColor: baseColor.primary,
                  }}
                >
                  Login
                </Typography>
              </Box>
            </Box>
            <Box
              className="flex flex-1 w-[100%] justify-end pr-5"
              onClick={handleReturnToOTPLoginPage}
              sx={{}}
            >
              <Typography
                sx={{
                  color: baseColor.primary,
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: "right",
                  cursor: "pointer",
                  ":hover": {
                    color: baseColor.primarylight,
                    transition: "all 0.5s ease-in-out",
                  },
                }}
              >
                Login with OTP
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default memo(RoootLayouts);
