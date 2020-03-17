import styled from 'styled-components';

/**
 * Breakpoints
 */
const vp0Value = 0;
const vp1Value = 320;
const vp2Value = 540;
const vp3Value = 768;
const vp4Value = 1084;
const vp5Value = 1400;
const vp6Value = 1779;
const vpMax = 2048;

const breakpoints = {
    vp0: `${vp0Value}px`,
    vp1: `${vp1Value}px`,
    vp2: `${vp2Value}px`,
    vp3: `${vp3Value}px`,
    vp4: `${vp4Value}px`,
    vp5: `${vp5Value}px`,
    vp6: `${vp6Value}px`,
    vpMin: `${vp1Value}px`,
    vpMax: `${vpMax}px`,
    vp0Max: `${vp1Value - 1}px`,
    vp1Max: `${vp2Value - 1}px`,
    vp2Max: `${vp3Value - 1}px`,
    vp3Max: `${vp4Value - 1}px`,
    vp4Max: `${vp5Value - 1}px`,
    vp5Max: `${vp6Value - 1}px`,
    vp6Max: `${vpMax}px`
};

/**
 * Colors
 */
const colors = {
    blue: {
        electric: '#50e6ff',
        base: '#0078d4',
        dark: '#243a5e',
        darkExtra: '#2e4a78',
        header: '#0078D4',
        activeMenuOffWhite: '#0074CC'
    },
    purple: {
        electric: '#d59dff',
        base: '#8661c5',
        dark: '#3b2e58'
    },
    orange: {
        electric: '#ff9349',
        base: '#d83b01',
        dark: '#6b2929'
    },
    yellow: {
        electric: '#fef000',
        base: '#ffb900',
        dark: '#6a4b16'
    },
    green: {
        electric: '#69e66e',
        base: '#128912',
        dark: '#1f4525'
    },
    teal: {
        electric: '#30e5d0',
        base: '#008575',
        dark: '#274b47'
    },
    gray: {
        light: '#f2f2f2',
        base: '#d2d2d2',
        mid: '#505050',
        dark: '#1f1f1f'
    },

    white: '#ffffff',
    black: '#171717',
    offwhite: '#fafafa',

    // Alternatives for formatting
    transparent: 'transparent',
    clear: 'transparent',
    none: 'transparent',

    // Deprecated
    richBlack: '#212024',
    secondaryDark: '#1A1A1A',
    darkGray: '#3c3c41',
    midGray: '#75757a',
    lightGray: '#ebebeb',
    fontOnLight: '#333333',
    fontOnDark: '#f2f2f2',
    windowsBlue: '#0078d4',
    electricBlue: '#50e6ff',
    darkBlue: '#243b5e',
    superDarkBlue: '#181d24',
    foregroundOnLight: '#5f6b81',
    foregroundOnDark: '#9fadc2'
};

/**
 * Box shadows
 */
const shadows = {
    light: {
        rest: '0  2px 4px rgba(0, 0, 0, .06), 0 .5px 1px rgba(0, 0, 0, .05)',
        hover: '0 19px 43px rgba(0, 0, 0, .22), 0 4px 11px rgba(0, 0, 0, .18)'
    },
    dark: {
        rest: '0  2px 4px rgba(0, 0, 0, .18), 0 .5px 1px rgba(0, 0, 0, .15)',
        hover: '0 19px 43px rgba(0, 0, 0, .66), 0 4px 11px rgba(0, 0, 0, .54)'
    }
};

export { breakpoints, colors, shadows };
