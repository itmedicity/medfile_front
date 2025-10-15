// @ts-nocheck
import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { useState } from 'react'
import { useCallback } from 'react'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import { Suspense } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { lazy } from 'react'
import axiosApi from '../../../Axios/Axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getCustodianDepartmentMaster, gethrmDeptDetails } from '../../../api/commonAPI'
import SelectCmpCustodienDept from '../../../Components/SelectCmpCustodienDept'
import CustodialDepartmentNames from '../../../Components/CustodialDepartmentNames'

const CustodianDepartmentList = lazy(() => import('../../../Components/CustomTable'));

const CustodianDepartment = () => {

    const queryClient = useQueryClient();
    const [custDepartment, setCustDepartment] = useState({
        custodianDepartmentName: '',
        custodianDepartmentStatus: '',
        departments: 0
    })

    const { data: depData } = useQuery({
        queryKey: ['gethrmDeptList'],
        queryFn: gethrmDeptDetails,
        staleTime: Infinity,
    });

    const handleChange = useCallback((e) => {
        setCustDepartment({ ...custDepartment, [e.target.name]: sanitizeInput(e.target.value) })
    }, [custDepartment])

    const { custodianDepartmentName, custodianDepartmentStatus, departments } = custDepartment;

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        const custDeptValue = Number(custDepartment.departments);

        if (custDeptValue === 0) {
            warningNofity('Custodian Department Name cannot be empty' || 'An error has occurred')
            return
        }
        if (custDepartment.custodianDepartmentStatus === '') {
            warningNofity('Custodian Department Status cannot be empty' || 'An error has occurred')
            return
        }

        const matchedItem = depData?.find(val => val.value === custDeptValue);

        const deptName = matchedItem ? matchedItem.label : null;

        const FormData = {
            custodian_department_name: deptName?.trim().toUpperCase(),
            custodian_department_status: custDepartment.custodianDepartmentStatus,
        }

        try {
            const response = await axiosApi.post('/custodianDepartment/insertCusDepartment', FormData);
            if (response.status === 200) {
                const { success, message } = response.data
                if (success === 1) {
                    setCustDepartment({
                        custodianDepartmentName: '',
                        custodianDepartmentStatus: '',
                    })
                    queryClient.invalidateQueries({ queryKey: ['custodianDepartmentList'] })
                    succesNofity(response.data.message);
                } else if (success === 2) {
                    warningNofity(message);
                } else {
                    errorNofity(message);
                }
            } else {
                errorNofity('Custodian Department Added Failed')
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }
    }, [custDepartment])

    const { isLoading, data: custodianDepartmentData, error } = useQuery({
        queryKey: ['custodianDepartmentList'],
        queryFn: getCustodianDepartmentMaster,
        staleTime: Infinity
    })

    const newCustodianDepartment = useMemo(() => custodianDepartmentData, [custodianDepartmentData])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Custodian Department'}>
            <MasterPageLayout style={{}}>

                <CustodialDepartmentNames
                    handleChange={(e, val) => handleChange({ target: { name: 'departments', value: val } })}
                    value={Number(departments)}
                    label='Custodian Department Name'
                    data={depData}
                />

                <CustomSelectWithLabel
                    labelName='Custodian Department Status'
                    dataCollection={commonStatus}
                    values={Number(custodianDepartmentStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'custodianDepartmentStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <CustodianDepartmentList tableHeaderCol={['Action', 'Custodian Department Name', 'Custodian Department Status']} >
                    {
                        newCustodianDepartment?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cust_dept_slno}</td>
                                <td>{item.cust_dept_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </CustodianDepartmentList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(CustodianDepartment) 