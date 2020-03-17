import styled from 'styled-components';
import {
    breakpoints,
    colors,
    shadows
} from '../../lib/variables/styledComponentsVariables.js';
import { Heading } from '@ms-fw/fw-react/components';

// MSD components
import { MasterCard, MSDSectionHeader } from '../../components';

import { Grid, Column } from '@ms-fw/fw-react/layouts';

/**
 * Styled components
 */
const getShadowValue = (state, theme) => {
    if (theme !== 'dark') theme = 'light';

    return shadows[theme][state];
};

const Container = styled.main`
    background-color: ${colors.gray.light};
`;

const HeroCards = styled.div``;

const HeroCard = styled(MasterCard)`
    margin-bottom: 24px;

    .l-grid {
        margin: 24px 12px 0;

        @media (min-width: ${breakpoints.vp2}) {
            margin: 36px 24px 0px;
        }

        @media (min-width: ${breakpoints.vp3}) {
            margin: 36px 24px 24px;
        }

        @media (min-width: ${breakpoints.vp5}) {
            margin: 36px 24px 84px;
        }

        a {
            &,
            > .c-heading-1 {
                color: ${colors.blue.base};
                transform: translateX(-2px);
            }
        }
    }

    picture.c-image {
        padding: 0 12px 12px;

        @media (min-width: ${breakpoints.vp2}) {
            padding: 0 24px 24px;
        }
    }
`;

const HeroFeaturedCard = styled(MasterCard)`
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
            top: -41px;
            right: 0;

            @media (min-width: ${breakpoints.vp2}) {
                top: -36px;
            }

            @media (min-width: ${breakpoints.vp4}) {
                top: -43px;
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

const TwitterColumn = styled(Column)`
    width: 100%;
`;

const TwitterSection = styled.div`
    padding-bottom: 50px;
`;

const ArticlesSection = styled(Section)`
    .msd-article-section-last-card {
        @media (min-width: ${breakpoints.vp4}) {
            display: none;
        }

        @media (min-width: ${breakpoints.vp5}) {
            display: block;
        }
    }
`;

const FeatureCardLinkSection = styled.a`
    text-decoration-color: ${colors.blue.base} !important;
`;

const FeatureCardHeading = styled(Heading)`
    color: ${colors.blue.base} !important;
`;

const TwitterGrid = styled(Grid)`
    margin-top: 50px;
`;

const Tweet = styled.div`
    margin-bottom: 24px;
    border-radius: 5px;
    &:hover {
        transform: 'translate3D(0, -1px, 0)';
        box-shadow: ${getShadowValue('hover', 'light')};
    }
`;

export {
    ArticlesSection,
    Container,
    HeroCards,
    HeroCard,
    HeroFeaturedCard,
    FeatureCardLinkSection,
    FeatureCardHeading,
    Section,
    Tweet,
    TwitterGrid,
    TwitterColumn,
    TwitterSection
};
