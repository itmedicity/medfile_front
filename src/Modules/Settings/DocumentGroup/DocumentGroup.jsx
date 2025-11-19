import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { getGroupList } from '../../../api/commonAPI'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosApi from '../../../Axios/Axios'
import { Edit } from 'iconoir-react'

const DocGroupMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocumentGroup = () => {
    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [docGroupState, setDocGroupState] = useState({
        groupName: '',
        groupStatus: 0,
        groupSlno: 0
    })

    const handleChange = (e) => {
        setDocGroupState({ ...docGroupState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { groupName, groupStatus, groupSlno } = docGroupState

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (groupName === '') {
                warningNofity('Group Name cannot be empty' || 'An error has occurred')
                return
            }

            if (groupStatus === 0) {
                warningNofity('Group Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                group_name: groupName?.trim(),
                group_status: Number(groupStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user)
            }

            try {
                const res = await axiosApi.post('/docGroupMaster/insertDocGroup', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['docGroupMaster'] })
                    setDocGroupState({
                        groupName: '',
                        groupStatus: 0
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
                group_name: groupName?.trim(),
                group_status: Number(groupStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                group_slno: Number(groupSlno)
            }
            const response = await axiosApi.patch('/docGroupMaster/editDocGroup', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('docGroupMaster')
                succesNofity(message)
                setDocGroupState({
                    groupName: '',
                    groupStatus: 0,
                    groupSlno: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [docGroupState, groupName, groupStatus, groupSlno, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient])


    const { isLoading, data, error } = useQuery({
        queryKey: ['docGroupMaster'],
        queryFn: getGroupList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setDocGroupState({
            groupName: item?.group_name,
            groupStatus: item?.group_status,
            groupSlno: item?.group_slno
        });
    }, [])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label="Document Group Audit Report" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'groupName', value: e.target.value } })}
                    values={groupName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Group Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Group Status'
                    dataCollection={commonStatus}
                    values={Number(groupStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'groupStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <DocGroupMasterList tableHeaderCol={['Action', 'Slno', 'Group Name', 'Group Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.group_slno}</td>
                                <td>{item.group_name?.toUpperCase()}</td>
                                <td>{item.group_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }
                </DocGroupMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocumentGroup)