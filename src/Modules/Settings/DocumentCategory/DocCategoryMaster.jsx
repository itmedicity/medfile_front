import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import { commonStatus } from '../../../Constant/Data'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { getCategoryMasterList } from '../../../api/commonAPI'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosApi from '../../../Axios/Axios'

const CategoryNameList = lazy(() => import('../../../Components/CustomTable'));

const DocCategoryMaster = () => {

    const queryClient = useQueryClient();

    const [categoryStates, setCategoryStates] = useState({
        categoryName: '',
        categoryStatus: 0
    })

    const handleChange = (e) => {
        setCategoryStates({ ...categoryStates, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { categoryName, categoryStatus } = categoryStates

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (categoryStates.categoryName === '') {
            warningNofity('Category Name cannot be empty' || 'An error has occurred')
            return
        }

        if (categoryStates.categoryStatus === 0) {
            warningNofity('Category Status cannot be empty' || 'An error has occurred')
            return
        }

        const FormData = {
            category_name: categoryStates.categoryName?.trim(),
            cat_status: categoryStates.categoryStatus
        }

        try {
            const res = await axiosApi.post('/documentCategory/insertDocCategory', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['catNameMast'] })
                setCategoryStates({
                    categoryName: '',
                    categoryStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }


    }, [categoryStates])

    const { isLoading, data, error } = useQuery({
        queryKey: ['catNameMast'],
        queryFn: getCategoryMasterList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label="Document Category Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'categoryName', value: e.target.value } })}
                    values={categoryName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Category Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Sub Type Status'
                    dataCollection={commonStatus}
                    values={Number(categoryStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'categoryStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <CategoryNameList tableHeaderCol={['Action', 'Category Name', ' Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cat_slno}</td>
                                <td>{item.category_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </CategoryNameList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocCategoryMaster)