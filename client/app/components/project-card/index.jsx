import React from 'react';

import { colors } from '../../lib/variables/styledComponentsVariables';

// Styled components
import {
    HeaderText,
    HeaderText2,
    LinkSection,
    ProjectContainer,
    TextSection,
    TitleSection
} from './styledComponents';

export class ProjectCard extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

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
            ],
            projTitleHeight: '100%',
            projSummaryHeight: '100%'
        };

        this.updateProjectCardSizes = this.updateProjectCardSizes.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.updateProjectCardSizes();
        }
    }

    componentDidMount() {
        this._isMounted = true;

        this.updateProjectCardSizes();

        window.addEventListener('resize', this.updateProjectCardSizes);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.updateProjectCardSizes);
    }

    updateProjectCardSizes() {
        setTimeout(() => {
            this.setContainerHeightByClassName('projTitle', 'projTitleHeight');
            this.setContainerHeightByClassName('projSummary', 'projSummaryHeight');
        }, 20);
    }

    getRenderedDate() {
        if (this.props.date == '') {
            return;
        }

        var date = new Date(this.props.date.split('T')[0]);
        var dateString = `Est. ${
            this.state.months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
        return dateString.toUpperCase();
    }

    setContainerHeightByClassName(className, stateHeight) {
        var classNameList = document.getElementsByClassName(className);

        var maxHeight = 0;

        if (classNameList != undefined) {
            for (var index = 0; index < classNameList.length; index++) {
                /*Each section in ProjContainer has an outer div that maintains row height and an inner
                 * div that maintains the actual height of the element so that when the outer div changes its height
                 * row height can always be the max by comparing the max height of the inner div.
                 */
                var innerDivHeight = classNameList[index].childNodes[0].clientHeight;
                if (maxHeight < innerDivHeight) {
                    maxHeight = innerDivHeight;
                }
            }

            if (this._isMounted) {
                if (maxHeight > 0) {
                    this.setState({
                        [stateHeight]: maxHeight + 'px'
                    });
                } else {
                    this.setState({
                        [stateHeight]: '100%'
                    });
                }
            }
        }
    }

    render() {
        return (
            <ProjectContainer
                isExternalLink={false}
                canResizeCaption={false}
                caption={this.getRenderedDate()}
                href={`/projects/${this.props.id}`}>
                <TitleSection
                    className="projTitle"
                    style={{ height: this.state.projTitleHeight }}>
                    <div>
                        <LinkSection
                            href={`/projects/${this.props.id}`}
                            linkcolor={colors.blue.base}>
                            <HeaderText
                                tag="h3"
                                level={4}
                                color={colors.blue.base}
                                verticalSpace={false}>
                                {this.props.header}{' '}
                                <HeaderText2
                                    className="spanTextColor"
                                    color={colors.blue.base}
                                    color2={colors.black}>
                                    {this.props.subtitle}
                                </HeaderText2>
                            </HeaderText>
                        </LinkSection>
                    </div>
                </TitleSection>
                <TextSection
                    className="projSummary"
                    style={{ height: this.state.projSummaryHeight }}>
                    <div>{this.props.summary}</div>
                </TextSection>
            </ProjectContainer>
        );
    }
}

export default { ProjectCard };
