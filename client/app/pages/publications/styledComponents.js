import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

/**
 * Styled components
 */
const Container = styled.main`
    background-color: ${colors.offwhite};
`;

const SectionContentContainer = styled.div`
    width: 100%;
    .l-page > .l-grid {
        picture {
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 0.5px 1px rgba(0, 0, 0, 0.05);
        }

        .c-heading-4 {
            margin: 24px 0 8px;
            color: ${colors.blue.base};
        }

        .c-paragraph-3 {
            color: ${colors.gray.mid};
        }

        a.c-hyperlink {
            display: inline-block;
            margin: 12px 0 24px;
            color: ${colors.blue.base};

            &:hover,
            &:focus {
                color: ${colors.blue.base};

                &:before {
                    background-color: ${colors.blue.base};
                }
            }

            &:after {
                color: ${colors.blue.base};
            }
        }
    }

    &.section-three {
        background-color: ${colors.blue.dark};

        .c-heading-2 {
            color: ${colors.blue.electric};
        }

        .c-paragraph-2 {
            color: ${colors.white};
        }

        .l-page > .l-grid {
            .c-heading-4 {
                color: ${colors.blue.electric};
            }

            .c-paragraph-3 {
                color: ${colors.white};
            }

            a.c-hyperlink {
                color: ${colors.blue.electric};

                &:hover,
                &:focus {
                    color: ${colors.blue.electric};

                    &:before {
                        background-color: ${colors.blue.electric};
                    }
                }

                &:after {
                    color: ${colors.blue.electric};
                }
            }
        }
    }
`;

const PublicationsContainer = styled.section`
    margin-top: 120px;
    background-color: ${colors.gray.light};

    /* Hero card container */
    .l-grid:first-child {
        margin-top: -120px;
    }
`;

const Section = styled.section`
    margin-top: 84px;
    position: relative;
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 4;
    -ms-grid-column-span: 3;
`;

const WrappedHeaderContentContainer = styled(SectionContentContainer)`
    .msd-section-bg-image-container + .l-grid {
        align-content: end;
        margin-top: 20px;

        @media (min-width: ${breakpoints.vp3}) {
            margin-top: 0;
        }

        .l-column:first-child {
            position: relative;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 8px;
                top: -48px;
                left: 0;
                right: 0;
                background-color: ${props => props.themeColor};
            }

            h2 {
                margin: -14px 0 14px 0;
                color: ${props => props.themeColor};
            }
        }

        .l-column {
            p {
                margin: 12px 0 24px;
                color: ${props => props.color};

                @media (min-width: ${breakpoints.vp3}) {
                    margin: 12px 0 48px;
                }

                @media (min-width: ${breakpoints.vp4}) {
                    margin: 12px 0 60px;
                }
            }
        }
    }
`;

export {
    Container,
    PublicationsContainer,
    Section,
    SectionContentContainer,
    WrappedHeaderContentContainer
};
