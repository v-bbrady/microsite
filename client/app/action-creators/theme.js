import {
    SET_THEME_DEFAULT,
    SET_THEME_BLUE,
    SET_THEME_PURPLE,
    SET_THEME_ORANGE,
    SET_THEME_YELLOW,
    SET_THEME_GREEN,
    SET_THEME_TEAL,
    SET_THEME_WHITE
} from '../actions/theme';

/**
 * Set theme to default
 */
export const setThemeDefault = () => {
    return {
        type: SET_THEME_DEFAULT,
        theme: 'default'
    };
};

/**
 * Set theme to blue
 */
export const setThemeBlue = () => {
    return {
        type: SET_THEME_BLUE,
        theme: 'blue'
    };
};

/**
 * Set theme to purple
 */
export const setThemePurple = () => {
    return {
        type: SET_THEME_PURPLE,
        theme: 'purple'
    };
};

/**
 * Set theme to orange
 */
export const setThemeOrange = () => {
    return {
        type: SET_THEME_ORANGE,
        theme: 'orange'
    };
};

/**
 * Set theme to yellow
 */
export const setThemeYellow = () => {
    return {
        type: SET_THEME_YELLOW,
        theme: 'yellow'
    };
};

/**
 * Set theme to green
 */
export const setThemeGreen = () => {
    return {
        type: SET_THEME_GREEN,
        theme: 'green'
    };
};

/**
 * Set theme to teal
 */
export const setThemeTeal = () => {
    return {
        type: SET_THEME_TEAL,
        theme: 'teal'
    };
};
