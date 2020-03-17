import {
    SET_CATEGORY_NAVIGATION,
    REMOVE_CATEGORY_NAVIGATION
} from '../actions/categoryNavigation';

/**
 * The UHF category navigation reducer
 * @param {string} state - The original status.
 * @param {object} action - The action object.
 * @return
 */
const categoryNavigationReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CATEGORY_NAVIGATION:
        case REMOVE_CATEGORY_NAVIGATION:
            return action.categoryNav;
    }

    return state;
};

export { categoryNavigationReducer };
