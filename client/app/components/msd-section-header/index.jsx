import React from 'react';

import { breakpoints, colors } from '../../lib/variables/styledComponentsVariables.js';

// FW utilities and helpers
import breakpointTracker from '@ms-fw/fw-react/utilities/breakpointTracker';
import { identifyBreakpoint } from '@ms-fw/fw-react/utilities/breakpoints';

// FW components
import { Column, Grid } from '@ms-fw/fw-react/layouts';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'a9685ca1-f279-485f-992b-650ae822dda0',
        enableAutoRouteTracking: true
    }
});
appInsights.loadAppInsights();

// Styled components
import {
    DetailText,
    HeaderText,
    HeaderText2,
    SubHeaderText,
    ProfileText,
    SectionGrid,
    SectionColumn,
    LinkSection,
    Filter
} from './styledComponents';

/**
 * MSDSectionHeader component class
 *
 * Layout Types: article, profile, event, horizontal, vertical, link, innerLink
 *
 * LAYOUT & SETUP Shared Props
 * @prop {string}    layout              Layout Types: See Above
 * @prop {number}    row                 Grid row
 * @prop {string}   ?href                Destination URL for header or linkText if specified
 * @prop {boolean}  ?topBar              Display Top bar on Section Header
 * @prop {boolean}  ?headerTextInset     Inset header text in vp4 and greater
 * @prop {boolean}  ?headerTextTight     Header text will scrunch to 3 columns in vp4 and greater
 * @prop {boolean}  ?headerTextTight     Header text will scrunch to 3 columns in vp4 and greater
 *
 * TEXT Shared Props
 * @prop {string}    headerText          Header text
 * @prop {string}    headerText2         Header text 2 (to support multiple colors in the same header)
 * @prop {string}    detailText          Detail Paragraph text
 * @prop {string}    detailText2         Detail text 2 (to support multiple colors in the same subtext)
 *
 * Event Props
 * @prop {string}   ?dateText            Date text
 *
 * Profile Props
 * @prop {string}   ?profileRole         Role text
 * @prop {string}   ?profileYear         Years text
 *
 * Link Props
 * @prop {string}   ?linkText            Link text
 * @prop {string}   ?href                URL for the link Text or Header if linkText not passed
 * @prop {boolean}  ?isExternalLink      Option to open link in a new tab/window
 * @prop {function} ?onLinkClick         Option to manually handle click event
 *
 * Article Props
 * @prop {[JSX.El]} ?filterList          Array of Filters
 *
 * COLOR Props - color.propName should match the prop it should be applied to.
 * @prop {object}    color                       Color object
 * @prop {string}    color.headerText            Header text color
 * @prop {string}    color.headerText2           Header text 2 color (for multi-color headers)
 * @prop {string}    color.detailText            Detail text color
 * @prop {string}    color.detailText2           Detail text color (for multi-color headers)
 * @prop {string}    color.detailTextLink        Detail link text color for 'innerLink' type layout
 * @prop {string}    color.profileRole           Role text color
 * @prop {string}    color.profileYear           Years text color
 * @prop {string}    color.linkText              Link text color for 'link' type layout
 * @prop {string}    color.dateText              Date text color
 * @prop {string}    color.filterList            Filter item text color
 * @prop {string}    color.filterListSelected    Selected filter item text color
 * @prop {string}   ?color.topBar                Top bar color or header text color if missing
 *
 * TESTING:
 * @prop {boolean}  ?debug                       Show Alignment Grid
 *
 */

const COLOR = {
    detailText: 'detailText',
    detailText2: 'detailText2',
    dateText: 'dateText',
    headerText: 'headerText',
    headerText2: 'headerText2',
    linkText: 'linkText',
    profileRole: 'profileRole',
    profileYear: 'profileYear',
    filterList: 'filterList',
    filterListSelected: 'filterListSelected',
    topBar: 'topBar'
};

const TRUE = 'true';
const FALSE = 'false';

const ALTER_HEADER_MIN_VP = 4;

// LAYOUT CONSTANTS FOR EASY READABILITY

const VP = ['vp0', 'vp1', 'vp2', 'vp3', 'vp4', 'vp5', 'vp6'];
const RULE = {
    date: 'date',
    detail: 'detail',
    filter: 'filter',
    header: 'header',
    link: 'link',
    role: 'role',
    year: 'year'
};
const LAYOUT_DEFAULT = { position: 1, span: 12, order: null };
const LAYOUT_RULES = {
    article: {},
    event: {},
    horizontal: {},
    innerLink: {},
    link: {},
    profile: {},
    vertical: {}
};

// Populate Layout Rules w/ Breakpoints
Object.entries(LAYOUT_RULES).forEach(([key, rules]) => {
    VP.forEach(vp => (rules[vp] = {}));
});

//ARTICLE LAYOUT RULE
LAYOUT_RULES.article.vp1[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.article.vp1[RULE.detail] = { span: 2, position: 5 };
LAYOUT_RULES.article.vp1[RULE.filter] = { span: 5, position: 7 };

LAYOUT_RULES.article.vp0[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.article.vp0[RULE.detail] = { span: 6, position: 6 };
LAYOUT_RULES.article.vp0[RULE.filter] = { span: 6, position: 6 };

// EVENT LAYOUT RULES
LAYOUT_RULES.event.vp4[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.event.vp4[RULE.date] = { span: 2, position: 5, order: 1 };
LAYOUT_RULES.event.vp4[RULE.detail] = { span: 5, position: 7, order: 2 };

LAYOUT_RULES.event.vp0[RULE.header] = { span: 9, position: 1 };
LAYOUT_RULES.event.vp0[RULE.date] = { span: 12, position: 1, order: 1 };
LAYOUT_RULES.event.vp0[RULE.detail] = { span: 12, position: 1, order: 2 };

// HORIZONTAL LAYOUT RULES
LAYOUT_RULES.horizontal.vp4[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.horizontal.vp4[RULE.detail] = { span: 6, position: 5 };

LAYOUT_RULES.horizontal.vp3[RULE.header] = { span: 5, position: 1 };
LAYOUT_RULES.horizontal.vp3[RULE.detail] = { span: 8, position: 1 };

LAYOUT_RULES.horizontal.vp2[RULE.header] = { span: 6, position: 1 };

LAYOUT_RULES.horizontal.vp0[RULE.header] = { span: 8, position: 1 };
LAYOUT_RULES.horizontal.vp0[RULE.detail] = { span: 11, position: 1 };

// INNER LINK LAYOUT RULES
LAYOUT_RULES.innerLink.vp4[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.innerLink.vp4[RULE.detail] = { span: 6, position: 5 };

LAYOUT_RULES.innerLink.vp3[RULE.header] = { span: 5, position: 1 };
LAYOUT_RULES.innerLink.vp3[RULE.detail] = { span: 8, position: 1 };

LAYOUT_RULES.innerLink.vp2[RULE.header] = { span: 6, position: 1 };

LAYOUT_RULES.innerLink.vp0[RULE.header] = { span: 8, position: 1 };
LAYOUT_RULES.innerLink.vp0[RULE.detail] = { span: 11, position: 1 };

// LINK LAYOUT RULES
LAYOUT_RULES.link.vp4[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.link.vp4[RULE.detail] = { span: 4, position: 5 };
LAYOUT_RULES.link.vp4[RULE.link] = { span: 3, position: 10 };

LAYOUT_RULES.link.vp3[RULE.header] = { span: 5, position: 1 };
LAYOUT_RULES.link.vp3[RULE.detail] = { span: 8, position: 1 };
LAYOUT_RULES.link.vp3[RULE.link] = { span: 8, position: 1 };

LAYOUT_RULES.link.vp2[RULE.header] = { span: 6, position: 1 };

LAYOUT_RULES.link.vp0[RULE.header] = { span: 8, position: 1 };
LAYOUT_RULES.link.vp0[RULE.detail] = { span: 11, position: 1 };
LAYOUT_RULES.link.vp0[RULE.link] = { span: 11, position: 1 };

// PROFILE LAYOUT RULES
LAYOUT_RULES.profile.vp4[RULE.header] = { span: 5, position: 1 };
LAYOUT_RULES.profile.vp4[RULE.detail] = { span: 6, position: 6 };
LAYOUT_RULES.profile.vp4[RULE.role] = { span: 12, position: 1 };
LAYOUT_RULES.profile.vp4[RULE.year] = { span: 12, position: 1 };

LAYOUT_RULES.profile.vp0[RULE.header] = { span: 9, position: 1 };
LAYOUT_RULES.profile.vp0[RULE.detail] = { span: 12, position: 1 };
LAYOUT_RULES.profile.vp0[RULE.role] = { span: 12, position: 1 };
LAYOUT_RULES.profile.vp0[RULE.year] = { span: 12, position: 1 };

// VERTICAL LAYOUT RULES
LAYOUT_RULES.vertical.vp4[RULE.header] = { span: 4, position: 1 };
LAYOUT_RULES.vertical.vp4[RULE.detail] = { span: 6, position: 1 };

LAYOUT_RULES.vertical.vp3[RULE.header] = { span: 6, position: 1 };
LAYOUT_RULES.vertical.vp3[RULE.detail] = { span: 8, position: 1 };

LAYOUT_RULES.vertical.vp0[RULE.header] = { span: 8, position: 1 };
LAYOUT_RULES.vertical.vp0[RULE.detail] = { span: 11, position: 1 };

export default class MSDSectionHeader extends React.Component {
    /**
     * The constructor method
     * @param {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);

        this.vp = identifyBreakpoint(window.innerWidth);
        this.state = { vp: `vp${this.vp}` };
    }

    /**
     * React method called when component is mounted
     * @return {void}
     */
    componentDidMount() {
        breakpointTracker.subscribe(this.onBreakpointChange);
        this.onBreakpointChange(identifyBreakpoint(window.innerWidth));
    }

    /**
     * React method called when component will be unmounted
     * @return {void}
     */
    componentWillUnmount() {
        breakpointTracker.unsubscribe(this.onBreakpointChange);
    }

    /**
     * Called on breakpoint change
     * @return {void}
     */
    onBreakpointChange(breakpoint) {
        const vp = VP[breakpoint];
        if (vp != this.state.vp) {
            this.vp = breakpoint;
            this.setState({ vp: vp });
        }
    }

    /* HELPERS */

    getColor(type, fallback = null) {
        const color = this.props.color;
        return color && color[type] ? color[type] : fallback;
    }

    getLayout(rule) {
        const layout = LAYOUT_RULES[this.props.layout];
        let rules = null;
        // Search the rules for a match
        const getRules = vp => {
            return layout && layout[vp] && layout[vp][rule] ? layout[vp][rule] : null;
        };
        // Cascade down and find the layout rules for the existing layout or nearest below it.
        switch (this.state.vp) {
            // ! Below - rules  variable is set & checked in each conditional.
            case VP[6]:
                if ((rules = getRules(VP[6]))) break;
            case VP[5]:
                if ((rules = getRules(VP[5]))) break;
            case VP[4]:
                if ((rules = getRules(VP[4]))) break;
            case VP[3]:
                if ((rules = getRules(VP[3]))) break;
            case VP[2]:
                if ((rules = getRules(VP[2]))) break;
            case VP[1]:
                if ((rules = getRules(VP[1]))) break;
            case VP[0]:
                if ((rules = getRules(VP[0]))) break;
        }
        return rules;
    }

    debugAlignment() {
        if (!this.props.debug) return '';
        return (
            <div
                style={{
                    position: 'absolute',
                    height: '100vh',
                    width: '100vw',
                    marginTop: '-96px',
                    left: '0',
                    opacity: '.25',
                    backgroundImage:
                        'linear-gradient(cyan, cyan 25%, transparent 25%, transparent)',
                    backgroundSize: '100% 4px',
                    pointerEvents: 'none',
                    mixBlendMode: 'difference'
                }}
            />
        );
    }

    /* EVENTS */

    generateExtrasEvent() {
        if (!this.props.dateText) return '';

        const layout = this.getLayout(RULE.date) || LAYOUT_DEFAULT;

        return (
            <SectionColumn span={layout.span} position={layout.position} order={layout.order}>
                <DetailText
                    level={1}
                    text={this.props.dateText}
                    bold={TRUE}
                    color={this.getColor(COLOR.dateText)}
                />
            </SectionColumn>
        );
    }

    /* PROFILE */

    generateExtrasProfile() {
        return (
            <React.Fragment>
                {this.generateRole()}
                {this.generateYear()}
            </React.Fragment>
        );
    }

    generateRole() {
        if (!this.props.profileRole) return '';

        // Set layout defaults
        const layout = this.getLayout(RULE.role) || LAYOUT_DEFAULT;
        return (
            <SectionColumn span={layout.span} position={layout.position}>
                <ProfileText
                    tag="span"
                    text={this.props.profileRole}
                    color={this.getColor(COLOR.profileRole)}
                />
            </SectionColumn>
        );
    }

    generateYear() {
        if (!this.props.profileYear) return '';

        // Set layout defaults
        const layout = this.getLayout(RULE.year) || LAYOUT_DEFAULT;

        return (
            <SectionColumn span={layout.span} position={layout.position}>
                <ProfileText
                    tag="span"
                    text={this.props.profileYear}
                    color={this.getColor(COLOR.profileYear)}
                />
            </SectionColumn>
        );
    }

    handleLinkClick(e) {
        e.preventDefault();

        if (this.props.onLinkClick) {
            this.props.onLinkClick(e);
        } else if (this.props.href) {
            if (this.props.isExternalLink !== true) {
                window.location.href = this.props.href;
            } else {
                appInsights.trackEvent({
                    name: 'ExternalLinkClick',
                    properties: { href: this.props.href }
                });
                window.open(this.props.href);
            }
        }
    }

    /* LINK */
    generateExtrasLink() {
        if (!(this.props.linkText && (this.props.href || this.props.onLinkClick))) return '';
        const layout = this.getLayout(RULE.link) || LAYOUT_DEFAULT;

        return (
            <SectionColumn span={layout.span} position={layout.position}>
                <DetailText level={1} bold={TRUE} color={this.getColor(COLOR.linkText)}>
                    <a
                        aria-label={this.props.ariaLabel}
                        href={this.props.href}
                        onClick={this.handleLinkClick}>
                        {this.props.linkText}
                    </a>
                </DetailText>
            </SectionColumn>
        );
    }

    /* ARTICLE */
    generateExtrasArticle() {
        if (!this.props.filterList) return '';

        const layout = this.getLayout(RULE.filter) || LAYOUT_DEFAULT;

        return (
            <SectionColumn
                data-testid="FILTER_LIST"
                span={layout.span}
                position={layout.position}>
                <Filter
                    tag="ul"
                    level={1}
                    bare={true}
                    items={this.props.filterList}
                    color={this.getColor(COLOR.filterList)}
                    colorselected={this.getColor(COLOR.filterListSelected)}
                    onClick={e => this.handleFilterItemClick(e)}
                />
            </SectionColumn>
        );
    }

    /**
     * Handle filter list item click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleFilterItemClick(e) {
        e.preventDefault();
        if (this.props.onFilterItemClick) this.props.onFilterItemClick(e);
    }

    /**
     * Generate heading text
     * @param {string} colorText
     * @param {string} inset
     * @param {string} tight
     * @return {JSX.Element}
     */
    generateHeadingText(colorText, colorText2, inset, tight) {
        const rules = LAYOUT_RULES;
        const layout = this.props.layout;
        let headerText = this.props.headerText;
        let headerText2 = this.props.headerText2;
        let subHeaderText = this.props.subHeaderText;

        // Check if we have an href & the layout type isn't link or innerLink
        if (
            this.props.href &&
            rules[layout] != rules.link &&
            rules[layout] != rules.innerLink
        ) {
            return (
                <LinkSection href="${this.props.href}" linkcolor={this.props.color.linkText}>
                    <HeaderText
                        tag="h1"
                        level={1}
                        color={colorText}
                        inset={inset}
                        tight={tight}>
                        {headerText}{' '}
                        <HeaderText2
                            className="spanTextColor"
                            color={colorText}
                            color2={colorText2}>
                            {headerText2}
                        </HeaderText2>
                    </HeaderText>
                </LinkSection>
            );
        } else {
            return (
                <HeaderText tag="h1" level={1} color={colorText} inset={inset} tight={tight}>
                    {headerText}{' '}
                    <HeaderText2 color={colorText} color2={colorText2}>
                        {headerText2}
                    </HeaderText2>
                    <SubHeaderText>
                        <br />
                        {subHeaderText}
                    </SubHeaderText>
                </HeaderText>
            );
        }
    }

    /* DEFAULT ITEMS */

    generateHeading() {
        // Setup Colors & Layout
        const colorText = this.getColor(COLOR.headerText);
        const colorText2 = this.getColor(COLOR.headerText2);
        const colorBar = this.getColor(COLOR.topBar);
        const inset =
            this.props.headerTextInset && this.vp >= ALTER_HEADER_MIN_VP ? TRUE : null;
        const tight =
            this.props.headerTextTight && this.vp >= ALTER_HEADER_MIN_VP ? TRUE : null;

        // Set layout defaults
        const layout = this.getLayout(RULE.header) || LAYOUT_DEFAULT;

        return (
            <SectionColumn
                span={layout.span}
                position={layout.position}
                topbar={this.props.topBar ? TRUE : FALSE}
                topbarcolor={colorBar}>
                {this.generateHeadingText(colorText, colorText2, inset, tight)}
            </SectionColumn>
        );
    }

    generateDetail() {
        // Set layout defaults
        const layout = this.getLayout(RULE.detail) || LAYOUT_DEFAULT;
        const rules = LAYOUT_RULES;
        const bold = rules.article === rules[this.props.layout] ? TRUE : '';
        const linkColor =
            this.props.color && this.props.color.detailTextLink
                ? this.props.color.detailTextLink
                : '';

        return (
            <SectionColumn span={layout.span} position={layout.position} order={layout.order}>
                <DetailText
                    level={1}
                    text={this.props.detailText}
                    bold={bold}
                    linkcolor={linkColor}
                    color={this.getColor(COLOR.detailText)}
                />
            </SectionColumn>
        );
    }

    generateExtras() {
        const rules = LAYOUT_RULES;
        const layout = this.props.layout;

        switch (rules[layout]) {
            case rules.article:
                return this.generateExtrasArticle();
            case rules.event:
                return this.generateExtrasEvent();
            case rules.link:
                return this.generateExtrasLink();
            case rules.profile:
                return this.generateExtrasProfile();
            default:
                return '';
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        if (!LAYOUT_RULES[this.props.layout]) return;
        return (
            <SectionGrid
                tag="section"
                row={this.props.row}
                topbar={this.props.topBar ? TRUE : FALSE}
                gutter={6}>
                {this.debugAlignment()}
                {this.generateHeading()}
                {this.generateDetail()}
                {this.generateExtras()}
            </SectionGrid>
        );
    }
}
