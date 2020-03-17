import { SET_HEADER_DEFAULT, SET_HEADER_TRANSPARENT } from '../actions/transparentHeader';

/**
 * The transprent header reducer
 * @param {string} state - The original status.
 * @param {object} action - The action object.
 * @return
 */
const transparentHeaderReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_HEADER_DEFAULT:
        case SET_HEADER_TRANSPARENT:
            return action.transparentUHF;
    }

    return state;
};

export { transparentHeaderReducer };
