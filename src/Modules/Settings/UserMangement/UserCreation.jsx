// @ts-nocheck
import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { IconButton, Radio, RadioGroup, Tooltip } from '@mui/joy'
import { errorNofity, isValidMobileNumber, isValidPassword, sanitizeInput, screenWidth, succesNofity, validateEmail, warningNofity } from '../../../Constant/Constant'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { useNavigate } from 'react-router-dom'
import { loginType, passwordValidity, signInLimit, userStatus } from '../../../Constant/Data'
import { useState } from 'react'
import { useCallback } from 'react'
import axiosApi from '../../../Axios/Axios'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import CustomeCheckBox from '../../../Components/CustomeCheckBox'
import { Box } from '@mui/material'
import { addDays, format } from 'date-fns'


const UserCreation = () => {
    const navigation = useNavigate()
    const [userManagemt, setUserManagemt] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        login_Type: 0,
        password_Validity: 0,
        user_Status: 0,
        signIn_Limit: 0,
        setOndayLogin: "N",
        loginMethod: 1
    })

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const { name, mobile, email, password, login_Type, password_Validity, user_Status, signIn_Limit, setOndayLogin, loginMethod } = userManagemt;

    const handleChange = (e) => {
        setUserManagemt({ ...userManagemt, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault()

        if (userManagemt.name === '') {
            warningNofity('Name Of the User cannot be empty')
            return
        }

        if (userManagemt.mobile === '') {
            warningNofity('Mobile Number cannot be empty')
            return
        }

        if (userManagemt.mobile !== '' && isValidMobileNumber(Number(userManagemt.mobile)) === false) {
            warningNofity('Mobile Number must be 10 digit')
            return
        }

        if (userManagemt.email === '') {
            warningNofity('Email cannot be empty')
            return
        }

        if (userManagemt.email !== '' && !validateEmail(userManagemt.email)) {
            warningNofity('A Valid email address is required')
            return
        }

        if (userManagemt.password === '') {
            warningNofity('Password cannot be empty')
            return
        }

        if (userManagemt.password !== '' && isValidPassword(userManagemt.password) === false) {
            warningNofity('Password must contain minimum 6 char - At least one uppercase letter - At least one lowercase letter - At least one number - At least one special character')
            return
        }

        if (Number(userManagemt.password_Validity) === 0 || userManagemt.password_Validity === '') {
            warningNofity('Select Maximum Password Age Limit')
            return
        }

        if (Number(userManagemt.signIn_Limit) === 0 || userManagemt.signIn_Limit === '') {
            warningNofity('Select Maximum Sign In Limit')
            return
        }

        if (userManagemt.login_Type === 0 || userManagemt.login_Type === '') {
            warningNofity('Login Type cannot be empty')
            return
        }

        if (userManagemt.user_Status === 0 || userManagemt.user_Status === '') {
            warningNofity('User Status cannot be empty')
            return
        }

        const postData = {
            name: userManagemt.name.trim(),
            mobile: userManagemt.mobile.trim(),
            email: userManagemt.email.trim(),
            login_Type: Number(userManagemt.login_Type),
            password: userManagemt.password,
            password_Validity: Number(userManagemt.password_Validity),
            password_validity_expiry_date: format(addDays(new Date(), Number(userManagemt.password_Validity)), 'yyyy-MM-dd HH:mm:ss'),
            user_Status: Number(userManagemt.user_Status),
            signIn_Limit: Number(userManagemt.signIn_Limit),
            setOndayLogin: userManagemt.setOndayLogin,
            loginMethod: Number(userManagemt.loginMethod),
            created_by: loggedUser,
            lastPasswordChangeDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }

        console.log(postData)

        const postRegisterUser = await axiosApi.post('/user/insertUser', postData)

        if (postRegisterUser.status !== 200) {
            errorNofity('Something went wrong. Please try again later')
            return
        }

        if (postRegisterUser.status === 200) {
            const { success, message } = postRegisterUser.data;

            if (success !== 1) {
                warningNofity(message)
                return
            }
            if (success === 1) {
                succesNofity(message)
                setUserManagemt({
                    name: '',
                    mobile: '',
                    email: '',
                    password: '',
                    login_Type: 0,
                    password_Validity: 0,
                    user_Status: 0,
                    signIn_Limit: 0,
                    setOndayLogin: "N",
                    loginMethod: 1
                })
            }
        }
    }, [userManagemt])

    return (
        <DefaultPageLayout label="User Management" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
                        values={name}
                        placeholder="Name of User"
                        sx={{}}
                        labelName='Name of User'
                        type="text"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
                        values={mobile}
                        placeholder="Mobile Number"
                        sx={{}}
                        labelName='Mobile Number'
                        type="number"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
                        values={email}
                        placeholder="Email - name@example.com"
                        sx={{}}
                        labelName='Email'
                        type='email'
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
                        values={password}
                        placeholder="*************"
                        sx={{}}
                        labelName='Password'
                        type='password'
                    />
                    <CustomSelectWithLabel
                        labelName='Maximum Password Age Limit'
                        dataCollection={passwordValidity}
                        values={Number(password_Validity)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'password_Validity', value: val } })}
                        placeholder={"Select Maximum Password Age Limit"}
                    />
                    <CustomSelectWithLabel
                        labelName='Number Of Sign In Per Days Limit'
                        dataCollection={signInLimit}
                        values={Number(signIn_Limit)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'signIn_Limit', value: val } })}
                        placeholder={"Select Number Of Sign In Per Days Limit"}
                    />
                    <CustomSelectWithLabel
                        labelName='Login User Type'
                        dataCollection={loginType}
                        values={Number(login_Type)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'login_Type', value: val } })}
                        placeholder={"Select Login User Type"}
                    />
                    <CustomSelectWithLabel
                        labelName='User Status'
                        dataCollection={userStatus}
                        values={Number(user_Status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_Status', value: val } })}
                        placeholder={"Select User Status"}
                    />
                    <Box className="flex flex-row" >
                        <CustomeCheckBox
                            values={setOndayLogin === "N" ? false : true}
                            color={'danger'}
                            lable={'Limited to 24 hour login'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'setOndayLogin', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                        <RadioGroup
                            name="radio-buttons-group" orientation='horizontal'
                            sx={{
                                flexGrow: 1,
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }}
                            value={loginMethod}
                            onChange={(e) => handleChange({ target: { name: 'loginMethod', value: e.target.value } })}
                        >
                            <Radio value={1} label="Both" color="primary" />
                            <Radio value={2} label="OTP" color="neutral" />
                            <Radio value={3} label="User" color="danger" />
                        </RadioGroup>
                    </Box>

                    <Box>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1,
                                fontWeight: 400,
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={handleSubmitUserManagment}>
                            <Tooltip title="Click Here to Submit" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} >
                                <QueueIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1, fontWeight: 400,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                        >
                            <Tooltip title="Click Here to View" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                                <SearchIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1, fontWeight: 400,
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={() => navigation(-1)}
                        >
                            <Tooltip title="Back to Previous Page" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                                <CloseIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Box >
            </MasterPageLayout >
        </DefaultPageLayout >
    )
}

export default memo(UserCreation)