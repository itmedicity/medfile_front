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