import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Grid, Page } from '@ms-fw/fw-react/layouts';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// MSD components
import { MSDSectionHeader, TypographicEnd } from '../../components';

import { PublicationSection } from '../../components/publications-section';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';
import { setUhfThemeLightGray } from '../../action-creators/uhfTheme';

// Styled components
import {
    Container,
    PublicationsContainer,
    Section,
    WrappedHeaderContentContainer
} from './styledComponents';

class Publications extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);

        this.selectedTag = 'all';

        this.state = {
            publications: [],
            currentCategory: '',
            categoryList: {
                all: 'All Publications',
                cisl: 'CISL',
                gsl: 'GSL'
            },
            filteredPublications: [],
            vp: 4
        };

        this.fetchPublicationsData();
    }

    fetchPublicationsData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/publications`
        )
            .then(response => response.json())
            .then(response => this.handlePublicationsResponse(response))
            .catch(error => console.log(`Failed fetching publication data: ${error}`));
    }

    handlePublicationsResponse(response) {
        let publicationPromiseArray = [];

        for (var i = 0; i < response.publications.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/publication/${response.publications[i].id}`;

            publicationPromiseArray.push(
                fetch(fetchUrl)
                    .then(publicationResponse => publicationResponse.json())
                    .then(publicationResponse =>
                        this.handlePublicationResponse(publicationResponse)
                    )
                    .catch(error => console.log(`Failed fetching publication: ${i}: ${error}`))
            );
        }

        return Promise.all(publicationPromiseArray);
    }

    handlePublicationResponse(response) {
        var publicationList = this.state.publications;

        publicationList.push(response);

        this.setState({
            publications: publicationList,
            filteredPublications: publicationList
        });
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        this.props.dispatch(setUhfThemeLightGray());
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    /**
     * React method called when component will be unmounted
     * @return {void}
     */
    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    /**
     * Called on breakpoint change
     * @return {void}
     */
    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    filterPublications(response) {
        if (!response && !this.state.publications) return;

        var filteredPublications = [];
        for (var i = 0; i < this.state.publications.length; i++) {
            if (
                this.state.publications[i].group === this.selectedTag ||
                this.selectedTag === 'all'
            ) {
                filteredPublications.push(this.state.publications[i]);
            }
        }

        this.setState({
            filteredPublications: filteredPublications
        });
    }

    handleFilterItemClick(e) {
        this.selectedTag = e.target.getAttribute('id');
        this.filterPublications();
    }

    // generateFilterListItems() {
    //     return Object.keys(this.state.categoryList).map((tag, index) => {
    //         return (
    //             <button
    //                 data-testid={'FILTER_PUBLICATION_CATEGORY_BUTTON_' + tag}
    //                 key={index}
    //                 id={tag}
    //                 className={this.selectedTag === tag ? 'selected' : ''}>
    //                 {this.state.categoryList[tag]}
    //             </button>
    //         );
    //     });
    // }

    generatePublicationsSection() {
        return (
            <Section innerRef={element => (this.sectionPeople = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <PublicationSection
                            showTeaserVersion={false}
                            show4Column={true}
                            publications={this.state.publications}
                        />
                    </Page>
                </WrappedHeaderContentContainer>
            </Section>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container id="mainContent" className="ad-publications">
                <Page>
                    <MSDSectionHeader
                        layout="article"
                        headerText="Publications"
                        // detailText="Filter:"
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.black,
                            filterList: colors.gray.mid,
                            filterListSelected: colors.blue.base
                        }}
                        // filterList={this.generateFilterListItems()}
                        // onFilterItemClick={e => this.handleFilterItemClick(e)}
                    />
                </Page>
                <PublicationsContainer>
                    <Page>{this.generatePublicationsSection()}</Page>
                </PublicationsContainer>
                <TypographicEnd />
            </Container>
        );
    }
}

export default withRouter(connect()(Publications));
