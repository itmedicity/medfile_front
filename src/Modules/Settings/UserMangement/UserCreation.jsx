// @ts-nocheck
import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { Box, Button, IconButton, Tooltip } from '@mui/joy'
import { baseColor, errorNofity, isValidMobileNumber, sanitizeInput, screenWidth, succesNofity, validateEmail, warningNofity } from '../../../Constant/Constant'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { useNavigate } from 'react-router-dom'
import { loginType, passwordValidity, userStatus } from '../../../Constant/Data'
import { useState } from 'react'
import { useCallback } from 'react'
import axiosApi from '../../../Axios/Axios'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CloseIcon from '@mui/icons-material/Close';

const UserCreation = () => {
    const navigation = useNavigate()
    const [userManagemt, setUserManagemt] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        login_Type: 0,
        password_Validity: 0,
        user_Status: 0
    })

    const { name, mobile, email, password, login_Type, password_Validity, user_Status } = userManagemt;

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

        if (Number(userManagemt.password_Validity) === 0 || userManagemt.password_Validity === '') {
            warningNofity('Password Validity cannot be empty')
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

        const postRegisterUser = await axiosApi.post('/user/insertUser', {
            name: userManagemt.name,
            mobile: userManagemt.mobile,
            email: userManagemt.email,
            password: userManagemt.password,
            login_Type: Number(userManagemt.login_Type),
            password_Validity: Number(userManagemt.password_Validity),
            user_Status: Number(userManagemt.user_Status)
        })

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
                    user_Status: 0
                })
            }
        }
    }, [userManagemt])

    return (
        <DefaultPageLayout label="User Management" >
            <MasterPageLayout>
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
                    labelName='Password Validity Days'
                    dataCollection={passwordValidity}
                    values={Number(password_Validity)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'password_Validity', value: val } })}
                    placeholder={"Select Password Validity Days"}
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
                <IconButton
                    variant='outlined'
                    sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                    onClick={handleSubmitUserManagment}>
                    <Tooltip title="Add User" arrow variant='soft' color='danger'>
                        <GroupAddIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                    </Tooltip>
                </IconButton>
                <IconButton
                    variant='outlined'
                    sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                    onClick={() => { }}>
                    <Tooltip title="User List" arrow variant='soft' color='danger'>
                        <PersonSearchIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                    </Tooltip>
                </IconButton>
                <IconButton
                    variant='outlined'
                    sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                    onClick={() => navigation(-1)}>
                    <Tooltip title="Close" arrow variant='soft' color='danger'>
                        <CloseIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                    </Tooltip>
                </IconButton>
            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(UserCreation)