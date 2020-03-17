import React from 'react';

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import { Heading, Paragraph } from '@ms-fw/fw-react/components';

// Styled components
import { Container, SocialImageButton } from './styledComponents';

/**
 * TypographicEnd component class
 *
 * @prop {string} bodyText          Body copy
 * @prop {string} email             Email link
 * @prop {string} headingText       Heading text
 * @prop {string} headingColor      Heading text color
 * @prop {string} bodyColor         Body copy color
 * @prop {string} linkColor         Hyperlink color
 * @prop {string} linkText          linkText
 * @prop {string} backgroundColor   Component background color
 */
export default class TypographicEnd extends React.Component {
    /**
     * Generate body text based on props
     * @return {string}
     */
    generateBodyText() {
        let text =
            this.props.bodyText ||
            'Our goal is to empower every person and every organization on the planet to achieve more, using insights from their data.';

        if (this.props.email) {
            // If the last character of the body text is a comma, then start with a lowercase letter
            const firstCharacter = text.slice(-1) === ',' ? 'g' : 'G';

            // Commnenting out for now as the spec doesn't ask for a generic azuredata email.
            text = `${text}&nbsp;<a href='mailto:${this.props.email}'>${
                this.props.linkText
            }</a>!`;
        }

        return text;
    }

    getCurrentYear() {
        var date = new Date();
        return date.getFullYear();
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    /**
     * Generate Microsoft corporate links
     * @return {JSX.Element}
     */
    generateCorporateLinks() {
        return (
            <div role="contentinfo" aria-label="Microsoft corporate links">
                <ul className="c-list f-bare">
                    <li>
                        <a
                            className="c-uhff-link"
                            href="https://www.microsoft.com/en-us/sitemap1.aspx">
                            Sitemap
                        </a>
                    </li>
                    <li>
                        <a
                            className="c-uhff-link"
                            href="https://support.microsoft.com/en-us/contactus">
                            Contact us
                        </a>
                    </li>
                    <li>
                        <a
                            className="c-uhff-link"
                            href="https://go.microsoft.com/fwlink/?LinkId=521839">
                            Privacy &amp; cookies{' '}
                        </a>
                    </li>
                    <li>
                        <a
                            className="c-uhff-link"
                            href="https://go.microsoft.com/fwlink/?LinkID=206977">
                            Terms of use
                        </a>
                    </li>
                    <li>
                        <a className="c-uhff-link" href="https://www.microsoft.com/trademarks">
                            Trademarks
                        </a>
                    </li>
                    <li>
                        <a className="c-uhff-link" href="https://choice.microsoft.com">
                            About our ads
                        </a>
                    </li>
                    <li>&#169; Microsoft {this.getCurrentYear()}</li>
                </ul>
            </div>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container role="contentinfo" {...this.props}>
                <Page>
                    <Grid gutter={6}>
                        <Column span={[12, 12, 12, 12, 4]}>
                            <Heading
                                tag="h4"
                                level={4}
                                text={
                                    this.props.headingText
                                        ? this.props.headingText
                                        : 'Azure Data'
                                }
                                verticalSpace={false}
                            />
                        </Column>
                        <Column
                            row={[2, 2, 2, 2, 1]}
                            span={[11, 11, 11, 8, 7]}
                            position={[1, 1, 1, 1, 5]}>
                            <Paragraph
                                level={1}
                                text={this.generateBodyText()}
                                verticalSpace={false}
                            />
                        </Column>
                        <Column row={[3, 3, 3, 3, 2]} span={[12, 12, 12, 12, 4]}>
                            <a
                                aria-label="Link to Azure Data Twitter page"
                                target="_blank"
                                href="https://twitter.com/AzureData">
                                <SocialImageButton
                                    aria-hidden={true}
                                    alt="Twitter Logo Image"
                                    src={`${this.getAzureBlobStoragePath() +
                                        'twitter_logo.svg'}`}
                                />
                            </a>
                            &nbsp;
                            <a
                                aria-label="Link to Azure Data LinkedIn page"
                                target="_blank"
                                href="https://www.linkedin.com/company/microsoft">
                                <SocialImageButton
                                    aria-hidden={true}
                                    alt="LinkedIn Logo Image"
                                    src={`${this.getAzureBlobStoragePath() +
                                        'linkedin_logo.svg'}`}
                                />
                            </a>
                        </Column>
                        <Column row={[4, 4, 4, 4, 2]} span={[12, 12, 12, 12, 8]}>
                            {this.generateCorporateLinks()}
                        </Column>
                    </Grid>
                </Page>
            </Container>
        );
    }
}
