import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';

// MSD components
import { MSDSectionHeader, TypographicEnd, ProfileCard } from '../../components';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';
import { setUhfThemeWhite } from '../../action-creators/uhfTheme';

// Styled components
import {
    PersonCards,
    Container,
    PeopleContainer,
    Section,
    WrappedHeaderContentContainer
} from './styledComponents';

class People extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
        this.handleFilterItemKeyDown = this.handleFilterItemKeyDown.bind(this);

        this.selectedTag = 'all';

        this.state = {
            profiles: [],
            currentCategory: '',
            categoryList: {
                all: 'All People',
                leadership: 'Leadership',
                gsl: 'Gray Systems Lab (GSL)'
                // alumni: 'Alumni'
            },
            sortedProfiles: [],
            vp: 4
        };

        this.fetchProfilesData();
    }

    fetchProfilesData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/profiles`
        )
            .then(response => response.json())
            .then(response => this.handleProfilesResponse(response))
            .catch(error => console.log(`Failed fetching profiles data: ${error}`));
    }

    handleProfilesResponse(response) {
        let profilePromiseArray = [];
        for (var i = 0; i < response.profiles.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/profile/${response.profiles[i].id}`;

            profilePromiseArray.push(
                fetch(fetchUrl)
                    .then(profileResponse => profileResponse.json())
                    .then(profileResponse => this.handleProfileResponse(profileResponse))
            );
        }

        return Promise.all(profilePromiseArray);
    }

    handleProfileResponse(response) {
        var profileList = this.state.profiles;

        profileList.push(response);

        profileList.sort((profile1, profile2) => {
            if (profile1.header < profile2.header) return -1;
            else if (profile1.header > profile2.header) return 1;
            else return 0;
            // var profile1Group = profile1.group;
            // var profile2Group = profile2.group;
            // var profile1Ordinal = profile1.ordinal;
            // var profile2Ordinal = profile2.ordinal;

            // if (profile1Group == 'leadership' && profile2Group != 'leadership') {
            //     return (profile1Ordinal < profile2Ordinal) ? -1 : (profile1Ordinal > profile2Ordinal) ? 1 : 0;
            // }
            // else {
            //     return 1;
            // }
        });

        this.setState({
            profiles: profileList,
            sortedProfiles: profileList
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
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.props.dispatch(setUhfThemeWhite());
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

    /**
     * Sort articles based on selected tag filter
     * @param {Object} response Medium data fetch response
     * @return {void}
     */
    sortProfiles(response) {
        if (!response && !this.state.profiles) return;

        var sortedProfiles = [];
        for (var i = 0; i < this.state.profiles.length; i++) {
            if (
                this.state.profiles[i].group === this.selectedTag ||
                this.selectedTag === 'all'
            ) {
                sortedProfiles.push(this.state.profiles[i]);
            }
        }

        this.setState({
            sortedProfiles: sortedProfiles
        });
    }

    /**
     * Handle filter list item click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleFilterItemClick(e) {
        this.selectedTag = e.target.getAttribute('id');
        this.sortProfiles();
    }

    handleFilterItemKeyDown(e) {
        var keys = Object.keys(this.state.categoryList);
        var btnIndex = keys.indexOf(e.target.getAttribute('id'));

        if (e.key == 'ArrowUp') {
            btnIndex--;
        } else if (e.key == 'ArrowDown') {
            btnIndex++;
        }

        if (btnIndex >= 0 && btnIndex < keys.length) {
            document.getElementById(keys[btnIndex]).focus();
        } else {
            document.activeElement.blur();
        }

        this.sortProfiles();
    }

    // /**
    //  * Generate filter list items
    //  * @return {JSX.Element[]}
    //  */
    generateFilterListItems() {
        return Object.keys(this.state.categoryList).map((tag, index) => {
            return (
                <button
                    data-testid={'FILTER_ARTICLE_CATEGORY_BUTTON_' + tag}
                    key={index}
                    id={tag}
                    aria-posinset={index + 1}
                    aria-selected={this.selectedTag === tag}
                    className={this.selectedTag === tag ? 'selected' : ''}
                    onKeyDown={this.handleFilterItemKeyDown}>
                    {this.state.categoryList[tag]}
                </button>
            );
        });
    }

    generatePeopleSection() {
        return (
            <Section innerRef={element => (this.sectionPeople = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <PersonCards>
                        <Page>
                            <Grid gutter={6} verticalAlign={'end'}>
                                {this.generatePeopleCards()}
                            </Grid>
                        </Page>
                    </PersonCards>
                </WrappedHeaderContentContainer>
            </Section>
        );
    }

    generatePeopleCards() {
        if (this.state.sortedProfiles.length === []) return;

        return this.state.sortedProfiles.map((id, index) => {
            const profile = this.state.sortedProfiles[index];

            return (
                <Column key={index} span={[12, 12, 6, 6, 3]}>
                    <ProfileCard profile={profile} />
                </Column>
            );
        });
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container id="mainContent" className="msd-articles">
                <Page>
                    <MSDSectionHeader
                        layout="article"
                        topBar={true}
                        headerText="People"
                        //detailText="Filter:"
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.black,
                            filterList: colors.gray.mid,
                            filterListSelected: colors.blue.base
                        }}
                        filterList={this.generateFilterListItems()}
                        onFilterItemClick={e => this.handleFilterItemClick(e)}
                    />
                </Page>
                <PeopleContainer>
                    <Page data-testid="CROSSPOSTED_MEDIUM_CONTENT">
                        {this.generatePeopleSection()}
                    </Page>
                </PeopleContainer>
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(People));
