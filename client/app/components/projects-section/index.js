import { ProjectCard } from '../project-card';
import React from 'react';

import { Column, Grid } from '@ms-fw/fw-react/layouts';

class ProjectSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedProjects: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.projects.length > 0) {
                this.sortProjects();
            }
        }
    }

    componentDidMount() {
        this.sortProjects();
    }

    sortProjects() {
        //clone the array so that we don't modify the original data
        var projects = [];

        for (var index in this.props.projects) {
            projects.push(Object.assign({}, this.props.projects[index]));
        }

        projects.sort((proj1, proj2) => {
            //sort by reverse chronology
            if (proj1.date > proj2.date) return -1;
            if (proj1.date < proj2.date) return 1;

            //sort by title
            if (proj1.header < proj2.header) return -1;
            if (proj1.header > proj2.header) return 1;

            return 0;
        });

        this.setState({
            sortedProjects: projects
        });
    }

    generateProjectCards() {
        if (this.state.sortedProjects.length === 0) return;

        return this.state.sortedProjects.map((id, index) => {
            const project = this.state.sortedProjects[index];

            if (this.props.show4Column) {
                return (
                    <Column key={index} span={[12, 12, 6, 4, 3, 3]}>
                        <ProjectCard {...project} />
                    </Column>
                );
            } else {
                return (
                    <Column key={index} span={[12, 12, 6, 6, 6, 4]}>
                        <ProjectCard {...project} />
                    </Column>
                );
            }
        });
    }

    render() {
        return <Grid gutter={6}>{this.generateProjectCards()}</Grid>;
    }
}

export { ProjectSection };
