import * as React from 'react';
import Input from '@renderer/ui/Input';
import Button from '@renderer/ui/Button';
import styled from 'styled-components';

const InputWithSubmitWrapper = styled.div`
  position: relative;
  ${Button} {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface InputWithSubmitProps {
  placeholder: string;
  submitLabel?: string;
  onSubmit: (value: string) => void;
}

interface InputWithSubmitState {
  value: string;
}

class InputWithSubmit extends React.Component<InputWithSubmitProps> {
  inputRef = React.createRef();
  state = {
    value: ''
  };

  static defaultProps = {
    submitLabel: 'Submit'
  };

  componentDidMount() {
    if (this.inputRef.current) {
      const input = this.inputRef.current as HTMLInputElement;
      input.focus();
      input.addEventListener('keydown', this.handleEnter);
    }
  }

  componentWillUnmount() {
    if (this.inputRef.current) {
      const input = this.inputRef.current as HTMLInputElement;
      input.removeEventListener('keydown', this.handleEnter);
    }
  }

  handleEnter = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  handleInputUpdate = (event: KeyboardEvent) => {
    const { value } = event.target as any;
    this.setState({ value });
  };

  handleSubmit = () => {
    const { value } = this.state;
    this.setState({ value: '' });
    this.props.onSubmit(value);
  };
  render() {
    const { placeholder, submitLabel, onSubmit } = this.props;
    const { value } = this.state;
    return (
      <InputWithSubmitWrapper>
        <Input
          ref={this.inputRef}
          placeholder={placeholder}
          onChange={this.handleInputUpdate}
          value={value}
        />
        {value && <Button onClick={this.handleSubmit}>{submitLabel}</Button>}
      </InputWithSubmitWrapper>
    );
  }
}

export default InputWithSubmit;
