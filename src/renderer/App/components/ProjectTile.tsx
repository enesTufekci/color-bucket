import * as React from 'react';
import { ProjectItem, Color } from '@renderer/screens/Projects';
import styled from 'styled-components';
import { createLinearGradient } from '@renderer/util';

const ProjectTileWrapper = styled.div`
  width: calc(100% / 3 - 5px);
  padding: 5px;
`;

const ProjectTileStyled = styled.div<{ bg: string }>`
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
`;

interface ProjectTileProps {
  project: ProjectItem;
  selectProject: () => void;
}

class ProjectTile extends React.Component<ProjectTileProps> {
  render() {
    const { project, selectProject } = this.props;
    const bg = createLinearGradient(project.colors);

    return (
      <ProjectTileWrapper>
        <ProjectTileStyled onClick={selectProject} bg={bg}>
          {project.name}
        </ProjectTileStyled>
      </ProjectTileWrapper>
    );
  }
}

export default ProjectTile;
