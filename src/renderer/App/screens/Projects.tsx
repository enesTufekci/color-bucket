import * as React from 'react';
import { v4 } from 'uuid';
import InputWithSubmit from '@renderer/components/InputWithSubmit';
import { LowdbAsync, LoDashExplicitAsyncWrapper } from 'lowdb';
import ProjectList from '@renderer/components/ProjectList';
import Project from './Project';

interface ProjectsProps {
  db: LowdbAsync<any>;
}

export type Color = {
  id: string;
  description: string;
  hexCode: string;
};

export type ProjectItem = {
  name: string;
  id: string;
  colors: Color[];
};

interface ProjectsState {
  projects: ProjectItem[];
  selectedProjectId: string | null;
}

class Projects extends React.Component<ProjectsProps, ProjectsState> {
  state = {
    projects: [],
    selectedProjectId: null
  };
  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    const { db } = this.props;
    const p = await db.get('projects');
    const projects = p.value() as ProjectItem[];
    this.setState({ projects });
  };

  handleCreateProject = async (value: string) => {
    const { db } = this.props;
    await db
      .get('projects')
      .push({ id: v4(), name: value, colors: [] })
      .write();
    this.fetchProjects();
  };

  handleSelect = (id: string) => {
    this.setState({ selectedProjectId: id });
  };

  handleDelete = async (id: string) => {
    const { db } = this.props;
    await db
      .get('projects')
      .remove({ id })
      .write();

    this.fetchProjects();
  };

  handleBack = () => this.setState({ selectedProjectId: null });
  render() {
    const { projects, selectedProjectId } = this.state;
    return !selectedProjectId ? (
      <div>
        <InputWithSubmit placeholder="Create a project" onSubmit={this.handleCreateProject} />

        <ProjectList
          projects={projects}
          handleDelete={this.handleDelete}
          handleSelect={this.handleSelect}
        />
      </div>
    ) : (
      <Project handleBack={this.handleBack} db={this.props.db} projectId={selectedProjectId} />
    );
  }
}

export default Projects;
