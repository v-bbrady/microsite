import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

import { EventCard, MSDSectionHeader, TypographicEnd } from '../../components';
import { CalendarContainer, Container, Interstitial } from './styledComponents';
import { Column, Grid, Page } from '@ms-fw/fw-react/layouts';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';
import { setUhfThemeWhite } from '../../action-creators/uhfTheme';

const globalizeLocalizer = localizer(globalize);

// Styled components
import {} from './styledComponents';

class EventsCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.onBreakpointChange = this.onBreakpointChange.bind(this);

        this.state = {
            events: [],
            selectedEvent: null,
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
            upcomingEvents: [],
            vp: 4,
            maxUpcomingEvents: 4
        };

        this.fetchEventsData();
    }

    componentDidMount() {
        this.props.dispatch(setUhfThemeWhite());
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            vp: breakpoint + 1
        });
    }

    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    fetchEventsData() {
        fetch(
            `https://${
                process.env.REACT_APP_SERVICE_URL
            }.azurewebsites.net/api/azuredata/events`
        )
            .then(response => response.json())
            .then(response => this.handleEventsResponse(response))
            .catch(error => console.log(`${error} unable to get events list`));
    }

    handleEventsResponse(response) {
        for (var i = 0; i < response.events.length; i++) {
            response.events[i].start = new Date(response.events[i].start);
            response.events[i].end = new Date(response.events[i].end);
        }

        response.events.sort((ev1, ev2) => {
            //sort by reverse chronology
            if (ev1.start > ev2.start) return 1;
            if (ev1.start < ev2.start) return -1;

            return 0;
        });

        var upcomingEvents = [];

        for (var i = 0; i < response.events.length; i++) {
            if (
                upcomingEvents.length < this.state.maxUpcomingEvents &&
                response.events[i].start > Date.now()
            ) {
                //Add title to object since it's a required parameter for the calendar.
                response.events[i].title = response.events[i].header;
                upcomingEvents.push(response.events[i]);
            }
        }

        this.setState({
            upcomingEvents: upcomingEvents
        });

        this.setState({
            events: response.events,
            upcomingEvents: upcomingEvents
        });
    }

    // sortEvents() {}

    getStartEndDate() {
        var startHours = this.state.selectedEvent.start.getHours();
        var endHours = this.state.selectedEvent.end.getHours();
        console.log(this.state.selectedEvent.start);
        console.log(this.state.selectedEvent.end);

        return (
            <div>
                Start: {this.state.days[this.state.selectedEvent.start.getDay()]}{' '}
                {this.state.months[this.state.selectedEvent.start.getMonth()]}{' '}
                {this.state.selectedEvent.start.getDate()},{' '}
                {this.state.selectedEvent.start.getFullYear()}{' '}
                {((startHours + 11) % 12) + 1 + (startHours >= 12 ? ' p.m.' : ' a.m.')} <br />
                End: {this.state.days[this.state.selectedEvent.end.getDay()]}{' '}
                {this.state.months[this.state.selectedEvent.end.getMonth()]}{' '}
                {this.state.selectedEvent.end.getDate()},{' '}
                {this.state.selectedEvent.end.getFullYear()}{' '}
                {((endHours + 11) % 12) + 1 + (endHours >= 12 ? ' p.m.' : ' a.m.')}
            </div>
        );
    }

    generateUpcomingEventsSection() {
        if (this.state.upcomingEvents.length == 0) return;

        return this.state.upcomingEvents.map((id, index) => {
            const event = this.state.upcomingEvents[index];

            let size = 'small';
            let span = 12;

            // Set card size and span based on viewport
            switch (this.state.vp) {
                case 6:
                case 5:
                    size = 'small';
                    span = 3;
                    break;
                case 4:
                    size = 'medium';
                    span = 6;
                case 3:
                    size = 'small';
                    span = 6;
                    break;
                case 2:
                case 1:
                default:
                    break;
            }

            return (
                <Column key={index + id} span={[12, 12, 6, 6, 3]}>
                    <EventCard event={event} />
                </Column>
            );
        });
    }

    generateEventInformation() {
        if (this.state.selectedEvent == null) return;

        var x = this.state.selectedEvent.start;
        var y = this.state.selectedEvent.end;
        return (
            <Interstitial>
                <a href={this.state.selectedEvent.link} target="_blank">
                    {this.state.selectedEvent.header}
                    {this.getStartEndDate(this.state.selectedEvent)}
                    Location: {this.state.selectedEvent.location}
                    <br />
                    {this.state.selectedEvent.desc}
                </a>
            </Interstitial>
        );
    }

    render() {
        return (
            <Container>
                <Page>
                    <div />
                    <CalendarContainer>
                        <BigCalendar
                            selectable
                            localizer={globalizeLocalizer}
                            events={this.state.events}
                            defaultView={BigCalendar.Views.MONTH}
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date()}
                            onSelectEvent={event => this.setState({ selectedEvent: event })}
                        />
                    </CalendarContainer>
                </Page>
                <Page>
                    <div>&nbsp;</div>
                    {this.generateEventInformation()}
                </Page>
                <Page>
                    <MSDSectionHeader layout="horizontal" headerText="Upcoming Events" />
                    <Grid gutter={6}>{this.generateUpcomingEventsSection()}</Grid>
                </Page>
                <TypographicEnd headingColor={colors.blue.base} linkColor={colors.blue.base} />
            </Container>
        );
    }
}

export default withRouter(connect()(EventsCalendar));
