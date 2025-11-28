import { Box } from '@mui/joy';
import React from 'react'
import { TableVirtuoso } from 'react-virtuoso';

const VirtualTable = ({ data, columns, height = 600 }) => {


    if (!data || data.length === 0) {
        return (
            <Box
                style={{
                    height: height,
                    width: "100%",
                }}
                className="bg-tablebody/40 flex items-center justify-center"
            >
                <Box className="text-gray-500 text-lg font-medium">
                    No data found
                </Box>
            </Box>
        );
    }

    return (
        <Box style={{ height: `${height}px`, width: "100%" }} className="bg-tablebody/40">
            <TableVirtuoso
                data={data}
                components={{
                    Table: (props) => <table {...props} style={{ width: '100%', borderCollapse: 'collapse' }} />,
                    TableRow: (props) => <tr {...props} style={{ borderBottom: '1px solid #ddd' }} />,
                    TableBody: 'tbody',
                }}
                fixedHeaderContent={() => (
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={{
                                    padding: '8px',
                                    position: 'sticky',
                                    top: 0,
                                    background: '#fff',
                                    zIndex: 10,
                                    borderBottom: '1px solid #ddd'
                                }}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                )}
                itemContent={(index, log) => (
                    <>
                        {columns.map((col) => (
                            <td key={col.key} style={{ padding: '8px', textAlign: "center", fontSize: 15 }}>
                                {col.key === 'create_date' || col.key === 'edit_date'
                                    ? log[col.key]
                                        ? new Date(log[col.key]).toLocaleString()
                                        : ''
                                    : log[col.key] ?? ''}
                            </td>
                        ))}
                    </>
                )}

            />
        </Box>
    );
}

export default VirtualTable