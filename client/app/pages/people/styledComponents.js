import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables';
import { Image } from '@ms-fw/fw-react/components';

// MSD components
import { MasterCard } from '../../components';

/**
 * Styled components
 */
const Section = styled.section`
    margin-top: 84px;
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
    .ms-Pivot {
        width: 430px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25px;

        > span {
            font-size: 100px;
        }
    }

    .ms-Pivot-linkContent {
        .ms-Pivot-text {
            color: ${colors.blue.base} !important;
        }

        &:hover {
            border-bottom: 2px solid ${colors.blue.base};
        }
    }
`;

const PivotSection = styled.div`
    font-size: 21px;
    color: #505050;
    background-color: 'blue';

    p {
        margin: 12px;
    }
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
`;

const PersonCard = styled(MasterCard)`
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px 20px 30px 20px;
    overflow: hidden;
`;

const ImageSection = styled(Image)`
    margin-top: 40px;
    width: 400px;
    height: 240px;
    margin-left: auto;
    margin-right: auto;
`;

const PersonContacts = styled.div`
    padding: 0px 0px;
`;

const PersonContactInfoSection = styled.div`
    max-width:250px;
    margin: -75px 0px 0px 24px;
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
    padding: 0px 0px;
`;

const LabCard = styled(MasterCard)`
    margin-bottom: 24px;

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

const PeopleContainer = styled.section`
    margin-top: 50px;
    padding-top: 50px;
    padding-bottom: 100px;
    background-color: ${colors.gray.light};

    /* Hero card container */
    .l-grid:first-child {
        margin-top: -120px;
    }
`;

export {
    PeopleContainer,
    Section,
    SectionContentContainer,
    DefaultHeaderContentContainer,
    WrappedHeaderContentContainer,
    JobSection,
    LabCard,
    LabCards,
    PersonCard,
    PersonCards,
    PersonContactInfoSection,
    PersonContacts,
    ByLine,
    CardSummary,
    ImageSection,
    Container,
    PivotSection,
    ArticlesSection
};
