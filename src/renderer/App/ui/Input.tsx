import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 44px;
  font-size: 18px;
  border: none;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2);
  text-indent: 10px;
  outline: none;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
  }
  transition: 0.3s;
`;

export default Input;
