import React, { memo } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const CustomSelect = ({ data, placeholder, onChangeSelect, value }) => {
    return (
        <Select
            // defaultValue={0}
            value={value}
            size='sm'
            sx={{
                width: '100%',
            }}
            onChange={onChangeSelect}
        >
            <Option value={0} >{placeholder}</Option>
            {
                data?.map((val, ind) => (<Option key={ind} value={val.value}>{val.label}</Option>))
            }
        </Select>
    )
}

export default memo(CustomSelect)