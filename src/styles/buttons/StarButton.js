import styled from 'styled-components';
import { StyledStar } from './buttons';


const StarButton = ({ onClick, isActive }) => {
  return (
    <StarContainer onClick={onClick}>
      <StyledStar isActive={isActive} />
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-left: 3px;
    margin-right: 5px;
  }
`;



export default StarButton;
