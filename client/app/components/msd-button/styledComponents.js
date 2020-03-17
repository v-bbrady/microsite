import styled from 'styled-components';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// FW components
import { Button } from '@ms-fw/fw-react/components';
import { generateBackgroundColorClasses } from '@ms-fw/fw-react/utilities/theming';

// Helpers
const getForegroundColor = props => {
    const foregroundColors =
        props['data-colors'] && props['data-colors'].foreground
            ? props['data-colors'].foreground
            : {};
    const defaultColor = colors.gray.dark;

    return {
        rest: foregroundColors.rest || defaultColor,
        hover: foregroundColors.hover || defaultColor,
        focus: foregroundColors.focus || defaultColor,
        active: foregroundColors.active || defaultColor
    };
};

const getBackgroundColor = props => {
    const backgroundColors =
        props['data-colors'] && props['data-colors'].background
            ? props['data-colors'].background
            : {};

    return {
        rest: backgroundColors.rest || '',
        hover: backgroundColors.hover || '',
        focus: backgroundColors.focus || '',
        active: backgroundColors.active || ''
    };
};

/**
 * Styled components
 */
const StyledButton = styled(Button)`
    &.c-button[role='button'],
    &.c-button[type='submit'] {
        min-width: auto;
        min-height: 36px;
        padding: 8px 18px 9px;
        color: ${props => getForegroundColor(props).rest};
        background-color: ${props => getBackgroundColor(props).rest};

        &:hover {
            color: ${props => getForegroundColor(props).hover};
            background-color: ${props => getBackgroundColor(props).hover};
        }

        &:focus {
            color: ${props => getForegroundColor(props).focus};
            background-color: ${props => getBackgroundColor(props).focus};
        }

        &:active {
            color: ${props => getForegroundColor(props).active};
            background-color: ${props => getBackgroundColor(props).active};
        }
    }
`;

export { StyledButton };
