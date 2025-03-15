import React, { memo, useCallback, useState } from 'react';
import { Box, Divider, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { getSelectCategoryNameList } from '../../../api/commonAPI';
import CategoryBasedDashboard from '../../../Components/CategoryBasedDashboard';
import SubCategoryDetails from './SubCategoryDetails';

const DocCatagoryDetails = ({ SetView, catDetails, DocName }) => {

    const [dtlView, SetDtlView] = useState(0)
    const [catSlno, SetCatSlno] = useState(0)

    const { data: docCatList } = useQuery({
        queryKey: ["getDocCatList"],
        queryFn: getSelectCategoryNameList
    });

    const ViewDetails = useCallback((e) => {
        const catno = Number(e)
        SetCatSlno(catno)
        SetDtlView(1)
    }, [])

    return (
        <div>
            {dtlView === 1 ? <Box sx={{ height: '100vh', flex: 1, bgcolor: 'rgba(var(--bg-common))' }}>
                <SubCategoryDetails
                    dtlView={dtlView} SetView={SetDtlView} catSlno={catSlno} SetCatSlno={SetCatSlno} catDetails={catDetails} />
            </Box> :
                <CategoryBasedDashboard SetView={SetView} label={DocName || "Document Type"}>
                    <Box sx={{ display: "flex", width: "100%", flexDirection: "row", gap: 1, mt: 0, p: 1, flexWrap: "wrap", alignContent: "center", mx: "auto" }}>
                        {docCatList?.map((category) => {
                            const filteredDocs = catDetails?.filter(doc => category.value === doc.category);
                            const docCount = filteredDocs?.length || 0;
                            return (
                                <Box
                                    key={category.value}
                                    onClick={() => ViewDetails(category.value)}
                                    sx={{
                                        height: 115,
                                        width: "19.5%",
                                        display: "flex",
                                        flexDirection: "row",
                                        // backgroundColor: "#C7D9DD",
                                        // backgroundColor: "#748B9C",
                                        // backgroundColor: "#C5D3E8",
                                        // backgroundColor: "#222831",
                                        overflow: 'hidden',
                                        flexWrap: 'wrap',
                                        boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
                                        cursor: "pointer",
                                        borderRadius: 5,
                                        border: 1,
                                        borderColor: "#607274",
                                        bgcolor: "rgba(var(--bg-common))",
                                    }}
                                >
                                    <Box sx={{ p: 1, display: "flex", flexDirection: "column", flex: 1 }}>
                                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                            <Typography
                                                sx={{
                                                    wordBreak: 'break-word',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'normal',
                                                    display: 'block',
                                                    // color: "rgb(var(--bg-box-typo))",
                                                    color: 'rgba(var(--font-primary-white))'
                                                }}
                                            >
                                                {category.label}
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ mt: 1.5 }}>
                                            <Typography sx={{ fontSize: "30px", color: 'rgba(var(--font-primary-white))', }}>{docCount}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </CategoryBasedDashboard>
            }
        </div >
    );
};

export default memo(DocCatagoryDetails);
