import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import { commonStatus } from '../../../Constant/Data'
// @ts-ignore
import SelectCmpCategoryNameList from '../../../Components/SelectCmpCategoryNameList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant'
import axiosApi from '../../../Axios/Axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSubCategoryList } from '../../../api/commonAPI'
import { Edit } from 'iconoir-react'

const SubCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocumentSubCategory = () => {

    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [subCategoryState, setSubCategoryState] = useState({
        subCategoryName: '',
        categorySlNo: 0,
        subCategoryStatus: 0,
        sub_cat_slno: 0
    })

    const handleChange = (e) => {
        setSubCategoryState({ ...subCategoryState, [e.target.name]: e.target.value })
    }

    const { subCategoryName, categorySlNo, subCategoryStatus } = subCategoryState

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (subCategoryState.subCategoryName === '') {
                warningNofity('Sub Category Name cannot be empty' || 'An error has occurred')
                return
            }

            if (subCategoryState.categorySlNo === 0) {
                warningNofity('Category Name cannot be empty' || 'An error has occurred')
                return
            }

            if (subCategoryState.subCategoryStatus === 0) {
                warningNofity('Sub Category Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                doc_sub_type_name: subCategoryState.subCategoryName?.trim(),
                category_slno: subCategoryState.categorySlNo,
                status: subCategoryState.subCategoryStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user,
            }

            try {
                const res = await axiosApi.post('/docSubCategoryName/insertDocSubCategory', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['docSubCategoryMaster'] })
                    setSubCategoryState({
                        subCategoryName: '',
                        categorySlNo: 0,
                        subCategoryStatus: 0
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
                doc_sub_type_name: subCategoryState.subCategoryName?.trim(),
                category_slno: Number(subCategoryState.categorySlNo),
                status: subCategoryState.subCategoryStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user,
                sub_cat_slno: Number(subCategoryState?.sub_cat_slno)
            }
            const response = await axiosApi.patch('/docSubCategoryName/editDocSubCategory', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('docSubCategoryMaster')
                succesNofity(message)
                setSubCategoryState({
                    subCategoryName: '',
                    categorySlNo: 0,
                    subCategoryStatus: 0,
                    sub_cat_slno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }

    }, [subCategoryState, queryClient, IPAddress, browserName, browserVersion, osName, osVersion, user,])

    const { isLoading, data, error } = useQuery({
        queryKey: ['docSubCategoryMaster'],
        queryFn: getSubCategoryList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setSubCategoryState({
            subCategoryName: item.subcat_name,
            categorySlNo: item.cat_slno,
            subCategoryStatus: item.subcat_status,
            sub_cat_slno: item.subcat_slno
        })
    }, [])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label='Document Sub Category' >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'subCategoryName', value: e.target.value } })}
                    values={subCategoryName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Sub Category Name'
                    type="text"
                />
                <SelectCmpCategoryNameList label='Category Name' handleChange={(e, val) => handleChange({ target: { name: 'categorySlNo', value: val } })} value={categorySlNo} />
                <CustomSelectWithLabel
                    labelName='Status'
                    dataCollection={commonStatus}
                    values={Number(subCategoryStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'subCategoryStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <SubCategoryMasterList tableHeaderCol={['Action', "Slno", 'Sub Category Name', 'Category Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.subcat_slno}</td>
                                <td>{item.subcat_name?.toUpperCase()}</td>
                                <td>{item.category_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </SubCategoryMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocumentSubCategory) 