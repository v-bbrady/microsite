import { createStore, combineReducers } from 'redux';
import { categoryNavigationReducer } from '../reducers/categoryNavigation';
import { themeReducer } from '../reducers/theme';
import { transparentHeaderReducer } from '../reducers/transparentHeader';
import { uhfThemeReducer } from '../reducers/uhfTheme';
import getInitialState from '../state/getInitialState';

const reducers = combineReducers({
    categoryNav: categoryNavigationReducer,
    theme: themeReducer,
    transparentUHF: transparentHeaderReducer,
    uhfTheme: uhfThemeReducer
});

/**
 * Create app store
 */
const store = createStore(reducers, getInitialState());

export default store;
