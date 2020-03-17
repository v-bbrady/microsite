import React from 'react';
import {
    AboutPivotSection,
    PivotSection,
    Container,
    ProjectsPivotSection,
    PublicationsPivotSection
} from './styledComponents';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react';
import { PublicationSection } from '../publications-section';
import { ProjectSection } from '../projects-section';
import { ProjectCard } from '../project-card';

// FW components
import { Column, Grid } from '@ms-fw/fw-react/layouts';

class ProfileContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: 'Year',
            months: this.mapMonthToIndex(),
            sortedProjects: [],
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
    }

    mapMonthToIndex() {
        var months = {};
        months['January'] = 1;
        months['February'] = 2;
        months['March'] = 3;
        months['April'] = 4;
        months['May'] = 5;
        months['June'] = 6;
        months['July'] = 7;
        months['August'] = 8;
        months['September'] = 9;
        months['October'] = 10;
        months['November'] = 11;
        months['December'] = 12;

        return months;
    }

    getAboutData() {
        return <div dangerouslySetInnerHTML={{ __html: this.props.about }} />;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            var projects = this.props.projects;

            if (projects !== undefined) {
                if (projects.length > 2) {
                    var months = this.state.months;

                    projects.sort((proj1, proj2) => {
                        //sort by reverse chronology
                        if (proj1.year > proj2.year) return -1;
                        if (proj1.year < proj2.year) return 1;

                        if (months[proj1.month] > months[proj2.month]) return -1;
                        if (months[proj1.month] < months[proj2.month]) return 1;

                        if (proj1.day > proj2.day) return -1;
                        if (proj1.day < proj2.day) return 1;

                        //lastly sort by title if same year/month
                        if (proj1.header < proj2.header) return -1;
                        if (proj1.header > proj2.header) return 1;

                        return 0;
                    });
                }

                this.setState({
                    sortedProjects: projects
                });
            }
        }
    }

    getOtherData() {
        return <div>Other Section data</div>;
    }

    getProjectsPivotSection() {
        if (this.state.sortedProjects.length > 0) {
            return (
                <PivotItem headerText="Projects">
                    <ProjectsPivotSection>
                        <ProjectSection
                            show4Column={true}
                            projects={this.state.sortedProjects}
                        />
                    </ProjectsPivotSection>
                </PivotItem>
            );
        }

        return '';
    }

    getPublicationsPivotSection() {
        if (this.props.publications !== undefined && this.props.publications.length > 0) {
            return (
                <PivotItem headerText="Publications">
                    <PublicationsPivotSection>
                        <PublicationSection
                            showTeaserVersion={false}
                            publications={this.props.publications}
                        />
                    </PublicationsPivotSection>
                </PivotItem>
            );
        }

        return '';
    }

    render() {
        return (
            <Container>
                <Pivot linkSize={PivotLinkSize.large}>
                    <PivotItem headerText="About">
                        <AboutPivotSection>{this.getAboutData()}</AboutPivotSection>
                    </PivotItem>
                    {/* {this.getProjectsPivotSection()} */}
                    {this.getPublicationsPivotSection()}
                </Pivot>
            </Container>
        );
    }
}

export { ProfileContent };
