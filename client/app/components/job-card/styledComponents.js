import styled from 'styled-components';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// MSD components
import MasterCard from '../master-card';

/**
 * Styled components
 */
const Container = styled(MasterCard)`
    margin-top: 0px;
    margin-bottom: 50px;
    overflow: hidden;
    :hover {
        .jobHeading {
            text-decoration: underline;
        }
    }
`;

const ContentContainer = styled.div`
    margin: 22px 25px 0px 25px;
`;

const TextSection = styled.div`
    margin: 30px 0px;
`;

const ImageSection = styled.img`
    width: 98%;
    border-radius: 4px;
    margin-left: 2px;
    margin-bottom: 25px;
`;

export { Container, ContentContainer, ImageSection, TextSection };
