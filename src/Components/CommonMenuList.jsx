import { IconButton, Tooltip } from '@mui/joy'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { baseColor } from '../Constant/Constant';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';

const CommonMenuList = ({
    handleSubmitButtonFun,
    handleViewButtonFun
}) => {

    const navigation = useNavigate()

    return (
        <>
            <IconButton
                variant='outlined'
                sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                onClick={handleSubmitButtonFun}>
                <Tooltip title="Click Here to Submit" arrow variant='soft' color='danger'>
                    <QueueIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                </Tooltip>
            </IconButton>
            <IconButton
                variant='outlined'
                sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                onClick={handleViewButtonFun}>
                <Tooltip title="Click Here to View" arrow variant='soft' color='danger'>
                    <SearchIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                </Tooltip>
            </IconButton>
            <IconButton
                variant='outlined'
                sx={{ mt: 1, mr: 1, fontWeight: 400 }}
                onClick={() => navigation(-1)}>
                <Tooltip title="Back to Previous Page" arrow variant='soft' color='danger'>
                    <CloseIcon sx={{ fontWeight: 400, opacity: 0.6, color: baseColor.fontPink }} />
                </Tooltip>
            </IconButton>
        </>
    )
}

export default memo(CommonMenuList) 