import * as React from 'react';
import { Color } from '@renderer/screens/Projects';
import ColorTile from './ColorTile';
import styled from 'styled-components';

const ColorGridStyled = styled.div`
  display: flex;
  margin: 0 -5px;
`;

interface ColorGridProps {
  colors: Color[];
  handleDeleteColor: (id: Color['id']) => void;
}

class ColorGrid extends React.Component<ColorGridProps> {
  render() {
    const { colors, handleDeleteColor } = this.props;

    return (
      <ColorGridStyled>
        {colors.map(color => (
          <ColorTile key={color.id} handleDeleteColor={handleDeleteColor} color={color} />
        ))}
      </ColorGridStyled>
    );
  }
}

export default ColorGrid;
