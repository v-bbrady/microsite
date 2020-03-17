import {
    SET_CATEGORY_NAVIGATION,
    REMOVE_CATEGORY_NAVIGATION
} from '../actions/categoryNavigation';

/**
 * Set category navigation
 */
export const setCategoryNavigation = () => {
    return {
        type: SET_CATEGORY_NAVIGATION,
        categoryNav: true
    };
};

/**
 * Remove category navigation
 */
export const removeCategoryNavigation = () => {
    return {
        type: REMOVE_CATEGORY_NAVIGATION,
        categoryNav: false
    };
};
