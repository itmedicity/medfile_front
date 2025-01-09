// @ts-nocheck
import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { commonStatus } from '../../../Constant/Data'
import SelectCmpCustodienDept from '../../../Components/SelectCmpCustodienDept'
import CommonMenuList from '../../../Components/CommonMenuList'
import { Suspense } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { lazy } from 'react'
import axiosApi from '../../../Axios/Axios'
import { useQuery } from '@tanstack/react-query'
import { getCustodianDepartmentMaster, getCustodianMasterList } from '../../../api/commonAPI'
import { useMemo } from 'react'

const CustodianNameList = lazy(() => import('../../../Components/CustomTable'));

const CustodianMaster = () => {

    const queryClient = useQueryClient()

    const [custodianMast, setCustodianMast] = React.useState({
        custodianName: '',
        custodianDepartmentName: 0,
        custodianStatus: 0,
    })

    const handleChange = useCallback((e) => {
        setCustodianMast({ ...custodianMast, [e.target.name]: sanitizeInput(e.target.value) })
    }, [custodianMast])

    const { custodianName, custodianDepartmentName, custodianStatus } = custodianMast

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (custodianMast.custodianName === '') {
            warningNofity('Custodian Name is required')
            return
        }

        if (custodianMast.custodianDepartmentName === 0) {
            warningNofity('Custodian Department Name is required')
            return
        }

        if (custodianMast.custodianStatus === 0) {
            warningNofity('Custodian Status is required')
            return
        }

        const FormData = {
            custodian_name: custodianMast.custodianName?.trim().toUpperCase(),
            custodian_department_name: custodianMast.custodianDepartmentName,
            custodian_status: custodianMast.custodianStatus
        }

        try {
            const response = await axiosApi.post('/custodianMaster/insertCustodianMaster', FormData)
            if (response.status === 200) {
                const { success, message } = response.data
                if (success === 1) {
                    queryClient.invalidateQueries(['custodianMaster'])
                    setCustodianMast({
                        custodianName: '',
                        custodianDepartmentName: 0,
                        custodianStatus: 0,
                    })
                    succesNofity(message);
                } else if (success === 2) {
                    warningNofity(message);
                } else {
                    errorNofity(message);
                }
            } else {
                warningNofity(response.data.message);
            }
        } catch (error) {
            errorNofity('An error has occurred: ' + error)
        }

    }, [custodianMast])

    const { isLoading, data: custodianMasterData, error } = useQuery({
        queryKey: ['custodianMaster'],
        queryFn: getCustodianMasterList,
        staleTime: Infinity
    })

    const newCustodianMaster = useMemo(() => custodianMasterData, [custodianMasterData])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)


    return (
        <DefaultPageLayout label={'Custodian Master'} >
            <MasterPageLayout style={{}} >
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'custodianName', value: e.target.value } })}
                    values={custodianName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Custodian Name'
                    type="text"
                />
                <SelectCmpCustodienDept
                    handleChange={(e, val) => handleChange({ target: { name: 'custodianDepartmentName', value: val } })}
                    value={Number(custodianDepartmentName)}
                    label='Custodian Department Name'
                />
                <CustomSelectWithLabel
                    labelName='Custodian Status'
                    dataCollection={commonStatus}
                    values={Number(custodianStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'custodianStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <CustodianNameList tableHeaderCol={['Action', 'Custodian Name', 'Custodian Department Name', 'Custodian Status']} >
                    {
                        newCustodianMaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cust_slno}</td>
                                <td>{item.cust_name?.toUpperCase()}</td>
                                <td>{item.cust_dept_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </CustodianNameList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(CustodianMaster)