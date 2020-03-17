import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

/**
 * Styled components
 */
const Container = styled.main`
    background-color: ${colors.white};
`;

const ArticlesContainer = styled.section`
    margin-top: 50px;
    padding-top: 180px;
    background-color: ${colors.gray.light};
    padding-bottom: 175px;

    /* Hero card container */
    .l-grid:first-child {
        margin-top: -120px;
    }
`;

export { Container, ArticlesContainer };
