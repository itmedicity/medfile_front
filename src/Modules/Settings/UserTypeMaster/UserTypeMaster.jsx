import React, { memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { Box, IconButton, Tooltip } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant';
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel';
import { userStatus } from '../../../Constant/Data';
import { format } from 'date-fns';
import axiosApi from '../../../Axios/Axios';

const UserTypeMaster = () => {

    const navigation = useNavigate()
    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const [viewtable, setViewTable] = useState(0)

    const [UserTypeDetals, setUserTypeDetals] = useState({
        user_type_slno: 0,
        user_type: '',
        user_type_status: 0
    })

    const { user_type, user_type_status } = UserTypeDetals

    const handleChange = (e) => {
        setUserTypeDetals({ ...UserTypeDetals, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (UserTypeDetals.module_name === '') {
            warningNofity('Name Of the Module cannot be empty');
            return;
        }
        const postdata = {
            user_type: UserTypeDetals?.user_type,
            user_type_status: UserTypeDetals?.user_type_status,
            create_user: Number(loggedUser),
            create_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        }
        const response = await axiosApi.post('/UserTypeMaster/insertUserType', postdata)
        const { message, success } = response.data;
        if (success === 1) {
            succesNofity(message)
            setUserTypeDetals({
                user_type_slno: 0,
                user_type: '',
                user_type_status: 0
            });
        }
        else {
            warningNofity(message)
        }
    }, [UserTypeDetals, loggedUser])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    return (
        <DefaultPageLayout label="User Type Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'user_type', value: e.target.value } })}
                        values={user_type}
                        placeholder="User Type"
                        labelName='user Type'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='User Type Status'
                        dataCollection={userStatus}
                        values={Number(user_type_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_type_status', value: val } })}
                        placeholder={"User Type Status"}
                    />

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
                            onClick={viewuserList}
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

export default memo(UserTypeMaster)

