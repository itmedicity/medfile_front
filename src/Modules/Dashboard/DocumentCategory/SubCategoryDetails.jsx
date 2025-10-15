import React, { memo, useCallback } from 'react';
import {
    Box,
    Divider,
    Modal,
    ModalClose,
    ModalDialog,
    Typography
} from '@mui/joy';
// import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRoundedIcon';

const SubCategoryDetails = ({ viewSub, SetViewSub, subCategories, getDocumentDatas, SetSubcategories }) => {
    // Gradient options for each card
    const cardGradients = [
        'linear-gradient(135deg, #D9ECF4 0%, #A4CFE4 100%)',
        'linear-gradient(135deg, #C4E1ED 0%, #8CC2DD 100%)',
        'linear-gradient(135deg, #E1F3FA 0%, #B0D7EA 100%)',
        'linear-gradient(135deg, #B8DDF0 0%, #90C6E0 100%)',
    ];

    const handlModalClose = useCallback(() => {
        SetViewSub(0)
        SetSubcategories([])
    }, [SetViewSub, SetSubcategories])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={viewSub === 1}
            onClose={handlModalClose}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // background: "#FFFF", // light to medium of #3F84AA family
                backdropFilter: "blur(6px)",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <ModalDialog
                size="lg"
                sx={{
                    width: '90%',
                    maxHeight: '80vh',
                    p: 4,
                    borderRadius: '20px',
                    background: "linear-gradient(to bottom, #4a799667, #14435a50)",
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    overflowY: 'auto',
                    border: '1px solid #dbeafe',
                }}
            >
                <ModalClose sx={{ m: 1, color: '#ffffffe2' }} />

                <Typography level="h4" mb={3} sx={{ fontWeight: 800, color: '#ffffffe2' }}>
                    Sub Category Details
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        py: 2,
                    }}
                >
                    {subCategories?.map((subcategory, index) => {
                        const docCount = getDocumentDatas.filter(
                            (doc) => doc.doc_sub_type === subcategory.subcat_slno
                        ).length;

                        const gradient = cardGradients[index % cardGradients.length];

                        return (
                            <Box
                                key={subcategory.subcat_slno}
                                sx={{
                                    position: 'relative',
                                    flex: '1 1 calc(25% - 24px)',
                                    minWidth: 240,
                                    maxWidth: 280,
                                    height: 200,
                                    background: gradient,
                                    borderRadius: '20px',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    px: 3,
                                    py: 3,
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    border: '1px solid #A4CFE4',
                                    // transition: 'all 0.35s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px) scale(1.025)',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                                        background:
                                            'linear-gradient(135deg, rgba(225,246,251,0.9) 0%, rgba(196,227,239,0.95) 100%)',
                                        backdropFilter: 'blur(6px)',
                                    },
                                }}
                            >

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        bgcolor: '#0523318e',
                                        color: '#fff',
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                        boxShadow: '0 3px 10px rgba(14,165,233,0.4)',
                                    }}
                                >
                                    {docCount}
                                </Box>

                                <Divider sx={{ my: 1.5, borderColor: '#cbd5e1' }} />

                                <Typography
                                    level="body1"
                                    sx={{
                                        fontWeight: 600,
                                        // fontSize: '1.15rem',
                                        color: '#08118a23',
                                        textAlign: 'center',
                                        textTransform: 'capitalize',
                                        letterSpacing: '0.6px',
                                        lineHeight: 1.5,
                                        userSelect: 'none',
                                        background: ' #062853ff',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {subcategory.subcat_name}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(SubCategoryDetails);



