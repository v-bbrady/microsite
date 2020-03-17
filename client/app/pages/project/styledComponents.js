import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';
import { MasterCard, MSDSectionHeader } from '../../components';
import { Column } from '@ms-fw/fw-react/layouts';

const Container = styled.div``;

const StyledHeader = styled(MSDSectionHeader)`
    > section {
        padding-bottom: 10px;
    }
`;

const ProjectDetailsSection = styled.div`
    margin-top: 100px;
    padding: 20px 0px;
    background-color: ${colors.gray.light};
`;

const PivotSection = styled.div`
    font-size: 21px;
    color: #505050;
    background-color: 'blue';
    margin-top: 50px;

    p {
        margin: 12px;
    }
`;

const StyledParagraph = styled.p`
    max-width: 75%;

    > p {
        font-size: 21px !important;
        font-family: 'Segoe UI' !important;
        line-height: 32px !important;
        background-color: ${colors.gray.light} !important;
    }

    > div {
        font-size: 21px !important;
        font-family: 'Segoe UI' !important;
        line-height: 32px !important;
        background-color: ${colors.gray.light} !important;
    }

    ul {
        margin-left: 40px;
        list-style-type: decimal;
        background-color: ${colors.gray.light} !important;
    }

    ol {
        margin-left: 40px;
        list-style-type: decimal;
        background-color: ${colors.gray.light} !important;
    }

    a {
        color: blue;
        background-color: ${colors.gray.light} !important;
    }
`;

const PersonCard = styled(MasterCard)`
    height: 250px;
    width: 190px;
    max-width: 190px;
    margin-bottom: 15px;
    text-align: left;
    background-color: transparent;
    padding-bottom: 10px;
`;

const PeopleColumn = styled(Column)`
    text-align: center;
    align: center;
`;

const Image = styled.img`
    width: 100%;
    height: 175px;
    margin-bottom: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const NameSection = styled.div`
    font-weight:bold;
    color: ${colors.blue.base}
    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
`;

const JobSection = styled.div`
    font-style: italic;
    margin-left: 10px;
    margin-right: 10px;
`;

const LabelSection = styled.div`
    font-size: 17px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 70px;
    font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system,
        BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
`;

const PeopleSection = styled.div`
    max-width: 190px;
    text-align: center;
    margin-left: 25px;
`;

export {
    Container,
    Image,
    JobSection,
    LabelSection,
    NameSection,
    PersonCard,
    PeopleColumn,
    PeopleSection,
    PivotSection,
    ProjectDetailsSection,
    StyledHeader,
    StyledParagraph
};
