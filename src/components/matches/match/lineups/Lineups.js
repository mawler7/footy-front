import React from 'react';
import styled from 'styled-components';
import pitchBackground from '../../../../icons/top-view-of-green-football-pitch-or-soccer-field-vector.jpg';
import { useNavigate } from 'react-router-dom';


const formatPlayerName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1 ? nameParts.slice(1).join(' ') : name;
};

const getVerticalPosition = (index, totalPlayers, pitchHeight) => {
    return (index + 1) / (totalPlayers + 1) * pitchHeight;
};

const getHorizontalPosition = (lineIndex, totalLines, halfPitchWidth, isAway) => {
    const posX = (lineIndex + 1) / (totalLines + 1) * halfPitchWidth;
    const homeOffset = -5;
    const awayOffset = 66;
    return isAway ? halfPitchWidth - posX - awayOffset : posX - homeOffset;
};

const getFormationLines = (formation) => {
    return formation ? formation.split('-').length : 4;
};

const findPlayerRating = (playerId, players) => {
    const playerData = players.find(player => player.player.id === playerId);
    return playerData?.stats?.[0]?.games?.rating || null;
};

const formatRating = (rating) => {
    if (!rating) return null;
    const parsedRating = parseFloat(rating);
    return parsedRating.toFixed(1);
};

const Lineups = ({ lineups, playerPhotos, players, playerEvents }) => {
    const navigate = useNavigate();

    console.log(playerEvents);

    const handlePlayerClick = (playerId) => {
        navigate(`/player/${playerId}`);
    };

    const renderPlayerIcons = (playerId) => {
        // Sprawdzamy, czy playerEvents jest prawidłowy i zawiera wpis dla playerId
        if (!playerEvents || !playerEvents[playerId]) return null;

        return playerEvents[playerId].map((icon, index) => (
            <EventIcon key={index} src={icon} alt="Event Icon" />
        ));
    };

    const renderGoalkeeper = (goalkeeper, isHome) => {
        if (!goalkeeper) return null;

        const halfPitchWidth = 315;
        const pitchHeight = 340;
        const posY = pitchHeight / 2;
        const posX = isHome ? 10 : halfPitchWidth * 2 - 45;
        const photoUrl = playerPhotos[goalkeeper.player.id] || 'default-icon-url.jpg';
        const playerRating = findPlayerRating(goalkeeper.player.id, players);

        return (
            <PlayerIcon
                key={goalkeeper.player.id}
                isHome={isHome}
                photoUrl={photoUrl}
                onClick={() => handlePlayerClick(goalkeeper.player.id)}
                style={{
                    top: `${posY}px`,
                    left: `${posX}px`,
                }}
            >
                {renderPlayerIcons(goalkeeper.player.id)}
                <PlayerDetailsWrapper>
                    <PlayerDetails title={`${goalkeeper.player.number} ${goalkeeper.player.name}`}>
                        {`${goalkeeper.player.number} ${formatPlayerName(goalkeeper.player.name)}`}
                    </PlayerDetails>
                    {playerRating && (
                        <RatingLabel rating={parseFloat(playerRating)}>
                            {formatRating(playerRating)}
                        </RatingLabel>
                    )}
                </PlayerDetailsWrapper>
            </PlayerIcon>
        );
    };

    const renderFormation = (lineupPlayers, isHome, formation, allPlayers) => {
        if (!lineupPlayers || lineupPlayers.length === 0) return null;

        const halfPitchWidth = 330;
        const pitchHeight = 340;
        const totalLines = getFormationLines(formation);

        const formationLines = Array.from({ length: totalLines }, (_, lineIndex) =>
            lineupPlayers.filter((p) => p.player.grid.startsWith(String(lineIndex + 2)))
        );

        return formationLines.map((line, lineIndex) =>
            line.map((playerData, playerIndex) => {
                const player = playerData.player;
                const photoUrl = playerPhotos[player.id] || '/path/to/default-player-icon.jpg';
                const playerRating = findPlayerRating(player.id, allPlayers);

                const posY = getVerticalPosition(playerIndex, line.length, pitchHeight);
                const posX = getHorizontalPosition(lineIndex, totalLines, halfPitchWidth, !isHome);

                return (
                    <PlayerIcon
                        key={player.id}
                        isHome={isHome}
                        photoUrl={photoUrl}
                        onClick={() => handlePlayerClick(player.id)}
                        style={{
                            top: `${posY}px`,
                            left: isHome ? `${posX}px` : `${halfPitchWidth + posX}px`,
                        }}
                    >
                        {renderPlayerIcons(player.id)}
                        <PlayerDetailsWrapper>
                            <PlayerDetails title={`${player.number} ${player.name}`}>
                                {`${player.number} ${formatPlayerName(player.name)}`}
                            </PlayerDetails>
                            {playerRating && (
                                <RatingLabel rating={parseFloat(playerRating)}>
                                    {formatRating(playerRating)}
                                </RatingLabel>
                            )}
                        </PlayerDetailsWrapper>
                    </PlayerIcon>
                );
            })
        );
    };

    if (!lineups || lineups.length === 0) return null;

    const sortPlayers = (players) => {
        const goalkeepers = players.filter(player => player.player.pos === 'G');
        const otherPlayers = players.filter(player => player.player.pos !== 'G')
            .sort((a, b) => a.player.number - b.player.number);
        return [...goalkeepers, ...otherPlayers];
    };

    return (
        <>
            <PitchWrapper>
                <FormationHeader>
                    <FormationText align="left">{lineups[0]?.formation}</FormationText>
                    <SectionHeader>Starting XI</SectionHeader>
                    <FormationText align="right">{lineups[1]?.formation}</FormationText>
                </FormationHeader>

                <PitchContainer>
                    {renderGoalkeeper(lineups[0]?.startXI.find(player => player.player.pos === 'G'), true)}
                    {renderFormation(lineups[0]?.startXI, true, lineups[0]?.formation, players)}

                    {renderGoalkeeper(lineups[1]?.startXI.find(player => player.player.pos === 'G'), false)}
                    {renderFormation(lineups[1]?.startXI, false, lineups[1]?.formation, players)}
                </PitchContainer>
            </PitchWrapper>

            <TeamContainer>
                <TeamSection>
                    <CoachContainer>
                        <CoachName>{lineups[0]?.coach?.name || 'Unknown Coach'}</CoachName>
                    </CoachContainer>

                    <PlayerList>
                        {sortPlayers(lineups[0]?.substitutes).map((playerData, index) => (
                            <PlayerListItem key={index} isHome={true} onClick={() => handlePlayerClick(playerData.player.id)}>
                                <PlayerListText isHome={true}>{playerData.player.number}</PlayerListText>
                                <PlayerListText>{playerData.player.name}</PlayerListText>
                            </PlayerListItem>
                        ))}
                    </PlayerList>
                </TeamSection>
                <SubstituteHeader>Substitutes</SubstituteHeader>
                <TeamSection>
                    <CoachContainer>
                        <CoachName>{lineups[1]?.coach?.name || 'Unknown Coach'}</CoachName>
                    </CoachContainer>

                    <PlayerList>
                        {sortPlayers(lineups[1]?.substitutes).map((playerData, index) => (
                            <PlayerListItem key={index} isHome={false} onClick={() => handlePlayerClick(playerData.player.id)}>
                                <PlayerListText>{playerData.player.name}</PlayerListText>
                                <PlayerListText isHome={false}>{playerData.player.number}</PlayerListText>
                            </PlayerListItem>
                        ))}
                    </PlayerList>
                </TeamSection>
            </TeamContainer>
        </>
    );
};

export default Lineups;

const SubstituteHeader = styled.h4`
  font-size: 13px;
  color: #fff;
  text-align: center;
  margin: 20px 0;
`;

const PitchWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  
  padding: 10px;
  background-color: rgba(28, 30, 36, 0.95);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 650px;
  width: 100%;
  height: 440px;
  overflow: hidden;
`;

const PitchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  background-image: url(${pitchBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-top: -10px;
`;

const PlayerIcon = styled.div`
  background-image: url(${({ photoUrl }) => photoUrl});
  background-size: cover;
  background-position: center;
  width: 32px;
  height: 32px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1;
`;

const PlayerDetailsWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
`;

const FormationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 13px;
  margin-bottom: 10px;
`;

const FormationText = styled.div`
  color: #fff;
  font-size: 13px;
  text-align: ${({ align }) => align};
  margin:20px 15px;
`;

const SectionHeader = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 5px;

  font-size: 11px;
  background-color: rgba(28, 30, 36, 0.95);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 100%; 
  max-width: 650px;
`;

const TeamSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const CoachContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #fff;
  padding: 5px 10px;
  background-color: rgba(50, 50, 50, 0.8);
  border-radius: 5px;
  width: 100%;
  &:hover {
    background-color: rgba(60, 60, 60, 0.9);
  }
`;

const CoachName = styled.h3`
  font-size: 13px;
  margin: 0;
  cursor:pointer;
`;

const PlayerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  width: 100%;
`;

const PlayerListItem = styled.li`
  margin: 5px 0;
  display: flex;
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
  padding: 5px;
  border-radius: 5px;
  cursor:pointer;
  background-color: rgba(40, 40, 40, 0.8);
  &:hover {
    background-color: rgba(60, 60, 60, 0.9);
  }
`;

const PlayerListText = styled.span`
  margin: 0 5px;
  color: #fff;
`;

const PlayerDetails = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  padding: 3px 8px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  font-size: 11px;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: -2px;
`;

const RatingLabel = styled.div`
  position: absolute;
  margin-top: -10px;
  margin-left: 50px;
  transform: translateY(-50%);
  background-color: ${({ rating }) =>
        rating >= 7.5 ? 'rgba(0, 128, 0, 0.9)' :
            rating >= 6 ? 'rgba(255, 204, 0, 0.9)' :
                'rgba(255, 0, 0, 0.9)'};
  color: #fff;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  text-align: center;
`;

const EventIcon = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -5px;
  left: -5px;
  border-radius: 50%;
  border: 1px solid white;
`;