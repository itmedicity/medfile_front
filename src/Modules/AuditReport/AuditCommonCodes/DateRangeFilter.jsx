import React, { memo } from 'react';
import { Box } from '@mui/material';
import { inputStyle } from './auditCommonStyle';

const DateRangeFilter = ({ fromDate, toDate, onFromDateChange, onToDateChange, sx = {} }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', ...sx }}>
            <input
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                style={inputStyle}
            />
            <input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                style={inputStyle}
            />
        </Box>
    );
};

export default memo(DateRangeFilter);
