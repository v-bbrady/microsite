import styled from 'styled-components';

// Utils
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

// FW components
import { Column, Grid } from '@ms-fw/fw-react/layouts';

import { Heading, Paragraph, List, Metatext } from '@ms-fw/fw-react/components';

/**
 * Styled components
 */

const TOP_BAR_PADDING = '48px';
const TOP_BAR_HEIGHT = '8px';
const NO_SIZE = '0px';
const TRUE = 'true';

const SectionGrid = styled(Grid)`
    padding-top: ${props => (props.topbar == TRUE ? TOP_BAR_PADDING : NO_SIZE)};
`;

const SectionColumn = styled(Column)`
    padding: 0;
    position: relative;

    :before {
        content: '';
        position: absolute;
        height: ${props => (props.topbar == TRUE ? TOP_BAR_HEIGHT : NO_SIZE)};
        top: -${TOP_BAR_PADDING};
        left: 0;
        right: 0;
        background-color: ${props => (props.topbarcolor ? props.topbarcolor : colors.none)};
    }
`;

const LinkSection = styled.a`
    :hover,
    :focus {
        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${props => props.color2} !important;
        }
    }
`;

const HeaderText = styled(Heading)`
    letter-spacing: -0.02em;
    white-space: pre-line;
    color: ${props => (props.color ? props.color : colors.black)} !important;
    padding: ${props => (props.inset ? '0 0 0 24px' : NO_SIZE)};
    padding-right: ${props => (props.tight ? '27%' : NO_SIZE)};
`;

const HeaderText2 = styled.span`
    color: ${props => props.color2};
`;

const SubHeaderText = styled.span`
    color: black !important;
    font-weight: normal;
    letter-spacing: 0.02em;
    font-size: 21px;
    line-height: 0px !important;
`;

const DetailText = styled(Paragraph)`
    letter-spacing: 0.02em;
    margin: -1px 0 1px;
    color: ${props => (props.color ? props.color : colors.black)};
    font-weight: ${props => (props.bold ? '600' : 'normal')};

    > a {
        @media (max-width: ${breakpoints.vp4}) {
            padding-top: 16px;
            display: inline-block;
        }
        @media (max-width: ${breakpoints.vp3}) {
            padding-top: 24px;
        }

        color: ${props => (props.linkcolor ? props.linkcolor : 'inherit')};

        &:hover,
        &:focus {
            text-decoration: underline;
            text-decoration-color: ${props => (props.linkcolor ? props.linkcolor : 'inherit')};
        }
    }
`;

const ProfileText = styled(Metatext)`
    letter-spacing: -0.02em;
    margin: 6px 0 0 0;
    padding: 0;
    color: ${props => (props.color ? props.color : colors.black)};
    font-style: italic;
    display: block;
`;

const Filter = styled(List)`
    margin: 0;
    padding: 0;

    // @media (min-width: ${breakpoints.vp0}) {
    //     margin-top: -12px;
    // }
    // @media (min-width: ${breakpoints.vp2}) {
    //     margin-top: -4px;
    // }
    // @media (min-width: ${breakpoints.vp3}) {
    //     margin-top: -1px;
    // }

    button {
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
        text-align: left;
        white-space: nowrap;
        color: ${props => (props.color ? props.color : colors.gray.mid)};

        &:hover,
        &:focus {
            text-decoration: underline;
        }

        &.selected {
            font-weight: 600;
            color: ${props => (props.colorselected ? props.colorselected : colors.black)};
            cursor: default;
            &:hover,
            &:focus {
                text-decoration: none;
            }
        }
    }
`;

export {
    DetailText,
    HeaderText,
    HeaderText2,
    SubHeaderText, //subheader text is used only on the news & insights page
    ProfileText,
    LinkSection,
    SectionColumn,
    SectionGrid,
    Filter
};
