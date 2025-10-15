import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const CustodialDepartmentNames = ({ handleChange, value, label, data }) => {

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={data}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder="Select here ..."
        />
    )
}

export default memo(CustodialDepartmentNames)
