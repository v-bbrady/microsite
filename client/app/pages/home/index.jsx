import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import { Hyperlink, Image, Paragraph } from '@ms-fw/fw-react/components';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// MSD components
import {
    ArticleCard,
    MSDSectionHeader,
    TypographicEnd,
    DisplayedMedia
} from '../../components';

import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import {
    ArticlesSection,
    Container,
    HeroCards,
    HeroCard,
    HeroFeaturedCard,
    FeatureCardLinkSection,
    FeatureCardHeading,
    Tweet,
    TwitterGrid,
    TwitterColumn,
    TwitterSection
} from './styledComponents';

/**
 * Home page component class
 */
class Home extends React.Component {
    /**
     * The constructor method
     * @param {object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);

        this.themeColor = 'blue';

        this.state = {
            isWidgetLoaded: false,
            page: {
                heroCard: null,
                featureCards: [],
                curatedNews: []
            },
            articles: [],
            featuredCards: [],
            twitter: null,
            realTimeTweets: [],
            vp: 4
        };

        this.fetchHomePageData();
        // Fetch twitter data
        this.fetchTwitterData();
        this.fetchRealTimeTwitterData();
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));

        twttr.ready(() => {
            if (!this.state.isWidgetLoaded) {
                this.setState({
                    isWidgetLoaded: true
                });
            }
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

    /**
     * Handle when screen is resized and crossed breakpoints
     * @param {Number} breakpoint
     * @return {void}
     */
    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    fetchHomePageData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/page/home`
        )
            .then(response => response.json())
            .then(response => this.handleHomePageResponse(response));
    }

    handleHomePageResponse(response) {
        let articlePromiseArray = [];
        for (var i = 0; i < response.page.curatedNews.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/article/${response.page.curatedNews[i].id}`;

            articlePromiseArray.push(
                fetch(fetchUrl)
                    .then(articleResponse => articleResponse.json())
                    .then(articleResponse => this.handleArticleResponse(articleResponse))
            );
        }

        this.setState({
            page: response.page
        });

        return Promise.all(articlePromiseArray);
    }

    handleArticleResponse(response) {
        var articleList = this.state.articles;

        articleList.push(response);

        articleList.sort((article1, article2) => {
            //sort by reverse chronology
            if (article1.date > article2.date) return -1;
            if (article1.date < article2.date) return 1;

            return 0;
        });

        this.setState({
            articles: articleList
        });
    }

    fetchTwitterData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/tweets`
        )
            .then(response => response.json())
            .then(response => this.handleTwitterResponse(response))
            .catch(error => console.log(`Failed fetching twitter list: ${error}`));
    }

    handleTwitterResponse(response) {
        this.setState({
            twitter: response.twitter
        });
    }

    fetchRealTimeTwitterData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/liveTweets`
        )
            .then(response => response.json())
            .then(response => this.handleRealTimeTweetsResponse(response))
            .catch(error => console.log(`Failed fetching live twitter list: ${error}`));
    }

    handleRealTimeTweetsResponse(response) {
        this.setState({
            realTimeTweets: response
        });
    }

    /**
     * Generate hero card content
     * @return {JSX.Element}
     */
    generateHeroCardContent() {
        if (this.state.page.heroCard === null) {
            return;
        }

        var heroCard = this.state.page.heroCard;

        var link;

        if (heroCard.isExternalLink) {
            link = heroCard.link;
        } else {
            link = `/articles/${heroCard.link}`;
        }

        return (
            <HeroCard
                className="homePageHeroCard"
                caption={heroCard.caption}
                href={link}
                isExternalLink={heroCard.isExternalLink}>
                <MSDSectionHeader
                    layout="horizontal"
                    headerText={heroCard.header}
                    headerText2={heroCard.subtitle}
                    detailText={heroCard.description}
                    href={link}
                    color={{
                        headerText2: colors.blue.base,
                        detailText: colors.gray.mid,
                        dateText: colors.blue.base,
                        linkText: colors.black
                    }}
                />

                <DisplayedMedia
                    display={{
                        vp1: heroCard.imageVP1,
                        vp2: heroCard.imageVP2,
                        vp3: heroCard.imageVP3,
                        vp4: heroCard.imageVP4,
                        vp5: heroCard.imageVP5,
                        vp6: heroCard.imageVP6,
                        alt: heroCard.imageAlt
                    }}
                />
            </HeroCard>
        );
    }

    /**
     * Generate a hero featured card
     * @return {JSX.Element}
     */
    generateFeaturedCards() {
        if (this.state.page.featureCards.length == 0) return <Column />;

        return this.state.page.featureCards.map((id, index) => {
            const card = this.state.page.featureCards[index];

            return (
                <Column key={index + id} span={[12, 12, 6]}>
                    <HeroFeaturedCard
                        caption={card.caption}
                        data-testid="FEATURED_ARTICLE_CARD"
                        href={card.link}
                        isExternalLink={card.isExternalLink}>
                        <div>
                            <div>
                                <FeatureCardLinkSection href={card.link}>
                                    <FeatureCardHeading
                                        tag="h3"
                                        level={4}
                                        text={card.header}
                                        verticalSpace={false}
                                    />
                                </FeatureCardLinkSection>
                                <Paragraph
                                    level={3}
                                    text={card.description}
                                    verticalSpace={false}
                                />
                            </div>
                            <span>
                                <Hyperlink
                                    ariaLabel={'Learn more about ' + card.header}
                                    text="Learn More"
                                    href={card.link}
                                />
                            </span>
                            <Image
                                vp4={this.getAzureBlobStoragePath() + card.imageCard}
                                alt={this.getAzureBlobStoragePath() + card.imageAlt}
                            />
                        </div>
                    </HeroFeaturedCard>
                </Column>
            );
        });
    }

    /**
     * Generate hero section
     * @return {JSX.Element}
     */
    generateHeroSection() {
        return (
            <section>
                <HeroCards>
                    <Page>
                        <Grid gutter={6}>
                            <Column row={1} style={{ zIndex: 0 }}>
                                {this.generateHeroCardContent()}
                            </Column>
                            {this.generateFeaturedCards()}
                        </Grid>
                    </Page>
                </HeroCards>
            </section>
        );
    }

    /**
     * Generate article card
     * @param {number} index - Index of article card
     * @return {void}
     */
    generateArticleCards() {
        if (this.state.articles.length == 0) return;

        return this.state.articles.map((id, index) => {
            const article = this.state.articles[index];
            var link = article.isExternalLink ? article.link : `/articles/${article.id}`;
            var category =
                article.category === 'news' ? 'IN THE NEWS' : article.category.toUpperCase();

            return (
                <Column key={index} span={[12, 12, 6, 6, 3]}>
                    <ArticleCard
                        data-testid={`HOMEPAGE_ARTICLE_CARD-${index}`}
                        caption={category}
                        size="small"
                        header={article.header}
                        subtitle={article.subtitle}
                        subheading={article.summary}
                        color={{
                            headerText: colors.blue.base,
                            headerText2: colors.black,
                            detailText: colors.gray.mid,
                            linkText: colors.black
                        }}
                        href={link}
                        image={{
                            vp4: `${this.getAzureBlobStoragePath() + article.imageCard}`,
                            alt: article.imageAlt
                        }}
                        date={article.date}
                    />
                </Column>
            );
        });
    }

    loadTwitterEmbeds() {
        if (!this.state.isWidgetLoaded) return;

        twttr.widgets.load();
    }

    generateTwitterSection() {
        if (this.state.twitter == null) return;
        return (
            <TwitterSection>
                <Page>
                    <MSDSectionHeader
                        layout="link"
                        headerText="Social Media"
                        linkText="See more Tweets"
                        href="https://twitter.com/AzureData"
                        isExternalLink={true}
                        detailText="The latest tweets about Azure Data at Microsoft"
                        topBar={true}
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.gray.mid,
                            linkText: colors.blue.base,
                            topBar: colors.blue.base
                        }}
                    />
                    <TwitterGrid gutter={6}>
                        <TwitterColumn span={[12, 6, 6, 3]}>
                            {this.generateLiveTweet(0)}
                            {this.generateTweetColumn(this.state.twitter.column1)}
                        </TwitterColumn>
                        <TwitterColumn span={[12, 6, 6, 3]}>
                            {this.generateLiveTweet(1)}
                            {this.generateTweetColumn(this.state.twitter.column2)}
                        </TwitterColumn>
                        <TwitterColumn span={[12, 6, 6, 3]}>
                            {this.generateLiveTweet(2)}
                            {this.generateTweetColumn(this.state.twitter.column3)}
                        </TwitterColumn>
                        <TwitterColumn span={[12, 6, 6, 3]}>
                            {this.generateLiveTweet(3)}
                            {this.generateTweetColumn(this.state.twitter.column4)}
                        </TwitterColumn>
                    </TwitterGrid>
                </Page>
            </TwitterSection>
        );
    }

    generateLiveTweet(index) {
        if (this.state.realTimeTweets.length == 0) return;
        else if (index >= this.state.realTimeTweets.length) return;

        return (
            <Tweet
                key={this.state.realTimeTweets[index].id}
                dangerouslySetInnerHTML={{ __html: this.state.realTimeTweets[index].tweet }}
            />
        );
    }

    generateTweetColumn(twitterColumn) {
        return twitterColumn.map((key, index) => {
            return (
                <Tweet
                    key={index}
                    dangerouslySetInnerHTML={{ __html: twitterColumn[index].embedCode }}
                />
            );
        });
    }

    /**
     * Generate articles section
     * @return {JSX.Element}
     */
    generateArticlesSection() {
        return (
            <ArticlesSection theme={this.themeColor} data-testid="HOMEPAGE_ARTICLE_CONTAINER">
                <Page>
                    <MSDSectionHeader
                        layout="link"
                        headerText="News &amp; Insights"
                        detailText="News coverage, insights, blogs and videos across Azure Data."
                        linkText="View all"
                        ariaLabel="View all News and Insights"
                        href="/articles"
                        topBar={true}
                        color={{
                            headerText: colors.blue.base,
                            detailText: colors.gray.mid,
                            linkText: colors.blue.base,
                            topBar: colors.blue.base
                        }}
                    />
                    <Grid gutter={6}>{this.generateArticleCards()}</Grid>
                </Page>
            </ArticlesSection>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container id="mainContent" className="msd-home">
                <Helmet>
                    <meta property="og:title" content="Azure Data" />
                    <meta
                        property="og:description"
                        content="Welcome to Azure Data. Learn about the Azure Data teams, research, and culture at Microsoft."
                    />
                    <meta property="og:url" content="https://azuredata.microsoft.com" />
                </Helmet>
                {this.generateHeroSection()}
                {this.generateArticlesSection()}
                {this.generateTwitterSection()}
                {this.loadTwitterEmbeds()}
                <TypographicEnd
                    // email="MicrosoftDesignTeam@microsoft.com"
                    headingColor={colors.blue.base}
                    linkColor={colors.blue.base}
                />
            </Container>
        );
    }
}

export default withRouter(connect()(Home));
