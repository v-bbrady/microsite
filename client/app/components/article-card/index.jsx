import React from 'react';

// FW components
import { Caption, Heading, Image, Paragraph } from '@ms-fw/fw-react/components';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import { Container, HeaderText, HeaderText2, LinkSection } from './styledComponents';

/**
 * ArticleCard component class
 *
 * @prop {string}       header           Article title
 * @prop {string}       subtitle        Article subtitle (heading 2)
 * @prop {string}       subheading      Article subheading
 * @prop {string}       href            URL destination
 * @prop {IImageProps}  image           FluentWeb image component props
 * @prop {boolean}      isFeatured      Is this a featured article?
 *
 * @prop {MasterCardProps}
 */
export default class ArticleCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    getHeadingText() {
        let headerText = this.props.header;
        let headerText2 = this.props.subtitle;

        if (this.props.href) {
            return (
                <LinkSection href={this.props.href} linkcolor={this.props.color.linkText}>
                    <HeaderText
                        tag="h3"
                        level={4}
                        color={this.props.color.headerText}
                        verticalSpace={false}>
                        {headerText}{' '}
                        <HeaderText2
                            className="spanTextColor"
                            color={this.props.color.headerText}
                            color2={this.props.color.headerText2}>
                            {headerText2}
                        </HeaderText2>
                    </HeaderText>
                </LinkSection>
            );
        } else {
            return (
                <HeaderText tag="h3" level={4} color={this.props.color.headerText}>
                    {headerText}{' '}
                    <HeaderText2
                        color={this.props.color.headerText}
                        color2={this.props.color.headerText2}>
                        {headerText2}
                    </HeaderText2>
                </HeaderText>
            );
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        var dateString = '';

        if (this.props.date != undefined && this.props.date != null) {
            var date = new Date(this.props.date.split('T')[0]);

            dateString = `${
                this.state.months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`;
        }

        return (
            <Container
                {...this.props}
                isExteralLink={this.props.isExteralLink}
                className={this.props.size}
                headingColor={colors.blue.base}
                bodyColor={colors.gray.mid}>
                {this.getHeadingText()}
                <Paragraph level={3} text={this.props.subheading} verticalSpace={false} />
                <div />
                <div>
                    <Caption tag="p" level={1} text={dateString} />
                    <span />
                </div>
            </Container>
        );
    }
}
