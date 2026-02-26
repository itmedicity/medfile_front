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
import { Edit } from 'iconoir-react'

const LocationMasterList = lazy(() => import('../../../Components/CustomTable'));

const LocationMaster = () => {

    const queryClient = useQueryClient();
    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)

    const [localtion, setLocation] = useState({
        locationName: '',
        localtionStatus: 0,
        locationSlno: 0
    })

    const { locationName, localtionStatus } = localtion;

    const handleChange = useCallback((e) => {
        setLocation({ ...localtion, [e.target.name]: e.target.value })
    }, [localtion])

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()

        if (editData === 0) {

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
                location_status: localtion.localtionStatus,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
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
        }
        else {
            const postdata = {
                location_name: localtion.locationName?.trim(),
                location_status: localtion.localtionStatus,
                locationSlno: localtion?.locationSlno,
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
            }
            const response = await axiosApi.patch('/locationMaster/updateLocationMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['locationMasterList'])
                succesNofity(message)
                setLocation({
                    locationName: '',
                    localtionStatus: 0,
                    locationSlno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [localtion, IPAddress, browserName, browserVersion, osName, osVersion, user, queryClient, editData])


    const { isLoading, data: locationMasterData, error } = useQuery({
        queryKey: ['locationMasterList'],
        queryFn: getLocationMaster
    })

    const EditBtn = useCallback((item) => {
        // console.log("item:", item);
        setEditData(1);
        setLocation({
            locationName: item.loc_name,
            localtionStatus: item.loc_status,
            locationSlno: item.loc_slno
        })
    }, []);

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
                <LocationMasterList tableHeaderCol={['Action', 'Slno', 'Location Name', 'Location Status']} >
                    {
                        newLocationMaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td ><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.loc_slno}</td>
                                <td>{item.loc_name?.toUpperCase()}</td>
                                <td>{item.loc_status === 1 ? "Active" : "Inactive"}</td>
                            </tr>
                        ))
                    }
                </LocationMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(LocationMaster)