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

const DocGroupMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocumentGroup = () => {
    const queryClient = useQueryClient();
    const [docGroupState, setDocGroupState] = useState({
        groupName: '',
        groupStatus: 0
    })

    const handleChange = (e) => {
        setDocGroupState({ ...docGroupState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { groupName, groupStatus } = docGroupState

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

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
            group_status: groupStatus
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

    }, [docGroupState])


    const { isLoading, data, error } = useQuery({
        queryKey: ['docGroupMaster'],
        queryFn: getGroupList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label="Document Group" >
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
                <DocGroupMasterList tableHeaderCol={['Action', 'Group Name', 'Group Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.group_slno}</td>
                                <td>{item.group_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </DocGroupMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocumentGroup)