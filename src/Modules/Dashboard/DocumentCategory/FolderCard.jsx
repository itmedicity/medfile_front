import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import FolderImage from '../../../assets/images/FileFolder.png';

const FolderCard = ({ label, count, onClick, value }) => {
    return (
        <Box
            key={value}
            onClick={onClick}
            role="button"
            tabIndex={0}
            sx={{
                width: 120,
                height: 160,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                p: 0,
                m: 0,
            }}
        >
            {/* Folder Image */}
            <Box
                sx={{
                    width: '100%',
                    height: 110,
                    backgroundImage: `url(${FolderImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: 2,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Count bubble */}
                {count > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 10,
                            minWidth: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                    >
                        {count}
                    </Box>
                )}
            </Box>

            {/* Label */}
            <Typography
                sx={{
                    mt: 1,
                    fontFamily: 'var(--font-varient, "Poppins", sans-serif)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: '#334155',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '100%',
                    textTransform: 'capitalize',
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                {label && label.toLowerCase()}
            </Typography>
        </Box>
    );
};

export default memo(FolderCard);
