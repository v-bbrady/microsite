import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// MSD components
import { ArticleCard, MSDSectionHeader, TypographicEnd } from '../../components';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';
import { setUhfThemeLightGray, setUhfThemeWhite } from '../../action-creators/uhfTheme';

// Styled components
import { Container, ArticlesContainer } from './styledComponents';

/**
 * Articles page component class
 */
class CultureArticles extends React.Component {
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
            articles: [],
            currentCategory: '',
            categoryList: {
                culture: 'Culture',
                spotlight: 'Employee Spotlight',
                all: 'All News & Insights'
            },
            filteredArticles: [],
            vp: 4
        };

        this.fetchArticlesData();
    }

    /**
     * Fetch articles section data
     * @return {void}
     */
    fetchArticlesData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/articles`
        )
            .then(response => response.json())
            .then(response => this.handleArticlesResponse(response))
            .then(() => this.sortArticles())
            .then(() => this.filterArticles())
            .catch(error => console.log(`Failed fetching articles data: ${error}`));
    }

    /**
     * Store articles response data
     * @param {JSON} response
     * @return {void}
     */
    handleArticlesResponse(response) {
        let articlePromiseArray = [];

        for (var i = 0; i < response.articles.length; i++) {
            var fetchUrl = `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/article/${response.articles[i].id}`;

            articlePromiseArray.push(
                fetch(fetchUrl)
                    .then(articleResponse => articleResponse.json())
                    .then(articleResponse => this.handleArticleResponse(articleResponse))
                    .catch(error => console.log(error))
            );
        }

        return Promise.all(articlePromiseArray);
    }

    handleArticleResponse(response) {
        var articleList = this.state.articles;

        if (response.category === 'CULTURE' || response.category === 'EMPLOYEE SPOTLIGHT') {
            articleList.push(response);
        }

        this.setState({
            articles: articleList
        });
    }

    sortArticles() {
        var articleList = this.state.articles;

        articleList.sort((article1, article2) => {
            var article1Date = new Date(article1.date);
            var article2Date = new Date(article2.date);

            //sort by reverse chronology
            if (article1Date > article2Date) return -1;
            if (article1Date < article2Date) return 1;

            //sort by header
            if (article1.header < article2.header) return -1;
            if (article1.header > article2.header) return 1;
        });

        this.setState({
            articles: articleList
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
        this.props.dispatch(setUhfThemeWhite());
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

    /**
     * Sort articles based on selected tag filter
     * @param {Object} response Medium data fetch response
     * @return {void}
     */
    filterArticles(response) {
        if (!response && !this.state.articles) return;

        var filteredArticles = [];

        for (var i = 0; i < this.state.articles.length; i++) {
            var addArticleToSortList = false;
            if (
                this.selectedTag === 'culture' &&
                this.state.articles[i].category === 'CULTURE'
            ) {
                addArticleToSortList = true;
            } else if (
                this.selectedTag === 'spotlight' &&
                this.state.articles[i].category === 'EMPLOYEE SPOTLIGHT'
            ) {
                addArticleToSortList = true;
            }

            if (this.selectedTag === 'all' || addArticleToSortList) {
                filteredArticles.push(this.state.articles[i]);
            }
        }

        this.setState({
            filteredArticles: filteredArticles
        });
    }

    /**
     * Handle filter list item click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleFilterItemClick(e) {
        this.selectedTag = e.target.getAttribute('id');
        this.filterArticles();
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

        this.filterArticles();
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

    /**
     * Generate article cards
     * @return {JSX.Element[]}
     */
    generateArticleCards() {
        if (this.state.filteredArticles.length == 0) return;

        return this.state.filteredArticles.map((id, index) => {
            const article = this.state.filteredArticles[index];

            let size = 'small';
            let span = 12;

            // Set card size and span based on viewport
            switch (this.state.vp) {
                case 6:
                case 5:
                    size = 'small';
                    span = 3;
                    break;
                case 4:
                    size = 'medium';
                    span = 6;
                case 3:
                    size = 'small';
                    span = 6;
                    break;
                case 2:
                case 1:
                default:
                    break;
            }

            var link = article.isExternalLink ? article.link : `/articles/${article.id}`;
            var category =
                article.category === 'news' ? 'IN THE NEWS' : article.category.toUpperCase();

            return (
                <Column key={index} span={span}>
                    <ArticleCard
                        data-testid={`ARTICLEPAGE_ARTICLE_CARD-${index}`}
                        caption={category}
                        size={size}
                        isExternalLink={article.isExternalLink}
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
                        headerText="Our Culture"
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
                <ArticlesContainer>
                    <Page data-testid="CROSSPOSTED_MEDIUM_CONTENT">
                        <Grid gutter={6}>{this.generateArticleCards()}</Grid>
                    </Page>
                </ArticlesContainer>
                <TypographicEnd headingColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(CultureArticles));
