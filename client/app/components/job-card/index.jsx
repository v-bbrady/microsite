import React from 'react';

// FW components
import { Heading, Paragraph } from '@ms-fw/fw-react/components';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import { Container, ImageSection, ContentContainer, TextSection } from './styledComponents';

export default class JobCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textHeight: '100%'
        };
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.updateTextBlurbSize();
        }
    }

    componentDidMount() {
        this.updateTextBlurbSize();
        window.addEventListener('resize', this.updateTextBlurbSize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateTextBlurbSize.bind(this));
    }

    updateTextBlurbSize() {
        var classNameList = document.getElementsByClassName('textSection');

        var maxHeight = 0;

        if (classNameList != undefined) {
            for (var index = 0; index < classNameList.length; index++) {
                var innerDivHeight = classNameList[index].childNodes[0].clientHeight;
                if (maxHeight < innerDivHeight) {
                    maxHeight = innerDivHeight;
                }
            }

            if (maxHeight > 0) {
                this.setState({
                    textHeight: maxHeight + 'px'
                });
            } else {
                this.setState({
                    textHeight: '100%'
                });
            }
        }
    }

    render() {
        return (
            <Container
                headingColor={colors.blue.base}
                canResizeCaption={false}
                caption={'CAREERS'}
                href={this.props.link}>
                <ContentContainer>
                    <Heading
                        className="jobHeading"
                        tag="h3"
                        level={4}
                        href={this.props.link}
                        text={this.props.header}
                        verticalSpace={false}
                    />
                    <TextSection
                        className="textSection"
                        style={{ height: this.state.textHeight }}>
                        <Paragraph
                            level={3}
                            text={this.props.jobSummary}
                            verticalSpace={false}
                        />
                    </TextSection>
                    <ImageSection alt={this.props.header + ' icon'} src={this.props.image} />
                </ContentContainer>
            </Container>
        );
    }
}
