import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

/**
 * Helpers
 */
const getBackgroundImage = (props, vpNumber) => {
    if (!props.image) return;

    const vp = `vp${vpNumber}`;

    let url = '';

    if (props.image[vp]) {
        url = props.image[vp];
    } else if (props.image.vp4) {
        url = props.image.vp4;
    }

    return `url(${url})`;
};

/**
 * Styled components
 */
const Container = styled.section`
    padding-bottom: ${props => (props.isLargeImage ? '0' : '24px')};
    background-color: ${props => props.backgroundColor || colors.white};
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${props => (props.isFullBleedImage ? getBackgroundImage(props, 1) : '')};

    @media(min-width: ${breakpoints.vp2}) {
        padding-bottom: ${props => (props.isLargeImage ? '0' : '48px')};
        background-image: ${props =>
            props.isFullBleedImage ? getBackgroundImage(props, 2) : ''};
    }

    @media(min-width: ${breakpoints.vp3}) {
        padding-bottom: ${props => (props.isLargeImage ? '0' : '72px')};
        background-image: ${props =>
            props.isFullBleedImage ? getBackgroundImage(props, 3) : ''};
    }
    
    @media(min-width: ${breakpoints.vp4}) {
        background-image: ${props =>
            props.isFullBleedImage ? getBackgroundImage(props, 4) : ''};
    }

    @media(min-width: ${breakpoints.vp5}) {
        background-image: ${props =>
            props.isFullBleedImage ? getBackgroundImage(props, 5) : ''};
    }

    @media(min-width: ${breakpoints.vp6}) {
        background-size: ${props => (props.isFullBleedImage ? 'contain' : 'cover')};
        background-image: ${props =>
            props.isFullBleedImage ? getBackgroundImage(props, 6) : ''};
    }

    /* SectionHeader container */
    .l-grid:first-child {
        padding-bottom: ${props => (props.isLargeImage ? '0' : '')};
    }

    /* Image/animation container */
    .l-grid:last-child {
        overflow: hidden;
        margin-left: ${props => (props.isLargeImage ? '-5vw' : '0')};
        width: ${props => (props.isLargeImage ? 'calc(100% + 10vw)' : '100%')};
        justify-items: ${props =>
            props.animation && props.animation.alignment ? props.animation.alignment : ''};

        .msd-page-intro-image-container {
            margin-top: 25px;
            height: ${props => (props.isLargeImage ? '420px' : '432px')};            
            border-radius: ${props => (props.isLargeImage ? '0' : '4px')};
            background-position: top center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: ${props =>
                !props.isFullBleedImage ? getBackgroundImage(props, 1) : ''};

            @media(min-width: ${breakpoints.vp2}) {
                height: ${props => (props.isLargeImage ? '640px' : '540px')};                
                background-image: ${props =>
                    !props.isFullBleedImage ? getBackgroundImage(props, 2) : ''};
            }

            @media(min-width: ${breakpoints.vp3}) {
                ${'' /* display: none; */}
                background-image: ${props =>
                    !props.isFullBleedImage ? getBackgroundImage(props, 3) : ''};
            }

            @media(min-width: ${breakpoints.vp4}) {
                height: ${props => (props.isLargeImage ? '768px' : '540px')};            
                background-image: ${props =>
                    !props.isFullBleedImage ? getBackgroundImage(props, 4) : ''};
            }

            @media(min-width: ${breakpoints.vp5}) {
                height: ${props =>
                    props.isLargeImage
                        ? '768px'
                        : '658px'};                                         
                background-image: ${props =>
                    !props.isFullBleedImage ? getBackgroundImage(props, 5) : ''};
            }

            @media(min-width: ${breakpoints.vp6}) {
                margin-top: 25px;
                background-image: ${props =>
                    !props.isFullBleedImage ? getBackgroundImage(props, 6) : ''};
                height: ${props => (props.breakGridOnWidestVp ? '768px' : '658px')};
            }
        }

        .msd-page-intro-animation-container {
            display: ${props =>
                props.animation && props.animation.alignment ? 'flex' : 'block'};
            justify-content: center;
            width: 539px; /* Must set width to address Chrome bug */
            height: 389px;
            margin-top: ${props =>
                props.animation && props.animation.alignment === 'center' ? '0' : '48px'};
            margin-bottom: ${props =>
                props.animation && props.animation.alignment === 'center' ? '48px' : '0'};
            transform: ${props =>
                props.animation && props.animation.alignment === 'center'
                    ? 'scale(0.8)'
                    : 'none'};

            > svg {
                width: auto !important; /* To address Chrome bug */
            }

            @media (min-width: ${breakpoints.vp2}) {
                width: 767px;
                height: 463px;
                margin-top: ${props =>
                    props.animation && props.animation.alignment === 'center'
                        ? '12px'
                        : '60px'};
                margin-bottom: ${props =>
                    props.animation && props.animation.alignment === 'center' ? '48px' : '0'};
                transform: ${props =>
                    props.animation && props.animation.alignment === 'center'
                        ? 'scale(1)'
                        : 'none'};
            }

            @media (min-width: ${breakpoints.vp3}) {
                width: 1083px;
                height: 542px;
                margin-top: ${props =>
                    props.animation && props.animation.alignment === 'center'
                        ? '24px'
                        : '84px'};
                margin-bottom: ${props =>
                    props.animation && props.animation.alignment === 'center' ? '60px' : '0'};
            }

            @media (min-width: ${breakpoints.vp4}) {
                width: 1399px;
                margin-top: ${props =>
                    props.animation && props.animation.alignment === 'center'
                        ? '36px'
                        : '84px'};
                margin-bottom: ${props =>
                    props.animation && props.animation.alignment === 'center' ? '48px' : '0'};
            }

            @media (min-width: ${breakpoints.vp5}) {
                width: 1600px;
                height: 534px;
                margin-top: ${props =>
                    props.animation && props.animation.alignment === 'center'
                        ? '96px'
                        : '192px'};
                margin-bottom: ${props =>
                    props.animation && props.animation.alignment === 'center' ? '96px' : '0'};
            }
        }
    }
`;

export { Container };
