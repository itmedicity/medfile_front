import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getIntitutionTypeList } from '../../../api/commonAPI'
import axiosApi from '../../../Axios/Axios'

const InstitutionTypeList = lazy(() => import('../../../Components/CustomTable'));

const InstituteTypeMaster = () => {

    const queryClient = useQueryClient();
    const [institutionTypeState, setInstitutionTypeState] = useState({
        institutionTypeName: '',
        institutionTypeStatus: 0
    })

    const { institutionTypeName, institutionTypeStatus } = institutionTypeState

    const handleChange = (e) => {
        setInstitutionTypeState({ ...institutionTypeState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (institutionTypeState.institutionTypeName === '') {
            warningNofity('Institution Type Name cannot be empty' || 'An error has occurred')
            return
        }

        if (institutionTypeState.institutionTypeStatus === 0) {
            warningNofity('Institution Type Status cannot be empty' || 'An error has occurred')
            return
        }

        const FormData = {
            institute_type_name: institutionTypeState.institutionTypeName?.trim(),
            institute_type_status: institutionTypeState.institutionTypeStatus
        }

        try {
            const res = await axiosApi.post('/instituteType/insertInstituteType', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['institutionType'] })
                setInstitutionTypeState({
                    institutionTypeName: '',
                    institutionTypeStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }

    }, [institutionTypeState])

    const { isLoading, data, error } = useQuery({
        queryKey: ['institutionType'],
        queryFn: getIntitutionTypeList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Institute Type Master'}>
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'institutionTypeName', value: e.target.value } })}
                    values={institutionTypeName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Institution Type Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Institution Type Status'
                    dataCollection={commonStatus}
                    values={Number(institutionTypeStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'institutionTypeStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <InstitutionTypeList tableHeaderCol={['Action', 'Institution Type Name', 'Institution Type Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.institute_type_slno}</td>
                                <td>{item.institute_type_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </InstitutionTypeList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(InstituteTypeMaster)