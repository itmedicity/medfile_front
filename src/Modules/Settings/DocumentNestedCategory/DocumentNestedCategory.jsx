import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import { commonStatus } from '../../../Constant/Data'
// @ts-ignore
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant'
import axiosApi from '../../../Axios/Axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getNestedCategoryList } from '../../../api/commonAPI'
import SelectSubCategories from '../../../Components/SelectSubCategories'
import { Edit } from 'iconoir-react'

const NestedCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocumentNestedCategory = () => {

    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [nestedCategoryState, setNestedCategoryState] = useState({
        nestedCategoryName: '',
        subCategorySlNo: 0,
        nestedCategoryStatus: 0,
        nestedCat_slno: 0
    })

    const handleChange = (e) => {
        setNestedCategoryState({ ...nestedCategoryState, [e.target.name]: e.target.value })
    }

    const { nestedCategoryName, subCategorySlNo, nestedCategoryStatus } = nestedCategoryState

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (nestedCategoryState.nestedCategoryName === '') {
                warningNofity('Nested Category Name cannot be empty' || 'An error has occurred')
                return
            }

            if (nestedCategoryState.subCategorySlNo === 0) {
                warningNofity('Sub Category Name cannot be empty' || 'An error has occurred')
                return
            }

            if (nestedCategoryState.nestedCategoryStatus === 0) {
                warningNofity('Nested Category Status cannot be empty' || 'An error has occurred')
                return
            }
            const FormData = {
                nested_cat_name: nestedCategoryState.nestedCategoryName?.trim(),
                sub_cat_slno: nestedCategoryState.subCategorySlNo,
                nested_cat_status: nestedCategoryState.nestedCategoryStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user,
            }

            try {
                const res = await axiosApi.post('/docNestedCategoryName/insertNestedDocCategory', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries('nestedCategoryList')
                    setNestedCategoryState({
                        nestedCategoryName: '',
                        subCategorySlNo: 0,
                        nestedCategoryStatus: 0,
                        nestedCat_slno: 0
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
            const editpost = {
                nested_cat_name: nestedCategoryState.nestedCategoryName?.trim(),
                sub_cat_slno: nestedCategoryState.subCategorySlNo,
                nested_cat_status: nestedCategoryState.nestedCategoryStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                nestedCat_slno: nestedCategoryState?.nestedCat_slno,
            }
            const response = await axiosApi.patch('/docNestedCategoryName/editNestedCategoryName', editpost)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('nestedCategoryList')
                succesNofity(message)
                setNestedCategoryState({
                    nestedCategoryName: '',
                    subCategorySlNo: 0,
                    nestedCategoryStatus: 0,
                    nestedCat_slno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [nestedCategoryState, queryClient, IPAddress, browserName, browserVersion, osName, osVersion, user])

    const { isLoading, data, error } = useQuery({
        queryKey: ['nestedCategoryList'],
        queryFn: getNestedCategoryList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setNestedCategoryState({
            nestedCategoryName: item.nested_cat_name,
            subCategorySlNo: item.subcat_slno,
            nestedCategoryStatus: item.nested_cat_status,
            nestedCat_slno: item.nested_cat_slno
        })
    }, [])


    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label='Document Nested Category' >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'nestedCategoryName', value: e.target.value } })}
                    values={nestedCategoryName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Nested Category Name'
                    type="text"
                />
                <SelectSubCategories label='Sub Category Name' handleChange={(e, val) => handleChange({ target: { name: 'subCategorySlNo', value: val } })} value={subCategorySlNo} />

                <CustomSelectWithLabel
                    labelName='Status'
                    dataCollection={commonStatus}
                    values={Number(nestedCategoryStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'nestedCategoryStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <NestedCategoryMasterList tableHeaderCol={['Action', 'Slno', 'Nested Category Name', 'Sub Category Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.nested_cat_slno}</td>
                                <td>{item.nested_cat_name?.toUpperCase()}</td>
                                <td>{item.subcat_name?.toUpperCase()}</td>
                                <td>{item.nested_cat_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }

                </NestedCategoryMasterList>
            </Suspense>
        </DefaultPageLayout >
    )
}

export default memo(DocumentNestedCategory) 