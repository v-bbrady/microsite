import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

const getBackgroundColor = props => {
    if (props.uhfTheme === 'dark') {
        return 'black';
    }
    if (props.uhfTheme == 'white') {
        return colors.white;
    } else if (props.uhfTheme == 'lightgray') {
        return colors.offwhite;
    } else {
        return colors.gray.light;
    }
};

const NavMenuContainer = styled.div`
    color: ${props => (props.uhfTheme == 'dark' ? colors.white : colors.black)};
    background-color: ${props => getBackgroundColor(props)};
`;

const MicrosoftLogoSection = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
`;

const MenuLinkItem = styled.div`
    align-self: flex-start;
    font-family: 'Segoe UI' !important;
    @media (max-width: ${breakpoints.vp3}) {
        align-self: center;
        flex: 1 1 500px;
    }

    > a {
        padding: 0px;
        margin: 0px;
        border: 0px;
        min-width: 2px;
        font-size: 15px;

        > div {
            background-color: ${props => getBackgroundColor(props)};
        }

        > div > div > div {
            margin: 0px;
            font-weight: 400;
        }
    }

    > button {
        height: 32px;
        padding: 0px;
        margin: 0px;
        font-size: 15px;

        > div > div > div {
            margin: 0px 3px 0px 0px;
            font-size: 15px;
            font-family: "Segoe UI",
            font-weight: 400;
        }

        > div > i {
            margin: 0px;
        }
    }

    .activeMenuItem {
        .ms-Button-textContainer {
            color: ${colors.blue.base};
            > div {
                font-weight: 600;
            }
        }

        .ms-Button-menuIcon {
            color: ${colors.blue.base};
        }
    }
`;

const MenuLinkSection = styled.div`
    flex-wrap: wrap;
    display: flex;
    padding-bottom: 72px;

    .menuLinkItem {
        :first-child {
            > a {
                font-size: 21px;
                margin-right: 60px;

                > div > div > div {
                    font-weight: 600;
                }
            }
        }

        :not(:first-child) {
            margin-right: 40px;
            margin-top: 3px;
        }

        > a {
            :hover {
                background-color: transparent;
                color: ${colors.blue.base}
                text-decoration: underline;
            }
        }

        > button {
            background-color: transparent;
            color: ${props => (props.uhfTheme == 'dark' ? colors.white : colors.black)};

            > div > i {
                color: ${props => (props.uhfTheme == 'dark' ? colors.white : colors.black)};
            }

            :hover {
                color: ${colors.blue.base};
                text-decoration: underline;

                > div {
                    color: ${colors.blue.base};
                }

                > div > i {
                    color: ${colors.blue.base};
                }
            }
        }
    }
`;

const MobileToggle = styled.a`
    float: right;
    padding: 5px;

    :focus {
        border: 1px solid ${props => (props.uhfTheme == 'dark' ? colors.white : colors.black)};
    }

    :hover {
        cursor: pointer;
        background-color: #FF00000;
    }
`;
const Line = styled.div`
    height: 2px;
    width: 20px;
    background-color: ${props => (props.uhfTheme == 'dark' ? colors.white : colors.black)};
    margin-bottom: 3px;
`;

export {
    Line,
    MobileToggle,
    NavMenuContainer,
    MenuLinkItem,
    MenuLinkSection,
    MicrosoftLogoSection
};
