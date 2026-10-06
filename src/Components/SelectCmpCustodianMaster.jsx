import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCustodianByDept, getSelectCustodianDepartmentData } from '../api/commonAPI'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectCmpCustodianMaster = ({ handleChange, value, label, custDeptSlno }) => {

    const isDeptFilter = custDeptSlno !== undefined;
    const hasDeptSelected = isDeptFilter ? Boolean(custDeptSlno && Number(custDeptSlno) > 0) : true;

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectCustodianMasterData', custDeptSlno],
        queryFn: () => isDeptFilter ? (hasDeptSelected ? getCustodianByDept(custDeptSlno) : []) : getSelectCustodianDepartmentData(),
        enabled: !isDeptFilter || hasDeptSelected,
        staleTime: Infinity
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={data || []}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={
                isDeptFilter && !hasDeptSelected
                    ? "Select Department First"
                    : (isLoading ? "Loading..." : "Select here ...")
            }
            disabled={isDeptFilter && !hasDeptSelected}
        />
    )
}

export default SelectCmpCustodianMaster