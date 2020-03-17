import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

import { Card, Hyperlink } from '@ms-fw/fw-react/components';

/**
 * Styled components
 */

const StyledCard = styled(Card)`
    &.c-card[class*='msd-card'] {
        min-width: 100% !important;
        max-width: 100% !important;
        width: 100%;
        height: 484px !important;
        margin: 0 0 60px 0;
        padding: 0;
        background-color: ${props => props.backgroundcolor || colors.white};
        cursor: pointer;

        &:hover {
            transform: translate3d(0, 0, 0);
        }

        &.msd-card-featured {
            transition: none;
            box-shadow: 0 0 0 ${colors.transparent};
            &::before {
                transition: all 803ms cubic-bezier(0.16, 1, 0.29, 0.99);
            }
            &:hover {
                box-shadow: 0 0 0 ${colors.transparent};
                transition: none;
                &::before {
                    transition-delay: 90ms;
                    transition: all 1300ms cubic-bezier(0.16, 1, 0.29, 0.99);
                    box-shadow: 0 0px 15px 0px rgba(0, 0, 0, 0.1),
                        0 15px 50px 10px rgba(0, 0, 0, 0.1);
                }
            }
        }

        &.msd-card-featured::after,
        picture.c-image {
            background-image: url(${props => props.image});
            background-color: ${colors.gray.mid};
            background-size: cover;
            background-position: 50% 50%;
        }

        picture.c-image {
            img {
                display: none;
            }
            padding: 0;
            min-height: 216px;
            max-height: 216px;
        }

        &.msd-card-featured {
            picture.c-image {
                background-image: none;
                background: none;
            }
            &::before,
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
            }

            &::before {
                left: 0;
                width: calc(300% + 48px);
            }
            &::after {
                left: 100%;
                width: calc(200% + 48px);
            }

            &.msd-card-featured-half {
                &::before {
                    width: calc(200% + 12px);
                }
                &::after {
                    width: calc(100% + 12px);
                }
            }
        }

        .msd-content {
            padding-right: 26px;
            margin: 12px 20px 8px 20px;

            > a:not(.c-hyperlink) {
                &:hover,
                &:focus {
                    text-decoration: underline;
                }
            }
        }

        .c-heading,
        .c-subheading,
        .c-meta-text {
            font-style: normal;
            letter-spacing: normal;
            opacity: 1;
        }

        .c-subheading,
        .c-meta-text {
            font-size: 16px;
            line-height: 24px;
            color: ${props => props.subtitlecolor || colors.gray.mid};
            font-style: normal;
            font-weight: normal;
        }

        .c-logo,
        .c-meta-text {
            position: absolute;
        }

        .c-heading {
            color: ${props => props.titlecolor || colors.fontOnLight};
            font-size: 20px;
            line-height: 29px;
            font-weight: 500;
            padding-bottom: 16px;
        }

        .c-subheading {
            max-height: 72px;
            overflow: hidden;
        }

        .c-logo {
            width: 20px;
            height: 20px;
            bottom: 20px;
            right: 20px;
            opacity: 0.2;
        }

        .c-meta-text {
            bottom: 14px;
        }
    }

    @media (max-width: ${breakpoints.vp1Max}) {
        &.c-card[class*='msd-card'] {
            margin: 0 0 8px 0;
        }
    }
`;

const StyledHyperlink = styled(Hyperlink)`
    .msd-card.c-card a&.c-hyperlink {
        position: absolute;
        bottom: 14px;
        font-size: 16px;
        line-height: 24px;
        color: ${props => props.color || colors.midGray};

        &:hover:before,
        &:focus:before {
            background-color: ${props => props.color || colors.midGray};
        }
    }
`;

export { StyledCard, StyledHyperlink };
