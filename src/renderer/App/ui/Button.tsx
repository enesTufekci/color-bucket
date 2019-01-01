import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 600;
  color: #444;
  &:disabled {
    opacity: 0.5;
    cursor: disabled;
  }
`;

export default Button;
