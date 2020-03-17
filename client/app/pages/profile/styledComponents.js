import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

/**
 * Styled components
 */
const Container = styled.main`
    background: linear-gradient(to bottom, ${colors.gray.light}, ${colors.gray.light} 100%);

    @media (max-width: ${breakpoints.vp3}) {
        padding-top: 50px;
    }

    @media (min-width: ${breakpoints.vp3}) {
        background: linear-gradient(to right, ${colors.gray.light}, ${colors.gray.light} 100%);
    }
    @media (min-width: ${breakpoints.vp4}) {
        background: linear-gradient(
            to bottom,
            ${colors.offwhite},
            ${colors.offwhite} 280px,
            ${colors.gray.light} 280px,
            ${colors.gray.light} 100%
        );
    }
`;

const ProfilesSection = styled.section`
    background-color: ${colors.gray.light};
`;

export { Container, ProfilesSection };
