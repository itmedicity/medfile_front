import React, { Suspense, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import MasterPageLayout from '../../Components/MasterPageLayout'
import AutoSelectDocTypeMast from '../../Components/AutoSelectDocTypeMast'
import AutoSubTypeMaster from '../../Components/AutoSubTypeMaster'
import AutoCategoryName from '../../Components/AutoCategoryName'
import AutoSubCategory from '../../Components/AutoSubCategory'
import AutoGroupName from '../../Components/AutoGroupName'
import AutoInstitutionMast from '../../Components/AutoInstitutionMast'
import AutoCourse from '../../Components/AutoCourse'
import Grid from '@mui/material/Grid2'
import { Box, Button, Divider, Input } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search';
import { TableVirtuoso } from 'react-virtuoso'
import TableHeaderVirtue from '../Dashboard/Components/TableHeaderVirtue'
import TableContentVirtue from '../Dashboard/Components/TableContentVirtue'
import { useCallback } from 'react'
import { errorNofity, sanitizeInput, warningNofity } from '../../Constant/Constant'
import axiosApi from '../../Axios/Axios'
import ClearIcon from '@mui/icons-material/Clear';

const AdvancedSearch = () => {
    const [reset, setReset] = useState(false)
    const [tableData, setTableData] = useState([])
    const [state, setState] = useState({
        docType: 0,
        subType: 0,
        category: 0,
        subCategory: 0,
        group: 0,
        institute: 0,
        course: 0,
        docNumber: 0
    })

    const handleSetState = (e) => {
        setState({ ...state, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSearchDoc = useCallback(async () => {

        const result = await axiosApi.post('/docMaster/getSearchData', state)
        const { success, data } = result.data
        if (success === 0) {
            errorNofity('Error Getting Data , Please check the connection')
            return
        }

        if (success === 2) {
            warningNofity('No Data Fetched with your Search Criteria')
            return
        }

        if (success === 1) {
            setTableData(data)
        }

    }, [state])


    const handleReset = () => {
        setReset(prev => !prev)
        setTableData([])
        setState({ ...state, docNumber: 0 })
    }

    return (
        <DefaultPageLayout label='Advance Search' >
            <MasterPageLayout style={{ width: 'calc(100% - 10px)', p: 1 }}>
                <Grid container spacing={0.5}  >
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <Suspense></Suspense>
                        <AutoSelectDocTypeMast getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoSubTypeMaster getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoCategoryName getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoSubCategory getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoGroupName getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoInstitutionMast getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} >
                        <AutoCourse getInputValue={handleSetState} reset={reset} />
                    </Grid>
                    <Grid size={12}>
                        <Divider>OR</Divider>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <Input
                            variant='outlined'
                            color='neutral'
                            value={state.docNumber}
                            placeholder='Enter Document Number'
                            type='number'
                            sx={{ borderRadius: 14 }}
                            onChange={(e) => handleSetState({ target: { name: 'docNumber', value: e.target.value } })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ textAlign: 'center' }} >
                        <Button
                            variant='outlined'
                            color='neutral'
                            startDecorator={<SearchIcon />}
                            sx={{
                                borderRadius: 14,
                                mx: 1
                            }}
                            onClick={handleSearchDoc}
                        >
                            Serach Document
                        </Button>
                        <Button
                            variant='outlined'
                            color='danger'
                            startDecorator={<ClearIcon />}
                            sx={{
                                borderRadius: 14,
                                mx: 1
                            }}
                            onClick={handleReset}
                        >
                            Clear Search
                        </Button>
                    </Grid>
                    <Grid size={12}>
                        <Box
                            className="flex  justify-center items-center rounded-md"
                            sx={{
                                height: 'calc(50vh + 3rem)',
                                width: "100%",
                                mt: 0.5,
                                padding: "0.05em",
                                border: "1px solid #ccc",
                            }}
                        >
                            <TableVirtuoso
                                style={{ height: "100%", width: "100%", border: "1px solid #ccc" }}
                                className="flex flex-1 rounded-md"
                                data={tableData}
                                fixedHeaderContent={() => (<TableHeaderVirtue />)}
                                itemContent={(index, data) => (<TableContentVirtue data={data} />)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </MasterPageLayout>
        </DefaultPageLayout>
    )
}

export default memo(AdvancedSearch) 