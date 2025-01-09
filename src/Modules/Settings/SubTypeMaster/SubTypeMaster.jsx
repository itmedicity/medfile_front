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

const SubTypeMasterList = lazy(() => import('../../../Components/CustomTable'));

const SubTypeMaster = () => {

    const queryClient = useQueryClient();
    const [subTypeStates, setSubTypeStates] = useState({
        subTypeName: '',
        subTypeStatus: 0
    })

    const handleChange = (e) => {
        setSubTypeStates({ ...subTypeStates, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { subTypeName, subTypeStatus } = subTypeStates

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

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
            sub_type_status: subTypeStates.subTypeStatus
        }

        try {
            const res = await axiosApi.post('/subTypeMaster/insertSubTypeMaster', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['docSubTypeMaster'] })
                setSubTypeStates({
                    subTypeName: '',
                    subTypeStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }

    }, [subTypeStates])

    const { isLoading, data, error } = useQuery({
        queryKey: ['docSubTypeMaster'],
        queryFn: getSubTypeMasterList,
    })

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
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <SubTypeMasterList tableHeaderCol={['Action', 'Sub Type Name', 'Sub Type Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.sub_type_slno}</td>
                                <td>{item.doc_sub_type_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </SubTypeMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(SubTypeMaster)