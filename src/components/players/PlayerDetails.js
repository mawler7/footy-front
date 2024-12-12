import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaFutbol, FaClock, FaHandsHelping } from 'react-icons/fa';
import styled from 'styled-components';
import { NavContainer } from '../../styles/GlobalStyles';

const YellowCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="yellow">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

const RedCardIcon = () => (
    <svg width="12" height="15" viewBox="0 0 20 20" fill="red">
        <rect width="16" height="20" rx="2" ry="2" />
    </svg>
);

const PlayerDetails = () => {
    const { playerId } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8080/player/id/${playerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlayer(response.data);
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (!player) return;

    return (
        <NavContainer>
            <VideoBackground autoPlay loop muted playsInline>
                <source src={'/mp5.mp4'} type="video/mp4" />
            </VideoBackground>


            <PlayerInfoContainer>
                <PlayerHeader>

                    {player.info?.photo && <PlayerPhoto src={player.info.photo} alt={`${player.info.firstname} ${player.info.lastname}`} />}
                    <PlayerName>{player.info?.firstname} {player.info?.lastname}</PlayerName>
                </PlayerHeader>
                <PlayerInfo>
                    <InfoItem><strong>Nationality:</strong> {player.info?.nationality}</InfoItem>
                    <InfoItem><strong>Injured:</strong> {player.info?.injured ? 'Yes' : 'No'}</InfoItem>
                    <InfoItem><strong>Zodiac:</strong> {player.info?.zodiac}</InfoItem>
                </PlayerInfo>

                <SectionTitle>Last Matches</SectionTitle>
                {player.lastMatches?.length > 0 ? (
                    <StyledTable>
                        <thead>
                            <tr>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>League</TableHeader>
                                <HeaderCellTeams>Teams</HeaderCellTeams>
                                <TableHeader><FaStar /></TableHeader>
                                <TableHeader><FaClock /></TableHeader>
                                <TableHeader><FaFutbol /></TableHeader>
                                <TableHeader><FaHandsHelping /></TableHeader>
                                <TableHeader className="icon-header"><YellowCardIcon /></TableHeader>
                                <TableHeader className="icon-header"><RedCardIcon /></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {player.lastMatches.map((match, index) => (
                                <TableRow key={index} onClick={() => navigate(`/fixture/id/${match.id}`)}>
                                    <TableCell>{formatDate(match.matchDate)}</TableCell>
                                    <TableCell>
                                        <LeagueIcon src={match.leagueLogo} alt={match.leagueName} />
                                    </TableCell>
                                    <TableCellTeams>
                                        <TeamSection align="right">
                                            <TeamName>{match.homeTeamName}</TeamName>
                                            <TeamLogo src={match.homeTeamLogo} alt={match.homeTeamName} />
                                        </TeamSection>
                                        <Score>{match.homeScore} - {match.awayScore}</Score>
                                        <TeamSection align="left">
                                            <TeamLogo src={match.awayTeamLogo} alt={match.awayTeamName} />
                                            <TeamName>{match.awayTeamName}</TeamName>
                                        </TeamSection>
                                    </TableCellTeams>
                                    <TableCell>{match.rating !== "N/A" ? parseFloat(match.rating).toFixed(1) : "-"}</TableCell>
                                    <TableCell>{match.minutes}</TableCell>
                                    <TableCell>{match.goals}</TableCell>
                                    <TableCell>{match.assists}</TableCell>
                                    <TableCell>{match.yellowCards}</TableCell>
                                    <TableCell>{match.redCards}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </StyledTable>
                ) : (
                    <NoDataMessage>No recent matches available.</NoDataMessage>
                )}

                <SectionTitle>Career</SectionTitle>
                {Array.isArray(player.career) && player.career.length > 0 ? (
                    <StyledTable>
                        <thead>
                            <tr>
                                <TableHeader>Season</TableHeader>
                                <TableHeader>League</TableHeader>
                                <TableHeader>Club</TableHeader>
                                <TableHeader><FaStar /></TableHeader>
                                <TableHeader>Appearances</TableHeader>
                                <TableHeader><FaFutbol /></TableHeader>
                                <TableHeader><FaHandsHelping /></TableHeader>
                                <TableHeader className="icon-header"><YellowCardIcon /></TableHeader>
                                <TableHeader className="icon-header"><RedCardIcon /></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {[...player.career]
                                .sort((a, b) => b.season - a.season) // Sort by season, descending
                                .map((careerItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{careerItem.season}</TableCell>
                                        <TableCell>
                                            {careerItem.leagueLogo && <LeagueIcon src={careerItem.leagueLogo} alt={careerItem.leagueName} />}
                                        </TableCell>
                                        <TableCell>
                                            {careerItem.clubName}
                                        </TableCell>
                                        <TableCell>{careerItem.form ? parseFloat(careerItem.form).toFixed(2) : "-"}</TableCell>
                                        <TableCell>{careerItem.appearances}</TableCell>
                                        <TableCell>{careerItem.goals}</TableCell>
                                        <TableCell>{careerItem.assists}</TableCell>
                                        <TableCell>{careerItem.yellowCards}</TableCell>
                                        <TableCell>{careerItem.redCards}</TableCell>
                                    </TableRow>
                                ))}
                        </tbody>
                    </StyledTable>
                ) : (
                    ''
                )}
            </PlayerInfoContainer>
        </NavContainer>
    );
};

export default PlayerDetails;

// Styled components
const VideoBackground = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.7;
`;

const TeamLogo = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 3px;
  margin-right: 3px;
  object-fit: contain;
  border-radius: 50%;
`;

const PlayerInfoContainer = styled.div`
  
    max-width: 660px;
 
    padding: 10px;
    border-radius: 10px;
  background-color: rgba(28, 30, 36, 0.85);
 
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const PlayerHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    
`;

const PlayerPhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #1abc9c;
`;

const PlayerName = styled.h2`
    font-size: 28px;
    
    margin: 0;
`;

const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15px;
   
`;

const InfoItem = styled.div`
color: #ddd;
    strong {
       color: #ddd;
    }
`;

const SectionTitle = styled.h3`
    font-size: 18px;
    margin-top: 30px;
color: #ddd;
    border-bottom: 2px solid #333;
    padding-bottom: 8px;
`;

const StyledTable = styled.table`
    width:max(640px);
    border-collapse: collapse;
    background-color: #282b30;
    color: #fff;
    border-radius: 8px;
    overflow: hidden;
`;

const TableCell = styled.td`
  padding: 5px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
`;


const TableHeader = styled.th`
    padding: 10px;
    background-color: #3a3d42;
        font-size: 13px;
    color: white;
        height: 30px;
        
`;



const TableRow = styled.tr`
      cursor: pointer;
        &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const LeagueIcon = styled.img`
    vertical-align: middle;
      width: 22px;
  height: 22px;
  margin-left: 3px;
  margin-right: 3px;
  object-fit: contain;
  border-radius: 50%;
`;



const NoDataMessage = styled.p`
    font-size: 14px;
    color: #aaa;
    text-align: center;
    margin: 20px 0;
`;

const TableCellTeams = styled(TableCell)`
    display: flex;
    align-items: center;
 
`;

const TeamSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ align }) => align};
    width: 120px;
    gap: 5px;
`;

const TeamName = styled.span`
    font-weight: bold;
`;



const Score = styled.span`
    width: 50px;
    text-align: center;
    font-weight: bold;
`;


const HeaderCellTeams = styled(TableHeader)`
    width: 300px;
`;










