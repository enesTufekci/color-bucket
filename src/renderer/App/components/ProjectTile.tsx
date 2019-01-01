import * as React from 'react';
import styled from 'styled-components';

import { ProjectItem, Color } from '@renderer/screens/Projects';
import { createLinearGradient } from '@renderer/util';
import Button from '@renderer/ui/Button';
import { is } from '@renderer/util/styled-is';

const ProjectTileWrapper = styled.div`
  width: calc(100% / 3 - 5px);
  padding: 5px;
`;

const ProjectTileStyled = styled.div<{ bg: string; isDraft: boolean }>`
  border-radius: 5px;
  height: 128px;
  background: ${({ bg }) => bg};
  color: white;
  line-height: 128px;
  text-align: center;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
  }
  &:active {
    opacity: 0.5;
  }
  ${is('isDraft')`
    color: #444;
    border: 2px dashed #444;
    background: none;
    box-shadow: none;
  `};
`;

interface ProjectTileProps {
  project: ProjectItem;
  selectProject: () => void;
  deleteProject: (event: Event) => void;
}

interface ProjectTileState {
  showDetails: boolean;
}

class ProjectTile extends React.Component<ProjectTileProps, ProjectTileState> {
  showDetailTimeout = null as any;
  state = {
    showDetails: false
  };

  componentWillUnmount() {
    clearTimeout(this.showDetailTimeout as any);
  }

  handleShowDetails = () => {
    clearTimeout(this.showDetailTimeout as any);
    this.showDetailTimeout = setTimeout(() => {
      this.setState({ showDetails: true });
    }, 1000);
  };

  handleSelect = () => {
    const { showDetails } = this.state;
    if (!showDetails) {
      clearTimeout(this.showDetailTimeout as any);
      const { selectProject } = this.props;
      selectProject();
    }
  };

  hideDetails = () => {
    clearTimeout(this.showDetailTimeout as any);
    this.setState({ showDetails: false });
  };

  render() {
    const { project, deleteProject } = this.props;
    const { showDetails } = this.state;
    const bg = createLinearGradient(project.colors);

    return (
      <ProjectTileWrapper onMouseDown={this.handleShowDetails}>
        <ProjectTileStyled
          onMouseUp={this.handleSelect}
          isDraft={project.colors.length === 0}
          bg={bg}
        >
          {!showDetails ? (
            project.name
          ) : (
            <React.Fragment>
              <Button onClick={this.hideDetails}>Cancel</Button>
              <Button onClick={deleteProject}>Delete</Button>
            </React.Fragment>
          )}
        </ProjectTileStyled>
      </ProjectTileWrapper>
    );
  }
}

export default ProjectTile;
