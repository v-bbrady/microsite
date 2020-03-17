import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    ContactSection,
    Container,
    Name,
    JobTitle,
    SectionHeader,
    PivotContainer,
    ResearchSectionItem
} from './styledComponents';

import { setUhfThemeLightGray } from '../../action-creators/uhfTheme';

// FW components
import { Column, Grid } from '@ms-fw/fw-react/layouts';

import { Image } from '@ms-fw/fw-react/components';
import { ProfileContent } from '../profile-content';

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileData: {
                about: '',
                bio: '',
                email: '',
                github: '',
                group: '',
                image: '',
                jobTitle: '',
                name: '',
                msr: '',
                publications: [],
                projects: [],
                researchAreas: []
            }
        };
    }

    getProfileImage() {
        if (this.state.profileData.image == '') return;
        return (
            'https://azuredatamicrosite.blob.core.windows.net/images/' +
            this.state.profileData.profilePageImage
        );
    }

    componentDidMount() {
        this.props.dispatch(setUhfThemeLightGray());
    }

    componentDidUpdate(prevProps, nextProps) {
        if (this.props !== prevProps) {
            this.setState({
                profileData: this.props
            });
        }
    }

    getContactSectionInfo() {
        if (this.state.profileData === {}) return;

        var contacts = [];

        if (this.state.profileData.email) {
            contacts.push(
                `<a aria-label="${this.state.profileData.header} + ' Email'" href="mailto:${
                    this.state.profileData.email
                }">EMAIL</a>`
            );
        }

        if (this.state.profileData.msr) {
            contacts.push(
                `<a target="_blank" aria-label="${
                    this.state.profileData.header
                } + ' MSR page'" href="${this.state.profileData.msr}">MSR</a>`
            );
        }

        if (this.state.profileData.github) {
            contacts.push(
                `<a target="_blank" aria-label="${
                    this.state.profileData.header
                } + ' Github page'" href="${this.state.profileData.github}">GITHUB</a>`
            );
        }

        if (this.state.profileData.website) {
            contacts.push(
                `<a target="_blank" aria-label="${
                    this.state.profileData.header
                } + ' Website'" href="${this.state.profileData.website}">WEBSITE</a>`
            );
        }

        return contacts.join('&nbsp;|&nbsp;');
    }

    generateResearchAreaSection() {
        if (
            this.state.profileData.researchAreas == undefined ||
            this.state.profileData.researchAreas.length === 0
        )
            return;

        return this.state.profileData.researchAreas.map((id, index) => {
            var researchArea = '';

            switch (this.state.profileData.researchAreas[index]) {
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
                        "<a href='https://www.microsoft.com/en-us/research/research-area/artificial-intelligence' target='_blank'>Machine Learning</a>";
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

    render() {
        return (
            <Container>
                <Grid gutter={10}>
                    <Column row={1} span={[12, 12, 6, 2]} position={1}>
                        <Image style={{ maxWidth: '200px' }} vp4={this.getProfileImage()} />
                    </Column>
                    <Column row={[2, 2, 2, 1]} span={[12, 12, 6]} position={[1, 1, 1, 4]}>
                        <Name>{this.state.profileData.header}</Name>
                        <JobTitle>
                            <div>{this.state.profileData.jobTitle}</div>
                        </JobTitle>

                        <Grid gutter={6}>
                            <Column span={[12, 12, 12, 6]}>
                                <SectionHeader>Contact Info</SectionHeader>
                                <ContactSection>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: this.getContactSectionInfo()
                                        }}
                                    />
                                </ContactSection>
                            </Column>
                            {/* <Column span={[12, 12, 6, 6]}>
                                <SectionHeader>Research Areas</SectionHeader>
                                {this.generateResearchAreaSection()}
                            </Column> */}
                        </Grid>
                    </Column>
                    <PivotContainer
                        row={[6, 6, 1, 2]}
                        span={[12, 12, 12, 12]}
                        position={[1, 1, 5, 4]}>
                        <ProfileContent {...this.state.profileData} />
                    </PivotContainer>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(connect()(ProfileHeader));
