import React from 'react';
import styled from 'styled-components';

const LeagueHeader = ({ leagueName, logo, season }) => {
    if (!leagueName || !logo || !season) {
        return (
            <HeaderContainer>
                <Placeholder>Loading...</Placeholder>
            </HeaderContainer>
        );
    }

    return (
        <HeaderContainer>
            <LeftSection>
                <Logo src={logo} alt="League Logo" />
                <LeagueInfo>
                    <LeagueName>{leagueName}</LeagueName>
                    <Season>{season}</Season>
                </LeagueInfo>
            </LeftSection>
        </HeaderContainer>
    );
};

// Styled components
const HeaderContainer = styled.div`
  width: max(730px); /* Maksymalna szerokość */
  background-color: rgba(28, 30, 36, 0.85); /* Transparent background */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  color: white;
  border-radius: 5px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

const Logo = styled.img`
  padding: 5px;
  border-radius: 10px;
  margin-right: 20px;
  width: max(75px); /* Maksymalna szerokość */
  object-fit: contain; /* Zapewnia, że obraz zmieści się w zadanych wymiarach bez utraty proporcji */
  max-height: 95px; /* Maksymalna wysokość, aby dopasować logo */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
`;

const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeagueName = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Season = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #aaa;
`;

const Placeholder = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #aaa;
  padding: 20px 0;
`;

export default LeagueHeader;
