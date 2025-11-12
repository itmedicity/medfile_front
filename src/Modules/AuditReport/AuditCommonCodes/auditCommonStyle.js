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
        { label: 'last_login_date', key: 'last_login_date' },
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
        { label: 'doc_type_slno', key: 'doc_type_slno' },
        { label: 'doc_type_master_name', key: 'doc_type_master_name' },
        { label: 'main_type_name', key: 'main_type_name' },
        { label: 'Status', key: 'status' },
        { label: 'create_date', key: 'create_date' },
        { label: 'Created User', key: 'username' },
        { label: 'Ip Address', key: 'create_ip' },
        { label: 'Browser ', key: 'create_browser_name' },
        { label: 'Browser Version', key: 'create_browser_version' },
        { label: 'OS Name', key: 'create_os_name' },
        { label: 'OS Version', key: 'create_os_version' },
    ],
    Updated: [
        { label: '#', key: 'log_slno' },
        { label: 'doc_type_slno', key: 'doc_type_slno' },
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

