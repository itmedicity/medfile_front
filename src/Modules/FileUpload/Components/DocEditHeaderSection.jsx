import { Avatar, Box } from '@mui/joy'
import { MultiplePages } from 'iconoir-react'
import React, { memo } from 'react'

const DocEditHeaderSection = ({ label }) => {
    return (
        <Box className="flex p-1 pl-4 border-[0.5px] flex-row mb-1 bg-bgcard border-borderprimary"
            sx={{ backgroundColor: 'rgba(var(--bg-card))', position: 'static', top: '0' }}
        >
            {/* Header */}
            <Avatar size="md" >
                <MultiplePages color="rgba(var(--icon-primary))" />
            </Avatar>
            <Box className="flex flex-col ml-2 justify-center" >
                <div
                    className="flex"
                    style={{
                        fontFamily: "var(--font-family)", lineHeight: '1.4rem',
                        fontWeight: 500,
                        fontSize: "1rem",
                        textTransform: "capitalize",
                        textAlign: "justify",
                        color: "rgba(var(--font-primary-white))"
                    }} >{label}</div>
            </Box>
        </Box>
    )
}

export default memo(DocEditHeaderSection) 