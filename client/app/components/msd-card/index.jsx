import React from 'react';

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

import {
    Image,
    Heading,
    Hyperlink,
    Subheading,
    Metatext,
    Logo
} from '@ms-fw/fw-react/components';

// MSD utilities and helpers
import { scrollElementIntoView } from '../../utilities/utilities';

// Styled components
import { StyledCard, StyledHyperlink } from './styledComponents';

/**
 * Data constants
 */

const classNameDefault = 'msd-card';
const classNameFeatured = classNameDefault + '-featured';
const classNameFeaturedHalf = classNameFeatured + '-half';
const halfFeaturedViewportThreshold = 3;

/**
 * MSDCard component class
 *
 * @prop {boolean} featured             Is it featured?
 * @prop {number}  viewport             Viewport Number
 * @prop {object}  card                 Card Object
 * @prop {string}  card.title           Title
 * @prop {string}  card.subtitle        Subtitle
 * @prop {string}  card.date            Date Abrv Month & Day
 * @prop {string}  card.destination     URL
 * @prop {string}  card.backgroundColor Card background color
 * @prop {string}  card.titleColor      Card text color
 * @prop {string}  card.subtitleColor   Card heading color
 * @prop {object}  card.image           Image Object
 * @prop {string}  card.image.src       Image URL
 * @prop {string}  card.image.alt       Image Alt Text
 * @prop {object}  card.source          Card Content Source
 * @prop {string}  card.source.src      Source Image URL
 * @prop {string}  card.source.alt      Source Alt Text
 * @prop {string}  card.source.text     Source Textual Content
 */
export default class MSDCard extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.handleCardClick = this.handleCardClick.bind(this);
    }

    /**
     * Handle card click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleCardClick(e) {
        e.preventDefault();

        if (this.props.card.destination) {
            window.open(this.props.card.destination);
        } else if (this.props.onClick) {
            this.props.onClick(e, this.props.card.id);
        }
    }

    /**
     * Generate meta text or more link based on props
     * @return {JSX.Element}
     */
    generateMetatext() {
        if (this.props.card.date) {
            return <Metatext tag="span" text={this.props.card.date} />;
        } else if (this.props.card.moreLink) {
            return (
                <StyledHyperlink
                    text={this.props.card.moreLink.text}
                    href={this.props.card.destination}
                    color={this.props.card.moreLink.color}
                    onFocus={e => scrollElementIntoView(e.target)}
                />
            );
        }
    }

    /**
     * Generate logo based on data source
     * @return {JSX.Element}
     */
    generateLogo() {
        if (this.props.card.source) {
            return (
                <Logo
                    itemScope={true}
                    ariaLabel={this.props.card.source.alt}
                    image={{
                        src: this.props.card.source.src,
                        alt: this.props.card.source.alt,
                        itemScope: true
                    }}
                    text={this.props.card.source.text}
                />
            );
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        let className = this.props.featured ? classNameFeatured : classNameDefault;
        if (this.props.featured && this.props.viewport < halfFeaturedViewportThreshold) {
            className = `${className} ${classNameFeaturedHalf}`;
        }

        return (
            <StyledCard
                width={0}
                height={0}
                image={this.props.card.image.src}
                className={className}
                backgroundcolor={this.props.card.backgroundColor}
                titlecolor={this.props.card.titleColor}
                subtitlecolor={this.props.card.subtitleColor}
                onClick={this.handleCardClick}>
                <Image vp4={this.props.card.image.src} alt={this.props.card.image.alt} />
                <div className="msd-content">
                    <a
                        href={this.props.card.destination || 'javascript:void(0)'}
                        onFocus={e => scrollElementIntoView(e.target)}>
                        <Heading
                            tag="p"
                            level={-1}
                            verticalSpace={false}
                            text={this.props.card.title}
                        />
                    </a>
                    <Subheading level={-1} tag="p" text={this.props.card.subtitle} />
                    {this.generateMetatext()}
                    {this.generateLogo()}
                </div>
            </StyledCard>
        );
    }
}
