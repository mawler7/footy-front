// Styled Components
import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;


export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 0.2em;
  color: #e0e0e0;
`;

export const Subtitle = styled.h2`
  font-size: 1.5em;
  color: #ccc;
  margin-bottom: 1.5em;
`;

export const GoogleButton = styled.button`
 
  color: white;
  font-size: 1.2em;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
      color: blue;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const LogoutButton = styled(GoogleButton)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`
    ;
