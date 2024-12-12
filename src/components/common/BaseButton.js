import styled from 'styled-components';

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  border: none;
  outline: none;

  &:hover {
    background-color: #3b3f46;
    color: white;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

export default BaseButton;