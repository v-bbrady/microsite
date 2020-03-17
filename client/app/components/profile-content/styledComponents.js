import styled from 'styled-components';
import { colors } from '../../lib/variables/styledComponentsVariables';
import { resultContent } from 'office-ui-fabric-react/lib/components/ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.scss';

const Container = styled.div`
    margin-top: 20px;

    .ms-Pivot-linkContent {
        &:hover {
            border-bottom: 2px solid ${colors.blue.base};
        }
    }

    .ms-Pivot-link {
        margin-left: -8px;
    }
`;

const PivotSection = styled.div`
    margin: 40px 0px;
    font-size: 21px;
    color: #505050;
    background-color: 'blue';

    p {
        margin: 21px 0px;
    }
`;

const ProjectsPivotSection = styled.div`
    margin: 21px 0px 40px -20px;
    font-size: 21px;
    color: #505050;
    background-color: 'blue';

    p {
        margin: 21px 0px;

        a {
            target: blank;
        }
    }
`;

const PublicationsPivotSection = styled.div``;

const AboutPivotSection = styled(PivotSection)`
    margin-top: 40px;

    padding-bottom: 40px a {
        text-decoration: underline;
        color: ${colors.blue.base};
    }

    ul {
        list-style-type: circle;
    }

    ol {
        list-style-type: decimal;
    }

    div {
        background-color: transparent !important;
    }

    span {
        background-color: transparent !important;
    }

    p[class*='MsoListParagraphCx'] {
        margin-left: 50px;
    }
`;

export {
    AboutPivotSection,
    PivotSection,
    ProjectsPivotSection,
    PublicationsPivotSection,
    Container
};
