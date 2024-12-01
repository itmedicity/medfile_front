// @ts-nocheck
import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { IconButton, Tooltip } from '@mui/joy'
import { errorNofity, isValidMobileNumber, sanitizeInput, screenWidth, succesNofity, validateEmail, warningNofity } from '../../../Constant/Constant'
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
        signIn_Limit: 0
    })

    const { name, mobile, email, password, login_Type, password_Validity, user_Status, signIn_Limit } = userManagemt;

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

        const postRegisterUser = await axiosApi.post('/user/insertUser', {
            name: userManagemt.name,
            mobile: userManagemt.mobile,
            email: userManagemt.email,
            password: userManagemt.password,
            login_Type: Number(userManagemt.login_Type),
            password_Validity: Number(userManagemt.password_Validity),
            user_Status: Number(userManagemt.user_Status),
            signIn_Limit: Number(userManagemt.signIn_Limit)
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
                    user_Status: 0,
                    signIn_Limit: 0
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
                // onClick={handleViewButtonFun}
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

            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(UserCreation)