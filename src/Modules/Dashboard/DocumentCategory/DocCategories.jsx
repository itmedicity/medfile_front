import React, { Fragment, memo, useCallback, useState } from 'react';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import {
    Apartment,
    AccountBalance,
    Science,
    Bloodtype,
    Gavel,
    People,
    Computer,
    Landscape,
    LocalHospital,
    LocalPharmacy,
} from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/joy';
import { getDocumentList, getSelectCategoryNameList } from '../../../api/commonAPI';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '../../../Axios/Axios';
import SubCategoryDetails from './SubCategoryDetails';

// Category style definitions
const categoryStyles = {
    BUILDING: { icon: <Apartment />, bg: 'linear-gradient(135deg, #3F84AA 0%, #6DD5FA 100%)' },
    ACCOUNTS: { icon: <AccountBalance />, bg: 'linear-gradient(135deg, #3F84AA 0%, #00C9A7 100%)' },
    BIOMEDICAL: { icon: <Science />, bg: 'linear-gradient(135deg, #3F84AA 0%, #FFD452 100%)' },
    BLOOD_BANK: { icon: <Bloodtype />, bg: 'linear-gradient(135deg, #3F84AA 0%, #D4145A 100%)' },
    'CENTRAL & STATE GOVERNMENT': { icon: <Gavel />, bg: 'linear-gradient(135deg, #3F84AA 0%, #662D8C 100%)' },
    'HUMAN RESOURCE DEPARTMENT': { icon: <People />, bg: 'linear-gradient(135deg, #3F84AA 0%, #A1C4FD 100%)' },
    'INFORMATION TECHNOLOGY': { icon: <Computer />, bg: 'linear-gradient(135deg, #3F84AA 0%, #11998e 100%)' },
    LAND: { icon: <Landscape />, bg: 'linear-gradient(135deg, #3F84AA 0%, #A8E063 100%)' },
    MTP: { icon: <LocalHospital />, bg: 'linear-gradient(135deg, #3F84AA 0%, #F76B1C 100%)' },
    PHARMACY: { icon: <LocalPharmacy />, bg: 'linear-gradient(135deg, #3F84AA 0%, #FF4E50 100%)' },
};

const DocCategories = ({ mainCatData }) => {

    const [subCategories, SetSubcategories] = useState([])
    const [viewSub, SetViewSub] = useState(0)


    const { data: docCatList, isLoading, isError } = useQuery({
        queryKey: ['getDocCatList'],
        queryFn: getSelectCategoryNameList,
    });

    const { data: getDocumentDatas } = useQuery({
        queryKey: ['DocumentList'],
        queryFn: getDocumentList,
    });

    const handleClick = useCallback(async (item) => {
        // console.log("bg:", bg);

        SetViewSub(1)
        try {
            const res = await axiosApi.get(`/docSubCategoryName/getSubCategoryById/${item.value}`);
            const { success, data } = res.data;

            if (success === 1) {
                SetSubcategories(data);
            } else {
                SetSubcategories([]);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            SetSubcategories([]); // fallback in case of error
        }
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <DefaultPageLayout label={'Loading categories...'}>
                <Typography>Loading...</Typography>
            </DefaultPageLayout>
        );
    }

    // Error state
    if (isError) {
        return (
            <DefaultPageLayout label={'Error'}>
                <Typography>Error loading categories.</Typography>
            </DefaultPageLayout>
        );
    }

    // Empty state
    if (!docCatList || docCatList.length === 0) {
        return (
            <DefaultPageLayout label={'No Categories'}>
                <Typography>No categories found.</Typography>
            </DefaultPageLayout>
        );
    }

    return (
        <Fragment>
            {
                viewSub === 1 ? <SubCategoryDetails viewSub={viewSub} SetViewSub={SetViewSub} subCategories={subCategories} getDocumentDatas={getDocumentDatas} SetSubcategories={SetSubcategories} /> :

                    <DefaultPageLayout label={mainCatData?.label || 'Categories'}>
                        <Box sx={{ flexGrow: 1, p: 3 }}>
                            <Grid container spacing={4}>
                                {docCatList?.map((item) => {
                                    const label = item.label.trim().toUpperCase();
                                    const style = categoryStyles[label] || {};

                                    // Count documents matching this category
                                    const count = getDocumentDatas?.filter(
                                        (doc) => doc.category_name?.trim().toUpperCase() === label
                                    ).length || 0;

                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.value}>
                                            <Card
                                                onClick={() => handleClick(item)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleClick(item);
                                                    }
                                                }}
                                                sx={{
                                                    cursor: 'pointer',
                                                    borderRadius: '20px',
                                                    background: style.bg || '#3F84AA',
                                                    color: '#fff',
                                                    height: '150px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.3s ease-in-out',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                                    '&:hover': {
                                                        transform: 'translateY(-6px)',
                                                        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                                                        filter: 'brightness(1.08)',
                                                    },
                                                    '&:focus-visible': {
                                                        outline: '3px solid #C9E3F1',
                                                        outlineOffset: '2px',
                                                    },
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <Box sx={{ mt: 2, color: 'white' }}>
                                                        {style.icon || <Apartment sx={{ fontSize: 40 }} />}
                                                    </Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                                                        {label}
                                                    </Typography>
                                                </CardContent>
                                                <Box
                                                    sx={{
                                                        mb: 5,
                                                        px: 2,
                                                        py: 0.5,
                                                        display: 'inline-block',
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        borderRadius: '30px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {count} Document{count !== 1 ? 's' : ''}
                                                </Box>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </DefaultPageLayout>
            }
        </Fragment>

    );
};

export default memo(DocCategories);
