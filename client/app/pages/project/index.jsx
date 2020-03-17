import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PublicationSection } from '../../components/publications-section';
require('@babel/polyfill');
require('isomorphic-fetch');

// MSD components
import { TypographicEnd } from '../../components';
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react';
import { setUhfThemeWhite } from '../../action-creators/uhfTheme';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

import {
    Container,
    Image,
    JobSection,
    LabelSection,
    NameSection,
    PersonCard,
    PeopleColumn,
    PeopleSection,
    PivotSection,
    ProjectDetailsSection,
    StyledHeader,
    StyledParagraph
} from './styledComponents.js';

class Project extends React.Component {
    constructor(props) {
        super(props);

        let pathArray = this.props.location.pathname.split('/');
        let id = '';

        while (id === '') {
            id = pathArray.pop();
        }

        this.state = {
            id: id,
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            projectData: {
                people: [],
                overview: '',
                publications: [],
                date: '',
                title: ''
            },
            publications: [],
            people: []
        };

        this.fetchProjectData();
    }

    componentDidMount() {
        this.props.dispatch(setUhfThemeWhite());
    }

    fetchProjectData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/project/${this.state.id}`
        )
            .then(response => response.json())
            .then(response => this.handleProjectsResponse(response))
            .catch(error =>
                console.log(`Failed fetching project ${this.state.id} data: ${error}`)
            );
    }

    handleProjectsResponse(response) {
        this.setState({
            projectData: response
        });

        return this.fetchPublications(response).then(this.fetchPeopleData(response));
    }

    fetchPublications(response) {
        let publicationPromiseArray = [];
        for (var i = 0; i < response.publications.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/publication/${response.publications[i]}`;

            publicationPromiseArray.push(
                fetch(fetchUrl)
                    .then(publicationResponse => publicationResponse.json())
                    .then(publicationResponse =>
                        this.handlePublicationResponse(publicationResponse)
                    )
            );
        }

        return Promise.all(publicationPromiseArray);
    }

    handlePublicationResponse(response) {
        var publicationList = this.state.publications;

        publicationList.push(response);

        this.setState({
            publications: publicationList
        });
    }

    fetchPeopleData(response) {
        let peoplePromiseArray = [];
        for (var i = 0; i < response.people.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/profile/${response.people[i]}`;

            peoplePromiseArray.push(
                fetch(fetchUrl)
                    .then(peopleResponse => peopleResponse.json())
                    .then(peopleResponse => this.handlePeopleResponse(peopleResponse))
            );
        }

        return Promise.all(peoplePromiseArray);
    }

    handlePeopleResponse(response) {
        var peopleList = this.state.people;

        peopleList.push(response);

        this.setState({
            people: peopleList
        });
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    getRenderedDate() {
        if (this.state.projectData.date == '') {
            return;
        }

        var date = new Date(this.state.projectData.date.split('T')[0]);

        return (
            <div>{`Established: ${
                this.state.months[date.getMonth()]
            } ${date.getDay()}, ${date.getFullYear()}`}</div>
        );
    }

    generatePeopleSection() {
        if (this.state.people.length === 0) return;

        return this.state.people.map((id, index) => {
            var person = this.state.people[index];

            return (
                <PersonCard key={id + index} href={`/profile/${person.id}`}>
                    <Image src={this.getAzureBlobStoragePath() + person.profilePageImage} />
                    <NameSection>{person.header}</NameSection>
                    <JobSection>{person.jobTitle}</JobSection>
                </PersonCard>
            );
        });
    }

    render() {
        return (
            <Container id="mainContent" className="msd-profile">
                <Page>
                    <StyledHeader
                        layout="horizontal"
                        headerText={this.state.projectData.header}
                        headerText2={this.state.projectData.subtitle}
                        topBar={false}
                        color={{
                            topBar: '#0078D4',
                            headerText: '#0078D4',
                            headerText2: colors.black,
                            detailText: '#505050',
                            linkText: '#0078d4'
                        }}
                        debug={false}
                    />
                    <Grid>
                        <Column span={12}>{this.getRenderedDate()}</Column>
                    </Grid>
                </Page>
                <ProjectDetailsSection>
                    <Page>
                        <Grid>
                            <Column span={[12, 10]}>
                                <Pivot linkSize={PivotLinkSize.large}>
                                    <PivotItem headerText="Overview">
                                        <PivotSection>
                                            <StyledParagraph
                                                dangerouslySetInnerHTML={{
                                                    __html: this.state.projectData.overview
                                                }}
                                            />
                                        </PivotSection>
                                    </PivotItem>
                                    <PivotItem headerText="Publications">
                                        <PivotSection>
                                            <PublicationSection
                                                showTeaserVersion={false}
                                                show4Column={true}
                                                publications={this.state.publications}
                                            />
                                        </PivotSection>
                                    </PivotItem>
                                </Pivot>
                            </Column>
                            <PeopleColumn span={[12, 4, 4, 4, 2]} position="10">
                                <PeopleSection>
                                    <LabelSection>People</LabelSection>
                                    {this.generatePeopleSection()}
                                </PeopleSection>
                            </PeopleColumn>
                        </Grid>
                    </Page>
                </ProjectDetailsSection>
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(Project));
