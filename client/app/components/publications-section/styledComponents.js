import styled from 'styled-components';
import { Dropdown } from 'office-ui-fabric-react';

const Container = styled.div`
    .ms-Dropdown-container {
        margin-left: 0px;
    }
`;

const DropDown = styled(Dropdown)`
    width: 175px;
`;

export { Container, DropDown };
