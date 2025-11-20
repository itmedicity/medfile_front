import React, { Fragment, memo, useCallback, useState } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import {
    getDocumentList,
    getMainCategories,
    getSelectCategoryNameList
} from '../../../api/commonAPI';
import FolderCard from './FolderCard';
import axiosApi from '../../../Axios/Axios';

const DocCategoryDetails = () => {
    const [dtlView, setDtlView] = useState(0);
    const [mainCatData, setMainCatData] = useState(null);
    const [subCategories, setSubcategories] = useState([]);;
    const [subCatData, setSubCatData] = useState(null);
    const [viewSub, setViewSub] = useState(0);

    const [selectedFolder, setSelectedFolder] = useState(null);

    // Fetch main categories
    const { data: mainCategoriesList = [], isLoading, isError } = useQuery({
        queryKey: ['mainCategories'],
        queryFn: getMainCategories,
    });

    // Fetch category name list
    const { data: docCatList = [] } = useQuery({
        queryKey: ['getDocCatList'],
        queryFn: getSelectCategoryNameList,
    });

    // Fetch document list
    const { data: getDocumentDatas = [] } = useQuery({
        queryKey: ['DocumentList'],
        queryFn: getDocumentList,
    });

    // Handle view of details
    const viewDetails = useCallback((val) => {
        setMainCatData(val);
        setDtlView(1);
        setSubcategories([]); // reset subcategories
        setSelectedFolder(val.value);
    }, []);


    // Safely extract mainCatData value
    const value = mainCatData?.value || '';

    // Filtered document list
    const filteredData = getDocumentDatas.filter((item) => item.doc_sub_type === value);

    // Handle subcategory click
    const handleClick = useCallback(async (item) => {
        setViewSub(1);
        setSubCatData(item)
        setSelectedFolder(item.value);
        try {
            const res = await axiosApi.get(`/docSubCategoryName/getSubCategoryById/${item.value}`);
            const { success, data } = res.data;
            setSubcategories(success === 1 ? data : []);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            setSubcategories([]);
        }
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <CircularProgress size="lg" />
                <Typography level="body-md" sx={{ ml: 2 }}>
                    Loading categories...
                </Typography>
            </Box>
        );
    }

    // Error state
    if (isError) {
        return (
            <Typography color="danger" sx={{ mt: 4, textAlign: 'center' }}>
                ❌ Error loading categories. Please try again later.
            </Typography>
        );
    }

    //  UI Layout

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    height: '94vh', // total available height for all sheets
                    overflow: 'hidden', // prevent double scrolls,
                    modalbgcolor: "rgba(var(--modal-bg-color))",
                    p: 3
                }}
            >
                <Box
                    sx={{
                        borderRadius: 'md',
                        // p: { xs: 2, md: 3 },
                        overflowY: 'auto', // scrollable content
                        minHeight: 0, // required for flex scroll
                        modalbgcolor: "rgba(var(--modal-bg-color))",
                        // p: 3
                    }}
                >
                    <Typography level="h6" sx={{ mb: 0, color: "#637e8cff", }}>
                        📁 CORE CATEGORIES
                    </Typography>
                    <Divider sx={{ mb: 1 }} />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                        {mainCategoriesList.map((item) => (
                            <FolderCard
                                key={item.value}
                                value={item.value}
                                label={item.label}
                                count={0}
                                onClick={() => viewDetails(item)}
                                isSelected={selectedFolder === item.value}
                            />
                        ))}
                    </Box>
                </Box>

                {/* ===== SUB CATEGORY SECTION ===== */}
                {dtlView === 1 && (
                    <Box
                        sx={{
                            borderRadius: 'md',
                            // p: { xs: 2, md: 3 },
                            overflowY: 'auto', // scrollable content
                            minHeight: 0, // required for flex scroll
                            // height: '23vh',
                            // bgcolor: "pink"
                        }}
                    >
                        <Typography level="h6" sx={{ mb: 1, color: "#637e8cff", }}>
                            {`📂 ${mainCatData?.label}`}
                        </Typography>
                        <Divider sx={{ mb: 1 }} />

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                            {docCatList
                                .filter((item) => {
                                    const label = item.label.trim().toUpperCase();
                                    return filteredData.some(
                                        (doc) => doc.category_name?.trim().toUpperCase() === label
                                    );
                                })
                                .map((item) => {
                                    const label = item.label.trim().toUpperCase();
                                    const count =
                                        filteredData.filter(
                                            (doc) => doc.category_name?.trim().toUpperCase() === label
                                        ).length || 0;

                                    return (
                                        <Box sx={{}}>
                                            <FolderCard
                                                key={item.value}
                                                value={item.value}
                                                label={item.label}
                                                count={count}
                                                onClick={() => handleClick(item)}
                                                isSelected={selectedFolder === item.value}
                                            />
                                        </Box>

                                    );
                                })}
                        </Box>
                    </Box>
                )}

                {viewSub === 1 && subCategories.length > 0 && (
                    <Box
                        sx={{
                            borderRadius: 'md',
                            // p: { xs: 2, md: 3 },
                            overflowY: 'auto', // scrollable content
                            minHeight: 0, // required for flex scroll
                            // pr: 3, m: 0
                        }}
                    >
                        <Typography level="h6" sx={{ mb: 0, color: "#637e8cff", }}>
                            {`📂 ${subCatData?.label}`}
                        </Typography>
                        <Divider sx={{ mb: 1 }} />

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                            {subCategories
                                .filter((item) => {
                                    const label = item.subcat_name;
                                    return filteredData.some(
                                        (doc) => doc.subcat_name?.trim().toUpperCase() === label
                                    );
                                })
                                .map((item) => {

                                    const label = item.subcat_name;
                                    const count =
                                        filteredData.filter(
                                            (doc) => doc.subcat_name?.trim().toUpperCase() === label
                                        ).length || 0;

                                    return (
                                        <FolderCard
                                            key={item.subcat_slno}
                                            value={item.subcat_slno}
                                            label={item.subcat_name}
                                            count={count}

                                        />
                                    );
                                })}
                        </Box>
                    </Box>
                )}

                {/* ===== EMPTY STATE ===== */}
                {viewSub === 1 && subCategories.length === 0 && (
                    <Typography level="body-md" sx={{ textAlign: 'center', mt: 3 }}>
                        No subcategories found.
                    </Typography>
                )}
            </Box>
        </Fragment>
    );
};

export default memo(DocCategoryDetails);



