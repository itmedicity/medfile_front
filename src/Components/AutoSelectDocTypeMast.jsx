// @ts-nocheck
import { Autocomplete, Box, Skeleton } from '@mui/joy'
import React, { memo } from 'react'
import { getSelectDocTypeMasterList } from '../api/commonAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';

const AutoSelectDocTypeMast = ({ getInputValue, reset }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectDOcTypeMast'],
        queryFn: getSelectDocTypeMasterList,
        staleTime: Infinity
    })

    const [value, setValue] = useState({ value: 0, label: "Select Document Type" });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setValue(null);
    }, [reset]);

    return (
        <Box>
            {
                isLoading === true || error
                    ? <Skeleton animation="wave" variant='rectangular' sx={{ height: '45px', borderRadius: '23px', bgcolor: '#E5FEEE' }} />
                    : <Autocomplete
                        size='md'
                        placeholder="Select Document Type"
                        options={[{ value: 0, label: "Select Document Type" }, ...data] || []}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={(event, newValue) => {
                            if (newValue === null) {
                                setValue({ value: 0, label: "" })
                            } else {
                                setValue(newValue);
                                getInputValue({ target: { name: 'docType', value: newValue.value } });
                            }
                        }}
                        value={value}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        sx={{
                            minWidth: 300,
                            "--Input-minHeight": "20px",
                            "--Input-radius": "23px",
                            "--Input-gap": "14px",
                            "--Input-paddingInline": "16px",
                            "--Input-decoratorChildHeight": "35px",
                            '&:hover': {
                                '--Input-focusedHighlight': 'darkgreen', // Darker color on hover
                            },
                            "&.MuiInput-root": {
                                "--Input-focusedHighlight": 'green',
                            }
                        }}
                    />
            }
        </Box>
    )
}

export default memo(AutoSelectDocTypeMast)