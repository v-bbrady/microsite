import React from 'react';
import { cloneDeep } from 'lodash';

// FW components
import { Heading, Image, Paragraph } from '@ms-fw/fw-react/components';

// MSD components
import { MSDButton } from '../';

// Styled components
import { Container, ToolkitActionMenu } from './styledComponents';

/**
 * ToolkitCard component class
 *
 *
 * @prop {string}       description    Body copy
 * @prop {string}       heading        Heading text
 * @prop {IImageProps}  image          FluentWeb image component props
 *
 * @prop {MasterCardProps}
 * @prop {MSDButtonProps}   [button]
 * @prop {string}           [theme]             Light or dark theme option
 * @prop {boolean}          [isFullBleedImage]  Optional full bleed image layout
 */
export default class ToolkitCard extends React.Component {
    /**
     * The constructor method
     * @param {object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.handleActionMenuClick = this.handleActionMenuClick.bind(this);
    }

    /**
     * Handle toolkit item action menu click event
     * @param {MouseEvent} e
     * @return {void}
     */
    handleActionMenuClick(e) {
        const index = e.target.parentNode.getAttribute('id');
        const downloadUrl = this.props.button.menu.items[index]
            ? this.props.button.menu.items[index].url
            : null;

        if (downloadUrl) {
            window.open(downloadUrl);
        }
    }

    /**
     * Make sure the correct container props are passed
     * @return {Object}
     */
    coerceContainerProps() {
        let containerProps = cloneDeep(this.props);

        if (containerProps.button.href) {
            containerProps['href'] = containerProps.button.href;
            containerProps['isExternalLink'] = containerProps.button.isExternalLink;
        }

        return containerProps;
    }

    /**
     * Generate button
     * @param {Object} data
     * @return {JSX.Element}
     */
    generateButton(data) {
        if (!data) return;

        if (data.href) {
            return (
                <span>
                    <MSDButton
                        text={this.props.button.text}
                        href={this.props.button.href}
                        id={this.props.button.id}
                        isExternalLink={this.props.button.isExternalLink}
                        type="submit"
                        colors={this.props.button.colors}
                    />
                </span>
            );
        } else if (data.menu) {
            return (
                <ToolkitActionMenu
                    id={data.id}
                    actionTrigger={{ text: this.props.button.text }}
                    menu={data.menu}
                    onClick={e => this.handleActionMenuClick(e)}
                    colors={data.colors}
                />
            );
        }
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <Container {...this.coerceContainerProps()}>
                <Heading tag="h3" level={5} text={this.props.heading} verticalSpace={false} />
                <Paragraph level={3} text={this.props.description} verticalSpace={false} />
                <div />
                {this.generateButton(this.props.button)}
            </Container>
        );
    }
}
