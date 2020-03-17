import React from 'react';

// MSD utilities and helpers
import { initializeIcons, CommandBarButton, DefaultButton } from 'office-ui-fabric-react';

import { breakpoints } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import {
    Line,
    MobileToggle,
    NavMenuContainer,
    MenuLinkItem,
    MenuLinkSection,
    MicrosoftLogoSection
} from './styledComponents';
import { Column, Page } from '@ms-fw/fw-react/layouts';

export class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        initializeIcons();

        this.toggleMenuClick = this.toggleMenuClick.bind(this);
        this._isMounted = true;

        let pathArray = window.location.href.split('/');
        let category = '';

        category = pathArray.pop();

        if (category == '') {
            category = 'azuredata';
        }

        var shouldShowMobileToggle = window.innerWidth <= 768;

        this.state = {
            activeCategory: category,
            showMobileToggle: shouldShowMobileToggle,
            forceToggle: false,
            showMenu: !shouldShowMobileToggle
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('resize', this.handleWindowResize.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.handleWindowResize.bind(this));
    }

    handleWindowResize() {
        var shouldShowMobileToggle = window.innerWidth <= 768;

        this.setState({
            showMobileToggle: shouldShowMobileToggle
        });

        if (shouldShowMobileToggle) {
            this.setState({
                showMenu: this.state.forceToggle ? true : false
            });
        } else {
            this.setState({
                showMenu: true
            });
        }
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    generateMenuLinks() {
        if (this.props.menuItems.length <= 0) return;

        return this.props.menuItems.map((menuItem, index) => {
            var button;
            var btnClassName = '';

            if (menuItem.submenu) {
                for (var i = 0; i < menuItem.submenu.items.length; i++) {
                    var subMenuCategory = menuItem.submenu.items[i].href.split('/');
                    //first dropdown item is the main category for the pages so highlight that one.
                    if (
                        subMenuCategory[subMenuCategory.length - 1] ===
                        this.state.activeCategory
                    ) {
                        btnClassName = 'activeMenuItem';
                        break;
                    }
                }

                button = (
                    <CommandBarButton
                        ariaLabel={menuItem.text + ' collapsed dropdown'}
                        className={btnClassName}
                        data-automation-id={menuItem.key}
                        text={menuItem.text}
                        menuProps={menuItem.submenu}
                        href={menuItem.link}
                    />
                );
            } else {
                var menuCategory = menuItem.link.split('/');

                if (menuCategory[menuCategory.length - 1] === this.state.activeCategory) {
                    btnClassName = 'activeMenuItem';
                }

                button = (
                    <DefaultButton
                        className={btnClassName}
                        data-automation-id={menuItem.key}
                        text={menuItem.text}
                        href={menuItem.link}
                    />
                );
            }

            if (this.state.showMenu || menuItem.key == 'homeMenuItem') {
                return (
                    <MenuLinkItem
                        uhfTheme={this.props.uhfTheme}
                        className="menuLinkItem"
                        key={menuItem.key}>
                        {button}
                    </MenuLinkItem>
                );
            }
        });
    }

    toggleMenuClick() {
        this.setState({
            showMenu: !this.state.showMenu,
            forceToggle: !this.state.forceToggle
        });
    }

    getMicrosoftLogoSection() {
        var logo =
            this.props.uhfTheme == 'dark' ? 'microsoft-logo-white.svg' : 'microsoft-logo.svg';

        if (this.state.showMobileToggle) {
            return (
                <MicrosoftLogoSection isdarktheme={this.props.isdarktheme}>
                    <a href="https://www.microsoft.com">
                        <img
                            height={24}
                            src={`${this.getAzureBlobStoragePath() + logo}`}
                            alt="Microsoft Logo that links to Microsoft.com"
                        />
                    </a>
                    <MobileToggle
                        uhfTheme={this.props.uhfTheme}
                        href="#"
                        onClick={this.toggleMenuClick}
                        aria-label="Main Navigation Hamburger Menu">
                        <Line uhfTheme={this.props.uhfTheme} />
                        <Line uhfTheme={this.props.uhfTheme} />
                        <Line uhfTheme={this.props.uhfTheme} />
                    </MobileToggle>
                </MicrosoftLogoSection>
            );
        } else {
            return (
                <MicrosoftLogoSection isdarktheme={this.props.isdarktheme}>
                    <a href="https://www.microsoft.com">
                        <img
                            height={24}
                            src={`${this.getAzureBlobStoragePath() + logo}`}
                            alt="Microsoft Logo that links to Microsoft.com"
                        />
                    </a>
                </MicrosoftLogoSection>
            );
        }
    }

    render() {
        return (
            <NavMenuContainer
                role="navigation"
                uhfTheme={this.props.uhfTheme}
                theme={this.props.theme}>
                <Page>
                    <div>&nbsp;</div>
                    <div>
                        {this.getMicrosoftLogoSection()}
                        <MenuLinkSection
                            className="menuLinkSection"
                            uhfTheme={this.props.uhfTheme}
                            theme={this.props.theme}>
                            {this.generateMenuLinks()}
                        </MenuLinkSection>
                    </div>
                </Page>
            </NavMenuContainer>
        );
    }
}
