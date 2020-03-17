import styled from 'styled-components';
import { breakpoints, shadows } from '../../lib/variables/styledComponentsVariables.js';
import { Heading } from '@ms-fw/fw-react/components';

// MSD components
import MasterCard from '../master-card';

/**
 * Styled components
 */
const Container = styled(MasterCard)`
    margin-bottom: 24px;
    text-align: left;

    /* Shared styles across all sizes */
    > div {
        display: grid;
        grid-gap: 0 24px;
        height: 504px;
        padding: ${props => (props.isFeatured ? '8px 12px 0' : '12px 12px 0')};

        @media (min-width: ${breakpoints.vp2}) {
            padding: ${props => (props.isFeatured ? '20px 24px 0' : '24px 24px 0')};
        }

        @media (min-width: ${breakpoints.vp3}) {
            height: ${props => (props.isFeatured ? '456px' : '504px')};
        }

        > a {
            overflow: hidden;
        }

        p.c-paragraph-3 {
            margin-top: 20px;
        }

        /* Image container */
        p + div {
            border-radius: 4px;
            box-shadow: ${shadows.light.rest};
            background-image: url(${props => props.image.vp1 || props.image.vp4});
            background-repeat: no-repeat;
            background-position: center 33%;
            background-size: cover;

            @media (min-width: ${breakpoints.vp2}) {
                background-image: url(${props => props.image.vp2 || props.image.vp4});
            }

            @media (min-width: ${breakpoints.vp3}) {
                background-image: url(${props => props.image.vp3 || props.image.vp4});
            }

            @media (min-width: ${breakpoints.vp4}) {
                background-image: url(${props => props.image.vp4});
            }

            @media (min-width: ${breakpoints.vp5}) {
                background-image: url(${props => props.image.vp5 || props.image.vp4});
            }

            @media (min-width: ${breakpoints.vp6}) {
                background-image: url(${props => props.image.vp6 || props.image.vp4});
            }
        }

        /* Meta text container */
        div:last-child {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;

            @media (min-width: ${breakpoints.vp2}) {
                padding: 14px 0;
            }

            .c-caption-1 {
                padding: 0;
                text-transform: uppercase;
                letter-spacing: 0.4em;
            }

            > span {
                width: 16px;
                height: 16px;
                background: url(${props => props.icon}) no-repeat center;
                background-size: contain;
            }
        }
    }

    /* Small card size */
    &.small {
        > div {
            grid-template-columns: 1fr;
            grid-template-rows: 96px 1fr 240px auto;

            > a {
                grid-column: 1 / span 1;
            }

            p.c-paragraph-3 {
                grid-column: 1 / span 1;
                grid-row: 2 / span 1;
                max-height: 72px;
            }

            /* Image container */
            p + div {
                grid-column: 1 / span 1;
                grid-row: 3 / span 1;
            }

            /* Meta text container */
            div:last-child {
                grid-column: 1 / span 1;
                grid-row: 4 / span 1;
            }

            p.c-paragraph-3 {
                margin-top: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                height: 96px;
            }
        }
    }

    /* Medium card size */
    &.medium {
        > div {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 1fr 240px auto;

            > a {
                grid-column: 1 / span 3;
            }

            p.c-paragraph-3 {
                grid-column: 4 / span 3;
                grid-row: 1 / span 1;
                margin-top: 6px;
            }

            /* Image container */
            p + div {
                grid-column: 1 / span 6;
                grid-row: 2 / span 1;
            }

            /* Meta text container */
            div:last-child {
                grid-column: 1 / span 6;
                grid-row: 3 / span 1;
            }
        }
    }

    /* Large card size */
    &.large {
        > div {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto 1fr auto;

            > a {
                grid-column: 1 / span 3;
            }

            p.c-paragraph-3 {
                grid-column: 1 / span 3;
                grid-row: 2 / span 1;
            }

            /* Image container */
            p + div {
                grid-column: 4 / span 9;
                grid-row: 1 / span 2;
                background-position: center;
            }

            /* Meta text container */
            div:last-child {
                grid-column: 1 / span 12;
                grid-row: 3 / span 1;
            }
        }
    }
`;

const HeaderText = styled(Heading)`
    letter-spacing: -0.02em;
    white-space: pre-line;
    color: ${props => (props.color ? props.color : colors.black)} !important;

    :hover {
        text-decoration: underline;
        text-decoration-color: ${props =>
            props.color ? props.color : colors.black} !important;

        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${props => props.color2};
        }
    }
`;

const HeaderText2 = styled.span`
    color: ${props =>
        props.color2 ? props.color2 : props.color ? props.color : colors.black} !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const LinkSection = styled.a`
    :hover,
    :focus {
        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${props => props.color2};
        }
    }
`;

export { Container, HeaderText, HeaderText2, LinkSection };
