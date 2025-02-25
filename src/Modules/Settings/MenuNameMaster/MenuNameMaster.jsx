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
import axiosApi from '../../../Axios/Axios';
import { userTypes } from '../../../api/commonAPI';
import { useQuery } from '@tanstack/react-query';

const MenuNameMaster = () => {

    const navigation = useNavigate()
    // const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const [viewtable, setViewTable] = useState(0)

    const [MenuNames, setMenuNames] = useState({
        Menu_slno: 0,
        Menu_name: '',
        module_name: 0,
        Menu_status: 0
    })

    const { Menu_name, Menu_status, module_name } = MenuNames

    const { data: userType } = useQuery({
        queryKey: ["userTypeList"],
        queryFn: userTypes,
        staleTime: Infinity,
    });

    const handleChange = (e) => {
        setMenuNames({ ...MenuNames, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (MenuNames.Menu_name.trim() === '') {
            warningNofity('Name Of the Module Group cannot be empty');
            return;
        }
        const postdata = {
            Menu_name: MenuNames?.Menu_name,
            Menu_status: MenuNames?.Menu_status,
            module_name: MenuNames?.module_name,
        }
        // console.log("postdata", postdata);
        const response = await axiosApi.post('/MenuNameMaster/insertMenuName', postdata)
        const { message, success } = response.data;
        // console.log(" message, success", message, success);
        if (success === 1) {
            succesNofity(message)
            setMenuNames({
                Menu_slno: 0,
                Menu_name: '',
                module_name: '',
                Menu_status: 0
            });
        }
        else {
            warningNofity(message)
        }

    }, [MenuNames])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    return (
        <DefaultPageLayout label="Menu Name Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'Menu_name', value: e.target.value } })}
                        values={Menu_name}
                        placeholder="Name of Menu"
                        labelName='Name of Menu'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='module Names'
                        dataCollection={userType}
                        values={Number(module_name)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_name', value: val } })}
                        placeholder={"Select Module Names"}
                    />

                    <CustomSelectWithLabel
                        labelName='Module Status'
                        dataCollection={userStatus}
                        values={Number(Menu_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'Menu_status', value: val } })}
                        placeholder={"Menu Status"}
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

export default memo(MenuNameMaster)

