import * as React from 'react';
import { ProjectItem, Color } from './Projects';
import { LowdbAsync, LoDashExplicitAsyncWrapper } from 'lowdb';

import { v4 } from 'uuid';
import CreateColorForm from '@renderer/components/CreateColorForm';
import Button from '@renderer/ui/Button';
import ColorTile from '@renderer/components/ColorTile';
import ColorGrid from '@renderer/components/ColorGrid';
import ProjectTitle from '@renderer/components/ProjectTitle';

interface ProjectProps {
  projectId: string;
  db: LowdbAsync<any>;
  handleBack: () => void;
}

interface ProjectState {
  showCreateColorForm: boolean;
  project: ProjectItem;
  ready: boolean;
}

class Project extends React.Component<ProjectProps, ProjectState> {
  project: LoDashExplicitAsyncWrapper<ProjectItem> = {} as any;
  state = {
    showCreateColorForm: false,
    project: {} as ProjectItem,
    ready: false
  };

  componentDidMount() {
    this.fetchProject();
    document.addEventListener('keydown', this.handleKeyboardEvents);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardEvents);
  }

  handleKeyboardEvents = (event: KeyboardEvent) => {
    if (event.keyCode === 78 && event.metaKey) {
      this.setState({ showCreateColorForm: true });
    }
    if (event.keyCode === 27) {
      this.setState({ showCreateColorForm: false });
    }
  };

  fetchProject = async () => {
    const { db, projectId } = this.props;
    this.project = (await db.get('projects').find({ id: projectId })) as LoDashExplicitAsyncWrapper<
      ProjectItem
    >;
    this.setState({
      project: await this.project.value(),
      ready: true
    });
  };

  handleSaveColor = async (color: Color) => {
    await this.project
      .get('colors')
      .push({ ...color, id: v4() })
      .write();
    this.setState({ showCreateColorForm: false }, this.fetchProject);
  };

  handleDeleteColor = async (id: string) => {
    await this.project
      .get('colors')
      .remove({ id })
      .write();
    await this.fetchProject();
  };

  handleCancelCreateColor = () => this.setState({ showCreateColorForm: false });
  handleShowCreateColorForm = () => this.setState({ showCreateColorForm: true });

  render() {
    const { handleBack } = this.props;
    const { project, ready, showCreateColorForm } = this.state;
    return project.name && ready ? (
      <div>
        <Button onClick={handleBack}>
          {'< '}
          Back
        </Button>
        <ProjectTitle
          title={project.name}
          onClick={this.handleShowCreateColorForm}
          showAddButton={!showCreateColorForm}
        />
        {showCreateColorForm && (
          <CreateColorForm
            onCancel={this.handleCancelCreateColor}
            onSubmit={this.handleSaveColor}
          />
        )}
        <ColorGrid
          handleDeleteColor={this.handleDeleteColor}
          colors={this.project.get('colors').value()}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Project;
