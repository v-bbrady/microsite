import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image } from '@ms-fw/fw-react/components';
import { colors } from '../../lib/variables/styledComponentsVariables';
import useForceUpdate from 'use-force-update';
import validator from 'validator';
require('@babel/polyfill');
require('isomorphic-fetch');

// Styled components
import {
    AuthorSection,
    DateSection,
    HeaderText,
    HeaderText2,
    InnerDiv,
    LinkSection,
    PlatformTypeSection,
    PubContainer,
    ResearchTypeSection,
    TextSection,
    TitleSection
} from './styledComponents';

/**
 * ProfileCard component class
 *
 * @prop {string} header Publication title
 * @prop {string} subheader Publication title
 * @prop {string} year  Publication year
 * @prop {string} month Publication month
 * @prop {string[]} pubLinks All view publication links
 * @prop {string} link Main publication link
 * @prop {string} platform Delivery platform (conference, report, etc)
 * @prop {string} organizer (optional)
 * @prop {string} publisher (optional)
 * @prop {string[]} researchArea Area of research
 * @prop {string} type Publication type
 * @prop {bool} showTeaserVersion Teaser version is for lab pages and displays an image and no byline, whereas other publication sections will show extra info and authors but no image
 * @prop {MasterCardProps}
 * @prop {MSDButtonProps}   [button]
 */

function PublicationCard(props) {
    const [authors, setAuthors] = useState([]);
    const [pubResearchHeight, setResearchHeight] = useState('100%');
    const [pubTitleHeight, setTitleHeight] = useState('100%');
    const [pubAuthorHeight, setAuthorHeight] = useState('100%');
    const [pubPlatformHeight, setPlatformHeight] = useState('100%');
    const [pubOrganizerHeight, setOrganizerHeight] = useState('100%');
    const [pubLinksHeight, setPubLinksHeight] = useState('100%');
    const [totalAuthors, setTotalAuthors] = useState(0);
    const [, forceUpdate] = useState();

    useEffect(() => {
        const abortController = new AbortController();

        fetchPublicationAuthorData(abortController);

        return () => {
            abortController.abort();
            window.removeEventListener('resize', updatePublicationCardSizes);
        };
    }, []);

    useLayoutEffect(() => {
        const updatePubTimer = setTimeout(() => {
            updatePublicationCardSizes();
        }, 400);

        window.addEventListener('resize', updatePublicationCardSizes);
        return () => clearTimeout(updatePubTimer);
    }, []);

    const updatePublicationCardSizes = () => {
        //When you click maximize or restore, the page hasn't rendered yet so the values don't match.to the new values when it's calculating these
        setTimeout(() => {
            setResearchHeight(getContainerMaxHeightByClassName('innerPubResearchDiv'));
            setTitleHeight(getContainerMaxHeightByClassName('innerPubTitleDiv'));
            setAuthorHeight(getContainerMaxHeightByClassName('innerPubAuthorDiv'));
            setPlatformHeight(getContainerMaxHeightByClassName('innerPubPlatformDiv'));
            setOrganizerHeight(getContainerMaxHeightByClassName('innerPubOrganizerDiv'));
            setPubLinksHeight(getContainerMaxHeightByClassName('innerPubLinksDiv'));
        }, 20);
    };

    const getContainerMaxHeightByClassName = innerDivClassName => {
        var classNameList = document.getElementsByClassName(innerDivClassName);

        if (classNameList != undefined) {
            var maxHeight = 0;

            for (var index = 0; index < classNameList.length; index++) {
                var divHeight = classNameList[index].clientHeight;

                if (maxHeight < divHeight) {
                    maxHeight = divHeight;
                }
            }

            if (maxHeight > 0) {
                return maxHeight;
            } else {
                return '100%';
            }
        }
    };

    const getMonthText = month => {
        var months = [
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
        ];

        return months[month];
    };

    const fetchPublicationAuthorData = abortController => {
        let promiseArray = [];

        setTotalAuthors(props.publicationData.authors.length);

        for (var i = 0; i < props.publicationData.authors.length; i++) {
            let profileId = props.publicationData.authors[i];

            //all internal profiles are stored as GUIDs, if it's just an author without a profile page we avoid the lookup
            if (validator.isUUID(profileId)) {
                var fetchUrl = `https://${
                    process.env.REACT_APP_SERVICE_URL
                }.azurewebsites.net/api/azuredata/profile/${profileId}`;

                promiseArray.push(
                    fetch(fetchUrl, { signal: abortController.signal })
                        .then(response => response.json())
                        .then(response =>
                            handleAuthorProfileResponse(
                                response,
                                props.publicationData.authors.length
                            )
                        )
                        .catch(error => {
                            if (error.code !== 20) {
                                handleAuthorProfileErrorResponse(error, 'error', profileId);
                            } else {
                                return Promise.reject(error.name);
                            }
                        })
                );
            } else {
                handleAuthorProfileErrorResponse(
                    'No fetch attempted, id is not a Guid',
                    'warning',
                    profileId
                );
            }
        }

        return Promise.all(promiseArray).catch(error => error);
    };

    //if profile is not found, just add the "author name" without a link to the profile
    const handleAuthorProfileErrorResponse = (error, totalNumAuthors, id) => {
        setAuthors(authors => authors.concat(id));
    };

    const handleAuthorProfileResponse = (response, totalNumAuthors) => {
        var authorLink = `<a style="color:${colors.blue.base};" href='/profile/${
            response.id
        }'>${response.header}</a>`;

        setAuthors(authors => authors.concat(authorLink));
    };

    const getAzureBlobStoragePath = () => {
        return 'https://azuredatamicrosite.blob.core.windows.net/images/';
    };

    const concatResearchAreas = () => {
        if (props.publicationData.researchArea === []) {
            return;
        }

        if (
            typeof props.publicationData.researchArea === 'string' ||
            props.publicationData.researchArea instanceof String
        ) {
            return props.publicationData.researchArea.toUpperCase();
        }
        var researchArea = props.publicationData.researchArea
            .join('; ')
            .toLowerCase()
            .replace('analysis', 'DATA MANAGEMENT, ANALYSIS, AND VISUALIZATION')
            .replace('systems', 'SYSTEMS AND NETWORKING')
            .replace('algorithms', 'ALGORITHMS')
            .replace('ml', 'MACHINE LEARNING');

        return researchArea;
    };

    const getOrganizer = () => {
        if (
            props.publicationData.organizer === '' ||
            props.publicationData.organizer === null
        ) {
            return;
        } else {
            return `Organized By ${props.publicationData.organizer}`;
        }
    };

    const getPublisher = () => {
        if (
            props.publicationData.publisher === '' ||
            props.publicationData.publisher === null
        ) {
            return;
        } else {
            return `Published By ${props.publicationData.publisher}`;
        }
    };

    const getPublications = () => {
        if (props.publicationData.pubLinks === [] || props.publicationData.pubLinks === null) {
            return;
        }

        var links = [];
        var pubLinks = props.publicationData.pubLinks;

        for (var index in pubLinks) {
            links.push(`<a href=${pubLinks[index]}>Go to Publication</a>`);
        }
        return links.join(' | ');
    };

    const getAuthorsSection = () => {
        if (authors.length === 0 && totalAuthors != authors.length) return;

        var authorsString = authors.join(', ');

        return authorsString;
    };

    const getMonth = publicationDate => {
        if (publicationDate === '') {
            return;
        }

        var date = new Date(publicationDate.split('T')[0]);
        return getMonthText(date.getMonth());
    };

    const getYear = publicationDate => {
        if (publicationDate === '') {
            return;
        }

        var date = new Date(publicationDate.split('T')[0]);
        return date.getFullYear();
    };

    const getImageURL = () => {
        if (props.publicationData.image == '') return;

        return getAzureBlobStoragePath() + props.publicationData.image;
    };

    const getVersionedPublicationCard = () => {
        if (props.showTeaserVersion) {
            return (
                <div>
                    <DateSection>
                        {getMonth(props.publicationData.publicationDate)}
                    </DateSection>
                    <div align={'center'}>
                        <Image width={'240px'} height={'240px'} vp4={getImageURL()} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <AuthorSection style={{ height: pubAuthorHeight }}>
                        <InnerDiv
                            className="innerPubAuthorDiv"
                            dangerouslySetInnerHTML={{ __html: getAuthorsSection() }}
                        />
                    </AuthorSection>
                    <TextSection style={{ height: pubPlatformHeight }}>
                        <InnerDiv className="innerPubPlatformDiv">
                            <PlatformTypeSection>
                                {props.publicationData.platform}
                            </PlatformTypeSection>
                            {` | ${getMonth(props.publicationData.publicationDate)} ${getYear(
                                props.publicationData.publicationDate
                            )}`}
                        </InnerDiv>
                    </TextSection>
                    <TextSection style={{ height: pubOrganizerHeight }}>
                        <InnerDiv className="innerPubOrganizerDiv">
                            {getOrganizer()} {getPublisher()}
                        </InnerDiv>
                    </TextSection>
                    <TextSection style={{ height: pubLinksHeight }}>
                        <InnerDiv
                            className="innerPubLinksDiv"
                            dangerouslySetInnerHTML={{ __html: getPublications() }}
                        />
                    </TextSection>
                </div>
            );
        }
    };

    const changePageLocation = () => {
        window.location = `/publications/${props.publicationData.id}`;
    };

    return (
        <PubContainer onClick={changePageLocation}>
            <ResearchTypeSection
                style={{
                    height: pubResearchHeight
                }}>
                <InnerDiv className="innerPubResearchDiv">{concatResearchAreas()}</InnerDiv>
            </ResearchTypeSection>
            <TitleSection style={{ height: pubTitleHeight }}>
                <InnerDiv className="innerPubTitleDiv">
                    <LinkSection
                        href={`/publications/${props.publicationData.id}`}
                        linkcolor={colors.blue.base}>
                        <HeaderText
                            tag="h3"
                            level={4}
                            color={colors.blue.base}
                            verticalSpace={false}>
                            {props.publicationData.header}{' '}
                            <HeaderText2
                                className="spanTextColor"
                                color={colors.blue.base}
                                color2={colors.black}>
                                {props.publicationData.subtitle}
                            </HeaderText2>
                        </HeaderText>
                    </LinkSection>
                </InnerDiv>
            </TitleSection>
            {getVersionedPublicationCard()}
        </PubContainer>
    );
}

export { PublicationCard };
