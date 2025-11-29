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
import { Edit } from 'iconoir-react'

const CustodianDepartmentList = lazy(() => import('../../../Components/CustomTable'));

const CustodianDepartment = () => {

    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [custDepartment, setCustDepartment] = useState({
        custodianDepartmentName: '',
        custodianDepartmentStatus: '',
        departments: 0,
        custDept_slno: 0
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
        if (editData === 0) {
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
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }

            try {
                const response = await axiosApi.post('/custodianDepartment/insertCusDepartment', FormData);
                if (response.status === 200) {
                    const { success, message } = response.data
                    if (success === 1) {
                        setCustDepartment({
                            custodianDepartmentName: '',
                            custodianDepartmentStatus: '',
                            departments: 0,
                            custDept_slno: 0
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
        }
        else {

            const custDeptValue = Number(custDepartment.departments);

            const matchedItem = depData?.find(val => val.value === custDeptValue);

            const deptName = matchedItem ? matchedItem.label : null;

            const postdata = {
                custodian_department_name: deptName?.trim().toUpperCase(),
                custodian_department_status: custDepartment.custodianDepartmentStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                custDept_slno: custDepartment?.custDept_slno
            }
            const response = await axiosApi.patch('/custodianDepartment/updateCusDepartment', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('custodianDepartmentList')
                succesNofity(message)
                setCustDepartment({
                    custodianDepartmentName: '',
                    custodianDepartmentStatus: '',
                    departments: 0,
                    custDept_slno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [custDepartment, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])

    const { isLoading, data: custodianDepartmentData, error } = useQuery({
        queryKey: ['custodianDepartmentList'],
        queryFn: getCustodianDepartmentMaster,
        staleTime: Infinity
    })

    const newCustodianDepartment = useMemo(() => custodianDepartmentData, [custodianDepartmentData])

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setCustDepartment({
            custodianDepartmentName: item.cust_dept_name,
            custodianDepartmentStatus: item.cust_dept_status,
            custDept_slno: item.cust_dept_slno,
            departments: item.cust_dept_slno
        })
    }, [])

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
                <CustodianDepartmentList tableHeaderCol={['Action', 'Slno', 'Custodian Department Name', 'Custodian Department Status']} >
                    {
                        newCustodianDepartment?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
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