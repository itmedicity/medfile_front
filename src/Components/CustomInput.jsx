import { IconButton, Input } from '@mui/joy'
import React, { memo } from 'react'
import { baseColor, customInputHeight } from '../Constant/Constant'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import RefreshIcon from '@mui/icons-material/Refresh';
import { PageEdit } from 'iconoir-react'

const CustomInput = ({
    placeholder,
    sx,
    value,
    onChange,
}) => {
    return (
        <Input
            startDecorator={<PageEdit width={25} height={25} color='rgba(var(--icon-primary))' className='iconColor' style={{ transition: 'none' }} />}
            // endDecorator={<IconButton variant='soft' ><RefreshIcon sx={{ color: baseColor.primarylight, }} /></IconButton>}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            size='sm'
            variant='outlined'
            sx={{
                fontFamily: 'var(--font-varient)',
                fontSize: '0.950rem',
                fontWeight: '500',
                backgroundColor: 'rgba(var(--border-primary))',
                borderColor: 'rgba(var(--border-secondary))',
                color: 'rgba(var(--font-light))',
                borderWidth: '2.8px',
                borderRadius: '0px',
                "&.MuiInput-root": {
                    "--Input-focusedHighlight": 'none',
                    "--Input-focusedShadow": 'none',
                },
                ':hover': {
                    backgroundColor: 'rgba(var(--bg-offwhite))',
                    borderColor: 'rgba(var(--logo-dark-blue))',
                    color: 'rgba(var(--font-black))',
                    '.iconColor': {
                        color: 'rgba(var(--icon-green))',
                    }
                },
                transition: 'none',
                ...sx,
            }}
        />

    )
}

export default memo(CustomInput)