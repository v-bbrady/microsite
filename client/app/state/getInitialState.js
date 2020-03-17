/**
 * @name getInitialState
 * @description Returns the initial state of the app
   @return {object} - The initial state object
 */
const getInitialState = () => {
    return {
        categoryNav: false,
        theme: 'default',
        transparentUHF: true,
        uhfTheme: 'light'
    };
};

export default getInitialState;
