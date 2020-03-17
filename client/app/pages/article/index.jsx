import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
require('@babel/polyfill');
require('isomorphic-fetch');

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import { Heading, Hyperlink, Image, Paragraph } from '@ms-fw/fw-react/components';

import { setUhfThemeDark } from '../../action-creators/uhfTheme';
import { setThemeBlue, setThemePurple, setThemeOrange } from '../../action-creators/theme';

// MSD components
import { MSDSectionHeader, PageIntro, ProfileCard, TypographicEnd } from '../../components';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import { ContentContainer, ProfilesSection, PageIntroContainer } from './styledComponents';

/**
 * Article page component class
 */
class Article extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        let articleId = '';

        //if no article id is passed in, get the id from the path.
        if (this.props.articleId == null || this.props.articleId == undefined) {
            let pathArray = this.props.location.pathname.split('/');

            while (articleId === '') {
                articleId = pathArray.pop();
            }
        } else {
            articleId = this.props.articleId;
        }

        this.state = {
            id: articleId,
            articleData: null,
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
            ]
        };

        this.fectchArticleData();
    }

    fectchArticleData() {
        return fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/article/${this.state.id}`
        )
            .then(response => response.json())
            .then(response => this.handleArticleResponse(response))
            .catch(error =>
                console.log(`Failed fetching article ${this.state.id} data: ${error}`)
            );
    }

    handleArticleResponse(response) {
        if (response.isDarkUhfTheme) {
            this.props.dispatch(setThemeBlue());
            this.props.dispatch(setUhfThemeDark());
        }

        this.setState({
            articleData: response
        });
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {}

    /**
     * Generate page intro for current profile
     * @return {JSX.Element}
     */
    generatePageIntro() {
        if (this.state.articleData == null) return;

        var articleData = this.state.articleData;

        var dateString = '';

        if (articleData.date != undefined && articleData.date != null) {
            var date = new Date(articleData.date.split('T')[0]);

            dateString = `${
                this.state.months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`;
        }

        const pageIntroProps = {
            sectionHeader: {
                layout: 'profile',
                headerText: articleData.header,
                headerText2: articleData.subtitle,
                detailText: articleData.summary,
                profileRole: null,
                profileYear: dateString,
                headerTextTight: true,
                color: {
                    headerText: articleData.isDarkUhfTheme ? colors.white : colors.black,
                    headerText2: colors.blue.header,
                    detailText: articleData.isDarkUhfTheme ? colors.white : colors.black,
                    profileRole: articleData.isDarkUhfTheme ? colors.white : colors.black,
                    profileYear: articleData.isDarkUhfTheme ? colors.white : colors.black
                }
            },
            backgroundColor: articleData.isDarkUhfTheme ? '#000' : '#F2F2F2',
            image: {
                vp6: articleData.imageVP6,
                vp5: articleData.imageVP5,
                vp4: articleData.imageVP4,
                vp3: articleData.imageVP3,
                vp2: articleData.imageVP2,
                vp1: articleData.imageVP1,
                alt: articleData.imageAlt
            },
            isLargeImage: true,
            isFullBleedImage: false
        };

        return (
            <PageIntroContainer className="pageIntroSection">
                <PageIntro {...pageIntroProps} />
            </PageIntroContainer>
        );
    }

    generateArticleContent() {
        if (this.state.articleData == null) return;

        return (
            <ContentContainer data-theme-color={'blue'}>
                <Page data-testid="ARTICLE_BODY">
                    <Grid gutter={6}>
                        <Column
                            position={[1, 2, 2, 3, 3, 3]}
                            span={[12, 12, 12, 9, 9, 8]}
                            className="article-content"
                            dangerouslySetInnerHTML={{
                                __html: this.state.articleData.bodyText
                            }}
                        />
                    </Grid>
                </Page>
            </ContentContainer>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <main id="mainContent" className="ad-article">
                {this.generatePageIntro()}
                {this.generateArticleContent()}
                <TypographicEnd headingColor={colors.blue.base} />
            </main>
        );
    }
}

export default withRouter(connect()(Article));
