// @ts-nocheck
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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getLocationMaster } from '../../../api/commonAPI'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useMemo } from 'react'
import { Suspense, lazy } from 'react'

const LocationMasterList = lazy(() => import('../../../Components/CustomTable'));

const LocationMaster = () => {

    const queryClient = useQueryClient();
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

        try {
            const response = await axiosApi.post('/locationMaster/insertLocationMaster', FormData)

            if (response.status === 200) {
                setLocation({
                    locationName: '',
                    localtionStatus: 0,
                })
                queryClient.invalidateQueries({ queryKey: ['locationMasterList'] })
                succesNofity('Location Master Added Successfully')
            } else {
                errorNofity('Location Master Added Failed')
            }

        } catch (error) {
            errorNofity('Location Master Added Failed' + error)
        }

    }, [localtion])


    const { isLoading, data: locationMasterData, error } = useQuery({
        queryKey: ['locationMasterList'],
        queryFn: getLocationMaster
    })

    const newLocationMaster = useMemo(() => locationMasterData, [locationMasterData])

    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)

    return (
        <DefaultPageLayout label={'Location Master'}>
            <MasterPageLayout style={{}} >
                <Box>
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
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <LocationMasterList tableHeaderCol={['Action', 'Location Name', 'Location Status']} >
                    {
                        newLocationMaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.loc_slno}</td>
                                <td>{item.loc_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </LocationMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(LocationMaster)