import React, { memo } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { baseColor } from '../Constant/Constant';

const CustomSelect = ({ data, placeholder, onChangeSelect, value, icons }) => {
    return (
        <Select
            // defaultValue={0}
            value={value}
            size='sm'
            startDecorator={icons}
            sx={{
                width: '100%',
                boxShadow: 'none',
                '&.MuiSelect-root': {
                    "--Select-focusedHighlight": baseColor.primarylight,
                    "--Select-focusedThickness": '1.1px',
                    "--Select-boxShadow": 'none',
                    // borderColor: 'red',
                    // backgroundColor: 'red',
                    // outlineColor: 'red',
                },
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