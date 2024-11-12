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

    const [userTypeMasterState, setUserTypeMasterState] = useState({
        docTypeMasterName: '',
        docMainType: 0,
        docTypeMasterStatus: 0
    })

    const { docTypeMasterName, docMainType, docTypeMasterStatus } = userTypeMasterState

    const handleChange = (e) => {
        setUserTypeMasterState({ ...userTypeMasterState, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault()

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
            docTypeMasterStatus: userTypeMasterState.docTypeMasterStatus
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

    }, [userTypeMasterState, queryClient])

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
            <DocTypeMasterTable />
        </DefaultPageLayout>
    )
}

export default memo(DoctypeMaster) 