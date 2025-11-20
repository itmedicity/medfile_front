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
import { getUserCreateAuditReports, getUserEditAuditReports } from '../../../api/commonAPI';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import { AuditformatDate, AuditusercolumnsByTab, searchIconStyle, searchInputStyle } from '../AuditCommonCodes/auditCommonStyle';
import DateRangeFilter from '../AuditCommonCodes/DateRangeFilter';

const UserAuditReport = () => {
    const [selectedTab, setSelectedTab] = useState('Created');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Fetch created and updated audit logs
    const { isLoading: isLoadingCreated, data: createdData } = useQuery({
        queryKey: ["getCreatedUserAudit"],
        queryFn: getUserCreateAuditReports,
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const { isLoading: isLoadingUpdated, data: updatedData } = useQuery({
        queryKey: ["getUpdatedUserAudit"],
        queryFn: getUserEditAuditReports,
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const auditLogs = selectedTab === 'Created' ? createdData || [] : updatedData || [];

    // Filter by date
    const dateFilteredLogs = auditLogs.filter((log) => {
        try {
            const dateKeys = ['last_login_date', 'replace_date', 'updated_time', 'last_passwd_change_date', 'created_date'];
            let logDate = null;

            for (let key of dateKeys) {
                if (log[key]) {
                    logDate = new Date(log[key]);
                    break;
                }
            }

            if (!logDate || isNaN(logDate.getTime())) return false;

            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            if (from && logDate < from) return false;
            if (to) {
                const toEnd = new Date(to);
                toEnd.setHours(23, 59, 59, 999);
                if (logDate > toEnd) return false;
            }

            return true;
        } catch (error) {
            console.error('Date filter error:', error);
            return false;
        }
    });

    // Search filter
    const filteredLogs = dateFilteredLogs.filter((log) => {
        try {
            return Object.values(log)
                .filter(v => v !== null && v !== undefined)
                .some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase()));
        } catch (error) {
            console.error('Search filter error:', error);
            return false;
        }
    });

    return (
        <DefaultPageLayout label="User Management Audit Report">
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
                                {AuditusercolumnsByTab[selectedTab].map((col) => (
                                    <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(isLoadingCreated || isLoadingUpdated) ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={AuditusercolumnsByTab[selectedTab].length}
                                        align="center"
                                        sx={{ color: 'text.secondary', py: 3 }}
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map((log, index) => (
                                    <TableRow
                                        key={log.audit_slno || log.id || index}
                                        sx={{ '&:hover': { bgcolor: '#f9f9f9' }, transition: 'background 0.2s ease' }}
                                    >
                                        {AuditusercolumnsByTab[selectedTab].map((col) => {
                                            let value = col.key.includes('slno') ? index + 1 : log[col.key];

                                            // Format date fields
                                            if (['last_login_date', 'updated_time', 'last_passwd_change_date'].includes(col.key)) {
                                                value = AuditformatDate(value);

                                                // value = format(new Date(value), "dd-MM-yyyy hh:mm:ss")
                                            }

                                            return <TableCell key={col.key}>{value}</TableCell>;
                                        })}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={AuditusercolumnsByTab[selectedTab].length}
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

export default memo(UserAuditReport);
