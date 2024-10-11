// @ts-nocheck
import { Box, Button, Checkbox, Divider, Input, Textarea, Typography, colors } from '@mui/joy'
import Grid from '@mui/material/Grid2';
import React, { memo, useState } from 'react'
import { baseColor, customFontSize, customInputHeight, sanitizeInput } from '../../Constant/Constant';
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
import SelectDocTypeMaster from '../../Components/SelectDocTypeMaster';
import SelectDocSubTypeMaster from '../../Components/SelectDocSubTypeMaster';
import SelectInstituteMaster from '../../Components/SelectInstituteMaster';
import SelectCourseMaster from '../../Components/SelectCourseMaster';
import SelectCmpCategoryNameList from '../../Components/SelectCmpCategoryNameList';
import SelectSubCategoryMater from '../../Components/SelectSubCategoryMater';
import SelectGroupMaster from '../../Components/SelectGroupMaster';
import { format } from 'date-fns';
import CustomButtonDateFeild from '../../Components/CustomButtonDateFeild';
import CustomDateFeild from '../../Components/CustomDateFeild';


const FileUpload = () => {

    // const [docType, setDocType] = useState(0)

    // GET UNIQUE DOCUMENT NUMBER
    const { isLoading: documentNumberLoading, data: documentNumber, error: docError } = useQuery({
        queryKey: ['getDocumentNumber'],
        queryFn: getDocNumber
    })

    // CUSTOM DOC NUMBER
    const custDocNumber = customDocNumber(documentNumber)

    const [date, setDate] = useState(new Date())

    // DOCUMENT UPLOAD AMIN STATE VALUE
    const [documentState, setDocumentState] = useState({
        docNumber: custDocNumber,
        docName: '',
        docDes: '',
        docType: 0,
        docSubType: 0,
        institute: 0,
        course: 0,
        category: 0,
        subCategory: 0,
        group: 0,

    })

    const { docNumber, docName, docDes, docType, docSubType, institute, course, category, subCategory, group } = documentState


    const handleDocumentState = (e) => {
        setDocumentState({ ...documentState, [e.target.name]: sanitizeInput(e.target.value) })
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
                                    date={format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
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
                        <SelectDocTypeMaster
                            label={'Document Type Master'}
                            handleChange={(e, element) => handleDocumentState({ target: { name: 'docType', value: element } })}
                            value={docType}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <SelectDocSubTypeMaster
                            label={'Document Sub Type Master'}
                            handleChange={(e, element) => handleDocumentState({ target: { name: 'docSubType', value: element } })}
                            value={docSubType}
                        />
                    </Box>
                    {
                        docSubType === '2' ? (
                            <>
                                <Box className="flex flex-1 flex-col" >
                                    <SelectInstituteMaster
                                        label={'Institute Master'}
                                        handleChange={(e, element) => handleDocumentState({ target: { name: 'institute', value: element } })}
                                        value={institute}
                                    />
                                </Box>
                                <Box className="flex flex-1 flex-col" >
                                    <SelectCourseMaster
                                        label={'Course Master'}
                                        handleChange={(e, element) => handleDocumentState({ target: { name: 'course', value: element } })}
                                        value={course}
                                    />
                                </Box>
                            </>
                        ) : null
                    }
                    <Box className="flex flex-1 flex-col" >
                        <SelectCmpCategoryNameList
                            label={'Category Name List'}
                            handleChange={(e, element) => handleDocumentState({ target: { name: 'category', value: element } })}
                            value={category}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <SelectSubCategoryMater
                            label={'Sub Category Master'}
                            catSlno={Number(category) ?? 0}
                            handleChange={(e, element) => handleDocumentState({ target: { name: 'subCategory', value: element } })}
                            value={subCategory}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col" >
                        <SelectGroupMaster
                            label={'Group Master'}
                            handleChange={(e, element) => handleDocumentState({ target: { name: 'group', value: element } })}
                            value={group}
                        />
                    </Box>
                    <Box className="flex flex-1 flex-col pt-1" >
                        <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                            <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                                <Typography level='body-sm' sx={{ fontWeight: 200, opacity: 0.9, pl: 0.2, }} >Document Date</Typography>
                            </Box>
                            <Box className="flex flex-1 justify-end">
                                <CustomDateFeild date={date} setDate={setDate} />
                            </Box>
                        </Box>

                        <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                            <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                                <Typography level='body-sm' sx={{ fontWeight: 200, opacity: 0.9, pl: 0.2, }} >Document Version</Typography>
                            </Box>
                            <Box className="flex flex-1 justify-end ">
                                <Input sx={{ ...customInputHeight, mx: '0.4rem' }} fullWidth disabled />
                            </Box>
                        </Box>

                        <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                            <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                                <Typography level='body-sm' sx={{ fontWeight: 200, opacity: 0.9, pl: 0.2, }} >Document Version Date</Typography>
                            </Box>
                            <Box className="flex flex-1 justify-end ">
                                <CustomDateFeild date={date} setDate={setDate} />
                            </Box>
                        </Box>

                        <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                            <Checkbox label="Is Validity Required for this Document" variant='outlined' color='danger' defaultChecked sx={{ opacity: 0.9, fontSize: '0.9rem' }} />
                        </Box>
                        <Box className="flex flex-1 items-center py-[0.1rem]">
                            <Box className="flex flex-1">
                                <CustomButtonDateFeild date={date} setDate={setDate} />
                            </Box>
                            <Box className="flex flex-1">
                                <CustomButtonDateFeild date={date} setDate={setDate} />
                            </Box>
                        </Box>
                    </Box>
                    {/* SUBMIT BUTTON SECTION */}
                    <Box className="flex flex-1 flex-row py-2 justify-end" >
                        <Button variant='outlined' size='sm' color='success' sx={{ mx: 0.5, width: "100%" }} >Save Doc Information</Button>
                        <Button variant='outlined' size='sm' color='success' sx={{ mx: 0.5, width: "100%" }} >Cancel</Button>
                    </Box>
                    {/* END SUBMIT BUTTON SECTION */}
                </Box>


                {/* COCUMENT UPLOAD SECTION */}
                <Box className="flex flex-1 bg-red-300" >
                    s
                </Box>
                {/* END COCUMENT UPLOAD SECTION */}

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