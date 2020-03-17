import React from 'react';

// Styled components
import { StyledButton } from './styledComponents';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'a9685ca1-f279-485f-992b-650ae822dda0',
        enableAutoRouteTracking: true
    }
});
appInsights.loadAppInsights();

/**
 * MSDButton component class
 *
 * @prop {IButtonProps}
 * @prop {Object}       color               Colors
 * @prop {boolean}      [isExternalLink]    Is destination URL an external link?
 */
export default class MSDButton extends React.Component {
    /**
     * The constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    /**
     * Handle button click event
     * @param {MouseEvent} e
     * @return void
     */
    handleButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.href) {
            if (this.props.isExternalLink === false) {
                window.location.href = this.props.href;
            } else {
                appInsights.trackEvent({
                    name: 'ExternalLinkClick',
                    properties: { href: this.props.href }
                });
                window.open(this.props.href);
            }
        } else if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <StyledButton
                text={this.props.text}
                href={this.props.href}
                id={this.props.id}
                type={this.props.type}
                data-colors={this.props.colors}
                onClick={this.handleButtonClick}
            />
        );
    }
}
