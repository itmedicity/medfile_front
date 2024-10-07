import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import SelectCmpInstitutionType from '../../../Components/SelectCmpInstitutionType'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { commonStatus } from '../../../Constant/Data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getInstitutionList } from '../../../api/commonAPI'
import axiosApi from '../../../Axios/Axios'

const SelectInstitutionMasterList = lazy(() => import('../../../Components/CustomTable'));

const InstitutionMaster = () => {

    const queryClient = useQueryClient();

    const [institutionMasterState, setInstitutionMasterState] = useState({
        institutionName: '',
        institutionTypeSlno: 0,
        institutionStatus: 0
    })

    const { institutionName, institutionTypeSlno, institutionStatus } = institutionMasterState

    const handleChange = (e) => {
        setInstitutionMasterState({ ...institutionMasterState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (institutionMasterState.institutionName === '') {
            warningNofity('Institution Name cannot be empty' || 'An error has occurred')
            return
        }

        if (institutionMasterState.institutionTypeSlno === 0) {
            warningNofity('Institution Type Name cannot be empty' || 'An error has occurred')
            return
        }

        if (institutionMasterState.institutionStatus === 0) {
            warningNofity('Institution Status cannot be empty' || 'An error has occurred')
            return
        }

        const FormData = {
            institution_name: institutionMasterState.institutionName?.trim(),
            institution_type_slno: institutionMasterState.institutionTypeSlno,
            institution_status: institutionMasterState.institutionStatus
        }

        try {
            const res = await axiosApi.post('/institutionMaster/insertInstitutionMaster', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['instituteMasterList'] })
                setInstitutionMasterState({
                    institutionName: '',
                    institutionTypeSlno: 0,
                    institutionStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }

    }, [institutionMasterState])

    const { isLoading, data, error } = useQuery({
        queryKey: ['instituteMasterList'],
        queryFn: getInstitutionList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label='Institution Master' >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'institutionName', value: e.target.value } })}
                    values={institutionName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Institution Name'
                    type="text"
                />
                <SelectCmpInstitutionType label='Institution Type Name' handleChange={(e, val) => handleChange({ target: { name: 'institutionTypeSlno', value: val } })} value={institutionTypeSlno} />
                <CustomSelectWithLabel
                    labelName='Status'
                    dataCollection={commonStatus}
                    values={Number(institutionStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'institutionStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <SelectInstitutionMasterList tableHeaderCol={['Action', 'Institution Name', 'Institution Type Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.institution_slno}</td>
                                <td>{item.institution_name?.toUpperCase()}</td>
                                <td>{item.institute_type_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </SelectInstitutionMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(InstitutionMaster)