import React from 'react';

// FW components
import { Paragraph } from '@ms-fw/fw-react/components';
import { colors } from '../../lib/variables/styledComponentsVariables.js';

// Styled components
import {
    Container,
    HeaderText,
    JobSection,
    LinkSection,
    NameSection,
    PersonContactInfoSection
} from './styledComponents';

/**
 * ProfileCard component class
 *
 * @prop {string}       header          Profile Name
 * @prop {string}       jobTitle        Job title
 * @prop {string}       description     Description
 * @prop {IImageProps}  image           FluentWeb image component props
 *
 * @prop {MasterCardProps}
 * @prop {MSDButtonProps}   [button]
 */
export default class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
    }

    getAzureBlobStoragePath() {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    }

    generateContactSection(profile) {
        var contacts = [];

        if (profile.email) {
            contacts.push(
                `<a aria-label="${profile.header} + ' Email'" href="mailto:${
                    profile.email
                }">EMAIL</a>`
            );
        }

        if (profile.msr) {
            contacts.push(
                `<a target="_blank" aria-label="${profile.header} + ' MSR page'" href="${
                    profile.msr
                }">MSR</a>`
            );
        }

        if (profile.github) {
            contacts.push(
                `<a target="_blank" aria-label="${profile.header} + ' Github page'" href="${
                    profile.github
                }">GITHUB</a>`
            );
        }

        if (profile.website) {
            contacts.push(
                `<a target="_blank" aria-label="${profile.header} + ' Website'" href="${
                    profile.website
                }">WEBSITE</a>`
            );
        }

        var contactInfo = contacts.join('&nbsp;|&nbsp;');

        if (contactInfo == '') {
            contactInfo = '&nbsp;';
        }

        return <PersonContactInfoSection dangerouslySetInnerHTML={{ __html: contactInfo }} />;
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        var profile = this.props.profile;

        return (
            <div>
                <Container
                    isExternalLink={false}
                    canResizeCaption={false}
                    caption={profile.group.toUpperCase()}
                    href={'/profile/' + profile.id}
                    image={`${this.getAzureBlobStoragePath() + profile.image}`}>
                    <NameSection className="nameSection">
                        <LinkSection
                            href={'/profile/' + profile.id}
                            linkcolor={colors.blue.base}>
                            <HeaderText
                                tag="h3"
                                level={4}
                                color={colors.blue.base}
                                verticalSpace={false}>
                                {profile.header}
                            </HeaderText>
                        </LinkSection>
                    </NameSection>
                    <JobSection className="job">
                        <Paragraph level={3} text={profile.jobTitle} verticalSpace={false} />
                    </JobSection>

                    <div className="imgContainer" />
                </Container>
                {this.generateContactSection(profile)}
            </div>
        );
    }
}
