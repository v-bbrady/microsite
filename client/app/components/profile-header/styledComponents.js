import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables';
import { Column } from '@ms-fw/fw-react/layouts';

const Container = styled.div`
    max-width: calc(1600px + 10%);
    padding-left: 5%;
    padding-right: 5%;
    margin: 0 auto;
    padding-top: 50px;

    @media (max-width: ${breakpoints.vp4}) {
        padding-top: 50px;
        .c-image {
            padding-top: 25px;
        }
    }

    @media (max-width: ${breakpoints.vp3}) {
        padding-top: 0px;
        .c-image {
            padding-top: 0px;
        }
    }

    .c-image {
        width: 240px;
        height: 240px;
    }

    img {
        width: 240px;
        height: 240px;
    }
`;

const ContactSection = styled.div`
    padding:5px;  
    font-family:"Segoe UI", "SegoeUI", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size:11px;
    position:relative;
    letter-spacing: .4em;

    a{
        color:${colors.gray.mid},
        text-decoration:none
    }
`;

const Name = styled.div`
    font-family: 'Segoe UI', 'SegoeUI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 34px;
    color: ${colors.blue.base};
    margin-bottom: 5px;

    @media (max-width: ${breakpoints.vp4}) {
        padding-top: 50px;
        max-width: 300px;
    }
`;

const JobTitle = styled.div`
    font-size: 20px;
    font-style: italic;
    color: ${colors.black};

    @media (max-width: ${breakpoints.vp4}) {
        max-width: 300px;
    }
`;

const SectionHeader = styled.div`
    font-size: 20px;
    margin-top: 20px;
    color: ${colors.black};
`;

const PivotContainer = styled(Column)`
    grid-row: 1 / span 3;
`;

const ResearchSectionItem = styled.div`
    text-align: left;
    margin: 5px 0px;

    > a {
        :hover {
            text-decoration: underline;
        }
        color: blue;
    }
`;

export {
    ContactSection,
    Container,
    Name,
    JobTitle,
    SectionHeader,
    PivotContainer,
    ResearchSectionItem
};
