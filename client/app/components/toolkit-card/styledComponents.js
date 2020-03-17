import styled from 'styled-components';
import {
    colors,
    breakpoints,
    shadows
} from '../../lib/variables/styledComponentsVariables.js';

// FW components
import { ActionMenu } from '@ms-fw/fw-react/components';

// MSD components
import MasterCard from '../master-card';

/**
 * Styled components
 */
const Container = styled(MasterCard)`
    margin-bottom: 24px;
    text-align: left;

    > div {
        display: grid;
        padding: 14px 0 0;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: auto minmax(min-content, 1fr) auto;
        grid-gap: 0 24px;
        min-height: 456px;

        h3.c-heading-5 {
            grid-column: 1 / 7;
            margin: 0 12px;
        }

        p[class*='c-paragraph'] {
            grid-column: 1 / 7;
            grid-row: 2 / 3;
            padding: 4px 12px 0 12px;
        }

        picture {
            display: none;
            grid-column: 1 / 7;
            grid-row: 3 /4;
            align-self: end;

            img {
                width: 100%;
            }
        }

        p + div {
            width: 100%;
            height: 300px;
            grid-column: 1 / 7;
            grid-row: 3 / 4;
            border-radius: 0 0 4px 4px;
            background: url(${props => props.image.vp1 || props.image.vp4}) no-repeat top
                center;
            background-size: cover;
        }

        > span,
        .c-action-menu {
            grid-column: 1 / 7;
            grid-row: 3 / 4;
            align-self: end;
            margin: 24px 24px 12px 12px;
        }
    }

    @media (min-width: ${breakpoints.vp2}) {
        > div {
            height: 505px;

            h3.c-heading-5 {
                margin: 0 24px;
                grid-column: 1 / 3;
            }

            p[class*='c-paragraph'] {
                padding: 4px 24px 0 0;
                grid-column: 3 / 7;
                grid-row: 1 / 2;
            }

            p + div {
                background-image: url(${props => props.image.vp2 || props.image.vp4});
            }

            > span,
            .c-action-menu {
                margin: 24px;
            }
        }
    }

    @media (min-width: ${breakpoints.vp3}) {
        > div {
            h3.c-heading-5 {
                grid-column: 1 / 7;
                margin-left: 24px;
                margin-right: 6px;
            }

            p[class*='c-paragraph'] {
                padding: 12px 24px 0 24px;
                grid-column: 1 / 7;
                grid-row: 2 / 3;
            }

            p + div {
                background-image: url(${props => props.image.vp3 || props.image.vp4});
            }
        }
    }

    @media (min-width: ${breakpoints.vp4}) {
        > div {
            height: 558px;
            grid-template-rows: 1fr auto auto;

            h3.c-heading-5 {
                grid-column: 1 / 3;
                margin-top: 0;
            }

            p[class*='c-paragraph'] {
                grid-column: 3 / 7;
                grid-row: 1 / 2;
            }

            picture {
                grid-column: ${props => (props.isFullBleedImage ? '1 / 7' : '3 / 7')};
                grid-row: 2 / 4;

                img {
                    width: 100%;
                }
            }

            p + div {
                height: 360px;
                grid-column: ${props => (props.isFullBleedImage ? '1 / 7' : '3 / 7')};
                grid-row: 2 / 4;
                background-image: url(${props => props.image.vp4});
                background-position: ${props =>
                    props.isFullBleedImage ? 'center' : 'top left'};
            }
        }
    }
`;

const ToolkitActionMenu = styled(ActionMenu)`
    &.c-action-menu {
        > button.c-action-trigger {
            max-width: 374px;
            height: 36px;
            padding: 0 30px 1px 18px;
            border-radius: 2px;
            transition: all 0.2s ease-in-out;
            color: ${props => props.colors.foreground || colors.black};
            background-color: ${props => props.colors.background.rest} !important;

            &[aria-expanded='true'] {
                span:before {
                    background-color: ${colors.transparent};
                }
            }

            &:hover,
            &:focus {
                text-decoration: none;
                background: ${props => props.colors.background.hover} !important;
                outline: none;

                span:before {
                    background-color: ${colors.transparent};
                }
            }

            &:after {
                right: 12px;
                color: ${props => props.colors.foreground || colors.black};
            }
        }

        .c-context-menu {
            width: 240px;
            text-align: left;
            box-shadow: ${props =>
                props.theme === 'dark' ? shadows.dark.hover : shadows.light.hover};
            transform: translateY(0);
            border: none;

            li {
                color: ${colors.gray.mid};

                span {
                    padding: 11px 18px 13px;
                }
            }
        }
    }
`;

export { Container, ToolkitActionMenu };
