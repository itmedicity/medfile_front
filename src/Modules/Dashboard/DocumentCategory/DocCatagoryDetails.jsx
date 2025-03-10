import React, { memo, useEffect, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import { Box } from '@mui/joy'
import { List } from 'iconoir-react'
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import GradingIcon from '@mui/icons-material/Grading';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const DocCatagoryDetails = ({ SetView, view, catDetails, SetCatDetails, DocName }) => {
    const [index, setIndex] = useState(0);
    const [viewData, SetViewData] = useState(0)

    const colors = ['primary', 'success', 'warning', 'danger']

    const approvedFiles = catDetails?.filter((val) => val.apprvl_status === 1);
    const NotApprovedFiles = catDetails?.filter((val) => val.apprvl_status === 0);

    console.log("viewData", viewData);
    // console.log("approvedFiles", approvedFiles);
    // console.log("NotApprovedFiles", NotApprovedFiles);

    // useEffect(() => {
    //     if (index === 0 && index !== 1 && index !== 2) {
    //         SetViewData(catDetails)
    //     }
    //     else if (index === 1 && index !== 0 && index !== 2) {
    //         SetViewData(approvedFiles)
    //     }
    //     else if (index === 2 && index !== 1 && index !== 0) {
    //         SetViewData(NotApprovedFiles)
    //     }
    // }, [index, catDetails, approvedFiles, NotApprovedFiles])


    return (
        <div>
            <DefaultPageLayout label={DocName !== null || DocName !== undefined || DocName?.length !== 0 ? DocName : "Document Type"} >
                <Box
                    sx={{
                        flexGrow: 1,
                        m: -3,
                        p: 4,
                        bgcolor: `${'var(--colors-index)'}.500`,
                    }}
                    style={{ '--colors-index': colors[index] }}
                >
                    <Tabs
                        size="lg"
                        aria-label="Bottom Navigation"
                        value={index}
                        onChange={(event, value) => setIndex(value)}
                        sx={(theme) => ({
                            p: 1,
                            mx: 'auto',
                            boxShadow: theme.shadow.sm,
                            '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
                            [`& .${tabClasses.root}`]: {
                                py: 1,
                                flex: 1,
                                transition: '0.3s',
                                fontWeight: 'md',
                                fontSize: 'md',
                                [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                    opacity: 0.7,
                                },
                            },
                        })}
                    >
                        <TabList
                            variant="plain"
                            size="sm"
                            disableUnderline
                            sx={{ borderRadius: 'lg', p: 0 }}
                        >
                            <Tab
                                disableIndicator
                                orientation="horizontal"
                                {...(index === 0 && { color: colors[0] })}
                                onClick={() => {
                                    setIndex(1);
                                }}
                            >
                                <ListItemDecorator>
                                    <List />
                                </ListItemDecorator>
                                All Documents
                            </Tab>
                            <Tab
                                disableIndicator
                                orientation="horizontal"
                                {...(index === 1 && { color: colors[1] })}
                            >
                                <ListItemDecorator>
                                    <GradingIcon />
                                </ListItemDecorator>
                                Approved
                            </Tab>
                            <Tab
                                disableIndicator
                                orientation="horizontal"
                                {...(index === 2 && { color: colors[2] })}
                            >
                                <ListItemDecorator>
                                    <HourglassBottomIcon />
                                </ListItemDecorator>
                                Waiting for Approval
                            </Tab>
                        </TabList>
                    </Tabs>
                </Box>
            </DefaultPageLayout>
        </div>
    )
}

export default memo(DocCatagoryDetails)

