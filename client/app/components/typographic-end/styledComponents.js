import styled from 'styled-components';
import {
    breakpoints,
    colors,
    shadows
} from '../../lib/variables/styledComponentsVariables.js';

/**
 * Styled components
 */
const getShadowValue = (state, theme) => {
    if (theme !== 'dark') theme = 'light';

    return shadows[theme][state];
};

const Container = styled.section`
    padding: 48px 0;

    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : colors.white};

    .l-grid .l-column {
        .c-heading-4 {
            color: ${props => (props.headingColor ? props.headingColor : colors.gray.mid)};
        }

        p {
            color: ${props => (props.bodyColor ? props.bodyColor : colors.gray.mid)};
            margin: 12px 0 84px;

            @media (min-width: ${breakpoints.vp5}) {
                margin: 0 0 200px;
            }

            a {
                color: ${props => props.linkColor || colors.black};

                &:hover,
                &:focus {
                    text-decoration: underline;
                }
            }
        }

        ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0 0 0;

            @media (min-width: ${breakpoints.vp5}) {
                justify-content: flex-end;
            }

            li {
                flex: 0 0 auto;
                margin: 4px 24px 0 0;
                font-size: 11px;
                line-height: 16px;
                color: ${colors.gray.mid};

                @media (min-width: ${breakpoints.vp5}) {
                    margin: 4px 0 0 24px;
                }
            }
        }
    }
`;

const SocialImageButton = styled.img`
    margin-right: 10px;
    margin-bottom: 80px;

    transform: translate3D(0);
    backface-visibility: hidden;
    background: white;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
        filter: alpha(opacity=50);
    }

    width: 30px;
`;

export { Container, SocialImageButton };
