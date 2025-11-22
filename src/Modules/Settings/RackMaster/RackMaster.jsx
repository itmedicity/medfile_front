import React, { memo, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { commonStatus } from '../../../Constant/Data'
import SelectCmpLocationMaster from '../../../Components/SelectCmpLocationMaster'
import CommonMenuList from '../../../Components/CommonMenuList'
import { Suspense } from 'react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { lazy } from 'react'
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import axiosApi from '../../../Axios/Axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getRackMasterList } from '../../../api/commonAPI'
import { Edit } from 'iconoir-react'

const RackMasterList = lazy(() => import('../../../Components/CustomTable'));

const RackMaster = () => {
    const queryClient = useQueryClient();

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);
    const IPAddress = atob(JSON.parse(userData)?.IPAddress);
    const browserName = atob(JSON.parse(userData)?.browserName);
    const browserVersion = atob(JSON.parse(userData)?.browserVersion);
    const osName = atob(JSON.parse(userData)?.osName);
    const osVersion = atob(JSON.parse(userData)?.osVersion);

    const [editData, setEditData] = useState(0)
    const [rackMaster, setRackMaster] = useState({
        rackName: '',
        rackShortName: '',
        locationName: 0,
        rackStatus: 0,
        rackSlno: 0
    })

    const handleChange = useCallback((e) => {
        setRackMaster({ ...rackMaster, [e.target.name]: sanitizeInput(e.target.value) })
    }, [rackMaster])

    const { rackName, rackShortName, locationName, rackStatus } = rackMaster

    const handleSubmitButtonFun = useCallback(async (e) => {
        e.preventDefault()
        if (editData === 0) {
            if (rackMaster.rackName === '') {
                warningNofity('Rack Name cannot be empty' || 'An error has occurred')
                return
            }

            if (rackMaster.rackShortName === '') {
                warningNofity('Rack Short Name cannot be empty' || 'An error has occurred')
                return
            }

            if (rackMaster.rackShortName.length > 5) {
                warningNofity('Rack Short Name cannot be greater than 3 characters' || 'An error has occurred')
                return
            }

            if (rackMaster.locationName === 0) {
                warningNofity('Location Name cannot be empty' || 'An error has occurred')
                return
            }

            if (rackMaster.rackStatus === 0) {
                warningNofity('Rack Status cannot be empty' || 'An error has occurred')
                return
            }

            const FormData = {
                rack_name: rackMaster.rackName?.trim(),
                rack_short_name: rackMaster.rackShortName?.trim().toLocaleUpperCase(),
                location_name: Number(rackMaster.locationName),
                rack_status: Number(rackMaster.rackStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: user
            }

            try {
                const response = await axiosApi.post('/rackMaster/insertRackMaster', FormData)
                if (response.status === 200) {
                    setRackMaster({
                        rackName: '',
                        rackShortName: '',
                        locationName: 0,
                        rackStatus: 0,
                        rackSlno: 0
                    })
                    queryClient.invalidateQueries({ queryKey: ['rackMasterList'] })
                    succesNofity('Rack Master Added Successfully')
                } else {
                    errorNofity('Rack Master Added Failed')
                }

            } catch (error) {
                warningNofity('An error has occurred')
            }
        }
        else {
            const postdata = {
                rack_name: rackMaster.rackName?.trim(),
                rack_short_name: rackMaster.rackShortName?.trim().toLocaleUpperCase(),
                location_name: Number(rackMaster.locationName),
                rack_status: Number(rackMaster.rackStatus),
                IPAddress: IPAddress ? IPAddress : 'Unknown',
                browserName: browserName ? browserName : 'Unknown',
                browserVersion: browserVersion ? browserVersion : 'Unknown',
                osName: osName ? osName : 'Unknown',
                osVersion: osVersion ? osVersion : 'Unknown',
                user: Number(user),
                rackSlno: rackMaster?.rackSlno
            }

            const response = await axiosApi.patch('/rackMaster/updateRackMaster', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries('rackMasterList')
                succesNofity(message)
                setRackMaster({
                    rackName: '',
                    rackShortName: '',
                    locationName: 0,
                    rackStatus: 0,
                    rackSlno: 0
                })
            }
            else {
                warningNofity(message)
            }
        }
    }, [rackMaster])


    const { isLoading, data: rackMasterData, error } = useQuery({
        queryKey: ['rackMasterList'],
        queryFn: getRackMasterList,
        staleTime: Infinity
    })

    const newRackMaster = useMemo(() => rackMasterData, [rackMasterData])


    const EditBtn = useCallback((item) => {
        setEditData(1)
        setRackMaster({
            rackName: item?.rac_desc,
            rackShortName: item?.rac_alice,
            locationName: item?.loc_slno,
            rackStatus: item?.rac_status,
            rackSlno: item?.rac_slno
        })
    }, [])


    if (isLoading) return <CustomBackDropWithOutState message="Loading..." />

    if (error) return errorNofity('An error has occurred: ' + error.message)


    return (
        <DefaultPageLayout label={'Rack Master'}>
            <MasterPageLayout style={{}}>
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'rackName', value: e.target.value } })}
                    values={rackName}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Rack Name'
                    type="text"
                />
                <CustomInputWithLabel
                    handleInputChange={(e) => handleChange({ target: { name: 'rackShortName', value: e.target.value } })}
                    values={rackShortName}
                    placeholder="Rack Short Name cannot be greater than 3 characters"
                    sx={{}}
                    labelName='Rack Short Name'
                    type="text"
                />
                <SelectCmpLocationMaster
                    label={'Location Name'}
                    value={locationName}
                    handleChange={(e, val) => handleChange({ target: { name: 'locationName', value: val } })} />
                <CustomSelectWithLabel
                    labelName='Rack Status'
                    dataCollection={commonStatus}
                    values={Number(rackStatus)}
                    handleChangeSelect={(e, val) => handleChange({ target: { name: 'rackStatus', value: val } })}
                    placeholder={"Select here ..."}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitButtonFun}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <RackMasterList tableHeaderCol={['Action', 'Slno', 'Rack Name', 'Rack Short Name', 'Location Name', 'Rack Status']} >
                    {
                        newRackMaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                    }, p: 0.5
                                }} /></td>
                                <td>{item.rac_slno}</td>
                                <td>{item.rac_desc?.toUpperCase()}</td>
                                <td>{item.rac_alice?.toUpperCase()}</td>
                                <td>{item.loc_name?.toUpperCase()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    }
                </RackMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}

export default memo(RackMaster)