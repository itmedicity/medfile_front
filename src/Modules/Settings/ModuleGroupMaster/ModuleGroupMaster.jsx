import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
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
import { getModuleMast, getModules } from '../../../api/commonAPI'
import { useQuery } from '@tanstack/react-query';
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';

const ModuleGroupMaster = () => {

    const ModuleMasterList = lazy(() => import('../../../Components/CustomTable'));

    const navigation = useNavigate()
    // const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const [viewtable, setViewTable] = useState(0)

    const [moduleGrpDetails, setModuleGrpDetails] = useState({
        module_grp_slno: 0,
        module_grp_name: '',
        module_grp_status: 0
    })

    const { module_grp_name, module_grp_status } = moduleGrpDetails

    const { data: moduleNameList } = useQuery({
        queryKey: ["moduleList"],
        queryFn: getModules,
        staleTime: Infinity,
    });
    // console.log("moduleNameList", moduleNameList);

    const { data: moduleMastList } = useQuery({
        queryKey: ["moduleMast"],
        queryFn: getModuleMast,
        staleTime: Infinity,
    });

    console.log("moduleMastList", moduleMastList);

    const [selectedModules, setSelectedModules] = useState({});

    const handleDocumentState = (event) => {
        const { name, value } = event.target;
        setSelectedModules((prevState) => ({
            ...prevState,
            [name]: value === false ? 0 : 1, // Update the module's checked state
        }));
    };

    // console.log("selectedModules", selectedModules);

    const handleChange = (e) => {
        setModuleGrpDetails({ ...moduleGrpDetails, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (moduleGrpDetails.module_grp_name.trim() === '') {
            warningNofity('Name Of the Module cannot be empty');
            return;
        }
        const postdata = {
            module_grp_name: moduleGrpDetails?.module_grp_name,
            module_grp_status: Number(moduleGrpDetails?.module_grp_status),
            module_slno: selectedModules
        }
        console.log("postdata", postdata);

        const response = await axiosApi.post('/ModuleGroupMaster/insertModuleGroup', postdata)
        const { message, success } = response.data;
        console.log(" message, success ", message, success);

        if (success === 1) {
            succesNofity(message)
            setModuleGrpDetails({
                module_grp_slno: 0,
                module_grp_name: '',
                module_grp_status: 0
            });
            setSelectedModules({})
        }
        else {
            warningNofity(message)
        }

    }, [moduleGrpDetails, selectedModules])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    return (
        <DefaultPageLayout label="Module Group Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'module_grp_name', value: e.target.value } })}
                        values={module_grp_name}
                        placeholder="Name of Module Group"
                        labelName='Name of Module Group'
                        type="text"
                    />
                    {/* modules mapping */}
                    <Box>Module Names
                        <Box className="flex flex-1 items-center justify-between py-[0.199rem] px-2 ">
                            {moduleNameList?.map((val, index) => (
                                <CustomCheckBoxWithLabel
                                    key={index} // Ensure a unique key
                                    label={val.label}
                                    checkBoxValue={selectedModules[val.label] || false}
                                    handleCheckBoxValue={(e) =>
                                        handleDocumentState({ target: { name: val.label, value: e.target.checked } })
                                    }
                                />
                            ))}
                        </Box>
                    </Box>

                    <CustomSelectWithLabel
                        labelName='Module Group Status'
                        dataCollection={userStatus}
                        values={Number(module_grp_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_grp_status', value: val } })}
                        placeholder={"Module Group Status"}
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
            {viewtable === 1 ?
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                    <ModuleMasterList tableHeaderCol={['Action', 'Module Name', 'Sub Type Status']} >
                        {
                            moduleMastList?.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.mgro_slno}</td>
                                    <td>{item.module_grp_name?.toUpperCase()}</td>
                                    <td>{item.module_slno}</td>
                                    <td>{item.module_grp_status}</td>
                                </tr>
                            ))
                        }
                    </ModuleMasterList>
                </Suspense> : null}
        </DefaultPageLayout >
    )
}
export default memo(ModuleGroupMaster) 
