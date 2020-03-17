import React from 'react';

// Styled components
import { VideoContainer, VideoDiv } from './styledComponents';

export default class Video extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <VideoDiv>
                <VideoContainer id="background-video" loop autoPlay muted>
                    <source src={this.props.videoUrl} type="video/mp4" />
                </VideoContainer>
            </VideoDiv>
        );
    }
}
