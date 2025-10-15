// @ts-nocheck
import React, { lazy, Suspense, useState, useCallback, useMemo } from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    IconButton, Input, Radio, RadioGroup, Tooltip
} from '@mui/joy'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import QueueIcon from '@mui/icons-material/Queue'
import SearchIcon from '@mui/icons-material/Search'
import { addDays, format } from 'date-fns'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CustomeCheckBox from '../../../Components/CustomeCheckBox'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import {
    errorNofity,
    isValidMobileNumber,
    isValidPassword,
    sanitizeInput,
    succesNofity,
    validateEmail,
    warningNofity
} from '../../../Constant/Constant'
import {
    loginType,
    passwordValidity,
    signInLimit,
    signInPerDayCount,
    userStatus
} from '../../../Constant/Data'
import axiosApi from '../../../Axios/Axios'
import { getAllUsers, getCustodianMasterList, userTypes } from '../../../api/commonAPI'
import { Edit } from 'iconoir-react'

const UserList = lazy(() => import('../../../Components/CustomTable'))

const UserCreation = () => {
    const navigation = useNavigate()
    const queryClient = useQueryClient()
    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)

    const [userManagemt, setUserManagemt] = useState({
        name: '',
        mobile: '',
        email: '',
        login_type: 0,
        password: '',
        password_validity: 0,
        user_status: 0,
        sign_in_per_day_limit: 0,
        sign_in_per_day_count: 0,
        is_limited_user: 'N',
        login_method_allowed: 1,
        printer_access: 'N',
        custodian_status: 'N',
        notification_status: 'N',
        user_slno: 0,
        temp_user_status: 'N',
        temp_user_days: 0,
        cust_slno:0
    })

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const { data: AllUserList } = useQuery({
        queryKey: ["userList"],
        queryFn: getAllUsers,
        staleTime: Infinity
    })

    const { data: userType } = useQuery({
        queryKey: ["userTypeList"],
        queryFn: userTypes,
        staleTime: Infinity
    })

      const { isLoading, data: custodianMasterData, error } = useQuery({
          queryKey: ['custodianMaster'],
          queryFn: getCustodianMasterList,
          staleTime: Infinity
      })
  
  // const newCustodianMaster = useMemo(() => custodianMasterData, [custodianMasterData])
  const newCustodianMaster = useMemo(() => {
  return custodianMasterData?.map(item => ({
    value: item.cust_slno,
    label: item.cust_name
  }));
}, [custodianMasterData]);
        
    // const handleChange = (e) => {
    //     setUserManagemt(prev => ({
    //         ...prev,
    //         [e.target.name]: sanitizeInput(e.target.value)
    //     }))
    // }

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "temp_user_days") {
        // Ensure it's a number
        value = parseInt(value, 10);

        // Handle NaN
        if (isNaN(value)) {
            value = "";
        } else {
            // Clamp value between 1 and 5
            if (value < 1) value = 1;
            if (value > 5) value = 5;
        }
    }

    setUserManagemt(prev => ({
        ...prev,
        [name]: sanitizeInput(value)
    }));
};
    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault()

        const {
            name,
            mobile,
            email,
            login_type,
            password,
            password_validity,
            user_status,
            sign_in_per_day_limit,
            sign_in_per_day_count,
            is_limited_user,
            login_method_allowed,
            printer_access,
            custodian_status,
            notification_status,
            user_slno,
            temp_user_status,
            temp_user_days,
            cust_slno
        } = userManagemt

        if (name.trim() === '') return warningNofity('Name Of the User cannot be empty')
        if (mobile.trim() === '' || !isValidMobileNumber(Number(mobile))) return warningNofity('Mobile Number must be 10 digits')
        if (email.trim() === '' || !validateEmail(email)) return warningNofity('A valid email address is required')
        if (editData === 0 && (password.trim() === '' || !isValidPassword(password))) {
            return warningNofity('Password must meet complexity requirements')
        }

        const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        const expiryDate = format(addDays(new Date(), Number(password_validity || 0)), 'yyyy-MM-dd HH:mm:ss')

        const requestData = {
            name: name.trim(),
            mobile: mobile.trim(),
            email: email.trim(),
            login_type: Number(login_type),
            password_validity: Number(password_validity || 0),
            user_status: Number(user_status),
            sign_in_per_day_limit: Number(sign_in_per_day_limit || 0),
            sign_in_per_day_count: Number(sign_in_per_day_count || 0),
            is_limited_user: is_limited_user || 'N',
            login_method_allowed: Number(login_method_allowed),
            printer_access: printer_access || 'N',
            custodian_status: custodian_status || 'N',
            notification_status: notification_status || 'N',
            temp_user_status: temp_user_status || 'N',
            temp_user_days: Number(temp_user_days || 0),
            cust_slno:Number(cust_slno||0)
        }

        try {
            let response

            if (editData === 0) {
                requestData.created_by = Number(loggedUser)
                requestData.password = password
                requestData.lastPasswordChangeDate = formattedDate
                requestData.password_validity_expiry_date = expiryDate
                
                response = await axiosApi.post('/user/insertUser', requestData)
            } else {
                const patchData = {
                    ...requestData,
                    user_slno,
                    edit_user: Number(loggedUser),
                    edit_date: formattedDate
                }

                response = await axiosApi.patch('/user/editUser', patchData)
            }

            const { success, message } = response.data

            if (success === 1) {
                queryClient.invalidateQueries(['userList'])
                succesNofity("Data Updated Successfully")

                setUserManagemt({
                    name: '',
                    mobile: '',
                    email: '',
                    login_type: 0,
                    password: '',
                    password_validity: 0,
                    user_status: 0,
                    sign_in_per_day_limit: 0,
                    sign_in_per_day_count: 0,
                    is_limited_user: 'N',
                    login_method_allowed: 1,
                    printer_access: 'N',
                    custodian_status: 'N',
                    notification_status: 'N',
                    user_slno: 0,
                    temp_user_status: 'N',
                    temp_user_days: 0,
                    cust_slno:0
                })

                setEditData(0)
            } else {
                warningNofity(message || 'Request failed')
            }
        } catch (error) {
            console.error("Error:", error)

            if (error.response) {
                errorNofity(error.response.data.message || 'Server responded with an error')
            } else if (error.request) {
                errorNofity('No response from server')
            } else {
                errorNofity(error.message || 'Unknown error occurred')
            }
        }

    }, [userManagemt, editData, loggedUser, queryClient])

    const viewuserList = useCallback(() => setViewTable(1), [])

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setUserManagemt({
            name: item.name || "",
            mobile: item.mobile || "",
            email: item.email || "",
            login_type: item.login_type || 0,
            password: '', // allow password to be set if needed
            password_validity: item.password_validity || 0,
            user_status: item.user_status || 0,
            sign_in_per_day_limit: item.sign_in_per_day_limit || 0,
            sign_in_per_day_count: item.sign_in_per_day_count || 0,
            is_limited_user: item.is_limited_user === "Y" ? "Y" : "N",
            login_method_allowed: item.login_method_allowed || 1,
            printer_access: item.printer_access === "Y" ? "Y" : "N",
            custodian_status: item.custodian_status === "Y" ? "Y" : "N",
            notification_status: item.notification_status === "Y" ? "Y" : "N",
            user_slno: item.user_slno || 0,
            temp_user_status: item.temp_user_status === "Y" ? "Y" : "N",
            temp_user_days: item.temp_user_days || 0,
            cust_slno:item.cust_slno ||0
        })
    }, [])

    const {
        name, mobile, email, login_type, password, password_validity,
        user_status, sign_in_per_day_limit, sign_in_per_day_count,
        is_limited_user, login_method_allowed, printer_access,
        custodian_status, notification_status, temp_user_status,
        temp_user_days,user_slno,cust_slno
    } = userManagemt

    return (
        <DefaultPageLayout label="User Management">
            <MasterPageLayout>
  <Box className="flex flex-col gap-4 p-4 bg-white rounded shadow-sm">
    {/* Input Fields */}
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CustomInputWithLabel
        handleInputChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
        values={name}
        placeholder="Name of User"
        labelName="Name of User"
        type="text"
      />
      <CustomInputWithLabel
        handleInputChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
        values={mobile}
        placeholder="Mobile Number"
        labelName="Mobile Number"
        type="number"
      />
      <CustomInputWithLabel
        handleInputChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
        values={email}
        placeholder="Email - name@example.com"
        labelName="Email"
        type="email"
      />
      <CustomInputWithLabel
        handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
        values={password}
        placeholder={editData === 1 ? 'Leave blank to keep existing password' : '*************'}
        disabled={false}
        autoComplete="new-password"
        labelName="Password"
        type="password"
      />
    </Box>

    {/* Select Fields */}
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CustomSelectWithLabel
        labelName="Maximum Password Age Limit"
        dataCollection={passwordValidity}
        values={Number(password_validity)}
        handleChangeSelect={(e, val) =>
          handleChange({ target: { name: 'password_validity', value: val } })
        }
        placeholder="Select Maximum Password Age Limit"
      />
      <CustomSelectWithLabel
        labelName="Number Of Sign In Per Days Limit"
        dataCollection={signInLimit}
        values={Number(sign_in_per_day_limit)}
        handleChangeSelect={(e, val) =>
          handleChange({ target: { name: 'sign_in_per_day_limit', value: val } })
        }
        placeholder="Sign In Per Day Limit"
      />
      <CustomSelectWithLabel
        labelName="Number Of Sign In Count"
        dataCollection={signInPerDayCount}
        values={Number(sign_in_per_day_count)}
        handleChangeSelect={(e, val) =>
          handleChange({ target: { name: 'sign_in_per_day_count', value: val } })
        }
        placeholder="Sign In Per Day Count"
      />
      <CustomSelectWithLabel
        labelName="Login User Type"
        dataCollection={loginType}
        values={Number(login_type)}
        handleChangeSelect={(e, val) =>
          handleChange({ target: { name: 'login_type', value: val } })
        }
        placeholder="Login User Type"
              />
              
      <CustomSelectWithLabel
        labelName="custodian name"
        dataCollection={newCustodianMaster}
        values={Number(cust_slno)}
        handleChangeSelect={(e, val) =>
          handleChange({ target: { name: 'cust_slno', value: val } })
        }
        placeholder="Select custodian name"
              />

        <CustomSelectWithLabel
               labelName='User Status'
               dataCollection={userStatus}
               values={Number(user_status)}
               handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_status', value: val } })}
               placeholder={"User Status"}
                             />
    </Box>

    {/* Checkboxes Section */}
    <Box className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
      <p className="font-medium mb-2 text-gray-700">User Access Options</p>
      <Box className="flex flex-wrap gap-4">
        <CustomeCheckBox
          values={custodian_status === "N" ? false : true}
          color="danger"
          lable="Custodian Status"
          handleChangeChecked={(e) =>
            handleChange({ target: { name: 'custodian_status', value: e.target.checked ? "Y" : "N" } })
          }
        />
        <CustomeCheckBox
          values={notification_status === "N" ? false : true}
          color="danger"
          lable="Notification Status"
          handleChangeChecked={(e) =>
            handleChange({ target: { name: 'notification_status', value: e.target.checked ? "Y" : "N" } })
          }
        />
        <CustomeCheckBox
          values={printer_access === "N" ? false : true}
          color="danger"
          lable="Printer Usability"
          handleChangeChecked={(e) =>
            handleChange({ target: { name: 'printer_access', value: e.target.checked ? "Y" : "N" } })
          }
        />
        <CustomeCheckBox
          values={is_limited_user === "N" ? false : true}
          color="danger"
          lable="Limited to 24 Hour Login"
          handleChangeChecked={(e) =>
            handleChange({ target: { name: 'is_limited_user', value: e.target.checked ? "Y" : "N" } })
          }
        />
        <Box className="flex items-center gap-2">
          <CustomeCheckBox
            values={temp_user_status === "N" ? false : true}
            color="danger"
            lable="Temporary User"
            handleChangeChecked={(e) =>
              handleChange({ target: { name: 'temp_user_status', value: e.target.checked ? "Y" : "N" } })
            }
          />
          {temp_user_status === "Y" && (
            // <Input
            //   name="temp_user_days"
            //   type="number"
            //   size='s'
            //   value={temp_user_days}
            //   onChange={handleChange}
            //   min={1}
            //   max={5}
            //   placeholder="Days (max 5)"
            //   sx={{ width: 120 ,p:0.3}}
                    // />
                 
              <Input
                name="temp_user_days"
                type="number"
                size="s"
                value={temp_user_days}
                 onChange={handleChange}
                min={1}
                max={5}
                placeholder="Days (max 5)"
                sx={{ width: 120, p: 0.3 }}
              />
          )}
        </Box>
      </Box>
    </Box>

    {/* Radio Buttons */}
    <Box className="mt-4">
      <RadioGroup
        name="login_method_allowed"
        orientation="horizontal"
        value={login_method_allowed}
        onChange={(e) =>
          handleChange({ target: { name: 'login_method_allowed', value: e.target.value } })
        }
        sx={{ justifyContent: 'space-between' }}
      >
        <Radio value={1} label="Both" color="primary" />
        <Radio value={2} label="OTP" color="neutral" />
        <Radio value={3} label="User" color="danger" />
      </RadioGroup>
    </Box>

    {/* Action Buttons */}
    <Box className="flex gap-3 mt-4">
      <IconButton variant="outlined" onClick={handleSubmitUserManagment}>
        <Tooltip title="Click Here to Submit" arrow>
          <QueueIcon sx={{ color: 'rgba(var(--icon-primary))' }} />
        </Tooltip>
      </IconButton>
      <IconButton variant="outlined" onClick={viewuserList}>
        <Tooltip title="Click Here to View" arrow>
          <SearchIcon sx={{ color: 'rgba(var(--icon-primary))' }} />
        </Tooltip>
      </IconButton>
      <IconButton variant="outlined" onClick={() => navigation(-1)}>
        <Tooltip title="Back to Previous Page" arrow>
          <CloseIcon sx={{ color: 'rgba(var(--icon-primary))' }} />
        </Tooltip>
      </IconButton>
    </Box>
  </Box>
</MasterPageLayout>

  {viewtable === 1 && (
  <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />}>
    <Box
      sx={{
        maxHeight: '500px', // or any suitable height
        overflowY: 'auto',
        overflowX: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: '#fff',
      }}
    >
      <UserList
        tableHeaderCol={[
          'Action', 'Slno', 'Name', 'Mobile', 'Email', 'LogIn Type', 'Validity',
          'SigIn Limit', 'One Day Log', 'SignIn Per Day', 'Log Method', 'Printer',
          'custodian_status', 'notification_status', 'Status'
        ]}
      >
        {AllUserList?.map((item, idx) => (
          <tr key={idx}>
            <td>
              <Edit
                onClick={() => EditBtn(item)}
                style={{ color: 'rgba(var(--color-pink))', cursor: 'pointer' }}
              />
            </td>
            <td>{idx + 1}</td>
            <td>{item?.name?.toUpperCase()}</td>
            <td>{item?.mobile}</td>
            <td>{item?.email}</td>
            <td>{item?.login_type === 1 ? 'Admin' : 'Super Admin'}</td>
            <td>{item?.password_validity}</td>
            <td>{item?.sign_in_per_day_limit}</td>
            <td>{item?.is_limited_user}</td>
            <td>{item?.sign_in_per_day_count}</td>
            <td>{item?.login_method_allowed}</td>
            <td>{item?.printer_access === 'Y' ? 'Accessible' : 'Denied'}</td>
            <td>{item?.custodian_status === 'Y' ? 'Custodian' : 'Normal'}</td>
            <td>{item?.notification_status === 'Y' ? 'Accessible' : 'Denied'}</td>
            <td>
              {item?.user_status === 1
                ? 'Active'
                : item?.user_status === 2
                ? 'Inactive'
                : 'Suspended'}
            </td>
          </tr>
        ))}
      </UserList>
    </Box>
  </Suspense>
)}
     

            {/* {viewtable === 1 &&
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />}>
                    <UserList tableHeaderCol={['Action', 'Slno', 'Name', 'Mobile', 'Email', 'LogIn Type', 'Validity', 'SigIn Limit', 'One Day Log', 'SignIn Per Day', 'Log Method', 'Printer', 'custodian_status', 'notification_status', 'Status']}>
                        {
                            AllUserList?.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <Edit onClick={() => EditBtn(item)} style={{ color: "rgba(var(--color-pink))", cursor: "pointer" }} />
                                    </td>
                                    <td>{idx + 1}</td>
                                    <td>{item?.name?.toUpperCase()}</td>
                                    <td>{item?.mobile}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.login_type === 1 ? "Admin" : "Super Admin"}</td>
                                    <td>{item?.password_validity}</td>
                                    <td>{item?.sign_in_per_day_limit}</td>
                                    <td>{item?.is_limited_user}</td>
                                    <td>{item?.sign_in_per_day_count}</td>
                                    <td>{item?.login_method_allowed}</td>
                                    <td>{item?.printer_access === "Y" ? "Accessible" : "Denied"}</td>
                                    <td>{item?.custodian_status === "Y" ? "Custodian" : "Normal"}</td>
                                    <td>{item?.notification_status === "Y" ? "Accessible" : "Denied"}</td>
                                    <td>{item?.user_status === 1 ? "Active" : item?.user_status === 2 ? "Inactive" : "Suspended"}</td>
                                </tr>
                            ))
                        }
                    </UserList>
                </Suspense>
            } */}
        </DefaultPageLayout>
    )
}

export default memo(UserCreation)














 {/* <MasterPageLayout>
                 <Box className="flex flex-col gap-1" >
                     <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
                        values={name}
                        placeholder="Name of User"
                        sx={{}}
                        labelName='Name of User'
                        type="text"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
                        values={mobile}
                        placeholder="Mobile Number"
                        sx={{}}
                        labelName='Mobile Number'
                        type="number"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
                        values={email}
                        placeholder="Email - name@example.com"
                        sx={{}}
                        labelName='Email'
                        type='email'
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
                        values={password}
                        placeholder={editData === 1 ? 'Leave blank to keep existing password' : '*************'}
                        sx={{}}
                        disabled={false} // allow user to enter a new password during edit
                        autoComplete="new-password" // prevent browser autofill
                        labelName="Password"
                        type="password"
                    />

                    <CustomSelectWithLabel
                        labelName='Maximum Password Age Limit'
                        dataCollection={passwordValidity}
                        values={Number(password_validity)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'password_validity', value: val } })}
                        placeholder={"Select Maximum Password Age Limit"}
                    />
                    <CustomSelectWithLabel
                        labelName='Number Of Sign In Per Days Limit'
                        dataCollection={signInLimit}
                        values={Number(sign_in_per_day_limit)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'sign_in_per_day_limit', value: val } })}
                        placeholder={"Select Number Of Sign In Per Days Limit"}
                    />

                    <CustomSelectWithLabel
                        labelName='Number Of Sign In Per Days Limit'
                        dataCollection={signInPerDayCount}
                        values={Number(sign_in_per_day_count)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'sign_in_per_day_count', value: val } })}
                        placeholder={"Select Number Of Sign In Per Days Count"}
                    />
                    <CustomSelectWithLabel
                        labelName='Login User Type'
                        dataCollection={loginType}
                        values={Number(login_type)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'login_type', value: val } })}
                        placeholder={"Login User Type"}
                    />
                    <CustomSelectWithLabel
                        labelName='User Status'
                        dataCollection={userStatus}
                        values={Number(user_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_status', value: val } })}
                        placeholder={"Select User Status"}
                    />

                    <Box className="flex flex-row gap-2" >
                        <CustomeCheckBox
                            values={custodian_status === "N" ? false : true}
                            color={'danger'}
                            lable={'Custodian status'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'custodian_status', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                        <CustomeCheckBox
                            values={notification_status === "N" ? false : true}
                            color={'danger'}
                            lable={'notification status'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'notification_status', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                        <CustomeCheckBox
                            values={printer_access === "N" ? false : true}
                            color={'danger'}
                            lable={'Printer Usability'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'printer_access', value: e.target.checked ? "Y" : "N" }
                            })}
                        />

                        <CustomeCheckBox
                            values={is_limited_user === "N" ? false : true}
                            color={'danger'}
                            lable={'Limited to 24 hour login'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'is_limited_user', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                        //temp user
                        <CustomeCheckBox
                            values={temp_user_status === "N" ? false : true}
                            color={'danger'}
                            lable={'Temporary User'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'temp_user_status', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                       
                        {
                            temp_user_status === "Y" ?
                                <Box>
                                    <Input
                                       name="temp_user_days"
                                       type="number"
                                       value={temp_user_days}
                                       onChange={handleChange}
                                       min={1}
                                       max={5}
                                       placeholder="Enter number of days (max 5)"
                                    />
                                </Box>
                                :
                             null   
                        }
                    </Box>

                    <Box>
                         <RadioGroup
                            name="radio-buttons-group" orientation='horizontal'
                            sx={{
                                flexGrow: 1,
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }}
                            value={login_method_allowed}
                            onChange={(e) => handleChange({ target: { name: 'login_method_allowed', value: e.target.value } })}
                        >
                            <Radio value={1} label="Both" color="primary" />
                            <Radio value={2} label="OTP" color="neutral" />
                            <Radio value={3} label="User" color="danger" />
                        </RadioGroup>
                    </Box>
                    <Box>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1,
                                fontWeight: 400,
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={handleSubmitUserManagment}>
                            <Tooltip title="Click Here to Submit" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} >
                                <QueueIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1, fontWeight: 400,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={viewuserList}
                        >
                            <Tooltip title="Click Here to View" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                                <SearchIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            variant='outlined'
                            sx={{
                                mt: 1, mr: 1, fontWeight: 400,
                                '&:hover': {
                                    borderColor: 'rgba(var(--icon-primary))',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={() => navigation(-1)}
                        >
                            <Tooltip title="Back to Previous Page" arrow variant='outlined'
                                sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                                <CloseIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Box >
            </MasterPageLayout > */}
















            


// // @ts-nocheck
// import React, { lazy, Suspense } from 'react'
// import { memo } from 'react'
// import DefaultPageLayout from '../../../Components/DefaultPageLayout'
// import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
// import { IconButton, Radio, RadioGroup, Tooltip } from '@mui/joy'
// import { errorNofity, isValidMobileNumber, isValidPassword, sanitizeInput, succesNofity, validateEmail, warningNofity } from '../../../Constant/Constant'
// import MasterPageLayout from '../../../Components/MasterPageLayout'
// import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
// import { useNavigate } from 'react-router-dom'
// import { loginType, passwordValidity, signInLimit, signInPerDayCount, userStatus } from '../../../Constant/Data'
// import { useState } from 'react'
// import { useCallback } from 'react'
// import axiosApi from '../../../Axios/Axios'
// import CloseIcon from '@mui/icons-material/Close';
// import QueueIcon from '@mui/icons-material/Queue';
// import SearchIcon from '@mui/icons-material/Search';
// import CustomeCheckBox from '../../../Components/CustomeCheckBox'
// import { Box } from '@mui/material'
// import { addDays, format } from 'date-fns'
// import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { getAllUsers, userTypes } from '../../../api/commonAPI'
// import { Edit } from 'iconoir-react'

// const UserList = lazy(() => import('../../../Components/CustomTable'));

// const UserCreation = () => {
//     const navigation = useNavigate()
//     const queryClient = useQueryClient()
//     const [userManagemt, setUserManagemt] = useState({
//         name: '', //name of the user
//         mobile: '',// mob number
//         email: '',//gmail
//         login_type: 0,// userType- admin/super user
//         password: '',//password
//         password_validity: 0,//password validity days in count 
//         user_status: 0,// active / inactive
//         sign_in_per_day_limit: 0,//sign in day limit
//         sign_in_per_day_count: 0,//sign in day count
//         is_limited_user: "N",//user validity 24 hours
//         login_method_allowed: 1,// login - otp/creadintial
//         printer_access: "N",// printer access
//         custodian_status: "N",// custodan or not
//         notification_status: "N",// they eligible for getting notification or not
//         user_slno: 0// user slno from db
//     })


//     const [viewtable, setViewTable] = useState(0)
//     const [editData, setEditData] = useState(0)
//     const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

//     const { data: AllUserList } = useQuery({
//         queryKey: ["userList"],
//         queryFn: getAllUsers,
//         staleTime: Infinity,
//     });
//     const { data: userType } = useQuery({
//         queryKey: ["userTypeList"],
//         queryFn: userTypes,
//         staleTime: Infinity,
//     });


//     const { name, mobile, email, login_type, password, password_validity, user_status, sign_in_per_day_limit, sign_in_per_day_count, is_limited_user, login_method_allowed, printer_access, custodian_status, notification_status, user_slno } = userManagemt;


//     const handleChange = (e) => {
//         setUserManagemt({ ...userManagemt, [e.target.name]: sanitizeInput(e.target.value) })
//     }



//     const handleSubmitUserManagment = useCallback(async (e) => {
//         e.preventDefault();

//         // Destructure and sanitize inputs
//         const {
//             name,
//             mobile,
//             email,
//             login_type,
//             password,
//             password_validity,
//             user_status,
//             sign_in_per_day_limit,
//             sign_in_per_day_count,
//             is_limited_user,
//             login_method_allowed,
//             printer_access,
//             custodian_status,
//             notification_status,
//             user_slno,
//         } = userManagemt;

//         // Input validation
//         if (name.trim() === '') {
//             warningNofity('Name Of the User cannot be empty');
//             return;
//         }

//         if (mobile.trim() === '' || !isValidMobileNumber(Number(mobile))) {
//             warningNofity('Mobile Number must be 10 digits');
//             return;
//         }

//         if (email.trim() === '' || !validateEmail(email)) {
//             warningNofity('A valid email address is required');
//             return;
//         }

//         if (password.trim() === '' || !isValidPassword(password)) {
//             warningNofity('Password must meet complexity requirements');
//             return;
//         }


//         const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//         const expiryDate = format(addDays(new Date(), Number(password_validity || 0)), 'yyyy-MM-dd HH:mm:ss');

//         // Build request object (for both insert and update)
//         const requestData = {
//             name: name.trim(),
//             mobile: mobile.trim(),
//             email: email.trim(),
//             login_type: Number(login_type),
//             password: password,
//             password_validity: Number(password_validity || 0),
//             user_status: Number(user_status),
//             sign_in_per_day_limit: Number(sign_in_per_day_limit || 0),
//             sign_in_per_day_count: Number(sign_in_per_day_count || 0),
//             is_limited_user: is_limited_user || 'N',
//             login_method_allowed: Number(login_method_allowed),
//             printer_access: printer_access || 'N',
//             custodian_status: custodian_status || 'N',
//             notification_status: notification_status || 'N',
//         };

//         try {
//             let response;

//             if (editData === 0) {
//                 // Insert new user
//                 requestData.created_by = Number(loggedUser);
//                 requestData.lastPasswordChangeDate = formattedDate;
//                 requestData.password_validity_expiry_date = expiryDate;

//                 console.log("Inserting user with data:", requestData);

//                 response = await axiosApi.post('/user/insertUser', requestData);
//             } else {
//                 // Update existing user
//                 const patchData = {
//                     ...requestData,
//                     user_slno: user_slno,
//                     edit_user: Number(loggedUser),
//                     edit_date: formattedDate
//                 };

//                 console.log("Updating user with data:", patchData);

//                 response = await axiosApi.patch('/user/editUser', patchData);
//             }

//             const { success, message } = response.data;

//             if (success === 1) {
//                 queryClient.invalidateQueries(['userList']);
//                 succesNofity(message);

//                 // Reset form
//                 setUserManagemt({
//                     name: '',
//                     mobile: '',
//                     email: '',
//                     login_type: 0,
//                     password: '',
//                     password_validity: 0,
//                     user_status: 0,
//                     sign_in_per_day_limit: 0,
//                     sign_in_per_day_count: 0,
//                     is_limited_user: 'N',
//                     login_method_allowed: 1,
//                     printer_access: 'N',
//                     custodian_status: 'N',
//                     notification_status: 'N',
//                     user_slno: 0
//                 });
//                 setEditData(0);
//             } else {
//                 warningNofity(message || 'Request failed');
//             }

//         } catch (error) {
//             // 🔍 Detailed error logging
//             console.error("Caught error during user submit:", error);

//             if (error.response) {
//                 console.error("Response error:", error.response.data);
//                 errorNofity(error.response.data.message || 'Server responded with an error');
//             } else if (error.request) {
//                 console.error("No response received:", error.request);
//                 errorNofity('No response from server');
//             } else {
//                 console.error("Error message:", error.message);
//                 errorNofity(error.message || 'Unknown error occurred');
//             }
//         }

//     }, [userManagemt, editData, loggedUser, queryClient]);


//     const viewuserList = useCallback(() => {
//         setViewTable(1)
//     }, [])

//     const EditBtn = useCallback((item) => {
//         console.log("item:", item);

//         setEditData(1);
//         setUserManagemt({

//             name: item.name || "",
//             mobile: item.mobile || "",
//             email: item.email || "",
//             login_type: item.login_type || 0,
//             password: item.password || "",
//             password_validity: item.password_validity || 0,
//             user_status: item.user_status || 0,
//             sign_in_per_day_limit: item.sign_in_per_day_limit || 0,
//             sign_in_per_day_count: item.sign_in_per_day_count,
//             is_limited_user: item.is_limited_user === "N" ? "N" : "Y",
//             login_method_allowed: item.login_method_allowed || 1,
//             printer_access: item.printer_access === "N" ? "N" : "Y",
//             custodian_status: item.Custodian_status === "N" ? "N" : "Y",
//             notification_status: item.notification_status === "N" ? "N" : "Y",

//             user_slno: item.user_slno || 0
//         });
//     }, []);

//     return (
//         <DefaultPageLayout label="User Management" >
//             <MasterPageLayout>
//                 <Box className="flex flex-col gap-1" >
//                     <CustomInputWithLabel
//                         handleInputChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
//                         values={name}
//                         placeholder="Name of User"
//                         sx={{}}
//                         labelName='Name of User'
//                         type="text"
//                     />
//                     <CustomInputWithLabel
//                         handleInputChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
//                         values={mobile}
//                         placeholder="Mobile Number"
//                         sx={{}}
//                         labelName='Mobile Number'
//                         type="number"
//                     />
//                     <CustomInputWithLabel
//                         handleInputChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
//                         values={email}
//                         placeholder="Email - name@example.com"
//                         sx={{}}
//                         labelName='Email'
//                         type='email'
//                     />
//                     {/* <CustomInputWithLabel
//                         handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
//                         values={password}
//                         placeholder="*************"
//                         sx={{}}
//                         disabled={editData === 1}
//                         labelName='Password'
//                         type='password'
//                     /> */}

//                     <CustomInputWithLabel
//                         handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
//                         values={password}
//                         placeholder={editData === 1 ? 'Leave blank to keep existing password' : '*************'}
//                         sx={{}}
//                         disabled={false} // allow user to enter a new password during edit
//                         autoComplete="new-password" // prevent browser autofill
//                         labelName="Password"
//                         type="password"
//                     />

//                     <CustomSelectWithLabel
//                         labelName='Maximum Password Age Limit'
//                         dataCollection={passwordValidity}
//                         values={Number(password_validity)}
//                         handleChangeSelect={(e, val) => handleChange({ target: { name: 'password_validity', value: val } })}
//                         placeholder={"Select Maximum Password Age Limit"}
//                     />
//                     <CustomSelectWithLabel
//                         labelName='Number Of Sign In Per Days Limit'
//                         dataCollection={signInLimit
//                             // signInLimit
//                         }
//                         values={Number(sign_in_per_day_limit)}
//                         handleChangeSelect={(e, val) => handleChange({ target: { name: 'sign_in_per_day_limit', value: val } })}
//                         placeholder={"Select Number Of Sign In Per Days Limit"}
//                     />


//                     <CustomSelectWithLabel
//                         labelName='Number Of Sign In Per Days Limit'
//                         dataCollection={signInPerDayCount
//                             // signInLimit
//                         }
//                         values={Number(sign_in_per_day_count)}
//                         handleChangeSelect={(e, val) => handleChange({ target: { name: 'sign_in_per_day_count', value: val } })}
//                         placeholder={"Select Number Of Sign In Per Days Count"}
//                     />
//                     <CustomSelectWithLabel
//                         labelName='Login User Type'
//                         dataCollection={loginType}
//                         values={Number(login_type)}
//                         handleChangeSelect={(e, val) => handleChange({ target: { name: 'login_type', value: val } })}
//                         placeholder={"Login User Type"}
//                     />
//                     <CustomSelectWithLabel
//                         labelName='User Status'
//                         dataCollection={userStatus}
//                         values={Number(user_status)}
//                         handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_status', value: val } })}
//                         placeholder={"Select User Status"}
//                     />

//                     <Box className="flex flex-row gap-2" >
//                         <CustomeCheckBox
//                             values={custodian_status === "N" ? false : true}
//                             color={'danger'}
//                             lable={'Custodian status'}
//                             handleChangeChecked={(e) => handleChange({
//                                 target: { name: 'custodian_status', value: e.target.checked ? "Y" : "N" }
//                             })}
//                         />
//                         <CustomeCheckBox
//                             values={notification_status === "N" ? false : true}
//                             color={'danger'}
//                             lable={'notification status'}
//                             handleChangeChecked={(e) => handleChange({
//                                 target: { name: 'notification_status', value: e.target.checked ? "Y" : "N" }
//                             })}
//                         />
//                         <CustomeCheckBox
//                             values={printer_access === "N" ? false : true}
//                             color={'danger'}
//                             lable={'Printer Usability'}
//                             handleChangeChecked={(e) => handleChange({
//                                 target: { name: 'printer_access', value: e.target.checked ? "Y" : "N" }
//                             })}
//                         />

//                         <CustomeCheckBox
//                             values={is_limited_user === "N" ? false : true}
//                             color={'danger'}
//                             lable={'Limited to 24 hour login'}
//                             handleChangeChecked={(e) => handleChange({
//                                 target: { name: 'is_limited_user', value: e.target.checked ? "Y" : "N" }
//                             })}
//                         />
//                         <RadioGroup
//                             name="radio-buttons-group" orientation='horizontal'
//                             sx={{
//                                 flexGrow: 1,
//                                 justifyContent: 'space-evenly',
//                                 alignItems: 'center'
//                             }}
//                             value={login_method_allowed}
//                             onChange={(e) => handleChange({ target: { name: 'login_method_allowed', value: e.target.value } })}
//                         >
//                             <Radio value={1} label="Both" color="primary" />
//                             <Radio value={2} label="OTP" color="neutral" />
//                             <Radio value={3} label="User" color="danger" />
//                         </RadioGroup>
//                     </Box>

//                     <Box>
//                         <IconButton
//                             variant='outlined'
//                             sx={{
//                                 mt: 1, mr: 1,
//                                 fontWeight: 400,
//                                 '&:hover': {
//                                     borderColor: 'rgba(var(--icon-primary))',
//                                     backgroundColor: 'transparent',
//                                 }
//                             }}
//                             onClick={handleSubmitUserManagment}>
//                             <Tooltip title="Click Here to Submit" arrow variant='outlined'
//                                 sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} >
//                                 <QueueIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
//                             </Tooltip>
//                         </IconButton>
//                         <IconButton
//                             variant='outlined'
//                             sx={{
//                                 mt: 1, mr: 1, fontWeight: 400,
//                                 backgroundColor: 'transparent',
//                                 '&:hover': {
//                                     borderColor: 'rgba(var(--icon-primary))',
//                                     backgroundColor: 'transparent',
//                                 }
//                             }}
//                             onClick={viewuserList}
//                         >
//                             <Tooltip title="Click Here to View" arrow variant='outlined'
//                                 sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
//                                 <SearchIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
//                             </Tooltip>
//                         </IconButton>
//                         <IconButton
//                             variant='outlined'
//                             sx={{
//                                 mt: 1, mr: 1, fontWeight: 400,
//                                 '&:hover': {
//                                     borderColor: 'rgba(var(--icon-primary))',
//                                     backgroundColor: 'transparent',
//                                 }
//                             }}
//                             onClick={() => navigation(-1)}
//                         >
//                             <Tooltip title="Back to Previous Page" arrow variant='outlined'
//                                 sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
//                                 <CloseIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
//                             </Tooltip>
//                         </IconButton>
//                     </Box>
//                 </Box >
//             </MasterPageLayout >
//             {viewtable === 1 ? <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
//                 <UserList tableHeaderCol={['Action', 'Slno', 'Name', 'Mobile', 'Email', 'LogIn Type', 'Validity', 'SigIn Limit', 'One Day Log', 'SignIn Per Day', 'Log Method', 'Printer', 'custodian_status', 'notification_status', 'Status']} >
//                     {
//                         AllUserList?.map((item, idx) => (
//                             <tr key={idx}>
//                                 <td ><Edit onClick={() => EditBtn(item)} style={{
//                                     color: "rgba(var(--color-pink))",
//                                     ":hover": {
//                                         color: "grey",
//                                         // border: "rgba(var(--color-pink))",
//                                     }, p: 0.5
//                                 }} /></td>
//                                 <td>{idx + 1}</td>
//                                 <td>{item?.name?.toUpperCase()}</td>
//                                 <td>{item?.mobile}</td>
//                                 <td sx={{ width: "100%" }}>{item?.email}</td>
//                                 <td>{item?.login_type === 1 ? "Admin" : "Super Admit"}</td>
//                                 <td>{item?.password_validity}</td>
//                                 <td>{item?.sign_in_per_day_limit}</td>
//                                 <td>{item?.is_limited_user}</td>
//                                 <td>{item?.sign_in_per_day_count}</td>
//                                 <td>{item?.login_method_allowed}</td>
//                                 <td>{item?.printer_access === null || item?.printer_access === "N" ? "Denied" : "Accessible"}</td>
//                                 <td>{item?.custodian_status === null || item?.custodian_status === "N" ? "Normal" : "Custodian"}</td>
//                                 <td>{item?.notification_status === null || item?.notification_status === "N" ? "Denied" : "Accessible"}</td>
//                                 <td>{item?.user_status === 1 ? "Active" : item?.user_status === 2 ? "Inactive" : "Suspented"}</td>


//                             </tr>
//                         ))
//                     }
//                 </UserList>
//             </Suspense> : null}
//         </DefaultPageLayout >
//     )
// }

// export default memo(UserCreation)


//             // user_slno: item.user_slno || 0,
//             // name: item.name || "",
//             // mobile: item.mobile || "",
//             // email: item.email || "",
//             // password: item.password || "",
//             // login_Type: item.login_type || 0,
//             // password_Validity: item.password_validity || 0,
//             // user_Status: item.user_status || 0,
//             // signIn_Limit: item.sign_in_per_day_limit || 0,
//             // setOndayLogin: item.is_limited_user === "N" ? "N" : "Y",
//             // loginMethod: item.login_method_allowed || 1,
//             // printerUsability: item.printer_access === "N" ? "N" : "Y",
//             // signInLimit: item.signInLimit,
//             // Custodian_status: item.Custodian_status === "N" ? "N" : "Y",
// // notification_status: item.notification_status === "N" ? "N" : "Y",
            

//    // const { name, mobile, email, password, login_Type, password_Validity, user_Status, signIn_Limit, setOndayLogin, loginMethod, printerUsability, Custodian_status, notification_status } = userManagemt;



//     // name: '',
//     // mobile: '',
//     // email: '',
//     // password: '',
//     // login_Type: 0,
//     // password_Validity: 0,
//     // user_Status: 0,
//     // signIn_Limit: 0,
//     // setOndayLogin: "N",
//     // loginMethod: 1,
//     // printerUsability: "N",
//     // user_slno: 0,
//     // signInLimit: 0,
//     // Custodian_status: 'N',
//     // notification_status: 'N',




//     // const handleSubmitUserManagment = useCallback(async (e) => {
//     //     e.preventDefault();
//     //     const requestData = {
//     //         // name: userManagemt.name.trim(),
//     //         // mobile: userManagemt.mobile.trim(),
//     //         // email: userManagemt.email.trim(),
//     //         // login_Type: Number(userManagemt.login_Type),
//     //         // password: userManagemt.password,
//     //         // password_Validity: Number(userManagemt.password_Validity),
//     //         // user_Status: Number(userManagemt.user_Status),
//     //         // signIn_Limit_per_day: Number(userManagemt.signIn_Limit),
//     //         // setOndayLogin: userManagemt.setOndayLogin,
//     //         // loginMethod: Number(userManagemt.loginMethod),
//     //         // printerUsability: userManagemt.printerUsability,
//     //         // Custodian_status: userManagemt.Custodian_status,
//     //         // notification_status: userManagemt.notification_status,

//     //         name: userManagemt.name.trim(),
//     //         mobile: userManagemt.mobile.trim(),
//     //         email: userManagemt.email.trim(),
//     //         login_type: Number(userManagemt.login_type),
//     //         password: userManagemt.password,
//     //         password_validity: Number(userManagemt.password_validity),
//     //         user_status: Number(userManagemt.user_status),
//     //         sign_in_per_day_limit: Number(userManagemt.sign_in_per_day_limit),
//     //         sign_in_per_day_count: Number(userManagemt.sign_in_per_day_count),
//     //         is_limited_user: userManagemt.is_limited_user,
//     //         login_method_allowed: Number(userManagemt.login_method_allowed),
//     //         printer_access: userManagemt.printer_access,
//     //         custodian_status: userManagemt.custodian_status,
//     //         notification_status: userManagemt.notification_status,



//     //         //   name: '', //name odf the user
//     //         //             mobile: '',// mob number
//     //         //             email: '',//gmail
//     //         //             login_type: 0,// userType- admin/super user
//     //         //             password: '',//password
//     //         //             password_validity: 0,//password validity days in count 
//     //         //             user_status: 0,// active / inactive
//     //         //             sign_in_per_day_limit: 0,//sign in day limit
//     //         //             sign_in_per_day_count: 0,//sign in day count
//     //         //             is_limited_user: "N",//user validity 24 hours
//     //         //             login_method_allowed: 1,// login - otp/creadintial
//     //         //             printer_access: "N",// printer access
//     //         //             custodian_status: "N",// custodan or not
//     //         //             notification_status: "N",// they eligible for getting notification or not

//     //         //             user_slno: 0// user slno from db











//     //     };

//     //     console.log("post requestData:", requestData);

//     //     try {
//     //         let response;
//     //         if (editData === 0) {
//     //             // console.log("insert");
//     //             if (userManagemt.name.trim() === '') {
//     //                 warningNofity('Name Of the User cannot be empty');
//     //                 return;
//     //             }

//     //             if (userManagemt.mobile.trim() === '' || !isValidMobileNumber(Number(userManagemt.mobile))) {
//     //                 warningNofity('Mobile Number must be 10 digits');
//     //                 return;
//     //             }

//     //             if (userManagemt.email.trim() === '' || !validateEmail(userManagemt.email)) {
//     //                 warningNofity('A valid email address is required');
//     //                 return;
//     //             }

//     //             if (userManagemt.password.trim() === '' || !isValidPassword(userManagemt.password)) {
//     //                 warningNofity('Password must meet complexity requirements');
//     //                 return;
//     //             }

//     //             // Create new user
//     //             requestData.created_by = Number(loggedUser);
//     //             requestData.lastPasswordChangeDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//     //             requestData.password_validity_expiry_date = format(addDays(new Date(), Number(userManagemt.password_Validity)), 'yyyy-MM-dd HH:mm:ss');
//     //             // console.log("insert", requestData);

//     //             response = await axiosApi.post('/user/insertUser', requestData);
//     //             console.log("response.data", response.data);

//     //         } else {
//     //             // console.log("edit");


//     //             const patchdata = {


//     //                 name: userManagemt.name.trim(),
//     //                 mobile: userManagemt.mobile.trim(),
//     //                 email: userManagemt.email.trim(),
//     //                 login_type: Number(userManagemt.login_type),
//     //                 password: userManagemt.password,
//     //                 password_validity: Number(userManagemt.password_validity),
//     //                 user_status: Number(userManagemt.user_status),
//     //                 sign_in_per_day_limit: Number(userManagemt.sign_in_per_day_limit),
//     //                 sign_in_per_day_count: Number(userManagemt.sign_in_per_day_count),
//     //                 is_limited_user: userManagemt.is_limited_user,
//     //                 login_method_allowed: Number(userManagemt.login_method_allowed),
//     //                 printer_access: userManagemt.printer_access,
//     //                 custodian_status: userManagemt.custodian_status,
//     //                 notification_status: userManagemt.notification_status,

//     //                 user_slno: userManagemt.user_slno,
//     //                 edit_user: Number(loggedUser),
//     //                 edit_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')



//     //                 // name: userManagemt.name.trim(),
//     //                 // mobile: userManagemt.mobile.trim(),
//     //                 // email: userManagemt.email.trim(),
//     //                 // login_Type: Number(userManagemt.login_Type),
//     //                 // password: userManagemt.password,
//     //                 // password_Validity: Number(userManagemt.password_Validity),
//     //                 // user_Status: Number(userManagemt.user_Status),
//     //                 // signIn_Limit_per_day: Number(userManagemt.signInLimit),
//     //                 // setOndayLogin: userManagemt.setOndayLogin,
//     //                 // loginMethod: Number(userManagemt.loginMethod),
//     //                 // printerUsability: userManagemt.printerUsability,
//     //                 // Custodian_status: userManagemt.Custodian_status,
//     //                 // notification_status: userManagemt.notification_status,
//     //                 // user_slno: userManagemt.user_slno,
//     //                 // edit_user: Number(loggedUser),
//     //                 // edit_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
//     //             };
//     //             console.log("patchdata", patchdata);

//     //             response = await axiosApi.patch(`/user/editUser`, patchdata);
//     //         }
//     //         const { success, message } = response.data;

//     //         if (success === 1) {
//     //             queryClient.invalidateQueries(['userList'])
//     //             succesNofity(message);
//     //             setUserManagemt({
//     //                 name: '', //name of the user
//     //                 mobile: '',// mob number
//     //                 email: '',//gmail
//     //                 login_type: 0,// userType- admin/super user
//     //                 password: '',//password
//     //                 password_validity: 0,//password validity days in count 
//     //                 user_status: 0,// active / inactive
//     //                 sign_in_per_day_limit: 0,//sign in day limit
//     //                 sign_in_per_day_count: 0,//sign in day count
//     //                 is_limited_user: "N",//user validity 24 hours
//     //                 login_method_allowed: 1,// login - otp/creadintial
//     //                 printer_access: "N",// printer access
//     //                 custodian_status: "N",// custodan or not
//     //                 notification_status: "N",// they eligible for getting notification or not

//     //                 user_slno: 0// user slno from db
//     //             });
//     //             setEditData(0);
//     //         } else {
//     //             warningNofity(message);
//     //         }
//     //     } catch (error) {
//     //         errorNofity('Error occurred while processing the request.');
//     //     }
//     // }, [userManagemt, editData, loggedUser, queryClient]);