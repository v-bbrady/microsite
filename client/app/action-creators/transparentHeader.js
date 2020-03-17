import { SET_HEADER_TRANSPARENT, SET_HEADER_DEFAULT } from '../actions/transparentHeader';

/**
 * Set page theme to default
 */
export const setHeaderDefault = () => {
    return {
        type: SET_HEADER_DEFAULT,
        transparentUHF: false
    };
};

/**
 * Set page theme to alt
 */
export const setHeaderTransparent = () => {
    return {
        type: SET_HEADER_TRANSPARENT,
        transparentUHF: true
    };
};
