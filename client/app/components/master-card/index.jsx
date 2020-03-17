import React from 'react';

// FW components
import { Caption } from '@ms-fw/fw-react/components';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// Styled components
import { Container, CaptionSection } from './styledComponents';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'a9685ca1-f279-485f-992b-650ae822dda0',
        enableAutoRouteTracking: true
    }
});
appInsights.loadAppInsights();

/**
 * MasterCard component class
 *
 * @prop {string}   [backgroundColor]   Card background color
 * @prop {string}   [bodyColor]         Primary text color
 * @prop {string}   [caption]           Card caption
 * @prop {string}   [captionColor]      Card caption color
 * @prop {string}   [headingColor]      Card heading color
 * @prop {theme}    [theme]             Dark or light theme options
 * @prop {boolean}  [isShadowDisabled]  Option to disable box shadow
 * @prop {string}   [href]              Destination URL
 * @prop {boolean}  [isExternalLink]    Is destination URL an external link?
 * @prop {Function} [onClick]           Click event handler
 */
export default class MasterCard extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            captionHeight: '100%'
        };

        this.handleCardClick = this.handleCardClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateCaptionCardSize();

        window.addEventListener('resize', this.updateCaptionCardSize.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.updateCaptionCardSize.bind(this));
    }

    updateCaptionCardSize() {
        var classNameList = document.getElementsByClassName('captionSection');

        var maxHeight = 0;

        for (var index = 0; index < classNameList.length; index++) {
            var innerDivHeight = classNameList[index].childNodes[0].clientHeight;
            if (maxHeight < innerDivHeight) {
                maxHeight = innerDivHeight;
            }
        }

        if (this._isMounted) {
            if (maxHeight > 0) {
                this.setState({
                    captionHeight: maxHeight + 10 + 'px'
                });
            } else {
                this.setState({
                    captionHeight: '100%'
                });
            }
        }
    }

    /**
     * Handle card click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleCardClick(e) {
        e.preventDefault();

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
     * Generate card caption
     * @return {JSX.Element}
     */
    generateCaption() {
        if (!this.props.caption) return;

        if (!this.props.canResizeCaption) {
            return <Caption tag="p" level={1} text={this.props.caption} />;
        }

        return (
            <CaptionSection
                className="captionSection"
                style={{ height: this.state.captionHeight }}>
                <Caption tag="p" level={1} text={this.props.caption} />
            </CaptionSection>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container
                {...this.props}
                onClick={this.handleCardClick}
                isActionable={!!this.props.href || !!this.props.onClick}>
                {this.generateCaption()}
                <div>{this.props.children}</div>
            </Container>
        );
    }
}
