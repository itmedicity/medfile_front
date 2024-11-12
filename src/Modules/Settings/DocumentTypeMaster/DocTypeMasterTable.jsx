import React, { Suspense, lazy, memo } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getDocTypeMasterList } from '../../../api/docTypeMasterApi';
import { errorNofity } from '../../../Constant/Constant';

const DoctypeMasterList = lazy(() => import('../../../Components/CustomTable'));

const DocTypeMasterTable = () => {
    const tableheaderName = ['Action', 'Document Type Master Name', 'Document Main Type', 'Document Type Master Status',]

    const { isLoading, data, error } = useQuery({
        queryKey: ['docTypeMaster'],
        queryFn: getDocTypeMasterList
    })

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />} >
            <DoctypeMasterList tableHeaderCol={tableheaderName} >
                {
                    data?.map((item, idx) => (
                        <tr key={idx}>
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