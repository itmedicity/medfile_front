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

const NestedCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocumentNestedCategory = () => {

    const queryClient = useQueryClient();

    const [nestedCategoryState, setNestedCategoryState] = useState({
        nestedCategoryName: '',
        subCategorySlNo: 0,
        nestedCategoryStatus: 0
    })

    const handleChange = (e) => {
        setNestedCategoryState({ ...nestedCategoryState, [e.target.name]: e.target.value })
    }

    const { nestedCategoryName, subCategorySlNo, nestedCategoryStatus } = nestedCategoryState

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

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
        }

        try {
            const res = await axiosApi.post('/docNestedCategoryName/insertNestedDocCategory', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['nestedCategoryList'] })
                setNestedCategoryState({
                    nestedCategoryName: '',
                    subCategorySlNo: 0,
                    nestedCategoryStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }

    }, [nestedCategoryState])

    const { isLoading, data, error } = useQuery({
        queryKey: ['nestedCategoryList'],
        queryFn: getNestedCategoryList
    })

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
                <NestedCategoryMasterList tableHeaderCol={['Action', 'Nested Category Name', 'Sub Category Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.nested_cat_slno}</td>
                                <td>{item.nested_cat_name?.toUpperCase()}</td>
                                <td>{item.subcat_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }

                </NestedCategoryMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocumentNestedCategory) 