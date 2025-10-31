import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import FolderImage from '../../../assets/images/folderImage.png'

const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const FolderCard = ({ label, count, onClick, value }) => {

    return (
        <Box
            key={value}
            onClick={onClick}
            role="button"
            tabIndex={0}
            sx={{
                width: 180,
                height: 150,
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Folder Image */}
            < Box
                sx={{
                    width: '100%',
                    height: 120,
                    backgroundImage: `url(${FolderImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    p: 0,
                    m: 0
                }}
            >
                {/* Count bubble */}
                {
                    count === 0 ? null :

                        <Box
                            sx={{
                                position: 'absolute',
                                top: 20,
                                right: 15,
                                px: 1.5,
                                py: 0.3,
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: '#1206169f',
                            }}
                        >
                            {count}
                        </Box>
                }
            </Box >

            {/* Label */}
            < Typography
                sx={{
                    mt: 0,
                    fontFamily: 'var(--font-varient)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: "#637e8cff",
                    textAlign: 'center',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    // whiteSpace: 'nowrap',
                    textWrap: "wrap",
                    // fontLight: "rgba(var(--font-light))",
                }}
            >
                {label && capitalizeFirst(label)}
            </Typography >
        </Box >
    );
};

export default memo(FolderCard);

