import { IconButton, Tooltip } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { userWiseSettingsRights } from '../api/commonAPI';
import { useQuery } from '@tanstack/react-query';

const CommonRightBasedMenus = ({
    userType,
    handleSubmitButtonFun,
    handleViewButtonFun,
    submitLabel
}) => {
    const navigation = useNavigate();

    const [menurights, setMenurights] = useState([])


    const { data: userSettings } = useQuery({
        queryKey: ['getuserSettings', userType],
        queryFn: () => userWiseSettingsRights(userType),
        enabled: !!userType,
    });

    // Define an array of icons and their properties
    const iconButtons = [
        {
            menuslno: 23,
            icon: <QueueIcon />,
            onClick: handleSubmitButtonFun,
            tooltip: submitLabel || "Click Here to Submit",
        },
        {
            menuslno: 24,
            icon: <SearchIcon />,
            onClick: handleViewButtonFun,
            tooltip: "Click Here to View",
        },
        {
            menuslno: 25,
            icon: <CloseIcon />,
            onClick: () => navigation(-1),
            tooltip: "Back to Previous Page",
        },
    ];

    useEffect(() => {
        let array = iconButtons?.filter((value) => {
            return userSettings?.find((val) => {
                return value.menuslno === val.menu_slno;
            })
        });
        setMenurights(array)
    }, [userSettings])

    return (
        <div>
            {iconButtons.map((button, index) => {
                const isDisabled = !menurights.some((menu) => menu.menuslno === button.menuslno);

                return (
                    <IconButton
                        key={index}
                        variant="outlined"
                        sx={{
                            mt: 1, mr: 1,
                            fontWeight: 400,
                            '&:hover': {
                                borderColor: 'rgba(var(--icon-primary))',
                                backgroundColor: 'transparent',
                            }
                        }}
                        onClick={button.onClick}
                        disabled={isDisabled}
                    >
                        <Tooltip
                            title={isDisabled ? "Permission Denied" : button.tooltip} // Conditional Tooltip text
                            arrow
                            variant="outlined"
                            sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}
                        >
                            {React.cloneElement(button.icon, {
                                sx: {
                                    color: isDisabled ? "gray" : "rgba(var(--icon-primary))",  // Apply color conditionally
                                },
                            })}
                        </Tooltip>
                    </IconButton>
                );
            })}
        </div>
    );
};

export default memo(CommonRightBasedMenus);
