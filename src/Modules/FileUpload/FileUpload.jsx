// @ts-nocheck
import { Box, Button, Divider, Input, Textarea, Typography, colors } from '@mui/joy'
import Grid from '@mui/material/Grid2';
import React, { memo, useState } from 'react'
import { baseColor, customFontSize, customInputHeight } from '../../Constant/Constant';
import CustomInput from '../../Components/CustomInput';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CustomSelect from '../../Components/CustomSelect';
import Clock from 'react-live-clock'
import { DocSubTypeMaster, DocumentTypeMainMaster, IntituteMaster, categorymaster, courseMaster } from '../../Constant/Data';
import { getDocNumber } from '../../api/commonAPI';
import { useQuery } from '@tanstack/react-query';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { customDocNumber } from '../../Function/CommonFunction';


const FileUpload = () => {

    const [docType, setDocType] = useState(0)

    // GET UNIQUE DOCUMENT NUMBER
    const { isLoading: documentNumberLoading, data: documentNumber, error: docError } = useQuery({
        queryKey: ['getDocumentNumber'],
        queryFn: getDocNumber
    })

    // CUSTOM DOC NUMBER
    const custDocNumber = customDocNumber(documentNumber)



    const handleChangeSelect = (e, val) => {
        setDocType(val)
        // console.log(val)
    }

    return (
        <Box className="flex flex-col border-2 m-2 rounded-xl p-1 pb-2 overflow-scroll w-full" sx={{ backgroundColor: 'white' }} >

            <Typography level='title-md' textAlign='left' textColor='neutral.900' sx={{ p: 0.5, opacity: 0.4 }} >Document Name & Descriptions</Typography>
            <Divider sx={{ m: 0, mb: 0.5, backgroundColor: baseColor.primarylight }} />
            {/* Top Section start here */}
            <Box className="flex flex-col pt-5 py-6 px-5 border-[0.1rem] rounded w-full" sx={{ borderColor: baseColor.secondarylight }} >

                <Grid container spacing={0.5} sx={{ flexGrow: 1 }} direction='row-reverse' >
                    <Grid container spacing={0.3} size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }} className="border border-red-100 rounded-md" >
                        <Box className="flex flex-1 flex-col" >
                            <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-extrabold" >Doc Nubmer</Box>
                            <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold " >
                                {documentNumberLoading ? 'Loading...' : docError ? 0 : custDocNumber}
                            </Box>
                            <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-extrabold " >Doc Date</Box>
                            <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold " >
                                <Clock
                                    date={new Date()}
                                    format={'DD/MM/YYYY h:mm:ss A'}
                                    ticking={true}
                                    timezone={'Asia/Calcutta'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container spacing={0.5} size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}  >
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} >
                            <CustomInput placeholder="Doc name here..." />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} >
                            <Textarea
                                placeholder='Doc Descriptions here...'
                                minRows={1}
                                sx={{
                                    fontSize: 15,
                                    "&.MuiTextarea-root": {
                                        "--Textarea-focusedHighlight": baseColor.primarylight,
                                        "--Textarea-focusedShadow": 'none',
                                        "--Textarea-focusedThickness": '1.1px',
                                    },
                                    boxShadow: 'none'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Box>

            {/* Top Section end here */}

            <Typography level='title-md' textAlign='left' textColor='neutral.900' sx={{ p: 0.5, opacity: 0.4 }}  >Document Category Updation</Typography>

            <Box
                className="flex flex-col border-[0.1rem] rounded w-full p-1 sm:flex-col md:flex-col lg:flex-row xl:flex-row"
                sx={{ borderColor: baseColor.secondarylight }}
            >
                <Box className="flex flex-1 flex-col px-4" >
                    <Box className="flex flex-1 flex-col" >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Document Type Master</Typography>
                        <CustomSelect
                            data={DocumentTypeMainMaster}
                            placeholder="Select Document Type Master here..."
                            value={0}
                            icons={<StickyNote2Icon />}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Document Sub Type Master</Typography>
                        <CustomSelect
                            data={DocSubTypeMaster}
                            placeholder="Select Document Sub Type Master here..."
                            onChangeSelect={handleChangeSelect}
                            value={docType}
                            icons={<StickyNote2Icon />}
                        />
                    </Box>
                    {
                        docType === 2 ? (
                            <>
                                <Box className="flex flex-1 flex-col" >
                                    <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Institute Master</Typography>
                                    <CustomSelect
                                        data={IntituteMaster}
                                        placeholder="Select Institute Master here..."
                                        value={0}
                                        icons={<StickyNote2Icon />}
                                    />
                                </Box>
                                <Box className="flex flex-1 flex-col" >
                                    <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Course Name Master</Typography>
                                    <CustomSelect
                                        data={courseMaster}
                                        placeholder="Select Course NameMaster here..."
                                        value={0}
                                        icons={<StickyNote2Icon />}
                                    />
                                </Box>
                            </>
                        ) : null
                    }
                    <Box className="flex flex-1 flex-col" >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Category Master</Typography>
                        <CustomSelect
                            data={categorymaster}
                            placeholder="Select Category Master here..."
                            value={0}
                            icons={<StickyNote2Icon />}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Sub Category Master</Typography>
                        <CustomSelect
                            data={DocumentTypeMainMaster}
                            placeholder="Select Sub Category here..."
                            value={0}
                            icons={<StickyNote2Icon />}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Group Master</Typography>
                        <CustomSelect
                            data={DocumentTypeMainMaster}
                            placeholder="Select Group Master here..."
                            value={0}
                            icons={<StickyNote2Icon />}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-row py-2 justify-end" >
                        <Button variant='outlined' size='sm' color='success' sx={{ mx: 0.5, width: "100%" }} >Save Doc Information</Button>
                        <Button variant='outlined' size='sm' color='success' sx={{ mx: 0.5, width: "100%" }} >Cancel</Button>
                    </Box>
                </Box>
                <Box className="flex flex-1 bg-red-300" >
                    s
                </Box>
                {/* <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Document Type Master</Typography>
                        <CustomSelect data={DocumentTypeMainMaster} placeholder="Select Document Type Master here..." />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >Document Type Master</Typography>
                        <CustomSelect data={DocumentTypeMainMaster} placeholder="Select Document Type Master here..." />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        s
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}  >
                    </Grid>
                </Grid> */}

            </Box>

        </Box >
    )
}

export default memo(FileUpload) 