import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getIntitutionTypeList } from '../../../api/commonAPI'
import axiosApi from '../../../Axios/Axios'
import { Edit } from 'iconoir-react'

const InstitutionTypeList = lazy(() => import('../../../Components/CustomTable'));

const InstituteTypeMaster = () => {

    const queryClient = useQueryClient();
    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [institutionTypeState, setInstitutionTypeState] = useState({
        institutionTypeName: '',
        institutionTypeStatus: 0,
        institutionTypeSlno: 0
    })

    const { institutionTypeName, institutionTypeStatus } = institutionTypeState

    const handleChange = (e) => {
        setInstitutionTypeState({ ...institutionTypeState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (editData === 0) {
            if (institutionTypeState.institutionTypeName === '') {
                warningNofity('Institution Type Name cannot be empty' || 'An error has occurred')
                return
            }

            if (institutionTypeState.institutionTypeStatus === 0) {
                warningNofity('Institution Type Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                institute_type_name: institutionTypeState.institutionTypeName?.trim(),
                institute_type_status: Number(institutionTypeState.institutionTypeStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user)
            }

            try {
                const res = await axiosApi.post('/instituteType/insertInstituteType', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['institutionType'] })
                    setInstitutionTypeState({
                        institutionTypeName: '',
                        institutionTypeStatus: 0,
                        institutionTypeSlno: 0
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
                institutionTypeName: institutionTypeState?.institutionTypeName?.trim(),
                institutionTypeStatus: Number(institutionTypeState?.institutionTypeStatus),
                institutionTypeSlno: institutionTypeState?.institutionTypeSlno,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }
            const response = await axiosApi.patch('/instituteType/editInstituteTypeMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['institutionType'])
                succesNofity(message)
                setInstitutionTypeState({
                    institutionTypeName: '',
                    institutionTypeStatus: 0,
                    institutionTypeSlno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [institutionTypeState, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])

    const { isLoading, data, error } = useQuery({
        queryKey: ['institutionType'],
        queryFn: getIntitutionTypeList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setInstitutionTypeState({
            institutionTypeName: item.institute_type_name,
            institutionTypeStatus: item.institute_type_status,
            institutionTypeSlno: item.institute_type_slno
        })
    }, []);

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Institute Type Master'}>
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'institutionTypeName', value: e.target.value } })}
                    values={institutionTypeName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Institution Type Name'
                    type="text"
                />
                <CustomSelectWithLabel
                    labelName='Institution Type Status'
                    dataCollection={commonStatus}
                    values={Number(institutionTypeStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'institutionTypeStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <InstitutionTypeList tableHeaderCol={['Action', 'Slno', 'Institution Type Name', 'Institution Type Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td ><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.institute_type_slno}</td>
                                <td>{item.institute_type_name?.toUpperCase()}</td>
                                <td>{item.institute_type_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }
                </InstitutionTypeList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(InstituteTypeMaster)