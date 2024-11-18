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
            slotProps={{
                listbox: {
                    sx: {
                        backgroundColor: 'rgba(var(--active-bg))',
                        borderColor: 'rgba(var(--border-primary))',
                        '& .MuiOption-root': {
                            color: "white",
                        },
                        '& .MuiOption-root:hover': {
                            backgroundColor: 'rgba(var(--bg-offwhite))',
                            color: 'rgba(var(--font-black))',
                        },
                        '& .MuiOption-highlighted': {
                            color: 'rgba(var(--font-black))',
                        },
                    },
                },
            }}
            sx={{
                transition: 'none',
                width: '100%',
                boxShadow: 'none',
                borderWidth: '2.8px',
                '&.MuiSelect-root': {
                    "--Select-focusedHighlight": 'none',
                    "--Select-focusedThickness": '1.1px',
                    "--Select-boxShadow": 'none',
                },
                borderRadius: '0px',
                backgroundColor: 'rgba(var(--border-primary))',
                borderColor: 'rgba(var(--border-secondary))',
                color: 'rgba(var(--font-light))',
                ':hover': {
                    transition: 'none',
                    backgroundColor: 'rgba(var(--bg-offwhite))',
                    borderColor: 'rgba(var(--logo-dark-blue))',
                    color: 'rgba(var(--font-black))',
                    '.iconColor': {
                        color: 'rgba(var(--icon-green))',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(var(--icon-green))',
                    }
                },
                '& .MuiSvgIcon-root': {
                    color: 'rgba(var(--icon-primary))',
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