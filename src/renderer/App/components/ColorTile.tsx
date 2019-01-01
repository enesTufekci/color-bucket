import * as React from 'react';
import { Color } from '@renderer/screens/Projects';
import styled from 'styled-components';
import { clipboard, ipcRenderer } from 'electron';
import Button from '@renderer/ui/Button';

const ColorTileWrapper = styled.div`
  width: calc(100% / 3);
  padding: 5px;
`;

const ColorTileStyled = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  color: white;

  height: 44px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  line-height: 44px;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s;
  &:active {
    opacity: 0.5;
  }
  &:hover {
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
  }
  ${Button} {
    color: inherit;
  }
`;

interface ColorTileProps {
  color: Color;
  handleDeleteColor: (id: Color['id']) => void;
}

interface ColorTileState {
  showDetails: boolean;
}

class ColorTile extends React.Component<ColorTileProps, ColorTileState> {
  timeOut = null as any;

  state = {
    showDetails: false
  };

  handleShowDetails = () => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.setState({ showDetails: true });
    }, 1000);
  };

  handleCopy = () => {
    clearTimeout(this.timeOut);
    const { color } = this.props;
    clipboard.writeText(color.hexCode);
  };

  handleDelete = () => {
    const { handleDeleteColor, color } = this.props;
    handleDeleteColor(color.id);
  };

  cancelDetails = () => this.setState({ showDetails: false });

  render() {
    const { color } = this.props;
    const { showDetails } = this.state;
    return (
      <ColorTileWrapper>
        <ColorTileStyled
          onMouseDown={this.handleShowDetails}
          onMouseUp={this.handleCopy}
          color={color.hexCode}
        >
          {showDetails ? (
            <React.Fragment>
              <Button onClick={this.handleDelete}> Delete </Button>
              <Button onClick={this.cancelDetails}> Cancel </Button>
            </React.Fragment>
          ) : (
            <span>
              {color.description} {color.hexCode}
            </span>
          )}
        </ColorTileStyled>
      </ColorTileWrapper>
    );
  }
}

export default ColorTile;
