import React, { Suspense, lazy, memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import SelectCmpInstitutionType from '../../../Components/SelectCmpInstitutionType'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CommonMenuList from '../../../Components/CommonMenuList'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import { commonStatus } from '../../../Constant/Data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getInstitutionList } from '../../../api/commonAPI'
import axiosApi from '../../../Axios/Axios'
import { Edit } from 'iconoir-react'

const SelectInstitutionMasterList = lazy(() => import('../../../Components/CustomTable'));

const InstitutionMaster = () => {

    const queryClient = useQueryClient();
    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [institutionMasterState, setInstitutionMasterState] = useState({
        institutionName: '',
        institutionTypeSlno: 0,
        institutionStatus: 0,
        institution_slno: 0
    })

    const { institutionName, institutionTypeSlno, institutionStatus } = institutionMasterState

    const handleChange = (e) => {
        setInstitutionMasterState({ ...institutionMasterState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (editData === 0) {

            if (institutionMasterState.institutionName === '') {
                warningNofity('Institution Name cannot be empty' || 'An error has occurred')
                return
            }

            if (institutionMasterState.institutionTypeSlno === 0) {
                warningNofity('Institution Type Name cannot be empty' || 'An error has occurred')
                return
            }

            if (institutionMasterState.institutionStatus === 0) {
                warningNofity('Institution Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                institution_name: institutionMasterState.institutionName?.trim(),
                institution_type_slno: Number(institutionMasterState.institutionTypeSlno),
                institution_status: Number(institutionMasterState.institutionStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }

            try {
                const res = await axiosApi.post('/institutionMaster/insertInstitutionMaster', FormData)
                const { success, message } = res.data
                if (success === 1) {
                    succesNofity(message)
                    queryClient.invalidateQueries({ queryKey: ['instituteMasterList'] })
                    setInstitutionMasterState({
                        institutionName: '',
                        institutionTypeSlno: 0,
                        institutionStatus: 0
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
                institution_name: institutionMasterState.institutionName?.trim(),
                institution_type_slno: institutionMasterState.institutionTypeSlno,
                institution_status: institutionMasterState.institutionStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                institution_slno: institutionMasterState?.institution_slno
            }
            const response = await axiosApi.patch('/institutionMaster/editInstitutionMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['instituteMasterList'])
                succesNofity(message)
                setInstitutionMasterState({
                    institutionName: '',
                    institutionTypeSlno: 0,
                    institutionStatus: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [institutionMasterState, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])

    const { isLoading, data, error } = useQuery({
        queryKey: ['instituteMasterList'],
        queryFn: getInstitutionList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setInstitutionMasterState({
            institutionName: item?.institution_name,
            institutionTypeSlno: item?.institution_name,
            institutionStatus: item?.institution_status,
            institution_slno: item?.institution_slno
        })
    }, []);

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label='Institution Master' >
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'institutionName', value: e.target.value } })}
                    values={institutionName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Institution Name'
                    type="text"
                />
                <SelectCmpInstitutionType label='Institution Type Name' handleChange={(e, val) => handleChange({ target: { name: 'institutionTypeSlno', value: val } })} value={institutionTypeSlno} />
                <CustomSelectWithLabel
                    labelName='Status'
                    dataCollection={commonStatus}
                    values={Number(institutionStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'institutionStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <SelectInstitutionMasterList tableHeaderCol={['Action', 'Slno', 'Institution Name', 'Institution Type Name', 'Status']} >
                    {
                        data?.map((item, idx) => (
                            <tr key={idx}>
                                <td ><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.institution_slno}</td>
                                <td>{item.institution_name?.toUpperCase()}</td>
                                <td>{item.institute_type_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </SelectInstitutionMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(InstitutionMaster)