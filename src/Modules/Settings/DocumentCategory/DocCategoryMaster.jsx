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
import { Edit } from 'iconoir-react'

const CategoryNameList = lazy(() => import('../../../Components/CustomTable'));

const DocCategoryMaster = () => {

    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [categoryStates, setCategoryStates] = useState({
        categoryName: '',
        categoryStatus: 0,
        category_slno: 0
    })

    const handleChange = (e) => {
        setCategoryStates({ ...categoryStates, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const { categoryName, categoryStatus } = categoryStates

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
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
                cat_status: categoryStates.categoryStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user
            }

            try {
                const res = await axiosApi.post('/documentCategory/insertDocCategory', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries('catNameMast')
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
        }
        else {
            const postdata = {
                category_name: categoryStates.categoryName?.trim(),
                cat_status: Number(categoryStates.categoryStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                category_slno: Number(categoryStates?.category_slno)
            }
            const response = await axiosApi.patch('/documentCategory/editDocCategory', postdata)
            const { message, success } = response.data;
            console.log(success, "success");

            if (success === 1) {
                queryClient.invalidateQueries('catNameMast')
                succesNofity(message)
                setCategoryStates({
                    categoryName: '',
                    categoryStatus: 0,
                    category_slno: 0
                });
            }
            else {
                warningNofity(message)
            }
        }

    }, [categoryStates, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])

    const { isLoading, data, error } = useQuery({
        queryKey: ['catNameMast'],
        queryFn: getCategoryMasterList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setCategoryStates({
            categoryName: item.category_name,
            categoryStatus: item.cat_status,
            category_slno: item.cat_slno
        });
    }, [])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label="Document Category Master" >
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'categoryName', value: e.target.value } })}
                    values={categoryName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Category Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Status'
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
                <CategoryNameList tableHeaderCol={['Action', 'Slno', 'Category Name', ' Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.cat_slno}</td>
                                <td>{item.category_name?.toUpperCase()}</td>
                                <td>{item.cat_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }
                </CategoryNameList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(DocCategoryMaster)