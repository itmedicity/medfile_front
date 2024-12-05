import React, { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { Box } from '@mui/joy'

const LocationMaster = () => {
    return (
        <DefaultPageLayout label={'Location Master'}>
            <MasterPageLayout style={{}} >
                <Box className="min-h-[75vh]">
                    <CustomInputWithLabel
                        handleInputChange={() => { }}
                        values={''}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Location Name'
                        type="text"
                    />
                </Box>
            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(LocationMaster)