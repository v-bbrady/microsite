import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import { Heading, Hyperlink, Image, Paragraph } from '@ms-fw/fw-react/components';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';
import { setUhfThemeWhite } from '../../action-creators/uhfTheme';

// MSD components
import { ArticleCard, MSDSectionHeader, JobCard, TypographicEnd } from '../../components';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import {
    CultureCard,
    CultureContentSection,
    CultureCardLinkSection,
    FeaturedCardSection,
    JobsSection,
    PageIntroSection
} from './styledComponents';

const featureHeroCardArticleID = 'baf44c27-e68a-4889-8579-9b9780070f75';

/**
 * Careers page component class
 */
class Careers extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);

        this.state = {
            page: {
                heroCard: null,
                featureSection: null,
                featuredJobCards: [],
                featuredCareerArticles: []
            },
            pageIntro: null,
            featuredHeroArticle: null,
            featuredArticleCards: [],
            vp: 4
        };

        this.fetchPageData();
    }

    fetchPageData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/page/careers`
        )
            .then(response => response.json())
            .then(response => this.handlePageResponse(response));
    }

    handlePageResponse(response) {
        let promiseArray = [];

        for (var i = 0; i < response.page.featuredCareerArticles.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/article/${
                response.page.featuredCareerArticles[i].id
            }`;

            promiseArray.push(
                fetch(fetchUrl)
                    .then(articleResponse => articleResponse.json())
                    .then(articleResponse => this.handleArticleResponse(articleResponse))
            );
        }

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
                    this.handleHeroArticleResponse(featureSectionResponse)
                )
                .catch(error =>
                    console.log(
                        `Failed fetching feature section article ${
                            this.state.id
                        } data: ${error}`
                    )
                )
        );

        this.setState({
            page: response.page
        });
    }

    handleArticleResponse(response) {
        var articleList = this.state.featuredArticleCards;

        articleList.push(response);

        this.setState({
            articles: articleList
        });
    }

    handleHeroArticleResponse(response) {
        this.setState({
            featuredHeroArticle: response
        });
    }

    handleFeatureArticleCardResponse(response) {
        var featuredArticleCardsList = this.state.featuredArticleCards;

        featuredArticleCardsList.push(response);

        this.setState({
            featuredArticleCards: featuredArticleCardsList
        });
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        this.props.dispatch(setUhfThemeWhite());
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    /**
     * React method called when component will be unmounted
     * @return {void}
     */
    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    generateFeatureArticleCards() {
        if (this.state.featuredArticleCards.length == 0) return <Column />;

        return this.state.featuredArticleCards.map((id, index) => {
            const card = this.state.featuredArticleCards[index];
            var link = card.isExternalLink ? card.link : `/articles/${card.id}`;
            var category =
                card.category === 'news' ? 'IN THE NEWS' : card.category.toUpperCase();

            return (
                <Column key={index + id} span={[12, 12, 6]}>
                    <CultureCard
                        caption={category}
                        href={link}
                        isExternalLink={card.isExternalLink}
                        headingColor={colors.blue.base}>
                        <div>
                            <div>
                                <CultureCardLinkSection href={link}>
                                    <Heading
                                        tag="h3"
                                        level={4}
                                        text={card.header}
                                        verticalSpace={false}
                                    />
                                </CultureCardLinkSection>
                                <Paragraph
                                    level={3}
                                    text={card.subtitle}
                                    verticalSpace={false}
                                />
                                <Paragraph
                                    level={3}
                                    text={card.summary}
                                    verticalSpace={false}
                                />
                            </div>
                            <span>
                                <Hyperlink
                                    ariaLabel={'Learn more about ' + card.header}
                                    text="Learn more"
                                    href={link}
                                />
                            </span>
                            <Image
                                vp4={this.getAzureBlobStoragePath() + card.imageCard}
                                alt={card.imageAlt}
                            />
                        </div>
                    </CultureCard>
                </Column>
            );
        });
    }

    /**
     * Generate hero article card
     * @return {JSX.Element}
     */
    generateFeaturedHeroArticleCard() {
        if (this.state.featuredHeroArticle == null) return;

        let size = 'small';
        var article = this.state.featuredHeroArticle;

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
                        caption={'FEATURE'}
                        size={size}
                        isExternalLink={article.isExternalLink}
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

    /**
     * Generate culture section
     * @return {JSX.Element}
     */
    generateCultureSection() {
        if (this.state.page.featureSection == null) return;

        return (
            <CultureContentSection>
                <Page>
                    <MSDSectionHeader
                        layout="horizontal"
                        headerText={this.state.page.featureSection.headerText}
                        detailText={this.state.page.featureSection.detailText}
                        topBar={true}
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.black
                        }}
                    />
                    {this.generateFeaturedHeroArticleCard()}
                    <Grid gutter={6} verticalAlign={'end'}>
                        {this.generateFeatureArticleCards()}
                    </Grid>
                </Page>
            </CultureContentSection>
        );
    }

    generateJobCards() {
        if (this.state.page.featuredJobCards.length == 0) return <Column />;

        return this.state.page.featuredJobCards.map((id, index) => {
            const card = this.state.page.featuredJobCards[index];

            return (
                <Column key={index + id} span={[12, 12, 6, 6, 3]}>
                    <JobCard
                        header={card.header}
                        jobSummary={card.description}
                        caption={card.caption}
                        link={card.link}
                        image={`${this.getAzureBlobStoragePath() + card.imageCard}`}
                    />
                </Column>
            );
        });
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
                    headerText: colors.black,
                    headerText2: colors.blue.header,
                    detailText: colors.black,
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
            }
        };

        return <PageIntroSection {...pageIntroData} />;
    }

    /**
     * Generate open positions section
     * @return {JSX.Element}
     */
    generateOpenPositionSection() {
        return (
            <JobsSection theme={this.themeColor} data-testid="HOMEPAGE_CAREERS_CONTAINER">
                <Page>
                    <MSDSectionHeader
                        layout="link"
                        headerText="Career Options"
                        detailText="Explore and discover your place at Azure Data in the Microsoft Careers portal."
                        linkText="View all"
                        ariaLabel="View all Azure Data Jobs"
                        href="http://aka.ms/azuredatajobs"
                        isExternalLink={true}
                        topBar={true}
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.gray.mid,
                            linkText: colors.blue.base
                        }}
                    />
                    <Grid gutter={6}>{this.generateJobCards()}</Grid>
                </Page>
            </JobsSection>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <main id="mainContent" className="msd-careers">
                {this.generatePageIntro()}
                {this.generateCultureSection()}
                {this.generateOpenPositionSection()}
                <TypographicEnd headingColor={colors.blue.base} linkColor={colors.blue.base} />
                {/* <TypographicEnd
                    bodyText="Want to work for Azure Data but have questions or want more information? Contact us"
                    headingColor={colors.blue.base}
                    linkColor={colors.blue.base}
                    email="TBDAzureDataMailignAlias@microsoft.com"
                    linkText="here"
                /> */}
            </main>
        );
    }
}

export default withRouter(connect()(Careers));
