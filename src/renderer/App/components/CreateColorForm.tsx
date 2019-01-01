import * as React from 'react';
import Input from '@renderer/ui/Input';
import Button from '@renderer/ui/Button';
import { validateHexCode } from '@renderer/util';
import styled from 'styled-components';

const ColorFormContainer = styled.div`
  margin-bottom: 16px;
`;
const ColorFormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type ColorType = {
  id: string;
  description: string;
  hexCode: string;
};

interface CreateColorFormProps {
  onSubmit: (color: ColorType) => void;
  onCancel: () => void;
}
interface CreateColorFormState {
  values: ColorType;
  isValid: boolean;
}

class CreateColorForm extends React.Component<CreateColorFormProps, CreateColorFormState> {
  firstInputRef = React.createRef();
  submitInputRef = React.createRef();
  state = {
    values: {
      description: '',
      hexCode: '',
      id: ''
    },
    isValid: false
  };

  componentDidMount() {
    if (this.firstInputRef.current) {
      (this.firstInputRef.current as any).focus();
    }
    if (this.submitInputRef.current) {
      (this.submitInputRef.current as HTMLInputElement).addEventListener(
        'keydown',
        this.handleSubmitWithEnter
      );
    }
  }

  componentWillUnmount() {
    if (this.submitInputRef.current) {
      (this.submitInputRef.current as HTMLInputElement).removeEventListener(
        'keydown',
        this.handleSubmitWithEnter
      );
    }
  }

  handleSubmitWithEnter = (event: KeyboardEvent) => {
    const { isValid } = this.state;
    if (event.keyCode === 13 && isValid) {
      this.handleSubmit();
    }
  };

  updateValue = (key: string) => (event: Event) => {
    const { value } = event.target as any;
    this.setState(
      state => ({
        values: {
          ...state.values,
          [key]: value
        }
      }),
      this.validate
    );
  };

  validate = () => {
    const {
      values: { description, hexCode }
    } = this.state;
    if (description !== '' && validateHexCode(hexCode)) {
      return this.setState({ isValid: true });
    }
    return this.setState({ isValid: false });
  };

  handleSubmit = () => {
    const { values } = this.state;
    const { onSubmit } = this.props;
    onSubmit(values);
  };

  render() {
    const {
      isValid,
      values: { description, hexCode }
    } = this.state;
    const { onCancel } = this.props;
    return (
      <ColorFormContainer>
        <Input
          ref={this.firstInputRef}
          placeholder="Description"
          value={description}
          onChange={this.updateValue('description')}
        />
        <Input
          ref={this.submitInputRef}
          placeholder="Hex Code"
          value={hexCode}
          onChange={this.updateValue('hexCode')}
        />
        <ColorFormButtons>
          <Button onClick={onCancel}>Cancel</Button>
          <Button disabled={!isValid} onClick={this.handleSubmit}>
            Save
          </Button>
        </ColorFormButtons>
      </ColorFormContainer>
    );
  }
}

export default CreateColorForm;
