import React, { Component } from 'react';
import {
    AddressSection,
    MapFrame,
    MapLinkSection,
    MapSection,
    MapContactSection,
    MapLabTitleSection
} from './styledComponents.js';

class EmbeddedMap extends Component {
    constructor(props) {
        super(props);
    }

    getContactSection() {
        return (
            <MapContactSection>
                <MapLabTitleSection>{this.props.info.title}</MapLabTitleSection>
                <div>
                    {this.getAddressSection()}
                    <div>Phone: {this.props.info.phone}</div>
                    <div>Fax: </div>
                    {this.props.info.fax}
                </div>
            </MapContactSection>
        );
    }

    getAddressSection() {
        return (
            <AddressSection>
                <div>{this.props.info.suite}</div>
                <div>{this.props.info.address}</div>
                <div>{this.props.info.city}</div>
                <div>{this.props.info.state}</div>
                <div>{this.props.info.zipcode}</div>
            </AddressSection>
        );
    }

    render() {
        return (
            <MapSection>
                <MapFrame
                    title={this.props.info.title + ' Location Map'}
                    src={this.props.src}
                    scrolling={'no'}
                />
                <MapLinkSection>
                    <a
                        id="largeMapLink"
                        target="_blank"
                        href="https://www.bing.com/maps?cp=43.05608999999999~-89.372836&amp;sty=r&amp;lvl=15&amp;FORM=MBEDLD">
                        View Larger Map
                    </a>{' '}
                    &nbsp; | &nbsp;
                    <a
                        id="dirMapLink"
                        target="_blank"
                        href="https://www.bing.com/maps/directions?cp=43.05608999999999~-89.372836&amp;sty=r&amp;lvl=15&amp;rtp=~pos.43.05608999999999_-89.372836____&amp;FORM=MBEDLD">
                        Get Directions
                    </a>
                </MapLinkSection>
                {this.getContactSection()}
            </MapSection>
        );
    }
}

// title: 'MICROSOFT IGNITE',
// suite: "Suite 400",
// Address: "634 W. Main St",
// City: "Madison",
// State: "Wi",
// ZipCode: "53703",
// Phone: "(608) 310-3350",
// Fax: "(608) 310-4475"

export { EmbeddedMap };
