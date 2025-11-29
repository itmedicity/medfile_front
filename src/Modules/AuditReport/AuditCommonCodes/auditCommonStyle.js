import { format } from "date-fns";

// Styles
export const inputStyle = {
    width: '140px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.85rem',
};

export const searchInputStyle = {
    width: '100%',
    padding: '4px 8px 4px 30px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.85rem',
    backgroundColor: '#fafafa',
};

export const searchIconStyle = {
    position: 'absolute',
    left: 6,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#888',
    fontSize: '1rem',
};


// export const AuditformatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return '';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
// };


export const AuditformatDate = (dateValue) => {
    // if (!dateValue) return '';
    // const date = new Date(dateValue);
    // if (isNaN(date.getTime())) return '';

    // const pad = (n) => (n < 10 ? '0' + n : n);

    // const day = pad(date.getDate());
    // const month = pad(date.getMonth() + 1); // Month is 0-indexed
    // const year = date.getFullYear();

    // const hours = pad(date.getHours());
    // const minutes = pad(date.getMinutes());
    // const seconds = pad(date.getSeconds());

    // return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return format(new Date(dateValue), "dd-MM-yyyy hh:mm:ss")
};


// Columns per tab
export const AuditMastcolumnsByTab = {
    Created: [
        { label: '#', key: 'slno' },
        { label: 'New Doc', key: 'audit_new_event' },
        { label: 'Document Number', key: 'doc_number' },
        { label: 'Created Time', key: 'created_time_date' },
        { label: 'Create User', key: 'username' },
        { label: 'IP Address', key: 'ip_address' },
        { label: 'Browser Name', key: 'browser_name' },
        { label: 'Browser Version', key: 'browser_version' },
        { label: 'OS Name', key: 'os_name' },
        { label: 'OS Version', key: 'os_version' },
    ],
    Updated: [
        { label: '#', key: 'slno' },
        { label: 'Prev Event', key: 'audit_prev_event' },
        { label: 'New Event', key: 'audit_new_event' },
        { label: 'Document Number', key: 'audit_doc_no' },
        { label: 'Edit Date', key: 'audit_log_time' },
        { label: 'Edit User', key: 'username' },
        { label: 'IP Address', key: 'ip_address' },
        { label: 'Browser Version', key: 'browser_version' },
        { label: 'OS Name', key: 'os_name' },
        { label: 'OS Version', key: 'os_version' },
    ],
};

export const AuditDetailcolumnsByTab = {
    Created: [
        { label: '#', key: 'docd_slno' },
        { label: 'Document Number', key: 'doc_id' },
        { label: 'originalname', key: 'originalname' },
        { label: 'mimetype', key: 'mimetype' },
        { label: 'filename', key: 'filename' },
        { label: 'docCreatedDate', key: 'docCreatedDate' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'created_ip_address' },
        { label: 'Browser ', key: 'created_browser_name' },
        { label: 'Browser Version', key: 'created_browser_version' },
        { label: 'OS Name', key: 'created_os_name' },
        { label: 'OS Version', key: 'created_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Document Number', key: 'document_id' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Time', key: 'replace_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'replaced_ip_address' },
        { label: 'Browser Name', key: 'replaced_browser_name' },
        { label: 'Browser Version', key: 'replaced_browser_version' },
        { label: 'OS Name', key: 'replaced_os_name' },
        { label: 'OS Version', key: 'replaced_os_version' },
    ],
};


//user management
export const AuditusercolumnsByTab = {
    Created: [
        { label: '#', key: 'user_slno' },
        { label: 'User Name', key: 'name' },
        { label: 'mobile', key: 'mobile' },
        { label: 'email', key: 'email' },
        { label: 'Created time', key: 'created_time' },
        { label: 'last login date', key: 'last_login_date' },
        { label: 'Ip Address', key: 'created_ip' },
        { label: 'Browser ', key: 'created_browser_name' },
        { label: 'Browser Version', key: 'created_browser_version' },
        { label: 'OS Name', key: 'created_os_name' },
        { label: 'OS Version', key: 'created_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'User Id', key: 'userId' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'updated_time' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edited_ip' },
        { label: 'Browser Name', key: 'edited_browser_name' },
        { label: 'Browser Version', key: 'edited_browser_version' },
        { label: 'OS Name', key: 'edited_os_name' },
        { label: 'OS Version', key: 'edited_os_version' },
    ],
};


//Document Type Master Audit Report column

export const AuditDocTypecolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'doc type slno', key: 'doc_type_slno' },
        { label: 'doc type Name', key: 'doc_type_master_name' },
        { label: 'main type name', key: 'main_type_name' },
        { label: 'Status', key: 'status' },
        { label: 'create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'doc type slno', key: 'doc_type_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


export const AuditSubTypecolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'subtype slno', key: 'sub_type_slno' },
        { label: 'Sub Type Name', key: 'doc_sub_type_name' },
        { label: 'SubType Status', key: 'docsubtype_status' },
        { label: 'Status', key: 'docinstitute_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'sub_type_slno', key: 'sub_type_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};

//Document category Audit report

export const AuditCategoryecolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Cat slno', key: 'cat_slno' },
        { label: 'Category Name', key: 'category_name' },
        { label: 'Category Status', key: 'cat_status' },
        { label: 'Create User', key: 'create_user' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'cat slno', key: 'cat_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};

//document sub category audit report


export const AuditSubCategoryecolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'SubCat slno', key: 'subcat_slno' },
        { label: 'Sub Category Name', key: 'subcat_name' },
        { label: 'Main Category Name', key: 'category_name' },
        { label: 'Status', key: 'sub_category_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Subcat slno', key: 'subcat_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};

export const AuditNestedCategoryecolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'SubCat nested_cat_slno', key: 'nested_cat_slno' },
        { label: 'Nested Category Name', key: 'nested_cat_name' },
        { label: 'Sub Category Name', key: 'subcat_name' },
        { label: 'Status', key: 'nested_catstatus' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: ' nested cat slno', key: 'nested_cat_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


export const DocGroupAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Group Slno', key: 'group_slno' },
        { label: 'Group Name', key: 'group_name' },
        { label: 'Status', key: 'groupstatus' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Group slno', key: 'group_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//INSTITUTION TYPE

export const InstituteTypeAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Institute Slno', key: 'institute_type_slno' },
        { label: 'Institute Name', key: 'institute_type_name' },
        { label: 'Status', key: 'institute_type_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],

    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Institute Slno', key: 'institute_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};

//Institute master audit report

export const InstituteMastAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Institute Slno', key: 'institution_slno' },
        { label: 'Institute Name', key: 'institution_name' },
        { label: 'Institutetype Name', key: 'institute_type_name' },
        { label: 'Status', key: 'institute_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Institute Slno', key: 'institution_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//course type audit report
export const CourseTypeAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'course Slno', key: 'course_type_slno' },
        { label: 'Course Name', key: 'course_type_name' },
        { label: 'Status', key: 'course_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Course Slno', key: 'course_type_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//course name master
export const CourseNameAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'course Slno', key: 'course_slno' },
        { label: 'Course Name', key: 'course_name' },
        { label: 'Course Type', key: 'course_type_name' },
        { label: 'Status', key: 'course_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Course Slno', key: 'course_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//location name master
export const LocationAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Location Slno', key: 'loc_slno' },
        { label: 'Location Name', key: 'loc_name' },
        { label: 'Status', key: 'locationstatus' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Location Slno', key: 'loc_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//Rack name master
export const RackAuditReportcolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Rack Slno', key: 'rac_slno' },
        { label: 'Rack Name', key: 'rac_desc' },
        { label: 'Rack Alice', key: 'rac_alice' },
        { label: 'Location', key: 'loc_name' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Rack Slno', key: 'rac_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//Rack name master
export const CustDeptAuditReportcolumnsByTab = {
    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Cust Department Slno', key: 'cust_dept_slno' },
        { label: 'Cust Department Name', key: 'cust_dept_name' },
        { label: 'Status', key: 'custdept_status' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Cust Department Slno', key: 'cust_dept_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};


//cust master audit report

export const CustMasterAuditReportcolumnsByTab = {

    Created: [
        { label: '#', key: 'log_slno' },
        { label: 'Cust Slno', key: 'cust_slno' },
        { label: 'Custodian Name', key: 'cust_name' },
        { label: 'Custodian Department Name', key: 'cust_dept_name' },
        { label: 'Status', key: 'custstatus' },
        { label: 'Create Date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'Cust Slno', key: 'cust_slno' },
        { label: 'Previous Event', key: 'prev_event' },
        { label: 'New Event', key: 'new_event' },
        { label: 'Updated Date', key: 'edit_date' },
        { label: 'User', key: 'username' },
        { label: 'IP Address', key: 'edit_ip' },
        { label: 'Browser Name', key: 'edit_browser_name' },
        { label: 'Browser Version', key: 'edit_browser_version' },
        { label: 'OS Name', key: 'edit_os_name' },
        { label: 'OS Version', key: 'edit_os_version' },
    ],
};



export const TableHeaderVirtues = ({ columns }) => {
    // Optional: log columns once for debugging
    console.log(columns, "columns in header");

    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.field} style={{ textAlign: 'left', padding: '8px' }}>
                        {col.headerName}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export const TableContentVirtues = ({ log, columns }) => (
    <>
        {columns.map((col) => (
            <td key={col.field} style={{ padding: '8px' }}>
                {col.field === 'create_date'
                    ? new Date(log[col.field]).toLocaleString()
                    : log[col.field]}
            </td>
        ))}
    </>
);
