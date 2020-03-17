import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { PublicationSection } from '../../components/publications-section';
import { ProjectSection } from '../../components/projects-section';
import { EmbeddedMap } from '../../components/map-embed';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// FW utilities and helpers
import { setThemeBlue } from '../../action-creators/theme';
import { setUhfThemeDark } from '../../action-creators/uhfTheme';

// MSD components
import { ArticleCard, MSDSectionHeader, ProfileCard, TypographicEnd } from '../../components';

// MSD utitilies and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import {
    Container,
    ContactInfoContentContainer,
    FeaturedCardSection,
    PivotSection,
    PivotItemSection,
    PivotSectionContainer,
    PivotSectionHeader,
    PivotGridSection,
    Section,
    WrappedHeaderContentContainer,
    PersonCards,
    PersonContacts,
    PublicationsPage,
    TextSection,
    HeaderSection,
    PageIntroSection,
    VisionSection
} from './styledComponents';

const MAP_CONTACT_INFO = {
    title: 'Gray Systems Lab',
    suite: 'Suite 400',
    address: '634 W. Main St',
    city: 'Madison',
    state: 'Wi',
    zipcode: '53703',
    phone: '(608) 310-3350',
    fax: '(608) 310-4475'
};

/**
 * Fluent page component
 */
class GSL extends React.Component {
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);

        this.state = {
            page: {
                heroCard: null,
                featureSection: null,
                curatedProfiles: [],
                curatedProjects: [],
                curatedPublications: [],
                pivotItemSections: null
            },
            selectedKey: 'mission',
            profiles: [],
            projects: [],
            publications: [],
            featuredHeroArticle: null,
            vp: 4
        };

        this.fetchPageData();
        // this.fetchProfilesData();
    }

    fetchPageData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/page/gsl`
        )
            .then(response => response.json())
            .then(response => this.handlePageResponse(response));
    }

    handlePageResponse(response) {
        let promiseArray = [];

        if (response.page.curatedProjects !== null) {
            for (var i = 0; i < response.page.curatedProjects.length; i++) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/project/${
                    response.page.curatedProjects[i].id
                }`;

                promiseArray.push(
                    fetch(fetchUrl)
                        .then(projectResponse => projectResponse.json())
                        .then(projectResponse => this.handleProjectResponse(projectResponse))
                );
            }
        }

        if (response.page.curatedProfiles !== null) {
            for (var i = 0; i < response.page.curatedProfiles.length; i++) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/profile/${
                    response.page.curatedProfiles[i].id
                }`;

                promiseArray.push(
                    fetch(fetchUrl)
                        .then(profileResponse => profileResponse.json())
                        .then(profileResponse => this.handlePeopleResponse(profileResponse))
                );
            }
        }

        if (response.page.curatedPublications !== null) {
            for (var i = 0; i < response.page.curatedPublications.length; i++) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/publication/${
                    response.page.curatedPublications[i].id
                }`;

                promiseArray.push(
                    fetch(fetchUrl)
                        .then(publicationResponse => publicationResponse.json())
                        .then(publicationResponse =>
                            this.handlePublicationResponse(publicationResponse)
                        )
                );
            }
        }

        if (response.page.featureSection.articleId !== null) {
            promiseArray.push(
                fetch(
                    `https://${
                        process.env.REACT_APP_SERVICE_URL
                    }.azurewebsites.net/api/azuredata/article/${
                        response.page.featureSection.articleId
                    }`
                )
                    .then(featureSectionResponse => featureSectionResponse.json())
                    .then(featureSectionResponse =>
                        this.handleFeatureSectionResponse(featureSectionResponse)
                    )
                    .catch(error =>
                        console.log(
                            `Failed fetching feature section article ${
                                this.state.id
                            } data: ${error}`
                        )
                    )
            );
        }

        this.setState({
            page: response.page
        });

        return Promise.all(promiseArray);
    }

    handleFeatureSectionResponse(response) {
        this.setState({
            featureSectionArticle: response
        });
    }

    handleProjectResponse(response) {
        var projectList = this.state.projects;

        projectList.push(response);

        this.setState({
            projects: projectList
        });
    }

    handlePeopleResponse(response) {
        var peopleList = this.state.profiles;

        peopleList.push(response);

        var sortedPeople = [];

        for (let i = 0; i < this.state.page.curatedProfiles.length; i++) {
            var curatedProfile = this.state.page.curatedProfiles[i];
            var person = peopleList.find(p => p.id == curatedProfile.id);

            if (person !== undefined) {
                sortedPeople.push(person);
            }
        }

        this.setState({
            profiles: sortedPeople
        });
    }

    handlePublicationResponse(response) {
        var publicationList = this.state.publications;

        publicationList.push(response);

        this.setState({
            publications: publicationList
        });
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        this.props.dispatch(setThemeBlue());
        this.props.dispatch(setUhfThemeDark());

        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    generatePageIntro() {
        if (this.state.page.heroCard == null) return;

        const pageIntroData = {
            sectionHeader: {
                layout: 'link',
                headerText: this.state.page.heroCard.header,
                headerText2: this.state.page.heroCard.subtitle,
                detailText: this.state.page.heroCard.description,
                color: {
                    headerText: colors.white,
                    headerText2: colors.blue.header,
                    detailText: colors.gray.light,
                    linkText: colors.white
                }
            },
            image: {
                vp6: this.state.page.heroCard.imageVP6,
                vp5: this.state.page.heroCard.imageVP5,
                vp4: this.state.page.heroCard.imageVP4,
                vp3: this.state.page.heroCard.imageVP3,
                vp2: this.state.page.heroCard.imageVP2,
                vp1: this.state.page.heroCard.imageVP1,
                alt: this.state.page.heroCard.imageAlt
            },
            backgroundColor: '#000'
        };

        return <PageIntroSection {...pageIntroData} />;
    }

    generateMissionSection() {
        if (this.state.page.pivotItemSections == null) return <div />;

        return (
            <HeaderSection innerRef={element => (this.sectionMission = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <MSDSectionHeader
                            row={1}
                            layout="link"
                            headerText="About"
                            color={{
                                headerText: '#0078D4'
                            }}
                            debug={false}
                        />
                        <div>&nbsp;</div>
                        <PivotGridSection>
                            <Column>
                                <TextSection
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.page.pivotItemSections
                                            .missionSection
                                    }}
                                />
                            </Column>
                        </PivotGridSection>
                    </Page>
                </WrappedHeaderContentContainer>
            </HeaderSection>
        );
    }

    generateFeatureSectionCard() {
        if (this.state.featureSectionArticle == null) return;

        let size = 'small';
        var article = this.state.featureSectionArticle;

        // Set card size and span based on viewport
        switch (this.state.vp) {
            case 6:
            case 5:
            case 4:
                size = 'large';
                break;
            case 3:
                size = 'medium';
                break;
            case 2:
            case 1:
            default:
                break;
        }

        var link = `/articles/${article.id}`;

        var vp1String =
            article.imageVP1 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP1}`
                : null;
        var vp2String =
            article.imageVP2 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP2}`
                : null;
        var vp3String =
            article.imageVP3 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP3}`
                : null;
        var vp4String =
            article.imageVP4 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP4}`
                : null;
        var vp5String =
            article.imageVP5 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP5}`
                : null;
        var vp6String =
            article.imageVP6 != null
                ? `${this.getAzureBlobStoragePath() + article.imageVP6}`
                : null;

        return (
            <FeaturedCardSection gutter={6}>
                <Column span={12} data-testid="ARTICLE_FEATURED_POST">
                    <ArticleCard
                        isExternalLink={article.isExternalLink}
                        caption={article.category.toUpperCase()}
                        size={size}
                        header={article.header}
                        subtitle={article.subtitle}
                        subheading={article.summary}
                        linkText={'Learn More'}
                        color={{
                            headerText: colors.blue.base,
                            headerText2: colors.black,
                            detailText: colors.gray.mid,
                            linkText: colors.black
                        }}
                        href={link}
                        image={{
                            vp1: vp1String,
                            vp2: vp2String,
                            vp3: vp3String,
                            vp4: vp4String,
                            vp5: vp5String,
                            vp6: vp6String,
                            alt: article.imageAlt
                        }}
                        date={article.date}
                    />
                </Column>
            </FeaturedCardSection>
        );
    }

    generateProjectsSection() {
        if (this.state.projects.length === 0) return;

        return (
            <Section innerRef={element => (this.sectionProject = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <MSDSectionHeader
                            row={1}
                            layout="link"
                            headerText="Projects"
                            linkText="View all"
                            ariaLabel="View all Projects"
                            href="/projects"
                            detailText="Discover what projects GSL is working on"
                            topBar={true}
                            color={{
                                topBar: '#0078D4',
                                headerText: '#0078D4',
                                detailText: '#505050',
                                linkText: '#0078d4'
                            }}
                            debug={false}
                        />
                        <ProjectSection show4Column={true} projects={this.state.projects} />
                    </Page>
                </WrappedHeaderContentContainer>
            </Section>
        );
    }

    generatePublicationsSection() {
        return (
            <Section innerRef={element => (this.sectionPublication = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <PublicationsPage>
                        <MSDSectionHeader
                            row={1}
                            layout="link"
                            headerText="Publications"
                            linkText="View all"
                            ariaLabel="View all Publications"
                            href="/publications"
                            detailText="&nbsp;"
                            topBar={true}
                            color={{
                                topBar: '#0078D4',
                                headerText: '#0078D4',
                                detailText: '#505050',
                                linkText: '#0078d4'
                            }}
                            debug={false}
                        />
                        <PublicationSection
                            showTeaserVersion={false}
                            show4Column={true}
                            publications={this.state.publications}
                        />
                    </PublicationsPage>
                </WrappedHeaderContentContainer>
            </Section>
        );
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
                            <MSDSectionHeader
                                row={1}
                                layout="link"
                                headerText="People"
                                linkText="View all"
                                ariaLabel="View all Profiles"
                                href="/people"
                                detailText="Learn more about the GSL team."
                                topBar={true}
                                color={{
                                    topBar: '#0078D4',
                                    headerText: '#0078D4',
                                    detailText: '#505050',
                                    linkText: '#0078d4'
                                }}
                                debug={false}
                            />
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
        if (this.state.profiles.length === []) return;

        return this.state.profiles.map((id, index) => {
            const profile = this.state.profiles[index];

            return (
                <Column key={index} span={[12, 12, 6, 4, 3]}>
                    <ProfileCard profile={profile} />
                </Column>
            );
        });
    }

    generateContactSection() {
        return (
            <Section innerRef={element => (this.sectionContact = element)}>
                <ContactInfoContentContainer>
                    <PersonContacts>
                        <Page>
                            <MSDSectionHeader
                                row={1}
                                layout="link"
                                headerText="Contacts"
                                topBar={false}
                                color={{
                                    topBar: '#0078D4',
                                    headerText: '#0078D4',
                                    detailText: '#505050',
                                    linkText: '#0078d4'
                                }}
                                debug={false}
                            />
                            <Grid>
                                <Column position={[1, 2, 4, 5, 6]}>
                                    <EmbeddedMap
                                        src={
                                            'https://www.bing.com/maps/embed?h=300&w=600&cp=43.06900970201925~-89.39027270927512&lvl=10&typ=d&sty=r&src=SHELL&FORM=MBEDV8'
                                        }
                                        info={MAP_CONTACT_INFO}
                                    />
                                </Column>
                            </Grid>
                        </Page>
                    </PersonContacts>
                </ContactInfoContentContainer>
            </Section>
        );
    }

    generateLabStructureSection() {
        if (this.state.page.pivotItemSections == null) return <div />;

        return (
            <HeaderSection innerRef={element => (this.sectionLabStructure = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <MSDSectionHeader
                            row={1}
                            layout="link"
                            headerText="Lab Structure"
                            color={{
                                headerText: '#0078D4'
                            }}
                            debug={false}
                        />
                        <div>&nbsp;</div>
                        <PivotGridSection>
                            <Column>
                                <TextSection
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.page.pivotItemSections
                                            .labStructureSection
                                    }}
                                />

                                {this.generateContactSection()}
                            </Column>
                        </PivotGridSection>
                    </Page>
                </WrappedHeaderContentContainer>
            </HeaderSection>
        );
    }

    generateAboutSection() {
        if (this.state.page.pivotItemSections == null) return <div />;

        return (
            <HeaderSection innerRef={element => (this.sectionAbout = element)}>
                <WrappedHeaderContentContainer
                    className="msd-section-content-container"
                    themeColor={colors.blue.base}
                    color={colors.gray.mid}>
                    <Page>
                        <MSDSectionHeader
                            row={1}
                            layout="link"
                            headerText="About"
                            color={{
                                headerText: '#0078D4'
                            }}
                            debug={false}
                        />
                        <div>&nbsp;</div>
                        <PivotGridSection>
                            <Column>
                                <TextSection
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.page.pivotItemSections.aboutSection
                                    }}
                                />
                                {this.generateContactSection()}
                            </Column>
                        </PivotGridSection>
                    </Page>
                </WrappedHeaderContentContainer>
            </HeaderSection>
        );
    }

    _handleLinkClick(item) {
        if (!item.props) return;
        if (!item.props.itemKey) return;

        this.setState({
            selectedKey: item.props.itemKey
        });
    }

    getTabContent() {
        switch (this.state.selectedKey) {
            case 'mission':
                return (
                    <PivotSectionHeader>
                        {this.generateMissionSection()}
                        <PivotItemSection>
                            {this.generateVisionSection()}
                            {this.generatePeopleSection()}
                            {/* {this.generateProjectsSection()} */}
                            {this.generatePublicationsSection()}
                            {/* {this.generateContactSection()} */}
                        </PivotItemSection>
                        }
                    </PivotSectionHeader>
                );
        }
    }

    generateVisionSection() {
        if (this.state.page.featureSection == null) return;

        return (
            <VisionSection>
                <Page>
                    <MSDSectionHeader
                        layout="horizontal"
                        headerText={this.state.page.featureSection.headerText}
                        detailText={this.state.page.featureSection.detailText}
                        topBar={true}
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.black,
                            topBar: colors.blue.base
                        }}
                    />
                    {this.generateFeatureSectionCard()}
                </Page>
            </VisionSection>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <main id="mainContent" className="msd-fluent">
                <Helmet>
                    <meta property="og:title" content="Gray Systems Lab (GSL)" />
                    <meta
                        property="og:description"
                        content="Learn more about the Azure Data's research lab, the Gray Systems Lab (GSL)"
                    />
                    <meta
                        property="og:url"
                        content="https://azuredata.microsoft.com/labs/gsl"
                    />
                </Helmet>
                <Container>
                    {this.generatePageIntro()}
                    <PivotSectionContainer>
                        <Page>
                            {/* empty div for header placeholder so page is aligned properly */}
                            <div>&nbsp;</div>
                            <PivotSection
                                selectedKey={this.state.selectedKey}
                                onLinkClick={this._handleLinkClick.bind(this)}
                                headersOnly={true}>
                                {/* <PivotItem headerText="Mission" itemKey="mission" />
                                <PivotItem headerText="Lab Structure" itemKey="labStructure" />
                                <PivotItem headerText="About" itemKey="about" /> */}
                            </PivotSection>
                        </Page>
                    </PivotSectionContainer>
                    {this.getTabContent()}
                    <TypographicEnd headingColor={colors.blue.base} />
                </Container>
            </main>
        );
    }
}

export default withRouter(connect()(GSL));
