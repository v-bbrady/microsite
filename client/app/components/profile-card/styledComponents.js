import styled from 'styled-components';
import { colors, breakpoints } from '../../lib/variables/styledComponentsVariables.js';
import { Heading } from '@ms-fw/fw-react/components';

// MSD components
import MasterCard from '../master-card';

/**
 * Styled components
 */
const Container = styled(MasterCard)`
    margin-top: 50px;
    margin-bottom: 50px;
    overflow: hidden;

    > div {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: auto auto auto minmax(min-content, 1fr) auto;
        grid-gap: 0 24px;
        height: 450px;

        > a {
            grid-column: 1 / 7;
            margin: 0 12px;

            @media (min-width: ${breakpoints.vp2}) {
                margin: 0 24px;
            }
        }

        p.c-paragraph-3 {
            margin: 8px 12px 0;
            font-style: italic;

            @media (min-width: ${breakpoints.vp2}) {
                margin: 8px 24px 0;
            }
        }

        p.c-paragraph-4 {
            margin: 8px 12px 0;
            grid-column: 1/7;
            @media (min-width: ${breakpoints.vp2}) {
                margin: 8px 24px 0;
            }
        }

        /* Image container */
        .imgContainer {
            margin-left: 24px;
            margin-right: 24px;

            height: 286px;
            grid-column: 1 / 7;
            grid-row: 4 / 5;
            margin-top: 20px;
            border-radius: 6px;
            background: url(${props => props.image}) no-repeat top center;
            background-size: cover;
            background-color: ${colors.white};

            @media (max-width: ${breakpoints.vp2}) {
                margin-left: 12px;
                margin-right: 12px;
            }
        }
    }
`;

const JobSection = styled.div`
    grid-column: 1/7;
    height: 50px;
`;

const NameSection = styled.div`
    grid-column: 1/7;
    padding: 24px 24px 30px 24px;
    margin-top: -30px;
    margin-bottom: 30px;
    height: 50px;

    @media (max-width: ${breakpoints.vp2}) {
        padding-left: 12px;
        padding-right: 12px;
    }
`;

const PersonContactInfoSection = styled.div`
    max-width: 250px;
    margin: -75px 0px 0px 24px;
    font-family: 'Segoe UI', 'SegoeUI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 11px;
    position: relative;
    letter-spacing: 0.4em;

    a {
        color: ${colors.gray.mid};
        :hover,
        :focus {
            text-decoration: underline;
            text-decotaion-color: ${colors.gray.mid};
        }
    }

    @media (max-width: ${breakpoints.vp2}) {
        margin-left: 12px;
    }
`;

const HeaderText = styled(Heading)`
    letter-spacing: -0.02em;
    white-space: pre-line;
    color: ${props => (props.color ? props.color : colors.black)} !important;

    :hover,
    :focus {
        text-decoration: underline;
        text-decoration-color: ${colors.blue.base} !important;
    }
`;

const LinkSection = styled.a`
    :hover,
    :focus {
        text-decoration: underline;
        text-decoration-color: ${colors.blue.base} !important;
    }
`;

export {
    Container,
    HeaderText,
    JobSection,
    LinkSection,
    NameSection,
    PersonContactInfoSection
};
