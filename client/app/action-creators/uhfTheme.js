import {
    SET_UHF_THEME_LIGHT,
    SET_UHF_THEME_DARK,
    SET_UHF_THEME_WHITE,
    SET_UHF_THEME_LIGHTGRAY
} from '../actions/uhfTheme';

/**
 * Set uhf theme to light
 */
export const setUhfThemeLight = () => {
    return {
        type: SET_UHF_THEME_LIGHT,
        uhfTheme: 'light'
    };
};

/**
 * Set uhf theme to dark
 */
export const setUhfThemeDark = () => {
    return {
        type: SET_UHF_THEME_DARK,
        uhfTheme: 'dark'
    };
};

export const setUhfThemeWhite = () => {
    return {
        type: SET_UHF_THEME_WHITE,
        uhfTheme: 'white'
    };
};

export const setUhfThemeLightGray = () => {
    return {
        type: SET_UHF_THEME_LIGHTGRAY,
        uhfTheme: 'lightgray'
    };
};
