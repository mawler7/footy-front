import React, { useContext } from 'react';
import {
  HomePageContainer, VideoBackground, Content, Title, Subtitle, GoogleButton, LogoutButton
} from '../../styles/login/LoginStyles';
import videoSrc from '../../icons/mp5.mp4';
import googleLogo from '../../icons/icons8-google.svg';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <HomePageContainer>

      <VideoBackground autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </VideoBackground>

      <Content>

        <Title>Welcome to FootyStars</Title>

        <Subtitle>Your ultimate football match tracker</Subtitle>
        {!isLoggedIn ? (
          <GoogleButton onClick={handleLogin}>
            <div>
              <img src={googleLogo} alt="Google logo" />
            </div>
            <span>Continue with Google</span>
          </GoogleButton>
        ) : (
          <LogoutButton onClick={() => logout()}>Log out</LogoutButton>
        )}
      </Content>

    </HomePageContainer>
  );
};

export default LoginPage;