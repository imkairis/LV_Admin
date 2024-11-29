export const configTheme = (isDarkMode = false) => {
    return {
        token: {
            // Colors
            // colorPrimary: sw(isDarkMode, '#1677ff', '#FFFFFF'),
            colorTextBase: sw(isDarkMode, '#000', '#ffffff'),

            // bg Colors
            colorBgBase: sw(isDarkMode, '#F5F7FA', '#0b1437'),
            controlItemBgActive: sw(isDarkMode, '#e6f4ff', '#111c44'),

        }
    };
};

const sw = (isDarkMode, lightValue, darkValue) => {
    return isDarkMode ? darkValue : lightValue;
}