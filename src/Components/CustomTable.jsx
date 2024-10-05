import { Box, Sheet, Table } from '@mui/joy'
import React, { memo } from 'react'

const CustomTable = ({
    tableHeaderCol,
    children
}) => {
    return (
        <Sheet sx={{ mx: 10, mt: 5, height: 300, overflow: 'auto' }} >
            <Table
                aria-label="basic table"
                borderAxis="x"
                size="sm"
                stickyHeader
                stripe="even"
            >
                <thead>
                    <tr>
                        {tableHeaderCol?.map(val => <th key={val}>{val}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default memo(CustomTable) 