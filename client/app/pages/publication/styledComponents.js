import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';
import { MSDSectionHeader } from '../../components';
import { Column } from '@ms-fw/fw-react/layouts';

const Container = styled.div``;

const StyledHeader = styled(MSDSectionHeader)`
    > section {
        padding-bottom: 10px;
    }
`;

const ProjectDetailsSection = styled.div`
    padding: 20px 0px 50px 0px;
    background-color: ${colors.gray.light};
`;

const StyledParagraph = styled.p`
    max-width: 750px;
    ol {
        margin-left: 40px;
        list-style-type: decimal;
    }

    a {
        color: ${colors.blue.base};
        font-weight: 600;
    }
`;

const LabelSection = styled.div`
    font-size: 17px;
    font-weight: 600;
    text-align: left;

    font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system,
        BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
`;

const ResearchColumn = styled(Column)``;

const ResearchSection = styled.div`
    width: 350px;
    margin-left: 25px;
    margin-top: 60px;

    > div > a {
        :hover {
            text-decoration: underline;
        }
        color: ${colors.blue.base};
        font-weight: 600;
    }

    @media (max-width: ${breakpoints.vp5}) {
        margin-left: 0px;
        width: 400px;
    }

    @media (max-width: ${breakpoints.vp2}) {
        width: 350px;
    }

    @media (min-width: ${breakpoints.vp5}) {
        margin-top: 0px;
    }
`;

const ResearchSectionItem = styled.div`
    text-align: left;
    margin: 5px 0px;

    > a {
        :hover {
            text-decoration: underline;
        }
        color: ${colors.blue.base};
        font-weight: 600;
    }
`;

const PDFSection = styled.div`
    background-color: ${colors.blue.base};
    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 12px;
    width: 135px;

    > a {
        color: ${colors.white} !important;
        font-weight: 600;
    }
`;

const PublicationSection = styled.span`
    font-style: italic;
`;

const AuthorSection = styled.div`
    max-width: 750px;
    font-size: 12px;
    margin: 20px 0px 30px 0px;
`;

const PubLinksSection = styled(Column)`
    margin: 20px 0px;

    > a {
        :hover {
            text-decoration: underline;
        }
        color: ${colors.blue.base};
        font-weight: 600;
    }
`;

export {
    AuthorSection,
    Container,
    LabelSection,
    ProjectDetailsSection,
    PublicationSection,
    PubLinksSection,
    ResearchColumn,
    ResearchSection,
    StyledHeader,
    StyledParagraph,
    ResearchSectionItem,
    PDFSection
};
