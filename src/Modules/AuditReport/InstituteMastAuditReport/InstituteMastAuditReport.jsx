import React, { memo, useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useQuery } from "@tanstack/react-query";
import { getInstituteMastCreateAuditReports, getInstituteMastEditAuditReports } from '../../../api/commonAPI';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import { InstituteMastAuditReportcolumnsByTab, searchIconStyle, searchInputStyle } from '../AuditCommonCodes/auditCommonStyle';
import DateRangeFilter from '../AuditCommonCodes/DateRangeFilter';
import VirtualTable from '../VirtualTable';

const InstituteMastAuditReport = () => {

    const [selectedTab, setSelectedTab] = useState('Created');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Queries
    const { data: createdData } = useQuery({
        queryKey: ["getCreatedDocMastAudit"],
        queryFn: getInstituteMastCreateAuditReports,
        refetchOnWindowFocus: false,
    });

    const { data: editedData } = useQuery({
        queryKey: ["getEditedDocMastAudit"],
        queryFn: getInstituteMastEditAuditReports,
        refetchOnWindowFocus: false,
    });

    const auditLogs = selectedTab === 'Created' ? createdData || [] : editedData || [];

    // Filter logs by date
    const dateFilteredLogs = auditLogs.filter((log) => {
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
    });


    // Search filter
    const filteredLogs = dateFilteredLogs.filter((log) => {
        // Collect all field values from the log object
        const valuesToSearch = Object.values(log).map((v) =>
            v !== null && v !== undefined ? String(v).toLowerCase() : ''
        );

        // Check if any field contains the search term
        return valuesToSearch.some((v) => v.includes(searchTerm.toLowerCase()));
    });


    return (
        <DefaultPageLayout label="Institute Master Audit Report">
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
                <Box sx={{ height: 500 }}>
                    <VirtualTable data={filteredLogs} columns={InstituteMastAuditReportcolumnsByTab[selectedTab]} />
                </Box>
            </Box>
        </DefaultPageLayout>
    );
};
export default memo(InstituteMastAuditReport);




