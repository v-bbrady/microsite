import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// MSD components
import { TypographicEnd } from '../../components';
import ProfileHeader from '../../components/profile-header';
import { Container } from './styledComponents';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

/**
 * Data constants
 */

/**
 * Profile page component class
 */
class Profile extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        let pathArray = this.props.location.pathname.split('/');
        let id = '';

        while (id === '') {
            id = pathArray.pop();
        }

        this.state = {
            id: id,
            profileData: {
                about: '',
                bio: '',
                email: '',
                name: '',
                github: '',
                group: '',
                image: '',
                msr: '',
                publications: [],
                projects: []
            }
        };

        this.fetchProfileData();
    }

    fetchProfileData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/profile/${this.state.id}`
        )
            .then(response => response.json())
            .then(response => this.handleProfilesResponse(response))
            .catch(error =>
                console.log(`Failed fetching profile ${this.state.id} data: ${error}`)
            );
    }

    handleProfilesResponse(response) {
        this.setState({
            profileData: response
        });

        return this.fetchProjectData(response.group).then(
            fetch(
                `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/publications`
            )
                .then(pubResponse => pubResponse.json())
                .then(pubResponse =>
                    this.handlePublicationsResponse(pubResponse, response.group)
                )
        );
    }

    fetchProjectData(group) {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/projects`
        )
            .then(response => response.json())
            .then(response => this.handleProjectsResponse(response, group))
            .catch(error => console.log(`Error fetching gsl projects list error: ${error}`));
    }

    handleProjectsResponse(response, group) {
        let promiseArray = [];
        for (var i = 0; i < response.projects.length; i++) {
            if (response.projects[i].group == group) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/project/${response.projects[i].id}`;

                promiseArray.push(
                    fetch(fetchUrl)
                        .then(projectResponse => projectResponse.json())
                        .then(projectResponse => this.handleProjectResponse(projectResponse))
                        .catch(error =>
                            console.log(
                                `Error fetching project ${
                                    response.projects[i]
                                } error: ${error}`
                            )
                        )
                );
            }
        }

        return Promise.all(promiseArray);
    }

    handleProjectResponse(response) {
        if (this.state.profileData.projects === undefined) {
            this.state.profileData.projects = [];
        }
        for (var i = 0; i < response.people.length; i++) {
            if (response.people[i] == this.state.id) {
                this.state.profileData.projects.push(response);

                this.setState({
                    profileData: this.state.profileData
                });
                break;
            }
        }
    }

    handlePublicationsResponse(response, group) {
        var promiseArray = [];
        for (var i = 0; i < response.publications.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/publication/${response.publications[i].id}`;

            promiseArray.push(
                fetch(fetchUrl)
                    .then(publicationResponse => publicationResponse.json())
                    .then(publicationResponse =>
                        this.handlePublicationResponse(publicationResponse)
                    )
                    .catch(error =>
                        console.log(
                            `Error fetching publication ${
                                response.publications[i]
                            } error: ${error}`
                        )
                    )
            );
        }

        return Promise.all(promiseArray);
    }

    handlePublicationResponse(response) {
        if (this.state.profileData.publications === undefined) {
            this.state.profileData.publications = [];
        }

        var isPublicationForPlayer = false;

        for (var i = 0; i < response.authors.length; i++) {
            if (response.authors[i] == this.state.id) {
                isPublicationForPlayer = true;
                break;
            }
        }

        if (!isPublicationForPlayer) {
            return;
        }

        this.state.profileData.publications.push(response);

        this.state.profileData.publications = this.sortResearchAreas(
            this.state.profileData.publications
        );

        this.setState({
            profileData: this.state.profileData
        });
    }

    //ensure the research areas are sorted alphabetically (in case of multiple) so that when we change the sort order later, we compare them accurately.
    sortResearchAreas(publications) {
        var pubs = publications;
        pubs.forEach(publication => {
            publication.researchArea = publication.researchArea.sort(function(a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
            });
        });

        return pubs;
    }

    render() {
        return (
            <Container id="mainContent" className="msd-profile">
                <ProfileHeader {...this.state.profileData} />
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(Profile));
