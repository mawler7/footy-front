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
        color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: ${({ theme }) => theme.spacing.xsmall};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
         color: ${({ theme }) => theme.colors.text};
  }
`;

export const LogoutButton = styled(GoogleButton)`
  background-color: #e74c3c;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: #c0392b;
  }
`;
