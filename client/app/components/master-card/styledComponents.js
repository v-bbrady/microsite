import styled from 'styled-components';
import {
    colors,
    breakpoints,
    shadows
} from '../../lib/variables/styledComponentsVariables.js';

// Helpers

/**
 * Get the correct shadow based on theme
 * @param {string} state    Component state
 * @param {string} theme    Dark or light theme
 * @return {string}
 */
const getShadowValue = (state, theme) => {
    if (theme !== 'dark') theme = 'light';

    return shadows[theme][state];
};

/**
 * Styled components
 */
const Container = styled.section`
    color: ${props => props.bodyColor || colors.gray.mid};
    background-color: ${props => props.backgroundColor || colors.white};
    cursor: ${props => (props.isActionable ? 'pointer' : 'default')};
    transition: ${props => (props.isActionable ? `all .333s ease-out` : '')};
    position: relative;
    border-radius: 4px;
    transform: translate3D(0);
    backface-visibility: hidden;
    box-shadow: ${props =>
        props.isShadowDisabled ? 'none' : getShadowValue('rest', props.theme)};

    &:hover {
        transform: ${props =>
            props.isActionable && !props.isShadowDisabled ? 'translate3D(0, -1px, 0)' : ''};
        box-shadow: ${props =>
            props.isActionable && !props.isShadowDisabled
                ? getShadowValue('hover', props.theme)
                : ''};
    }

    > p[class^='c-caption'] {
        grid-column: 1/7;
        padding: 20px 12px;
        letter-spacing: 0.4em;
        color: ${props => props.captionColor || colors.gray.mid};
        border-bottom: 1px solid rgba(115, 115, 115, 0.1); /* Border color is gray.mid at 50% opacity */
        @media (min-width: ${breakpoints.vp2}) {
            padding: 20px 24px 15px;
        }
    }

    .captionSection {
        > p[class^='c-caption'] {
            grid-column: 1/7;
            padding: 0px 12px;
            margin-top: -20px;
            letter-spacing: 0.4em;
            color: ${props => props.captionColor || colors.gray.mid};

            @media (min-width: ${breakpoints.vp2}) {
                padding: 20px 24px 15px;
            }
        }
    }

    > div {
        width: 100%;

        [class^='c-heading'] {
            color: ${props => props.headingColor || colors.gray.mid};
        }

        a:not(.c-hyperlink) {
            &:hover,
            &:focus {
                text-decoration: underline;
                text-decoration-color: ${props => props.headingColor || colors.gray.mid};
            }
        }

        picture > img {
            border-radius: 4px;
            box-shadow: ${props => getShadowValue('rest', props.theme)};

            @media (max-width: ${breakpoints.vp3}) {
                margin-top: 20px;
            }
        }
    }
`;

const CaptionSection = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(115, 115, 115, 0.1); /* Border color is gray.mid at 50% opacity */
`;

export { CaptionSection, Container };
