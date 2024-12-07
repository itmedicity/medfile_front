import React, { memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { Box } from '@mui/joy'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant'
import axiosApi from '../../../Axios/Axios'

const LocationMaster = () => {
    const [localtion, setLocation] = useState({
        locationName: '',
        localtionStatus: 0,
    })

    const { locationName, localtionStatus } = localtion;

    const handleChange = useCallback((e) => {
        setLocation({ ...localtion, [e.target.name]: e.target.value })
    }, [localtion])

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (localtion.locationName === '' || localtion.locationName === null || localtion.locationName === undefined) {
            warningNofity('Location Name cannot be empty' || 'An error has occurred')
            return
        }

        if (localtion.localtionStatus === 0 || localtion.localtionStatus === null || localtion.localtionStatus === undefined) {
            warningNofity('Location Status cannot be empty' || 'An error has occurred')
            return
        }

        const FormData = {
            location_name: localtion.locationName?.trim(),
            location_status: localtion.localtionStatus
        }

        const response = await axiosApi.post('/locationMaster/insertLocationMaster', FormData)

        if (response.status === 200) {
            setLocation({
                locationName: '',
                localtionStatus: 0,
            })
            succesNofity('Location Master Added Successfully')
        } else {
            errorNofity('Location Master Added Failed')
        }

    }, [localtion])

    return (
        <DefaultPageLayout label={'Location Master'}>
            <MasterPageLayout style={{}} >
                <Box className="min-h-[75vh]">
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'locationName', value: e.target.value } })}
                        values={locationName}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Location Name'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='Location Status'
                        dataCollection={commonStatus}
                        values={Number(localtionStatus)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'localtionStatus', value: val } })}
                        placeholder={"Select here ..."}
                    />
                    <CommonMenuList
                        handleSubmitButtonFun={handleSubmitButtonFun}
                        handleViewButtonFun={() => { }}
                    />
                </Box>
            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(LocationMaster)