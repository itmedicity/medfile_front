import React, { memo, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useQuery } from "@tanstack/react-query";
import { getSubTypeCreateAuditReports, getSubTypeEditAuditReports } from '../../../api/commonAPI';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import { AuditDocTypecolumnsByTab, AuditformatDate, AuditSubTypecolumnsByTab, searchIconStyle, searchInputStyle } from '../AuditCommonCodes/auditCommonStyle';
import DateRangeFilter from '../AuditCommonCodes/DateRangeFilter';

const DocSubTypeReport = () => {
    const [selectedTab, setSelectedTab] = useState('Created');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Queries
    const { isLoading: isLoadingCreated, data: createdData } = useQuery({
        queryKey: ["getCreatedAuditReport"],
        queryFn: getSubTypeCreateAuditReports,
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const { isLoading: isLoadingEdited, data: editedData } = useQuery({
        queryKey: ["getEditedAuditReport"],
        queryFn: getSubTypeEditAuditReports,
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const auditLogs = selectedTab === 'Created' ? createdData || [] : editedData || [];

    // Filter logs by date
    const dateFilteredLogs = auditLogs.filter((log) => {
        try {
            // Determine the date of the log            
            const logDate = new Date(log.timestamp || log.create_date || log.edit_date);
            if (isNaN(logDate.getTime())) return false;

            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            // Check if log is before "from" date
            if (from && logDate < from) return false;

            // Check if log is after "to" date
            if (to) {
                const toEndOfDay = new Date(to);
                toEndOfDay.setHours(23, 59, 59, 999);
                if (logDate > toEndOfDay) return false;
            }

            return true;
        } catch (error) {
            console.error('Error filtering log by date:', log, error);
            return false;
        }
    });


    // Search filter
    const filteredLogs = dateFilteredLogs.filter((log) => {
        try {
            // Collect all field values from the log object
            const valuesToSearch = Object.values(log).map((v) =>
                v !== null && v !== undefined ? String(v).toLowerCase() : ''
            );

            // Check if any field contains the search term
            return valuesToSearch.some((v) => v.includes(searchTerm.toLowerCase()));
        } catch (error) {
            console.error('Error filtering log by search term:', log, error);
            return false;
        }
    });


    return (
        <DefaultPageLayout label="Document Master Audit Report">
            <Box sx={{ mt: 0, p: 1, bgcolor: '#fff' }}>
                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, newValue) => setSelectedTab(newValue)}
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 } }}
                    >
                        <Tab label="Created" value="Created" />
                        <Tab label="Updated" value="Updated" />
                    </Tabs>
                </Box>

                {/* Filters */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        gap: 2,
                    }}
                >
                    <DateRangeFilter
                        fromDate={fromDate}
                        toDate={toDate}
                        onFromDateChange={setFromDate}
                        onToDateChange={setToDate}
                    />

                    <Box sx={{ position: 'relative', width: { xs: '100%', sm: '220px' } }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={searchInputStyle}
                        />
                        <Search sx={searchIconStyle} />
                    </Box>
                </Box>

                {/* Table */}
                <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f6f8' }}>
                                {AuditDocTypecolumnsByTab[selectedTab].map((col) => (
                                    <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(isLoadingCreated || isLoadingEdited) ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={AuditSubTypecolumnsByTab[selectedTab].length}
                                        align="center"
                                        sx={{ color: 'text.secondary', py: 3 }}
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map((log, index) => (
                                    <TableRow
                                        key={log.audit_slno || log.id}
                                        sx={{
                                            '&:hover': { bgcolor: '#f9f9f9' },
                                            transition: 'background 0.2s ease',
                                        }}
                                    >
                                        {AuditSubTypecolumnsByTab[selectedTab].map((col) => {
                                            let value = col.key === 'slno' ? index + 1 : log[col.key];
                                            if (col.key === 'create_date' || col.key === 'edit_date') {

                                                value = AuditformatDate(value);
                                            }
                                            return <TableCell key={col.key}>{value}</TableCell>;
                                        })}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={AuditSubTypecolumnsByTab[selectedTab].length}
                                        align="center"
                                        sx={{ color: 'text.secondary', py: 3 }}
                                    >
                                        No Audit Records Found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </DefaultPageLayout>
    );
};
export default memo(DocSubTypeReport);
