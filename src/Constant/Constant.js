import DOMPurify from "dompurify";
import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';

export const screenHeight = window.innerHeight;
export const screenWidth = window.innerWidth;


export const baseColor = {
    primary: "#1A5319",
    secondary: "#508D4E",
    primarylight: "#80AF81",
    secondarylight: "#D6EFD8",
    primaryfont: "#001C30",
    secondaryfont: "#000000",
    ultralight: "#478A62",
    fontPink: "#D10363",
    fontGrey: '#483838',
    backGroundColor: "#e9fcf6",
    backGroundFont: "#119c75",
    yellowfont: '#bbc20a',
    headerBgColor: '#0E2C0D'
}

export const customFontSize = {
    xs: '1rem',
    sm: '1rem',
    md: '1rem',
    lg: '1rem',
    xl: '1.1rem'
}

export const customInputHeight = {
    "--Input-minHeight": {
        xs: "30px",
        sm: "30px",
        md: "32px",
        lg: "30px",
        xl: "33px",
    },
    "&.MuiInput-root": {
        "--Input-focusedHighlight": baseColor.primarylight,
        "--Input-focusedShadow": 'none',
        "--Input-focusedThickness": '1.1px',
    },
    boxShadow: 'none',
}

export const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const isValidMobileNumber = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
};

export const succesNofity = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
