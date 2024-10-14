import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustomSelect from './CustomSelect'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { baseColor } from '../Constant/Constant';

const CustomSelectWithLabel = ({
  values,
  handleChangeSelect,
  dataCollection,
  labelName,
  placeholder
}) => {
  return (
    <Box className="flex flex-1 flex-col" >
      <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >{labelName}</Typography>
      <CustomSelect
        data={dataCollection}
        placeholder={placeholder}
        onChangeSelect={handleChangeSelect}
        value={values}
        icons={<StickyNote2Icon sx={{ color: baseColor.primarylight }} />}
      />
    </Box>
  )
}

export default memo(CustomSelectWithLabel) 