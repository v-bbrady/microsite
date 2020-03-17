import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Page } from '@ms-fw/fw-react/layouts';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

import { MSDSectionHeader, TypographicEnd } from '../../components';

import { ProjectSection } from '../../components/projects-section';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';
import { setUhfThemeLightGray } from '../../action-creators/uhfTheme';

// Styled components
import {
    Container,
    ProjectsContainer,
    Section,
    WrappedHeaderContentContainer
} from './styledComponents';

class Projects extends React.Component {
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
            projects: [],
            currentCategory: '',
            categoryList: {
                all: 'All Projects',
                cisl: 'CISL',
                gsl: 'GSL'
            },
            filteredProjects: [],
            vp: 4
        };

        this.fetchProjectsData();
    }

    fetchProjectsData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/projects`
        )
            .then(response => response.json())
            .then(response => this.handleProjectsResponse(response))
            .catch(error => console.log(`Failed fetching projects data: ${error}`));
    }

    handleProjectsResponse(response) {
        let projectPromiseArray = [];

        for (var i = 0; i < response.projects.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/project/${response.projects[i].id}`;

            projectPromiseArray.push(
                fetch(fetchUrl)
                    .then(projectResponse => projectResponse.json())
                    .then(projectResponse => this.handleProjectResponse(projectResponse))
                    .catch(error => console.log(`Failed fetching project: ${i}: ${error}`))
            );
        }

        return Promise.all(projectPromiseArray);
    }

    handleProjectResponse(response) {
        var projectList = this.state.projects;

        projectList.push(response);

        this.setState({
            projects: projectList,
            filteredProjects: projectList
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

    filterProjects(response) {
        if (!response && !this.state.projects) return;

        var filteredProjects = [];
        for (var i = 0; i < this.state.projects.length; i++) {
            if (
                this.state.projects[i].group === this.selectedTag ||
                this.selectedTag === 'all'
            ) {
                filteredProjects.push(this.state.projects[i]);
            }
        }

        this.setState({
            filteredProjects: filteredProjects
        });
    }

    handleFilterItemClick(e) {
        this.selectedTag = e.target.getAttribute('id');
        this.filterProjects();
    }

    generateFilterListItems() {
        return Object.keys(this.state.categoryList).map((tag, index) => {
            return (
                <button
                    data-testid={'FILTER_PROJECT_CATEGORY_BUTTON_' + tag}
                    key={index}
                    id={tag}
                    className={this.selectedTag === tag ? 'selected' : ''}>
                    {this.state.categoryList[tag]}
                </button>
            );
        });
    }

    generateProjectsSection() {
        return (
            <Section innerRef={element => (this.sectionPeople = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <ProjectSection
                            show4Column={true}
                            projects={this.state.filteredProjects}
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
            <Container id="mainContent" className="ad-projects">
                <Page>
                    <MSDSectionHeader
                        layout="article"
                        headerText="Projects"
                        // detailText="Filter:"
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.black,
                            filterList: colors.gray.mid,
                            filterListSelected: colors.blue.base
                        }}
                        // // filterList={this.generateFilterListItems()}
                        // // onFilterItemClick={e => this.handleFilterItemClick(e)}
                    />
                </Page>
                <ProjectsContainer>
                    <Page>{this.generateProjectsSection()}</Page>
                </ProjectsContainer>
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(Projects));
