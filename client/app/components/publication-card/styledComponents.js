import styled from 'styled-components';
import { breakpoints, colors, shadows } from '../../lib/variables/styledComponentsVariables';
import { Heading } from '@ms-fw/fw-react/components';

const ResearchTypeSection = styled.div`
    font-family: 'Segoe UI', 'SegoeUI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    position: relative;
    letter-spacing: 0.4em;
    color: ${colors.gray.mid};
    margin-bottom: 10px;
    padding: 0px 24px 30px 24px;
    border-bottom: 1px solid #f2f2f2;
`;

const TextSection = styled.div`
    font-size: 16px;
    font-family: arial;

    a {
        font-size: 12px;
        color: blue;
    }
    margin-bottom: 20px;
    padding: 0px 24px;
`;

const PlatformTypeSection = styled.span`
    font-style: italic;
    font-size: 16px;
    margin-bottom: 10px;
`;

const getShadowValue = (state, theme) => {
    if (theme !== 'dark') theme = 'light';

    return shadows[theme][state];
};

const TitleSection = styled.div`
    font-size: 21px;
    margin-bottom: 20px;
    padding: 0px 24px;
    color: ${colors.blue.base};
    font-weight: 600;

    :hover,
    :focus {
        text-decoration: underline;
        text-decoration-color: ${colors.blue.base} !important;

        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${colors.black};
        }
    }
`;

const AuthorSection = styled.div`
    font-size: 12px;
    margin-bottom: 20px;
    padding: 0px 24px;
`;

const DateSection = styled.div`
    font-size: 10px;
    position: relative;
    margin-bottom: 20px;
`;

const SubtitleSection = styled.span`
    color: ${props =>
        props.color2 ? props.color2 : props.color ? props.color : colors.black} !important;
`;

const PubContainer = styled.section`  
    margin-top: 50px;
    margin-bottom: 50px; 
    padding: 20px 0px;      
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
    cursor: pointer;
    box-shadow: ${getShadowValue('rest', 'light')};

    &:hover {
        transform: 'translate3D(0, -1px, 0)';
        box-shadow: ${getShadowValue('hover', 'light')};
    }

    > p[class^='c-caption'] {
        padding: 12px;
        letter-spacing: 0.4em;
        color: ${colors.gray.mid};
        border-bottom: 1px solid rgba(115, 115, 115, 0.1); /* Border color is gray.mid at 50% opacity */

        @media (min-width: ${breakpoints.vp2}) {
            padding: 16px 24px 15px;
        }
    }

    > div {
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

const InnerDiv = styled.div``;

const LinkSection = styled.a`
    :hover,
    :focus {
        text-decoration: underline;
        text-decoration-color: ${colors.blue.base} !important;

        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${colors.black};
        }
    }
`;

const HeaderText = styled(Heading)`
    letter-spacing: -0.02em;
    white-space: pre-line;
    color: ${props => (props.color ? props.color : colors.black)} !important;

    :hover,
    :focus {
        text-decoration: underline;
        text-decoration-color: ${props =>
            props.color ? props.color : colors.black} !important;

        .spanTextColor {
            text-decoration: underline;
            text-decoration-color: ${props => props.color2};
        }
    }
`;

const HeaderText2 = styled.span`
    color: ${props =>
        props.color2 ? props.color2 : props.color ? props.color : colors.black} !important;
`;

export {
    AuthorSection,
    DateSection,
    HeaderText,
    HeaderText2,
    InnerDiv,
    LinkSection,
    PlatformTypeSection,
    PubContainer,
    ResearchTypeSection,
    TextSection,
    TitleSection
};
