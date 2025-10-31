// @ts-nocheck
import { Box, Input } from '@mui/joy'
import axios from 'axios';
import React, { memo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const InputFileNameSearch = ({ getInputValue, reset }) => {

    const [value, setValue] = useState({ value: 0, label: 'Enter File Name To Search' });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setValue(null);
    }, [reset]);

    return (
        <Box>
            <Input
                size="md"
                placeholder="Enter File Name To Search"
                value={inputValue}
                onChange={(event) => {
                    const { value } = event.target;
                    setInputValue(value);  // Update the input value
                    // Call your search function or perform any required action here
                    getInputValue({ target: { name: 'fileName', value } });
                }}
                sx={{
                    minWidth: 300,
                    fontFamily: 'var(--font-varient)',
                    fontSize: '0.850rem',
                    fontWeight: '600',
                    "--Input-minHeight": "40px",
                    "--Input-radius": "6px",
                    "--Input-gap": "12px",
                    "--Input-paddingInline": "16px",
                    "--Input-decoratorChildHeight": "35px",
                    borderWidth: '2.8px',
                    "&.MuiTextField-root": {
                        "--Input-focusedHighlight": 'none',
                        "--Input-focusedHighlight": 'none',
                        backgroundColor: 'rgba(var(--input-bg-color))',
                        borderColor: 'rgba(var(--input-font-color),0.8)',
                        color: 'rgba(var(--input-font-color),0.8)',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(var(--input-font-color))',
                    },
                    '&:hover': {
                        // '--Input-focusedHighlight': 'darkgreen',
                        backgroundColor: 'rgba(var(--input-hover-bg-color))',
                        borderColor: 'rgba(var(--input-hover-border-color))',
                        color: 'rgba(var(--input-hover-font-color),0.9)',
                        '.MuiSvgIcon-root': {
                            color: 'rgba(var(--input-hover-font-color))',
                        }

                    },
                }}
            />
        </Box>

    )
}

export default memo(InputFileNameSearch)



