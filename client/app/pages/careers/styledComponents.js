import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';
import { MasterCard, PageIntro } from '../../components';
import { Grid } from '@ms-fw/fw-react/layouts';

/**
 * Styled components
 */
const SectionContentContainer = styled.div`
    background-color: ${colors.gray.light};
    width: 100%;
    .l-page > .l-grid {
        picture {
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 0.5px 1px rgba(0, 0, 0, 0.05);
        }

        .c-heading-4 {
            padding: 0px 0px 10px 0px;
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

const ContentSection = styled(SectionContentContainer)`
    background-color: ${colors.gray.light};
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

    padding: 42px 0px;

    .l-grid {
        @media (min-width: ${breakpoints.vp5}) {
            background-color: ${props => props.backgroundColor || colors.transparent};
        }

        &:first-child {
            overflow: hidden;

            @media (min-width: ${breakpoints.vp5}) {
                border-radius: ${props => (props.backgroundColor ? '4px 4px 0 0' : 0)};
            }
        }

        picture > img {
            border-radius: 4px;

            @media (min-width: ${breakpoints.vp5}) {
                border-radius: 0 0 4px 4px;
            }
        }
    }
`;

const CultureContentSection = styled(ContentSection)`
    .c-heading-1 {
        padding-top: 75px;
    }

    .c-paragraph-1 {
        padding-top: 75px;
    }
`;

const CultureCard = styled(MasterCard)`
    > div > div {
        position: relative;
        display: grid;
        padding: 12px 12px 7px;
        grid-template-columns: 1fr 140px;
        grid-template-rows: 78px auto;
        grid-gap: 0 12px;

        @media (min-width: ${breakpoints.vp2}) {
            padding: 12px 24px 0px 24px;
            grid-template-columns: 1fr 240px;
            grid-template-rows: 184px auto;
            grid-gap: 0 24px;
        }

        @media (min-width: ${breakpoints.vp4}) {
            padding: 20px 24px 0px 24px;
            grid-template-rows: 178px auto;
        }

        > div:first-child {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            max-height: 100%;
            color: ${colors.black};

            .c-heading-4 {
                color: ${colors.black};

                @media (max-width: ${breakpoints.vp1Max}) {
                    font-size: 16px;
                    line-height: 24px;
                }

                @media (min-width: ${breakpoints.vp4}) {
                    margin-top: -10px;
                }
            }

            p:first-of-type {
                font-style: italic;
            }

            p:nth-of-type(2) {
                margin-top: 10px;

                @media (min-width: ${breakpoints.vp0}) {
                    display: none;
                }

                @media (min-width: ${breakpoints.vp2}) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    max-height: 96px;
                }

                @media (min-width: ${breakpoints.vp3}) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    max-height: 72px;
                }

                @media (min-width: ${breakpoints.vp4}) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    max-height: 96px;
                }
            }
        }

        > span {
            padding-top: 40px;

            @media (min-width: ${breakpoints.vp1}) {
                padding-top: 20px;
            }

            grid-column: 1 / 2;

            @media (min-width: ${breakpoints.vp3}) {
                padding-top: 50px;
            }

            @media (min-width: ${breakpoints.vp4}) {
                padding-top: 40px;
            }

            @media (max-width: ${breakpoints.vp1Max}) {
                line-height: 26px;
            }
        }

        > picture {
            grid-column: 2 / 3;
            grid-row: 1 / 3;
            position: absolute;
            width: 100%;
            top: -10px;
            right: 0;

            @media (min-width: ${breakpoints.vp2}) {
                top: -10px;
            }

            @media (min-width: ${breakpoints.vp4}) {
                top: -10px;
            }
        }

        /* Special card layout only in vp3 */
        @media (min-width: ${breakpoints.vp3}) and (max-width: ${breakpoints.vp3Max}) {
            padding: 12px 24px 0px 24px;
            grid-template-columns: 1fr;
            grid-template-rows: 120px auto auto;

            > div {
                max-height: none;
            }

            > span {
                grid-column: 1 / 2;
                grid-row: 2 / 3;
                margin: 24px 0;
            }

            > picture {
                grid-column: 1 / 2;
                grid-row: 3 / 4;
                position: relative;
                top: 0;

                > img {
                    width: 100%;
                }
            }
        }
    }
`;

const CultureCardLinkSection = styled.a`
    text-decoration: underline;
`;

const Section = styled.section`
    padding: 12px 0 60px;

    @media (min-width: ${breakpoints.vp3}) {
        padding: 36px 0 60px;
    }

    @media (min-width: ${breakpoints.vp5}) {
        padding: 60px 0 60px;
    }

    .l-grid:first-child {
        @media (min-width: ${breakpoints.vp3}) {
            margin-bottom: 24px;
        }

        @media (min-width: ${breakpoints.vp5}) {
            margin-bottom: 60px;
        }
    }
`;

const PageIntroSection = styled(PageIntro)`
    .l-grid:last-child {
        margin-bottom: -150px;
    }

    .c-heading-1 {
        margin-bottom: 25px;
    }

    @media (max-width: ${breakpoints.vp2}) {
        margin-bottom: -60px;
    }

    .msd-page-intro-image-container {
        @media (max-width: ${breakpoints.vp2}) {
            margin-top: 25px !important;
        }
    }
`;

const JobsSection = styled(Section)`
    background-color: ${colors.gray.light};
    .msd-article-section-last-card {
        @media (min-width: ${breakpoints.vp4}) {
            display: none;
        }

        @media (min-width: ${breakpoints.vp5}) {
            display: block;
        }
    }
`;

const FeaturedCardSection = styled(Grid)`
    margin-top: 50px;
`;

export {
    ContentSection,
    CultureCard,
    CultureContentSection,
    CultureCardLinkSection,
    FeaturedCardSection,
    JobsSection,
    PageIntroSection
};
