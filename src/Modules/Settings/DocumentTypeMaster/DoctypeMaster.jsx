// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { sanitizeInput, warningNofity, succesNofity, errorNofity } from '../../../Constant/Constant'
import { useNavigate } from 'react-router-dom'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import SelectCmpDocumentMainType from '../../../Components/SelectCmpDocumentMainType'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import axiosApi from '../../../Axios/Axios'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import CustomBackDrop from '../../../Components/CustomBackDrop'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import DocTypeMasterTable from './DocTypeMasterTable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getDocTypeMasterList } from '../../../api/docTypeMasterApi'

const DoctypeMaster = () => {

    const navigation = useNavigate()
    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [userTypeMasterState, setUserTypeMasterState] = useState({
        docTypeMasterName: '',
        docMainType: 0,
        docTypeMasterStatus: 0,
        doc_type_slno: 0
    })

    const { docTypeMasterName, docMainType, docTypeMasterStatus } = userTypeMasterState

    const handleChange = (e) => {
        setUserTypeMasterState({ ...userTypeMasterState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (userTypeMasterState.docTypeMasterName === '') {
                warningNofity('Document Type Master Name cannot be empty')
                return
            }

            if (userTypeMasterState.docMainType === 0) {
                warningNofity('Document Main Type cannot be empty')
                return
            }

            if (userTypeMasterState.docTypeMasterStatus === 0) {
                warningNofity('Document Type Master Status cannot be empty')
                return
            }

            const data = {
                docTypeMasterName: userTypeMasterState?.docTypeMasterName?.trim(),
                docMainType: userTypeMasterState?.docMainType,
                docTypeMasterStatus: userTypeMasterState.docTypeMasterStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user
            }

            try {
                const res = await axiosApi.post('/documentTypeMaster/insertDocTypeMaster', data);
                const { success, message } = res.data;

                if (success === 0) {
                    errorNofity(message || 'An error occurred');
                } else if (success === 1) {
                    succesNofity(message || 'Operation successful');
                    setUserTypeMasterState({ docTypeMasterName: '', docMainType: 0, docTypeMasterStatus: 0 });

                    // Invalidate the query cache using the QueryClient instance
                    queryClient.invalidateQueries({ queryKey: ['docTypeMaster'] });
                } else {
                    warningNofity(message || 'Unexpected response');
                }
            } catch (error) {
                errorNofity(error.message || 'Network error occurred');
            }
        }
        else {

            // console.log("userTypeMasterState:", userTypeMasterState);

            const postdata = {
                docTypeMasterName: userTypeMasterState?.docTypeMasterName,
                docMainType: userTypeMasterState?.docMainType,
                docTypeMasterStatus: Number(userTypeMasterState?.docTypeMasterStatus),
                docTypeSlno: userTypeMasterState?.doc_type_slno,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user
            }
            const response = await axiosApi.patch('/documentTypeMaster/editDocTypeMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['docTypeMaster'])
                succesNofity(message)
                setUserTypeMasterState({
                    docTypeMasterName: '',
                    docMainType: 0,
                    docTypeMasterStatus: 0,
                    doc_type_slno: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [userTypeMasterState, queryClient, IPAddress, browserName, browserVersion, osName, osVersion, user])

    return (
        <DefaultPageLayout label="Document Type Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'docTypeMasterName', value: e.target.value } })}
                    values={docTypeMasterName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Document Type Master Name'
                    type="text"
                />
                <SelectCmpDocumentMainType handleChange={(e, val) => handleChange({ target: { name: 'docMainType', value: val } })} value={docMainType} />
                <CustomSelectWithLabel
                    labelName='Document Main Type Status'
                    dataCollection={commonStatus}
                    values={Number(docTypeMasterStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'docTypeMasterStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitUserManagment}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <DocTypeMasterTable setUserTypeMasterState={setUserTypeMasterState} setEditData={setEditData} />
        </DefaultPageLayout>
    )
}

export default memo(DoctypeMaster) 