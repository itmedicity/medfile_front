import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getNestedCategoryList } from '../api/commonAPI'
import { useQuery } from '@tanstack/react-query'
import { errorNofity } from '../Constant/Constant'

const SelectNestedCate = ({ handleChange, value, label, subCatSlno }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['nestedCategoryList'],
        queryFn: getNestedCategoryList
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    const filteredData = data
        ?.filter((item) => item.subcat_slno === subCatSlno)
        ?.map((item) => ({
            value: item.nested_cat_slno,
            label: item.nested_cat_name,
        }));

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={filteredData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectNestedCate)
