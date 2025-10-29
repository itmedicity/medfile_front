import { IPInfoContext } from 'ip-info-react';
import React, { memo, useContext } from 'react'

const GetSystemInfo = () => {
    const userInfo = useContext(IPInfoContext);

    // console.log(userInfo.ip);
    // console.log(userInfo.city);
    // console.log(userInfo.country_name);


    return (
        <div>GetSystemInfo</div>
    )
}
export default memo(GetSystemInfo)



