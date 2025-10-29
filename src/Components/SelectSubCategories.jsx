import React, { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { useQuery } from '@tanstack/react-query'
import { getSubCategoryList } from '../api/commonAPI'
import { errorNofity } from '../Constant/Constant'

const SelectSubCategories = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['docSubCategoryMaster'],
        queryFn: getSubCategoryList
    })
    const transformedData = data?.map(item => ({
        value: item.subcat_slno,
        label: item.subcat_name
    })) || [];

    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'Document Main Type'}
            dataCollection={transformedData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectSubCategories)

