import React, { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import { Suspense } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { lazy } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { commonStatus } from '../../../Constant/Data'
import { useCallback } from 'react'
import { getCourseTypeList } from '../../../api/commonAPI'
import axiosApi from '../../../Axios/Axios'

const CourseTypeList = lazy(() => import('../../../Components/CustomTable'));

const CourseType = () => {
    const queryClient = useQueryClient();

    const [courseTypeState, setCourseTypeState] = useState({
        courseTypeName: '',
        courseTypeStatus: 0
    })

    const { courseTypeName, courseTypeStatus } = courseTypeState

    const handleChange = (e) => {
        setCourseTypeState({ ...courseTypeState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (courseTypeState.courseTypeName === '') {
            warningNofity('Course Type Name cannot be empty' || 'An error has occurred')
            return
        }

        if (courseTypeState.courseTypeStatus === 0) {
            warningNofity('Course Type Status cannot be empty' || 'An error has occurred')
            return
        }

        const FormData = {
            course_type_name: courseTypeState.courseTypeName?.trim(),
            course_type_status: courseTypeState.courseTypeStatus
        }

        try {
            const res = await axiosApi.post('/courseType/insertCourseType', FormData)
            const { success, message } = res.data
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries({ queryKey: ['courseType'] })
                setCourseTypeState({
                    courseTypeName: '',
                    courseTypeStatus: 0
                })
            } else if (success === 0) {
                errorNofity(message)
            } else {
                warningNofity(message)
            }

        } catch (error) {
            errorNofity(error.message || 'An error has occurred')
        }

    }, [courseTypeState])

    const { isLoading, data, error } = useQuery({
        queryKey: ['courseType'],
        queryFn: getCourseTypeList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Course Type Master'}>
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'courseTypeName', value: e.target.value } })}
                    values={courseTypeName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Course Type Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Course Type Status'
                    dataCollection={commonStatus}
                    values={Number(courseTypeStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'courseTypeStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <CourseTypeList tableHeaderCol={['Action', 'Course Type Name', 'Course Type Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.course_type_slno}</td>
                                <td>{item.course_type_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </CourseTypeList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(CourseType) 