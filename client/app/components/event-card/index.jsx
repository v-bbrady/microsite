import React from 'react';

// MSD utilities and helpers
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import { EventContainer, HeaderText, Label, LinkSection, Section } from './styledComponents';

/**
 *
 * @prop {string}       header
 * @prop {string}       start
 * @prop {string}       end
 * @prop {string}       desc
 * @prop {IImageProps}  link
 *
 * @prop {MasterCardProps}
 */
export default class EventCard extends React.Component {
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
            days: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            titleHeight: '100%',
            descriptionHeight: '100%'
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.updateEventCardSizes();
        }
    }

    componentDidMount() {
        this._isMounted = true;

        this.updateEventCardSizes();

        window.addEventListener('resize', this.updateEventCardSizes.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.updateEventCardSizes.bind(this));
    }

    updateEventCardSizes() {
        this.setContainerHeightByClassName('title', 'titleHeight');
        this.setContainerHeightByClassName('description', 'descriptionHeight');
    }

    setContainerHeightByClassName(className, stateHeight) {
        var classNameList = document.getElementsByClassName(className);

        var maxHeight = 0;

        if (classNameList != undefined) {
            for (var index = 0; index < classNameList.length; index++) {
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

    getHeadingText() {
        let headerText = this.props.event.header;

        return (
            <div className="title" style={{ height: this.state.titleHeight }}>
                <div>
                    <LinkSection href={this.props.event.link} linkcolor={colors.blue.base}>
                        <HeaderText
                            tag="h3"
                            level={4}
                            color={colors.black}
                            verticalSpace={false}>
                            {headerText}
                        </HeaderText>
                    </LinkSection>
                </div>
            </div>
        );
    }

    getStartEndDate() {
        var startHours = this.props.event.start.getHours();
        var endHours = this.props.event.end.getHours();
        var startMinutes = ('0' + this.props.event.start.getMinutes()).slice(-2);
        var endMinutes = ('0' + this.props.event.end.getMinutes()).slice(-2);

        return (
            <div>
                <Label>Start Date</Label> {this.state.days[this.props.event.start.getDay()]}{' '}
                {this.state.months[this.props.event.start.getMonth()]}{' '}
                {this.props.event.start.getDate()}, {this.props.event.start.getFullYear()}{' '}
                {((startHours + 11) % 12) +
                    1 +
                    ':' +
                    startMinutes +
                    (startHours >= 12 ? ' p.m.' : ' a.m.')}{' '}
                <br />
                <Label>End Date</Label> {this.state.days[this.props.event.end.getDay()]}{' '}
                {this.state.months[this.props.event.end.getMonth()]}{' '}
                {this.props.event.end.getDate()}, {this.props.event.end.getFullYear()}{' '}
                {((endHours + 11) % 12) +
                    1 +
                    ':' +
                    endMinutes +
                    (endHours >= 12 ? ' p.m.' : ' a.m.')}
            </div>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <EventContainer
                className="testclasskajsdlfajldsf"
                caption={this.props.event.category}
                href={this.props.event.link}
                headingColor={colors.blue.base}
                bodyColor={colors.gray.mid}>
                {this.getHeadingText()}
                {this.getStartEndDate()}
                <Section>
                    <Label>Location</Label> {this.props.event.location}
                </Section>
                <Section
                    className="description"
                    style={{ height: this.state.descriptionHeight }}>
                    <div>{this.props.event.desc}</div>
                </Section>
            </EventContainer>
        );
    }
}
