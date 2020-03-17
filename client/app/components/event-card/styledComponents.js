import styled from 'styled-components';
import {
    breakpoints,
    colors,
    shadows
} from '../../lib/variables/styledComponentsVariables.js';
import { Heading } from '@ms-fw/fw-react/components';

// MSD components
import MasterCard from '../master-card';

const getShadowValue = (state, theme) => {
    if (theme !== 'dark') theme = 'light';

    return shadows[theme][state];
};

const EventContainer = styled(MasterCard)`    
margin: 25px 20px 20px 20px;
padding: 10px;
margin-bottom: 20px;
max-width:345px;
min-width:225px;
text-align: left;
transition: "all .333s ease-out"};
position: relative;
border-radius: 4px;
transform: translate3D(0);
backface-visibility: hidden;
cursor: 'pointer';   
transform: translate3D(0);
backface-visibility: hidden;
background: white;
box-shadow: ${getShadowValue('rest', 'light')};

&:hover {
    transform: 'translate3D(0, -1px, 0)';
    box-shadow: ${getShadowValue('hover', 'light')};
}

p {
    .c-caption-1{
    padding-top: 100px !important;
    }
    letter-spacing: 0.4em;
    color: ${colors.gray.mid};
    border-bottom: 1px solid rgba(115, 115, 115, 0.1); /* Border color is gray.mid at 50% opacity */

    @media (min-width: ${breakpoints.vp2}) {
        padding: 16px 24px 15px;
    }
}

> div {
    width: 100%;

    [class^='c-heading'] {
        color: ${colors.gray.mid};
        
    }

    a:not(.c-hyperlink) {
        &:hover,
        &:focus {
            text-decoration: underline;
            text-decoration-color:${colors.gray.mid};
        }
    }

    picture > img {
        border-radius: 4px;
        box-shadow: ${getShadowValue('rest', 'light')};
    }
}    
`;

const HeaderText = styled(Heading)`
    letter-spacing: -0.02em;
    white-space: pre-line;
    color: ${props => (props.color ? props.color : colors.black)} !important;

    :hover {
        text-decoration: underline;
        text-decoration-color: ${props =>
            props.color ? props.color : colors.black} !important;

        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${props => props.color2};
        }
    }
`;

const Label = styled.div`
    color: ${colors.blue.base}
    margin-top: 25px;
`;

const Section = styled.div`
    margin-top: 25px;
`;

const LinkSection = styled.a``;

export { EventContainer, HeaderText, Label, LinkSection, Section };
