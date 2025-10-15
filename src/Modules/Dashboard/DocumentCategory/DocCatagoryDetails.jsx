import React, { memo, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/joy';
import { getMainCategories } from '../../../api/commonAPI';
import DescriptionIcon from '@mui/icons-material/Description';
import { useQuery } from '@tanstack/react-query';
import DocCategories from './DocCategories';

const DocCategoryDetails = () => {
    const [dtlView, setDtlView] = useState(0);
    const [mainCatData, setMainCatData] = useState(null);

    const { data: mainCategoriesList, isLoading, isError } = useQuery({
        queryKey: ['mainCategories'],
        queryFn: getMainCategories,
    });

    const viewDetails = useCallback((val) => {
        setMainCatData(val);
        setDtlView(1);
    }, []);

    const handleKeyDown = useCallback((event, val) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            viewDetails(val);
        }
    }, [viewDetails]);

    // Standardized Colors
    const colors = {
        primary: '#3F84AA',
        primaryLight: '#C9E3F1',
        primaryDark: '#2C6D8E',
        bgLight: '#F5FAFD',
        cardBg: '#EDF5FA',
        textPrimary: '#1A1A1A',
        textSecondary: '#4F4F4F',
        iconCircle: '#FFFFFF',
    };

    if (isLoading) {
        return <Typography>Loading categories...</Typography>;
    }

    if (isError) {
        return <Typography>Error loading categories.</Typography>;
    }

    return (
        <Box>
            {dtlView === 1 ? (
                <DocCategories mainCatData={mainCatData} />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        justifyContent: 'center',
                        backgroundColor: colors.bgLight,
                        borderRadius: 8,
                        padding: { xs: 2, md: 4 },
                        minHeight: '100vh',
                    }}
                >
                    {mainCategoriesList.map((item) => (
                        <Box
                            key={item.value}
                            onClick={() => viewDetails(item)}
                            onKeyDown={(e) => handleKeyDown(e, item)}
                            role="button"
                            tabIndex={0}
                            sx={{
                                width: { xs: '100%', sm: 400, md: 380 },
                                height: 260,
                                backgroundImage: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.primaryLight} 100%)`,
                                borderRadius: 6,
                                padding: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: `0 8px 24px rgba(63, 132, 170, 0.3)`,
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                border: `1px solid rgba(63,132,170,0.3)`,
                                color: '#fff',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: `0 12px 32px rgba(63, 132, 170, 0.5)`,
                                },
                                '&:focus-visible': {
                                    outline: `3px solid ${colors.primaryLight}`,
                                    outlineOffset: '2px',
                                },
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    backgroundColor: colors.iconCircle,
                                    width: 56,
                                    height: 56,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    boxShadow: `0 6px 12px rgba(255,255,255,0.6)`,
                                    mb: 2,
                                    zIndex: 2,
                                }}
                            >
                                <DescriptionIcon sx={{ fontSize: 30, color: colors.primaryDark }} />
                            </Box>

                            {/* Title */}
                            <Typography
                                level="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontSize: '1rem',
                                    mb: 1,
                                    textShadow: '0 0 4px rgba(0,0,0,0.4)',
                                }}
                            >
                                {item.label}
                            </Typography>

                            {/* Description */}
                            <Typography
                                level="body2"
                                sx={{
                                    fontSize: '0.9rem',
                                    color: 'rgba(255,255,255,0.85)',
                                    lineHeight: 1.6,
                                    flexGrow: 1,
                                    textShadow: '0 0 3px rgba(0,0,0,0.3)',
                                }}
                            >
                                Manage, Review, and Maintain {item.label.toUpperCase()} documents for easy accessibility.
                            </Typography>

                            {/* Arrow */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    mt: 3,
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 26,
                                        color: '#fff',
                                        fontWeight: 500,
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                        },
                                        textShadow: '0 0 4px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    →
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default memo(DocCategoryDetails);
