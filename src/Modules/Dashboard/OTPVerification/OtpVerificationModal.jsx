import { Box, IconButton, Input, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useRef, useState } from 'react'
import { errorNofity, isValidOTPMobileNumber, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant';
import axiosApi from '../../../Axios/Axios';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DocList from './DocList';
import { getDocumentDetl } from '../../../api/commonAPI';
import { useQuery } from "@tanstack/react-query";
// import { NAS_FLDR } from '../../../Constant/Static';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import KeyIcon from '@mui/icons-material/Key';
import JSZip from 'jszip';

const OtpVerificationModal = ({ setOtpModal, otpModal, data, AllsuperUsers }) => {
    const {
        data: docDetails
    } = useQuery({
        queryKey: ["getTheDocInfoDetl", data?.doc_id],
        queryFn: async () => await getDocumentDetl(data?.doc_id)
    });

    const [onclickGenerateOTPbtn, setonclickGenerateOTPbtn] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Store OTP digits
    const inputRefs = useRef([]);
    const [proceedBtn, setproceedBtn] = useState(0)
    const [MobNumArray, setMobNumArray] = useState([])
    const [activeFile, setactiveFile] = useState([])

    const activeFilenames = docDetails?.filter((val) => val.docActiveStatus === 0);

    const reset = useCallback(() => {
        setOtp(["", "", "", "", "", ""])
        setMobNumArray([])
        setonclickGenerateOTPbtn(false)
    }, [])

    const InitiateOtpProcess = useCallback(() => {
        const mobileArray = AllsuperUsers?.filter((val) => val.mobile).map((val) => `91${val.mobile}`);
        setMobNumArray(mobileArray)
        if (mobileArray?.length === 0) {
            warningNofity("Mobile Number cannot be empty");
            return;
        }

        const invalidNumbers = mobileArray?.filter((mobile) => !isValidOTPMobileNumber(mobile));

        if (invalidNumbers.length > 0) {
            warningNofity(`Invalid Mobile Number: ${invalidNumbers}`);
        }

        const sanitizedMobileNumber = mobileArray?.filter(mobile => sanitizeInput(mobile));

        if (Array.isArray(sanitizedMobileNumber) && sanitizedMobileNumber.length > 0) {
            let finalMessage = "";
            let finalStatus = "";

            const requests = sanitizedMobileNumber?.map(mob =>
                axiosApi.get(`/generateOTP/${mob}`)
                    .then(({ data: { message, success } }) => {
                        if (success === 2) {
                            setonclickGenerateOTPbtn(true);
                            if (!finalStatus) {
                                finalMessage = message;
                                finalStatus = "success";
                            }
                        } else if (success === 1 && finalStatus !== "error") {
                            finalMessage = message;
                            finalStatus = "warning";
                        } else if (success === 0 || !finalStatus) {
                            finalMessage = message;
                            finalStatus = "error";
                        }
                    })
                    .catch(() => {
                        if (finalStatus !== "error") {
                            finalMessage = "Failed to generate OTP.";
                            finalStatus = "error";
                        }
                    })
            );

            Promise.allSettled(requests).then(() => {
                if (finalStatus === "error") {
                    errorNofity(finalMessage);
                } else if (finalStatus === "warning") {
                    warningNofity(finalMessage);
                } else {
                    succesNofity(finalMessage);
                }
            });

        } else {
            errorNofity("Sanitization failed, please check the input data.");
        }
    }, [AllsuperUsers]);


    // Handle OTP change
    const handleOtpChange = useCallback((e, index) => {
        const value = e.target.value;
        // Ensure the value is a numeric character and update the OTP state at the correct index
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;  // Update OTP value for the respective index
            setOtp(newOtp);
            if (index < 6) {
                const nextInput = document.getElementById(index + 1);
                nextInput && nextInput.focus();
            }
        }
    }, [otp]);

    const Backspacefun = useCallback(() => {
        const lastIndex = otp
            .slice() // Avoid mutating the original array
            .reverse()
            .findIndex((digit) => digit !== "");

        const actualIndex = lastIndex !== -1 ? otp.length - 1 - lastIndex : -1;

        if (actualIndex !== -1) {
            const newOtp = [...otp];
            newOtp[actualIndex] = "";  // Clear the last entered digit
            setOtp(newOtp);  // Update OTP state

            // Focus on the previous input field, if there is one
            if (actualIndex > 0) {
                inputRefs.current[actualIndex - 1]?.focus();
            }
        }
    }, [otp]);


    // const VerifyOtp = useCallback(() => {
    //     if (otp.every((digit) => digit !== "")) {
    //         const OTP = otp.join('');
    //         const sanitizedOTP = sanitizeInput(OTP);
    //         const sanitizedMobileArray = MobNumArray.map(mobile => sanitizeInput(mobile));

    //         let errorMessages = new Set(); // Use Set to store unique messages
    //         let isOtpValid = false; // Track if at least one OTP is valid

    //         const requests = sanitizedMobileArray.map(mobile => {
    //             const slicedMobileNumber = mobile.slice(2);
    //             const postDataToVerifyOTP = {
    //                 otp: sanitizedOTP,
    //                 mobile: slicedMobileNumber,
    //             };

    //             return axiosApi.post('/user/verifyOTPforPrint', postDataToVerifyOTP)
    //                 .then(response => {
    //                     const { success, message } = response.data;

    //                     if (success === 2) {
    //                         isOtpValid = true; // OTP is valid for at least one number

    //                         if (activeFilenames && activeFilenames.length > 0) {
    //                             activeFilenames.forEach((val) => {
    //                                 const fileUrl = `${NAS_FLDR}${val.doc_number}/${val.filename}`;
    //                                 window.open(fileUrl, "_blank"); // Open file for printing
    //                             });
    //                             reset();
    //                         }
    //                     } else {
    //                         errorMessages.add(message); // Add to Set to avoid duplicates
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error('Error verifying OTP:', error);
    //                     errorMessages.add("Error verifying OTP. Please try again.");
    //                 });
    //         });

    //         // Wait for all requests to complete before showing notifications
    //         Promise.all(requests).then(() => {
    //             if (isOtpValid) {
    //                 succesNofity("OTP verified successfully!"); // Show success only if at least one is valid
    //             } else if (errorMessages.size > 0) {
    //                 warningNofity([...errorMessages].join("\n")); // Convert Set to array and display only unique messages
    //             }
    //         });

    //     } else {
    //         warningNofity("Some OTP fields are empty");
    //         setproceedBtn(0);
    //     }
    // }, [otp, MobNumArray, activeFilenames, reset]);



    const VerifyOtp = useCallback(async () => {
        if (otp.every((digit) => digit !== "")) {
            const OTP = otp.join('');
            const sanitizedOTP = sanitizeInput(OTP);
            const sanitizedMobileArray = MobNumArray.map(mobile => sanitizeInput(mobile));

            let errorMessages = new Set(); // Store unique messages
            let isOtpValid = false; // Track if at least one OTP is valid

            // For gathering files to open later
            let allEnrichedItems = [];

            // We'll process each mobile's OTP verification in parallel
            const requests = sanitizedMobileArray.map(async (mobile) => {
                try {
                    const slicedMobileNumber = mobile.slice(2);
                    const postDataToVerifyOTP = {
                        otp: sanitizedOTP,
                        mobile: slicedMobileNumber,
                    };

                    const response = await axiosApi.post('/user/verifyOTPforPrint', postDataToVerifyOTP);
                    const { success, message } = response.data;

                    if (success === 2) {
                        isOtpValid = true; // OTP is valid for this mobile number
                        setproceedBtn(1);

                        if (activeFilenames && activeFilenames.length > 0) {
                            // For each active filename, fetch the related files and process images
                            for (const val of activeFilenames) {
                                try {
                                    // Assuming val.doc_number exists
                                    const doc_number = val.doc_number;

                                    const result = await axiosApi.get(`/docMaster/getFilesall/${doc_number}`, {
                                        responseType: 'blob'
                                    });

                                    const contentType = result.headers['content-type'] || '';
                                    if (contentType.includes('application/json')) {
                                        // If the response is JSON (likely an error), skip processing
                                        continue;
                                    } else {
                                        const zip = await JSZip.loadAsync(result.data);

                                        // Extract image files (jpg, png, gif, pdf)
                                        const imageEntries = Object.entries(zip.files).filter(
                                            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
                                        );

                                        const images = await Promise.all(
                                            imageEntries.map(async ([filename, fileObj]) => {
                                                const originalBlob = await fileObj.async('blob');
                                                let mimeType = '';
                                                if (filename.endsWith('.pdf')) {
                                                    mimeType = 'application/pdf';
                                                } else if (filename.endsWith('.png')) {
                                                    mimeType = 'image/png';
                                                } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                                                    mimeType = 'image/jpeg';
                                                } else {
                                                    mimeType = 'application/octet-stream';
                                                }

                                                const blobWithType = new Blob([originalBlob], { type: mimeType });
                                                const url = URL.createObjectURL(blobWithType);

                                                return { imageName: filename, url, blob: blobWithType };
                                            })
                                        );

                                        // Enrich your fetchBulkFile with URLs from extracted images
                                        const enrichedItems = activeFilenames.map(itm => {
                                            const matchedUpload = images.find(uploaded => uploaded.imageName === itm.filename);
                                            return {
                                                ...itm,
                                                url: matchedUpload?.url,
                                                imageName: matchedUpload?.imageName,
                                                type: matchedUpload?.blob?.type,
                                            };
                                        });

                                        // console.log("enrichedItems:", enrichedItems);

                                        allEnrichedItems = allEnrichedItems.concat(enrichedItems);
                                        setactiveFile(allEnrichedItems[0])
                                        console.log(allEnrichedItems[0], "allEnrichedItems");

                                        // console.log("allEnrichedItems::", allEnrichedItems);

                                    }
                                } catch (error) {
                                    console.error('Error fetching or processing images:', error);
                                }
                            }
                        }
                    } else {
                        errorMessages.add(message);
                    }
                } catch (error) {
                    console.error('Error verifying OTP:', error);
                    errorMessages.add("Error verifying OTP. Please try again.");
                }
            });

            // Wait for all OTP verifications (and file processing) to complete
            await Promise.all(requests);

            // if (isOtpValid) {
            //     succesNofity("OTP verified successfully!");
            //     // Open files in new tabs/windows
            //     // If these are URLs, open them one by one
            //     allEnrichedItems.forEach(item => {
            //         if (item.url) {
            //             window.open(item.url, "_blank");
            //         }
            //     });

            //     reset();
            // } else if (errorMessages.size > 0) {
            //     warningNofity([...errorMessages].join("\n"));
            //     setproceedBtn(0);
            // }
        } else {
            warningNofity("Some OTP fields are empty");
            setproceedBtn(0);
        }
    }, [otp, MobNumArray, activeFilenames, reset]);


    return (
        <Fragment>
            {proceedBtn === 1 ?
                <DocList activeFilenames={activeFilenames} proceedBtn={proceedBtn} setproceedBtn={setproceedBtn} activeFile={activeFile} /> :

                <Modal open={otpModal} onClose={() => setOtpModal(false)}>
                    <ModalDialog size='sm' sx={{ backgroundColor: "rgba(var(--modal-bg-color))" }}>
                        {
                            onclickGenerateOTPbtn === true ?
                                <Box>
                                    <Box sx={{ textAlign: "center", color: "rgba(var(--typo-clr))" }}>
                                        <KeyIcon sx={{ fontSize: 60 }} />
                                        <Typography color="rgba(var(--typo-clr))">Verification Code</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Input
                                                    sx={{
                                                        width: "40px",  // Adjust width of each input field
                                                        height: "40px",
                                                        textAlign: "center",
                                                        fontSize: "18px",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "4px",
                                                        borderColor: "rgba(var( --color-pink))"
                                                    }}
                                                    id={index}
                                                    type="text"  // Using type="text" for better control over validation
                                                    inputMode="numeric"  // Suggests numeric keyboard on mobile
                                                    maxLength={1}  // Ensures that only one digit can be entered per input field
                                                    value={otp[index]} // Bind the value to the otp state
                                                    onChange={(e) => handleOtpChange(e, index)}  // Function to handle OTP input
                                                    ref={(el) => inputRefs.current[index] = el}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 1 }}>

                                        <IconButton
                                            size="sm"
                                            onClick={Backspacefun}
                                            sx={{
                                                ":hover": {
                                                    backgroundColor: "transparent",
                                                    border: " rgba(var(--color-pink))",
                                                },
                                            }} ><Tooltip title="clear" placement='right'>
                                                <BackspaceOutlinedIcon sx={{ color: "rgba(var(--typo-clr))" }} />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton variant="outlined"
                                            size="sm"
                                            onClick={VerifyOtp}
                                            sx={{
                                                ":hover": {
                                                    backgroundColor: "transparent",
                                                    border: "0.03px solid rgba(var(--color-pink))",
                                                }, p: 0.5
                                            }} >

                                            <Typography
                                                fontSize={13.5}
                                                className="w-full"
                                                sx={{
                                                    fontSmooth: "antialiased",
                                                    fontFamily: "var(--font-varient)",
                                                    color: "rgba(var(--typo-clr))",
                                                }}
                                            >
                                                Proceed
                                            </Typography>
                                            <NavigateNextIcon sx={{ color: "rgba(var(--typo-clr))" }} /></IconButton>
                                    </Box>
                                </Box>
                                :

                                <Box sx={{ backgroundColor: "rgba(var(--modal-bg-color))" }}>
                                    <Box sx={{ textAlign: "center", p: 0 }}>
                                        <Box sx={{ backgroundColor: "rgba(var(--color-pink),0.1)", borderRadius: 10, mx: 32 }}>
                                            <SecurityUpdateGoodIcon sx={{ p: 1, fontSize: 80, color: "rgba(var(--icon-primary))" }} />
                                        </Box>
                                    </Box>
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontFamily: "var(--font-varient)",
                                            color: 'rgba(var(--font-primary-white))'
                                        }}
                                    >Printing is allowed once the OTP request is sent to the concerned recipient</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: "space-around", mt: 1 }}>
                                        <IconButton sx={{
                                            width: "20%",
                                            backgroundColor: "rgba(var(--icon-approve-clr ),0.5)",
                                            ":hover": {
                                                backgroundColor: "rgba(var(--icon-approve-clr ),0.2)",
                                            },

                                        }} onClick={InitiateOtpProcess}>
                                            <Typography sx={{
                                                fontFamily: "var(--font-varient)",
                                                color: 'rgba(var(--typo-clr))'
                                            }}>Initiate OTP</Typography>
                                        </IconButton>
                                        <IconButton sx={{
                                            width: "20%",

                                            backgroundColor: "rgba(var(--icon-notapprove-clr ),0.5)",
                                            ":hover": {
                                                backgroundColor: "rgba(var(--icon-notapprove-clr ),0.2)",
                                            },

                                        }} onClick={() => setOtpModal(false)}>
                                            <Typography sx={{
                                                fontFamily: "var(--font-varient)",
                                                color: 'rgba(var(--typo-clr))'
                                            }}>Revoke</Typography>
                                        </IconButton>
                                    </Box>
                                </Box>
                        }
                    </ModalDialog>
                </Modal>
            }
        </Fragment>
    )
}

export default memo(OtpVerificationModal);
