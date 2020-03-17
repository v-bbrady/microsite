import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

const PageIntroContainer = styled.div`
    .c-image {
        img {
            padding-top: 40px;
            width: 100%;
        }
    }
`;

/**
 * Styled components
 */
const ContentContainer = styled.section`
    padding: 30px 24px;

    background-color: ${colors.gray.light};

    @media (min-width: ${breakpoints.vp3}) {
        padding: 120px 0;
    }

    .article-content {
        font-size: 21px;
        line-height: 32px;
        color: #505050;

        p {
            margin-bottom: 21px;
        }

        blockquote {
            margin: 50px;
            color: ${colors.blue.base};
            font-size: 34px;
            line-height: 46px;
            position: relative;

            @media (max-width: 700px) {
                font-size: 24px;
                line-height: 32px;
            }
            @media (max-width: 560px) {
                font-size: 21px;
                line-height: 29px;
            }

            p:not(:first-child) {
                margin-bottom: 0px;
                line-height: 16px;
            }

            p:first-child {
                z-index: 1000;
            }

            cite {
                font-size: 16px;
                color: ${colors.black};
                font-weight: 600;
            }

            .marker {
                font-size: 16px;
                font-style: italic;
                color: ${colors.black};
            }

            p:first-child:before {
                content: '“';
                left: -15px;
                top: -5px;
                color: ${colors.blue.base};
                font-size: 34px;
                position: absolute;
            }

            p:first-child:after {
                content: '”';
                color: ${colors.blue.base};
                font-size: 34px;
                margin-top: -5px;
                position: absolute;
            }
        }

        :first-letter {
            float: left;
            padding: 24px 12px 12px 12px;
            margin: 10px 24px 0 0;
            font-size: 54px;
            font-weight: 700;
            color: ${colors.blue.base};
            border-top: 8px solid ${colors.blue.electric};
        }
    }
`;

const ProfilesSection = styled.section`
    padding-bottom: 48px;
    background-color: ${colors.gray.light};
`;

export { ContentContainer, ProfilesSection, PageIntroContainer };
