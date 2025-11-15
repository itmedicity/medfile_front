import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import axiosApi from '../../../Axios/Axios'
import { getSubTypeMasterList } from '../../../api/commonAPI'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CustomCheckBoxWithLabel from "../../../Components/CustomCheckBoxWithLabel";
import { Box } from '@mui/joy'
import { Edit } from 'iconoir-react'

const SubTypeMasterList = lazy(() => import('../../../Components/CustomTable'));

const SubTypeMaster = () => {

    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [subTypeStates, setSubTypeStates] = useState({
        subTypeName: '',
        subTypeStatus: 0,
        doc_institute_status: false,
        sub_type_slno: 0
    })

    const { isLoading, data, error } = useQuery({
        queryKey: ['docSubTypeMaster'],
        queryFn: getSubTypeMasterList,
    })

    const handleChange = (e) => {
        setSubTypeStates({ ...subTypeStates, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { subTypeName, subTypeStatus, doc_institute_status } = subTypeStates

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (subTypeStates.subTypeName === '') {
                warningNofity('Sub Type Name cannot be empty' || 'An error has occurred')
                return
            }

            if (subTypeStates.subTypeStatus === 0) {
                warningNofity('Sub Type Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                sub_type_name: subTypeStates.subTypeName?.trim(),
                sub_type_status: subTypeStates.subTypeStatus,
                doc_institute_status: subTypeStates.doc_institute_status === false ? 0 : 1,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user
            }

            try {
                const res = await axiosApi.post('/subTypeMaster/insertSubTypeMaster', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['docSubTypeMaster'] })
                    setSubTypeStates({
                        subTypeName: '',
                        subTypeStatus: 0,
                        doc_institute_status: false
                    })
                } else if (success === 0) {
                    errorNofity(message)
                } else {
                    warningNofity(message)
                }

            } catch (error) {
                errorNofity(error.message || 'An error has occurred')
            }
        }
        else {
            const postdata = {
                sub_type_name: subTypeStates.subTypeName?.trim(),
                sub_type_status: Number(subTypeStates.subTypeStatus),
                doc_institute_status: subTypeStates.doc_institute_status === false ? 0 : 1,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user,
                sub_type_slno: subTypeStates?.sub_type_slno
            }
            const response = await axiosApi.patch('/subTypeMaster/editSubTypeMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('docSubTypeMaster')
                succesNofity(message)
                setSubTypeStates({
                    subTypeName: '',
                    subTypeStatus: 0,
                    doc_institute_status: false,
                    sub_type_slno: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [subTypeStates, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient])

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setSubTypeStates({
            subTypeName: item.doc_sub_type_name,
            subTypeStatus: item.doc_sub_type_status,
            doc_institute_status: item.doc_institute_status === 1 ? true : false,
            sub_type_slno: item.sub_type_slno
        })
    }, [])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Sub Type Master'} >
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'subTypeName', value: e.target.value } })}
                    values={subTypeName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Sub Type Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Sub Type Status'
                    dataCollection={commonStatus}
                    values={Number(subTypeStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'subTypeStatus', value: val } })}
                    placeholder={"Select here ..."}
                />

                {/* doc_institute_status */}

                <Box className="flex flex-1 items-center justify-between mt-2">
                    <CustomCheckBoxWithLabel
                        label="Institute Status"
                        checkBoxValue={doc_institute_status}
                        handleCheckBoxValue={(e) =>
                            handleChange({ target: { name: "doc_institute_status", value: e.target.checked } })
                        }
                    />
                </Box>
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <SubTypeMasterList tableHeaderCol={['Action', 'Slno', 'Sub Type Name', 'Institute Status', 'Sub Type Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.sub_type_slno}</td>
                                <td>{item.doc_sub_type_name?.toUpperCase()}</td>
                                <td>{item.doc_institute_status === 1 ? "YES" : "NO"}</td>
                                <td>{item.doc_sub_type_status === 1 ? "Active" : item.doc_sub_type_status === 2 ? "Inactive" : "Not Mentioned"}</td>
                            </tr>
                        ))
                    }
                </SubTypeMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(SubTypeMaster)