import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { NavMenu } from '../../components/nav-menu';

class UniversalHeader extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        // Get current page category
        let pathArray = this.props.location.pathname.split('/');
        let category = '';

        while (category === '') {
            category = pathArray.shift();
        }

        this.state = {
            category: category,
            theme: props.theme
        };
    }

    generateNavMenu() {
        return [
            {
                text: 'Azure Data',
                link: '/',
                key: 'homeMenuItem'
            },
            {
                text: 'Research Lab',
                key: 'labMenuItem',
                submenu: {
                    items: [
                        {
                            key: 'LabsOverviewMenuItem',
                            text: 'Gray Systems Lab (GSL)',
                            href: '/labs/gsl'
                        },
                        {
                            key: 'peopleMenuItem',
                            text: 'People',
                            href: '/people'
                        },
                        // {
                        //     key: 'projectsMenuItem',
                        //     text: 'Projects',
                        //     href: '/projects'
                        // },
                        {
                            key: 'publicationMenuItem',
                            text: 'Publications',
                            href: '/publications'
                        }
                    ]
                }
            },
            {
                text: 'Careers',
                key: 'careersMenuItem',
                submenu: {
                    items: [
                        {
                            key: 'careersOverviewMenuItem',
                            text: 'Life at Azure Data',
                            href: '/careers'
                        },
                        {
                            key: 'cultureArticles',
                            text: 'Our Culture',
                            href: '/careers/culture'
                        }
                    ]
                }
            },
            // {
            //     text: 'Events',
            //     link: '/events',
            //     key: 'eventsMenuItem'
            // },
            {
                text: 'News & Insights',
                link: '/articles',
                key: 'articlesMenuItem'
            },
            {
                text: 'Solutions',
                key: 'solutionsMenuItem',
                submenu: {
                    items: [
                        {
                            key: 'SolutionsMSDataPlatform',
                            href: 'https://www.microsoft.com/en-us/sql-server/',
                            text: 'Data Platform',
                            target: '_blank'
                        },
                        {
                            key: 'SolutionsMSDataPlatform',
                            href: 'https://azure.microsoft.com/en-us/overview/data-platform/',
                            text: 'Azure Data Services',
                            target: '_blank'
                        }
                    ]
                }
            },
            {
                text: 'About',
                link: '/about',
                key: 'aboutMenuItem'
            }
        ];
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <React.Fragment>
                <div role="banner">
                    <NavMenu
                        menuItems={this.generateNavMenu()}
                        uhfTheme={this.props.uhfTheme}
                        theme={this.props.theme}
                    />
                </div>
            </React.Fragment>
        );
    }

    /**
     * Append theme class name to existing class names
     * @param {string} classNames
     * @return {string}
     */
    appendThemeClassName(classNames) {
        if (!classNames) classNames = '';

        return `theme-${this.props.uhfTheme} ${classNames}`;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        theme: state.theme,
        uhfTheme: state.uhfTheme,
        transparentUHF: state.transparentUHF
    };
};

export default withRouter(connect(mapStateToProps)(UniversalHeader));
