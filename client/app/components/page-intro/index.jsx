import React from 'react';
import lottie from 'lottie-web';

// FW components
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// MSD components
import { MSDSectionHeader } from '../';

// Styled components
import { Container } from './styledComponents';
import DisplayedMedia from '../displayed-media';

/**
 * PageIntro component class
 *
 * @prop {Object}       heading
 * @prop {string}       heading.text            Heading text
 * @prop {string}       [heading.color]         Heading color
 *
 * @prop {Object}       subheading
 * @prop {string}       subheading.text         Subheading text
 * @prop {string}       [subheading.color]      Subheading color
 *
 * @prop {IImageProps}  [image]                 FW Image component props
 * @prop {boolean}      [isLargeImage]          Option to use the large image layout
 * @prop {boolean}      [breakGridOnWidestVp]   Option for the image to break the grid on vp6
 * @prop {boolean}      [isFullBleedImage]      Option to use the full-bleed image layout
 * @prop {Object}       [animation]             Hero animations
 *
 * @prop {string}       [backgroundColor]       Background color
 */
export default class PageIntro extends React.Component {
    /**
     * Constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.handleIntroAnimationComplete = this.handleIntroAnimationComplete.bind(this);

        this.isAnimationEnabled = true;
        this.isAnimationPlaying = false;

        this.state = {
            vp: 6
        };
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));

        this.loadAnimation();
    }

    /**
     * React method called when component will be unmounted
     * @return {void}
     */
    componentWillUnmount() {
        if (this.introAnimation) {
            this.introAnimation.removeEventListener(
                'complete',
                this.handleIntroAnimationComplete
            );
            this.introAnimation.destroy();
        }

        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    /**
     * Handles breakpoint change event
     * @param {number} breakpoint
     * @return {void}
     */
    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });

        this.loadAnimation();
    }

    /**
     * Handles intro animation 'complete' event
     * @return {void}
     */
    handleIntroAnimationComplete() {
        this.isAnimationPlaying = false;
        this.isAnimationEnabled = false;
    }

    /**
     * Load and play intro svg animation for current viewport
     * @return {void}
     */
    loadAnimation() {
        if (
            this.props.animation &&
            this.introAnimationContainer &&
            this.isAnimationEnabled &&
            !this.isAnimationPlaying
        ) {
            const animation =
                this.props.animation[`vp${this.state.vp}`] || this.props.animation.vp4;

            if (this.introAnimation) {
                this.introAnimation.removeEventListener(
                    'complete',
                    this.handleIntroAnimationComplete
                );
                this.introAnimation.destroy();
            }

            this.introAnimation = lottie.loadAnimation({
                container: this.introAnimationContainer,
                renderer: 'svg',
                loop:
                    typeof this.props.animation.loop === 'undefined'
                        ? true
                        : this.props.animation.loop,
                autoplay:
                    typeof this.props.animation.autoplay === 'undefined'
                        ? true
                        : this.props.animation.autoplay,
                animationData: animation
            });

            // If animation is set to not loop, listen to its 'complete' event
            if (this.props.animation.loop === false) {
                this.isAnimationPlaying = true;
                this.introAnimation.addEventListener(
                    'complete',
                    this.handleIntroAnimationComplete
                );
            }
        }
    }

    /**
     * Generate hero image
     * @return {JSX.Element}
     */
    generateImage() {
        if (this.props.image) {
            return (
                <DisplayedMedia
                    display={this.props.image}
                    className="msd-page-intro-image-container"
                />
            );
        } else if (this.props.animation) {
            return (
                <div
                    className="msd-page-intro-animation-container"
                    ref={element => (this.introAnimationContainer = element)}
                />
            );
        } else {
            return;
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container {...this.props}>
                <Page>
                    <MSDSectionHeader {...this.props.sectionHeader} />
                    <Grid gutter={6}>
                        <Column>{this.generateImage()}</Column>
                    </Grid>
                </Page>
            </Container>
        );
    }
}
