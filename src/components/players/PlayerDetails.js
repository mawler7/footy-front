import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaFutbol, FaClock, FaHandsHelping } from 'react-icons/fa';
import { formatPlayerDate } from '../common/utils';
import {
    HeaderCellTeams, InfoItem, LeagueIcon, NoDataMessage, PlayerHeader,
    PlayerInfo, PlayerInfoContainer, PlayerName, PlayerPhoto,
    Rating,
    Score, SectionTitle, StyledTable, TableCell, TableCellTeams, TableHeader,
    TableRow,
    TeamLogo, TeamName, TeamSection, VideoBackground
} from '../../styles/player/PlayerStyles';

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
    const [isSavedSlipsOpen, setIsSavedSlipsOpen] = useState(false);

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
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);


    if (!player) return;

    return (
        <>
            <VideoBackground autoPlay loop muted playsInline>
                <source src={'/mp5.mp4'} type="video/mp4" />
            </VideoBackground>

            <PlayerInfoContainer isSavedSlipsOpen={isSavedSlipsOpen} >
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
                                <HeaderCellTeams>Match</HeaderCellTeams>
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
                                    <TableCell>{formatPlayerDate(match.matchDate)}</TableCell>
                                    <TableCell>
                                        <LeagueIcon src={match.leagueLogo} alt={match.leagueName} />
                                    </TableCell>
                                    <TableCellTeams>
                                        <TeamSection isHome={true}>
                                            <TeamName>{match.homeTeamName}</TeamName>
                                            <TeamLogo src={match.homeTeamLogo} alt={match.homeTeamName} />
                                        </TeamSection>
                                        <Score>{match.homeScore} - {match.awayScore}</Score>
                                        <TeamSection isHome={false}>
                                            <TeamLogo src={match.awayTeamLogo} alt={match.awayTeamName} />
                                            <TeamName>{match.awayTeamName}</TeamName>
                                        </TeamSection>
                                    </TableCellTeams>

                                    <TableCell><Rating rating={match.rating}>{match.rating !== "N/A" ? parseFloat(match.rating).toFixed(1) : "-"}</Rating></TableCell>
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
                                .sort((a, b) => b.season - a.season)
                                .map((careerItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{careerItem.season}</TableCell>
                                        <TableCell>
                                            {careerItem.leagueLogo && <LeagueIcon src={careerItem.leagueLogo} alt={careerItem.leagueName} />}
                                        </TableCell>
                                        <TableCell>
                                            {careerItem.clubName}
                                        </TableCell>
                                        <TableCell><Rating rating={careerItem.form}>{careerItem.form ? parseFloat(careerItem.form).toFixed(2) : "-"}</Rating></TableCell>
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
        </ >
    );
};

export default PlayerDetails;







