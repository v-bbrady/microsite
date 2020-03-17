import styled from 'styled-components';

import { breakpoints } from '../../lib/variables/styledComponentsVariables';

const MapFrame = styled.iframe`
    scrolling: 'no';
    margin-top: 25px;

    @media (min-width: ${breakpoints.vp2}) {
        width: 300px;
        height: 150px;
    }

    @media (min-width: ${breakpoints.vp3}) {
        width: 400px;
        height: 200px;
        margin-top: -28px;
    }

    @media (min-width: ${breakpoints.vp4}) {
        width: 600px;
        height: 300px;
    }
`;

const MapLinkSection = styled.div`
    white-space: nowrap;

    width: 500px;
    padding: 6px 0;
    margin-bottom: 20px;

    @media (min-width: ${breakpoints.vp3}) {
        text-align: center;
    }
`;

const MapLabTitleSection = styled.div`
    font-weight: bold;
    font-size: 22;
`;

const MapSection = styled.div`
    text-align: left;
`;

const MapContactSection = styled.div``;

const AddressSection = styled.div`
    margin-bottom: 20px;
`;

export {
    AddressSection,
    MapFrame,
    MapLinkSection,
    MapSection,
    MapContactSection,
    MapLabTitleSection
};
