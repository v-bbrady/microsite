import React from 'react';
import Video from '../video-component';
import { Image } from '@ms-fw/fw-react/components';
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

class DisplayedMedia extends React.Component {
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);

        this.state = {
            vp: 4,
            display: this.props.display
        };
    }

    componentDidMount() {
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    getDisplayedMedia() {
        if (this.state.display === null) return;

        switch (this.state.vp) {
            case 1: {
                if (this.state.display.vp1 !== null) {
                    if (this.state.display.vp1.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp1
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp1}
                                vp1={this.getAzureBlobStoragePath() + this.state.display.vp1}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }
            case 2: {
                if (this.state.display.vp2 !== null) {
                    if (this.state.display.vp2.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp2
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp2}
                                vp2={this.getAzureBlobStoragePath() + this.state.display.vp2}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }
            case 3: {
                if (this.state.display.vp3 !== null) {
                    if (this.state.display.vp3.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp3
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp3}
                                vp3={this.getAzureBlobStoragePath() + this.state.display.vp3}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }

            case 4: {
                if (this.state.display.vp4 !== null) {
                    if (this.state.display.vp4.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp4
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp4}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }
            case 5: {
                if (this.state.display.vp5 !== null) {
                    if (this.state.display.vp5.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp5
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp5}
                                vp5={this.getAzureBlobStoragePath() + this.state.display.vp5}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }
            case 6: {
                if (this.state.display.vp5 !== null) {
                    if (this.state.display.vp6.endsWith('.mp4')) {
                        return (
                            <Video
                                videoUrl={
                                    this.getAzureBlobStoragePath() + this.state.display.vp6
                                }
                                alt={this.state.display.alt}
                            />
                        );
                    } else {
                        return (
                            <Image
                                vp4={this.getAzureBlobStoragePath() + this.state.display.vp6}
                                vp6={this.getAzureBlobStoragePath() + this.state.display.vp6}
                                alt={this.state.display.alt}
                            />
                        );
                    }
                }
            }
        }
    }

    render() {
        return <div>{this.getDisplayedMedia()}</div>;
    }
}

export default DisplayedMedia;
