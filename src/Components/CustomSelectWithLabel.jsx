import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustomSelect from './CustomSelect'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { baseColor } from '../Constant/Constant';
import { PageEdit } from 'iconoir-react'


const CustomSelectWithLabel = ({
  values,
  handleChangeSelect,
  dataCollection,
  labelName,
  placeholder
}) => {
  return (
    <Box className="flex flex-1 flex-col" >
      <Typography level='body-sm'
        sx={{
          fontWeight: 600,
          opacity: 0.9,
          pl: 0.2,
          fontFamily: 'var(--font-varient)',
          color: 'rgba(var(--font-primary-white))'
        }}
        fontSize='0.7rem'
      >{labelName}</Typography>
      <CustomSelect
        data={dataCollection}
        placeholder={placeholder}
        onChangeSelect={handleChangeSelect}
        value={values}
        icons={<PageEdit width={25} height={25} color='rgba(var(--icon-primary))' className='iconColor' style={{ transition: 'none' }} />}
      />
    </Box>
  )
}

export default memo(CustomSelectWithLabel) 