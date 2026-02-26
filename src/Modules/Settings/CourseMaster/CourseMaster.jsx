import React from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import SelectCmpCourseType from '../../../Components/SelectCmpCourseType'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import { Suspense } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { lazy } from 'react'
import { getCourseList } from '../../../api/commonAPI'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { useState } from 'react'
import { useCallback } from 'react'
import axiosApi from '../../../Axios/Axios'
import { Edit } from 'iconoir-react'

const CourseMasterList = lazy(() => import('../../../Components/CustomTable'));

const CourseMaster = () => {

    const queryClient = useQueryClient();
    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [courseMasterState, setCourseMasterState] = useState({
        courseName: '',
        courseTypeSlno: 0,
        courseStatus: 0,
        courseName_slno: 0
    });

    const { courseName, courseTypeSlno, courseStatus } = courseMasterState;

    const handleChange = (e) => {
        setCourseMasterState({ ...courseMasterState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault();
        if (editData === 0) {
            if (courseMasterState.courseName === '') {
                warningNofity('Course Name cannot be empty' || 'An error has occurred')
                return
            }

            if (courseMasterState.courseTypeSlno === 0) {
                warningNofity('Course Type Name cannot be empty' || 'An error has occurred')
                return
            }

            if (courseMasterState.courseStatus === 0) {
                warningNofity('Course Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                course_name: courseMasterState.courseName?.trim(),
                course_type_slno: courseMasterState.courseTypeSlno,
                course_status: courseMasterState.courseStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }

            try {
                const res = await axiosApi.post('/courseMaster/insertCourseMater', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['getCourseList'] })
                    setCourseMasterState({
                        courseName: '',
                        courseTypeSlno: 0,
                        courseStatus: 0
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
                course_name: courseMasterState.courseName?.trim(),
                course_type_slno: courseMasterState.courseTypeSlno,
                course_status: courseMasterState.courseStatus,
                courseName_slno: courseMasterState?.courseName_slno,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }
            const response = await axiosApi.patch('/courseMaster/editCourseMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['getCourseList'])
                succesNofity(message)
                setCourseMasterState({
                    courseName: '',
                    courseTypeSlno: 0,
                    courseStatus: 0,
                    courseName_slno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [courseMasterState, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])

    const { isLoading, data, error } = useQuery({
        queryKey: ['getCourseList'],
        queryFn: getCourseList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setCourseMasterState({
            courseName: item.course_name,
            courseTypeSlno: item.course_type_slno,
            courseStatus: item.course_status,
            courseName_slno: item.course_slno
        })
    }, []);

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label='Course Master' >
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'courseName', value: e.target.value } })}
                    values={courseName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Course Name'
                    type="text"
                />
                <SelectCmpCourseType label='Course Type Name' handleChange={(e, val) => handleChange({ target: { name: 'courseTypeSlno', value: val } })} value={courseTypeSlno} />
                <CustomSelectWithLabel
                    labelName='Status'
                    dataCollection={commonStatus}
                    values={Number(courseStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'courseStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <CourseMasterList tableHeaderCol={['Action', 'slno', 'Course Name', 'Course Type Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td ><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.course_slno}</td>
                                <td>{item.course_name?.toUpperCase()}</td>
                                <td>{item.course_type_name?.toUpperCase()}</td>
                                <td>{item.course_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }
                </CourseMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(CourseMaster)