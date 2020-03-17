import styled from 'styled-components';
import { breakpoints } from '../../lib/variables/styledComponentsVariables';

const VideoDiv = styled.div`
    overflow: hidden;
`;

const VideoContainer = styled.video`
    width: 100%;
    object-fit: cover;
    border-radius: 29px !important;
    padding: 24px;

    @media (min-width: ${breakpoints.vp1}) {
        height: 533px;
    }

    @media (min-width: ${breakpoints.vp2}) {
        height: 533px;
    }

    @media (min-width: ${breakpoints.vp3}) {
        height: 533px;
    }

    @media (min-width: ${breakpoints.vp4}) {
        height: 533px;
    }

    @media (min-width: ${breakpoints.vp5}) {
        height: 658px;
    }

    @media (min-width: ${breakpoints.vp5}) {
        height: 658px;
    }
`;

export { VideoContainer, VideoDiv };
