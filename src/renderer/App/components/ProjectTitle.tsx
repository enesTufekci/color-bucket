import * as React from 'react';
import styled from 'styled-components';
import Button from '@renderer/ui/Button';

const ProjectTitleStyled = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Button} {
    font-size: 0.8rem;
  }
`;

interface ProjectTitleProps {
  title: string;
  onClick: () => void;
  showAddButton: boolean;
}

const ProjectTitle: React.SFC<ProjectTitleProps> = ({ title, showAddButton, onClick }) => {
  return (
    <ProjectTitleStyled>
      {title} {showAddButton && <Button onClick={onClick}>+ Add Color</Button>}
    </ProjectTitleStyled>
  );
};

export default ProjectTitle;
