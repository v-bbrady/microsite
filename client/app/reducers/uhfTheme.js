import {
    SET_UHF_THEME_LIGHT,
    SET_UHF_THEME_DARK,
    SET_UHF_THEME_WHITE,
    SET_UHF_THEME_LIGHTGRAY
} from '../actions/uhfTheme';

/**
 * The uhf theme reducer
 * @param {string} state - The original status.
 * @param {object} action - The action object.
 * @return
 */
const uhfThemeReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_UHF_THEME_LIGHT:
        case SET_UHF_THEME_DARK:
        case SET_UHF_THEME_WHITE:
        case SET_UHF_THEME_LIGHTGRAY:
            return action.uhfTheme;
    }

    return state;
};

export { uhfThemeReducer };
