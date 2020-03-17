import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
require('@babel/polyfill');
require('isomorphic-fetch');

// MSD components
import { TypographicEnd } from '../../components';
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import { colors } from '../../lib/variables/styledComponentsVariables.js';
import { setUhfThemeWhite } from '../../action-creators/uhfTheme';

import {
    AuthorSection,
    Container,
    LabelSection,
    ProjectDetailsSection,
    ResearchColumn,
    ResearchSection,
    StyledHeader,
    StyledParagraph,
    ResearchSectionItem,
    PubLinksSection,
    PublicationSection,
    PDFSection
} from './styledComponents.js';

class Publication extends React.Component {
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
            publicationData: {
                authors: [],
                bodyText: '',
                pubLinks: [],
                publicationDate: '',
                platform: '',
                organizer: '',
                publisher: '',
                header: '',
                researchArea: []
            },
            people: [],
            publicationPDF: ''
        };

        this.fetchPublicationData();
    }

    componentDidMount() {
        this.props.dispatch(setUhfThemeWhite());
    }

    fetchPublicationData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/publication/${this.state.id}`
        )
            .then(response => response.json())
            .then(response => this.handlePublicationResponse(response))
            .catch(error =>
                console.log(`Failed fetching publication ${this.state.id} data: ${error}`)
            );
    }

    handlePublicationResponse(response) {
        this.setState({
            publicationData: response
        });

        return this.fetchProfiles(response);
    }

    fetchProfiles(response) {
        let profilesPromiseArray = [];

        for (var i = 0; i < response.authors.length; i++) {
            let profileId = response.authors[i];

            //all internal profiles are stored as GUIDs, if it's just an author without a profile page we avoid the lookup
            if (validator.isUUID(profileId)) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/profile/${profileId}`;

                profilesPromiseArray.push(
                    fetch(fetchUrl)
                        .then(profileResponse => profileResponse.json())
                        .then(profileResponse => this.handleProfilesResponse(profileResponse))
                        .catch(error =>
                            this.handleAuthorProfileErrorResponse(error, 'error', profileId)
                        )
                );
            } else {
                this.handleAuthorProfileErrorResponse(
                    'No fetch attempted, id is not a Guid',
                    'warning',
                    profileId
                );
            }
        }

        return Promise.all(profilesPromiseArray);
    }

    handleAuthorProfileErrorResponse(error, errortype, id) {
        console.log(`Author Id (${id}): ${errortype} ${error}`);
        debugger;
        var authorLists = this.state.people;
        authorLists.push(id);

        this.setState({
            people: authorLists
        });
    }

    handleProfilesResponse(response) {
        debugger;
        var profilesList = this.state.people;

        var profileLink = `<a style="color:${colors.blue.base};" href='/profile/${
            response.id
        }'>${response.header}</a>`;
        profilesList.push(profileLink);

        this.setState({
            people: profilesList
        });
    }

    getPlatformDateSection() {
        if (this.state.publicationData.publicationDate == '') {
            return;
        }

        var date = new Date(this.state.publicationData.publicationDate.split('T')[0]);

        return (
            <div>
                <PublicationSection>{this.state.publicationData.platform}</PublicationSection>{' '}
                {` | ${this.state.months[date.getMonth()]} ${date.getFullYear()}`}
            </div>
        );
    }

    generateResearchAreaSection() {
        if (this.state.publicationData.researchArea.length === 0) return;

        return this.state.publicationData.researchArea.map((id, index) => {
            var researchArea = '';

            switch (this.state.publicationData.researchArea[index]) {
                case 'analysis': {
                    researchArea =
                        "<a href='https://www.microsoft.com/en-us/research/research-area/data-platform-analytics/' target='_blank'>Data Management, analysis, and visualization</a>";
                    break;
                }
                case 'algorithms': {
                    researchArea =
                        "<a href='https://www.microsoft.com/en-us/research/research-area/algorithms/' target='_blank'>Algorithms</a>";
                    break;
                }
                case 'systems': {
                    researchArea =
                        "<a href='https://www.microsoft.com/en-us/research/research-area/systems-and-networking/' target='_blank'>Systems and networking</a>";
                    break;
                }
                case 'ml': {
                    researchArea =
                        "<a href='https://www.microsoft.com/en-us/research/research-area/artificial-intelligence/' target='_blank'>Machine Learning</a>";
                    break;
                }
            }

            return (
                <ResearchSectionItem
                    key={id + index}
                    dangerouslySetInnerHTML={{ __html: researchArea }}
                />
            );
        });
    }

    getAuthorsSection() {
        if (this.state.people.length === 0) return;

        var people = this.state.people.join(', ');

        return (
            <AuthorSection className="author">
                <div dangerouslySetInnerHTML={{ __html: people }} />
            </AuthorSection>
        );
    }

    getOrganizer() {
        if (
            this.state.publicationData.organizer === '' ||
            this.state.publicationData.organizer === null
        ) {
            return;
        } else {
            return `Organized by ${this.state.publicationData.organizer}`;
        }
    }

    getPublisher() {
        if (
            this.state.publicationData.publisher === '' ||
            this.state.publicationData.publisher === null
        ) {
            return;
        } else {
            return `Published by ${this.state.publicationData.publisher}`;
        }
    }

    getPubLinks() {
        if (
            this.state.publicationData.pubLinks === [] ||
            this.state.publicationData.pubLinks === null
        ) {
            return;
        }

        var links = [];
        var pubLinks = this.state.publicationData.pubLinks;

        for (var index in pubLinks) {
            links.push(`<a href=${pubLinks[index]} target="blank">Go to Publication</a>`);
        }
        return links.join(' | ');
    }

    getPublicationLink() {
        if (this.state.publicationData.pubLinks.length <= 0) return;

        return `<a href=${
            this.state.publicationData.pubLinks[0]
        } target="_blank">View Publication</a>`;
    }

    render() {
        return (
            <Container id="mainContent" className="msd-profile">
                <Page>
                    <StyledHeader
                        layout="horizontal"
                        headerText={this.state.publicationData.header}
                        headerText2={this.state.publicationData.subtitle}
                        topBar={false}
                        color={{
                            topBar: '#0078D4',
                            headerText: '#0078D4',
                            headerText2: '#000000',
                            detailText: '#505050',
                            linkText: '#0078d4'
                        }}
                        debug={false}
                    />
                    <Grid>
                        <Column span={12}>{this.getAuthorsSection()}</Column>
                        <Column span={12}>{this.getPlatformDateSection()}</Column>
                        <Column span={12}>
                            {this.getOrganizer()}
                            {this.getPublisher()}
                        </Column>
                        <PubLinksSection
                            span={12}
                            dangerouslySetInnerHTML={{ __html: this.getPubLinks() }}>
                            {}
                        </PubLinksSection>
                    </Grid>
                </Page>
                <ProjectDetailsSection>
                    <Page>
                        <Grid>
                            <Column span={[12, 10]}>
                                <StyledParagraph
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.publicationData.bodyText
                                    }}
                                />
                            </Column>
                            <ResearchColumn span={[12, 4, 4, 4, 2]} position="10">
                                <ResearchSection>
                                    <PDFSection
                                        dangerouslySetInnerHTML={{
                                            __html: this.getPublicationLink()
                                        }}
                                    />
                                    <LabelSection>Research Areas</LabelSection>
                                    {this.generateResearchAreaSection()}
                                </ResearchSection>
                            </ResearchColumn>
                        </Grid>
                    </Page>
                </ProjectDetailsSection>
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(Publication));
