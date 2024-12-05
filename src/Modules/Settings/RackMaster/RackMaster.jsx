import React, { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'

const RackMaster = () => {
    return (
        <DefaultPageLayout label={'Rack Master'}>
            <MasterPageLayout style={{}}>

            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(RackMaster)