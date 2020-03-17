import {
    SET_THEME_DEFAULT,
    SET_THEME_BLUE,
    SET_THEME_PURPLE,
    SET_THEME_ORANGE,
    SET_THEME_YELLOW,
    SET_THEME_GREEN,
    SET_THEME_TEAL
} from '../actions/theme';

/**
 * The theme reducer
 * @param {string} state - The original status.
 * @param {object} action - The action object.
 * @return
 */
const themeReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_THEME_DEFAULT:
        case SET_THEME_BLUE:
        case SET_THEME_PURPLE:
        case SET_THEME_ORANGE:
        case SET_THEME_YELLOW:
        case SET_THEME_GREEN:
        case SET_THEME_TEAL:
            return action.theme;
    }

    return state;
};

export { themeReducer };
