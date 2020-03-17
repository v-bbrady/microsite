import { PublicationCard } from '../publication-card';
import React from 'react';

import { Column, Grid } from '@ms-fw/fw-react/layouts';
import { Container, DropDown } from './styledComponents';

class PublicationSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'Year',
            sortedPublications: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.publications.length > 0) {
                this.changeSortOrder('', { key: this.state.selectedItem });
            }
        }
    }

    componentDidMount() {
        this.changeSortOrder('', { key: this.state.selectedItem });
    }

    changeSortOrder(event, item) {
        if (event === undefined || item === undefined) return;

        var key = item.key;
        this.state.selectedItem = key;

        //clone the array so that we don't modify the original data
        var publications = [];

        for (var index in this.props.publications) {
            publications.push(Object.assign({}, this.props.publications[index]));
        }

        switch (key) {
            case 'Year': {
                publications.sort((pub1, pub2) => {
                    var pub1Date = new Date(pub1.publicationDate);
                    var pub2Date = new Date(pub2.publicationDate);

                    //display year in first row of publication card data instead of research area
                    pub1.researchArea = pub1Date.getFullYear().toString();
                    pub2.researchArea = pub2Date.getFullYear().toString();

                    //sort by reverse chronology
                    if (pub1.publicationDate > pub2.publicationDate) return -1;
                    if (pub1.publicationDate < pub2.publicationDate) return 1;

                    //sort by title
                    if (pub1.header < pub2.header) return -1;
                    if (pub1.header > pub2.header) return 1;

                    return 0;
                });

                break;
            }
            case 'Research': {
                publications.sort((pub1, pub2) => {
                    //sort ascending by research area (just looking at first key to avoid duplicate cards created)
                    if (pub1.researchArea[0] < pub2.researchArea[0]) return -1;
                    if (pub1.researchArea[0] > pub2.researchArea[0]) return 1;

                    //sort by reverse chronology
                    if (pub1.publicationDate > pub2.publicationDate) return -1;
                    if (pub1.publicationDate < pub2.publicationDate) return 1;

                    //lastly sort ascending by title
                    if (pub1.header < pub2.header) return -1;
                    if (pub1.header > pub2.header) return 1;
                    return 0;
                });

                break;
            }

            case 'Type': {
                publications.sort((pub1, pub2) => {
                    //display publication type in first row of publication card data instead of research area
                    pub1.researchArea = pub1.type;
                    pub2.researchArea = pub2.type;

                    //sort ascending by research area (just looking at first key to avoid duplicate cards created)
                    if (pub1.type < pub2.type) return -1;
                    if (pub1.type > pub2.type) return 1;

                    //sort by reverse chronology
                    if (pub1.publicationDate > pub2.publicationDate) return -1;
                    if (pub1.publicationDate < pub2.publicationDate) return 1;

                    //lastly if months are same, sort ascending by title
                    if (pub1.header < pub2.header) return -1;
                    if (pub1.header > pub2.header) return 1;
                    return 0;
                });
                break;
            }
        }
        this.setState({
            sortedPublications: publications
        });
    }

    generatePublicationCards() {
        if (this.state.sortedPublications.length === 0) {
            return <Column />;
        }

        return this.state.sortedPublications.map((header, index) => {
            const publication = this.state.sortedPublications[index];
            if (this.props.showTeaserVersion) {
                return (
                    <Column key={index} span={[12, 12, 6, 6, 6, 3]}>
                        <PublicationCard
                            key={publication.id}
                            showTeaserVersion={this.props.showTeaserVersion}
                            publicationData={publication}
                        />
                    </Column>
                );
            } else {
                if (this.props.show4Column) {
                    return (
                        <Column key={index} span={[12, 12, 6, 4, 3, 3]}>
                            <PublicationCard
                                key={publication.id}
                                showTeaserVersion={this.props.showTeaserVersion}
                                publicationData={publication}
                            />
                        </Column>
                    );
                } else {
                    return (
                        <Column key={index} span={[12, 6, 6, 4, 4]}>
                            <PublicationCard
                                key={publication.id}
                                showTeaserVersion={this.props.showTeaserVersion}
                                publicationData={publication}
                            />
                        </Column>
                    );
                }
            }
        });
    }

    getDropDownView() {
        if (this.props.hideViewByDropDown) return <Column />;

        return (
            <Column span={12} style={{ padding: '50px 0px 0px 0px' }}>
                <Container>
                    <DropDown
                        label={'Sort By:'}
                        dropdownWidth="140px"
                        autoComplete="on"
                        selectedKey={this.state.selectedItem}
                        options={[
                            {
                                key: 'Year',
                                text: 'Year'
                            },
                            {
                                key: 'Research',
                                text: 'Research Area'
                            },
                            {
                                key: 'Type',
                                text: 'Publication Type'
                            }
                        ]}
                        onChange={(event, item) => this.changeSortOrder(event, item)}
                    />
                </Container>
            </Column>
        );
    }

    render() {
        return (
            <Grid gutter={6}>
                {this.getDropDownView()}
                {this.generatePublicationCards()}
            </Grid>
        );
    }
}

export { PublicationSection };
