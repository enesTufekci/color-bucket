import * as React from 'react';
import { ProjectItem } from '@renderer/screens/Projects';
import styled from 'styled-components';
import Button from '@renderer/ui/Button';
import ProjectTile from './ProjectTile';

const ProjectListContainer = styled.div`
  margin: 0 -5px;
  width: 100%;
  display: flex;
`;

const ProjectListItem = styled.li`
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

interface ProjectListProps {
  projects: ProjectItem[];
  handleDelete: (id: string) => void;
  handleSelect: (id: string) => void;
}

class ProjectList extends React.Component<ProjectListProps> {
  deleteProject = (id: string) => (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    const { handleDelete } = this.props;
    handleDelete(id);
  };

  render() {
    const { projects, handleDelete, handleSelect } = this.props;
    return (
      <ProjectListContainer>
        {projects.map(project => {
          const selectProject = () => handleSelect(project.id);
          return (
            <ProjectTile
              deleteProject={this.deleteProject(project.id)}
              selectProject={selectProject}
              key={project.id}
              project={project}
            />
          );
        })}
      </ProjectListContainer>
    );
  }
}

export default ProjectList;
