import React, { memo } from 'react';
import { Box, Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { SubCategoryById } from '../../../api/commonAPI';
// import CategoryBasedDashboard from '../../../Components/CategoryBasedDashboard';

const SubCategoryDetails = ({ dtlView, SetView, catSlno, catDetails }) => {

    const { data: SubCategoryList } = useQuery({
        queryKey: ["getSubCategory", catSlno],
        queryFn: () => SubCategoryById(catSlno)
    });

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={dtlView}
                onClose={() => SetView(0)}
                // sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.5s ease-in-out",
                    // backgroundColor: 'red'
                    // backgroundColor: "transparent",
                    // backgroundColor: "rgba(var(--modal-bg-color),0.5)",
                }}
            >
                <ModalDialog size="lg"
                    // size="sm"
                    sx={{
                        // width: screenWidth - 500,
                        // height: screenHeight,
                        p: 1,
                        backgroundColor: "rgba(var(--modal-bg-color))",
                        transition: "all 0.5s ease-in-out",
                        border: 0.2,
                        borderColor: "rgba(var(--border-primary))",

                    }}>
                    <Box
                        sx={{
                            borderRadius: "md",
                            p: 3,
                            overflow: "scroll",
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Box sx={{ display: "flex", width: "100%", flexDirection: "row", gap: 1, mt: 0, p: 1, flexWrap: "wrap", alignContent: "center", mx: "auto" }}>
                            {SubCategoryList?.map((subcategory) => {
                                const filteredDocs = catDetails?.filter(doc => doc.sub_category === subcategory?.subcat_slno);
                                const docCount = filteredDocs?.length || 0;
                                return (
                                    <Box
                                        key={subcategory.subcat_slno}
                                        sx={{
                                            height: 115,
                                            width: "18.9%",
                                            display: "flex",
                                            flexDirection: "row",
                                            // backgroundColor: "#B3C8CF",
                                            overflow: 'hidden',
                                            flexWrap: 'wrap',
                                            boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
                                            cursor: "pointer",
                                            border: 1,
                                            borderRadius: 5,
                                            borderColor: "rgba(var(--typo-clr))",
                                            bgcolor: "rgba(var(--bg-common))",
                                        }}
                                    >
                                        <Box sx={{ p: 1, display: "flex", flexDirection: "column", flex: 1 }}>
                                            <Box sx={{}}>
                                                <Typography sx={{ fontSize: "30px", color: 'rgba(var(--font-primary-white))', }}>{docCount}</Typography>
                                            </Box>
                                            <Divider />
                                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                <Typography
                                                    sx={{
                                                        wordBreak: 'break-word',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'normal',
                                                        display: 'block',
                                                        mt: 1.5,
                                                        color: 'rgba(var(--font-primary-white))'
                                                    }}
                                                >
                                                    {subcategory.subcat_name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>


                </ModalDialog>
            </Modal>
            {/* <Modal open={!!dtlView} onClose={() => SetView(0)}
                sx={{ backgroundColor: "rgba(var(--modal-bg-color))", }}>
                <ModalDialog >
                    <ModalClose />
                    <DialogTitle>Sub Category Details</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: "flex", width: "100%", flexDirection: "row", gap: 1, mt: 0, p: 1, flexWrap: "wrap", alignContent: "center", mx: "auto" }}>
                            {SubCategoryList?.map((subcategory) => {
                                const filteredDocs = catDetails?.filter(doc => doc.sub_category === subcategory?.subcat_slno);
                                const docCount = filteredDocs?.length || 0;
                                return (
                                    <Box
                                        key={subcategory.subcat_slno}
                                        sx={{
                                            height: 115,
                                            width: "18.9%",
                                            display: "flex",
                                            flexDirection: "row",
                                            // backgroundColor: "#B3C8CF",
                                            overflow: 'hidden',
                                            flexWrap: 'wrap',
                                            boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box sx={{ p: 1, display: "flex", flexDirection: "column", flex: 1 }}>
                                            <Box sx={{}}>
                                                <Typography sx={{ fontSize: "30px" }}>{docCount}</Typography>
                                            </Box>
                                            <Divider />
                                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                <Typography
                                                    sx={{
                                                        wordBreak: 'break-word',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'normal',
                                                        display: 'block',
                                                        mt: 1.5
                                                    }}
                                                >
                                                    {subcategory.subcat_name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </DialogContent>
                </ModalDialog>
            </Modal> */}


            {/* <CategoryBasedDashboard SetView={SetView} label={'Sub Category Details'}>
                <Box sx={{ display: "flex", width: "100%", flexDirection: "row", gap: 1, mt: 0, p: 1, flexWrap: "wrap", alignContent: "center", mx: "auto" }}>
                    {SubCategoryList?.map((subcategory) => {
                        const filteredDocs = catDetails?.filter(doc => doc.sub_category === subcategory?.subcat_slno);
                        const docCount = filteredDocs?.length || 0;
                        return (
                            <Box
                                key={subcategory.subcat_slno}
                                sx={{
                                    height: 115,
                                    width: "19.5%",
                                    display: "flex",
                                    flexDirection: "row",
                                    backgroundColor: "#B3C8CF",
                                    overflow: 'hidden',
                                    flexWrap: 'wrap',
                                    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer"
                                }}
                            >
                                <Box sx={{ p: 1, display: "flex", flexDirection: "column", flex: 1 }}>


                                    <Box sx={{}}>
                                        <Typography sx={{ fontSize: "30px" }}>{docCount}</Typography>
                                    </Box>
                                    <Divider />

                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography
                                            sx={{
                                                wordBreak: 'break-word',
                                                overflow: 'hidden',
                                                whiteSpace: 'normal',
                                                display: 'block',
                                                mt: 1.5
                                            }}
                                        >
                                            {subcategory.subcat_name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </CategoryBasedDashboard> */}
        </Box>
    );
};

export default memo(SubCategoryDetails);

