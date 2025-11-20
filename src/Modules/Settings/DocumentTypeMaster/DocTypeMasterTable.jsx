import React, { Suspense, lazy, memo, useCallback } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getDocTypeMasterList } from '../../../api/docTypeMasterApi';
import { errorNofity } from '../../../Constant/Constant';
import { Edit } from 'iconoir-react';

const DoctypeMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocTypeMasterTable = ({ setUserTypeMasterState, setEditData }) => {
    const tableheaderName = ['Action', 'Slno', 'Document Type Master Name', 'Document Main Type', 'Document Type Master Status',]

    const { isLoading, data, error } = useQuery({
        queryKey: ['docTypeMaster'],
        queryFn: getDocTypeMasterList
    })

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setUserTypeMasterState({
            docTypeMasterName: item.doc_type_master_name,
            docMainType: Number(item.main_type_slno),  //  Use the ID field, not the name
            docTypeMasterStatus: Number(item.doc_type_master_status),
            doc_type_slno: item.doc_type_slno
        });
    }, [setUserTypeMasterState, setEditData]);


    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />} >
            <DoctypeMasterList tableHeaderCol={tableheaderName} >
                {
                    data?.map((item, idx) => (
                        <tr key={idx}>
                            <td><Edit onClick={() => EditBtn(item)} style={{
                                color: "rgba(var(--color-pink))",
                                ":hover": {
                                    color: "grey",
                                }, p: 0.5
                            }} /></td>
                            <td>{item.doc_type_slno}</td>
                            <td>{item.doc_type_master_name}</td>
                            <td>{item.main_type_name}</td>
                            <td>{item.status}</td>
                        </tr>))
                }
            </DoctypeMasterList>
        </Suspense>
    )
}

export default memo(DocTypeMasterTable)