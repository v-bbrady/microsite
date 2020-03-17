import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables';
import { Image } from '@ms-fw/fw-react/components';

// MSD components
import { MasterCard, PageIntro } from '../../components';
import { Grid, Page } from '@ms-fw/fw-react/layouts';
import { Pivot } from 'office-ui-fabric-react';

/**
 * Styled components
 */
const Section = styled.section`
    padding-top: 84px;
    margin-bottom: -24px;
    position: relative;
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 4;
    -ms-grid-column-span: 3;
`;

const ArticleContainer = styled.section`
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

const ArticlesSection = styled(ArticleContainer)`
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

const Container = styled.div`
    background-color: ${colors.offwhite};

    .ms-Pivot-text {
        font-size: 17px;
    }

    .ms-Pivot {
        z-index: 1;
        width: 270px;
        margin-top: 25px;
        margin-left: -10px;
    }

    .ms-Pivot-linkContent {
        &:hover {
            border-bottom: 2px solid ${colors.blue.base};
        }
    }
`;

const PivotItemSection = styled.div`
    font-size: 21px;
    color: #505050;
    background-color: ${colors.gray.light};
`;

const PivotSection = styled(Pivot)`
    margin-top: 225px;
    margin-left: 5px;
`;

const PivotSectionHeader = styled.div`
    margin-top: -100px;
`;

const PivotSectionContainer = styled.div`
    background-color: ${colors.gray.light};
`;

const PivotGridSection = styled(Grid)`
    margin-top: 15px;
`;

const TextSection = styled.div`
    margin: 30px 0px;
    max-width: 700px;
    font-size: 16px;

    a {
        color: ${colors.blue.base};

        :hover {
            text-decoration: underline;
        }
    }
`;

const TextSectionLabel = styled(TextSection)`
    font-weight: 600;
    font-size: 21px;
`;

const HeaderSection = styled.section`
    position: relative;
    grid-column-start: 1;
    grid-column-end: 4;
    -ms-grid-column-span: 3;
`;

const FeaturedCardSection = styled(Grid)`
    margin-top: 50px;
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

const DefaultHeaderContentContainer = styled(SectionContentContainer)`
    padding-top: 96px;

    @media (min-width: ${breakpoints.vp3}) {
        padding-top: 144px;
    }

    .l-page > .l-grid:first-child {
        z-index: 1;
        margin-bottom: 0;

        @media (min-width: ${breakpoints.vp4}) {
            margin-bottom: -48px;
        }
    }
`;

const VisionSection = styled.div`
    margin-bottom: 84px;
`;

const ContentSection = styled(SectionContentContainer)`
    .c-heading-1 {
        @media (min-width: ${breakpoints.vp2}) {
            margin-top: 75px;
        }
    }

    .c-paragraph-1 {
        @media (min-width: ${breakpoints.vp5}) {
            margin-top: 75px;
        }
    }

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

const WrappedHeaderContentContainer = styled(SectionContentContainer)`
    background-color: ${colors.gray.light};
    margin-top: -84px;
    padding-bottom: 50px;
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

const PublicationsPage = styled(Page)`
    padding-bottom: 45px;
`;

const ContactInfoContentContainer = styled.div`
    background-color: #e6e6e6;
    padding-top: 70px;
    padding-bottom: 40px;
    margin-top: -84px;

    font-family: 'Segoe UI';
    color: #505050;
    font-size: 21px;
    font-weight: 400;
    line-height: 32px;
`;

const ByLine = styled.div`
    font-size: 10px;
    position: relative;
    margin-bottom: 20px;
`;

const CardSummary = styled.div`
{
    overflow: hidden;
    position: relative;
    width:275px;
    height:60px;
    text-align: justify;
    margin-right: -1em;
    padding-right: 1em;
    margin-bottom: 8px;

    &:before {
        content: '...';
        position: absolute;
        right: 0;
        bottom: 0;
    }

    &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 1em;
        height: 1em;
        margin-top: 0.2em;
        background: white;
    }
`;

const JobSection = styled.div`
    font-size: 15px;
    font-style: italic;
    margin-bottom: 15px;
`;

const PersonCards = styled.div`
    padding: 0px 0px;
    margin-bottom: 50px;
`;

const PersonCard = styled(MasterCard)`
    padding: 20px 20px 30px 20px;
    overflow: hidden;
`;

const ImageSection = styled(Image)`
    margin-top: 40px;
    width: ${props => (props.imagetype == 'normal' ? 'inherit' : '400px')};
    height: ${props => (props.imagetype == 'normal' ? 'inherit' : '240px')};
    margin-left: auto;
    margin-right: auto;
`;

const PersonContacts = styled.div`
    padding: 0px 0px 50px 0px;
`;

const PersonContactInfoSection = styled.div`
    max-width:250px;
    margin: -25px 0px 0px 24px;
    font-family:"Segoe UI", "SegoeUI", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size:11px;
    position:relative;
    letter-spacing: .4em;

    a{
        color:${colors.gray.mid},
        text-decoration:none
    }
`;

const LabCards = styled.div`
    padding: 30px 0px 0px 0px;
`;

const LabCard = styled(MasterCard)`
    margin-bottom: 24px;

    p.c-paragraph-3 {
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

    > div > div {
        position: relative;
        display: grid;
        padding: 12px 12px 7px;
        grid-template-columns: 1fr 140px;
        grid-template-rows: 78px auto;
        grid-gap: 0 12px;

        @media (min-width: ${breakpoints.vp2}) {
            padding: 12px 24px 24px;
            grid-template-columns: 1fr 240px;
            grid-template-rows: 184px auto;
            grid-gap: 0 24px;
        }

        @media (min-width: ${breakpoints.vp4}) {
            padding: 20px 24px 24px;
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

            p {
                color: ${colors.gray.mid};

                @media (max-width: ${breakpoints.vp1Max}) {
                    display: none;
                }

                @media (min-width: ${breakpoints.vp2}) {
                    margin-top: 8px;
                }

                @media (min-width: ${breakpoints.vp4}) {
                    margin-top: 10px;
                }
            }
        }

        > span {
            grid-column: 1 / 2;
            grid-row: 2 / 3;

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
            padding: 12px 24px 24px;
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

const LabCardHeaderDiv = styled.div`
    margin-top: -35px;

    > a {
        text-decoration: none !important;
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

        @media (min-width: ${breakpoints.vp5}) {
            height: 658px !important;
        }
    }
`;

export {
    Section,
    SectionContentContainer,
    DefaultHeaderContentContainer,
    WrappedHeaderContentContainer,
    ContactInfoContentContainer,
    JobSection,
    LabCard,
    LabCards,
    LabCardHeaderDiv,
    PersonCard,
    PersonCards,
    PersonContactInfoSection,
    PersonContacts,
    ByLine,
    CardSummary,
    ImageSection,
    Container,
    PageIntroSection,
    PivotItemSection,
    PivotSectionContainer,
    PivotSectionHeader,
    PivotGridSection,
    PivotSection,
    PublicationsPage,
    ArticlesSection,
    TextSection,
    HeaderSection,
    FeaturedCardSection,
    TextSectionLabel,
    VisionSection,
    ContentSection
};
