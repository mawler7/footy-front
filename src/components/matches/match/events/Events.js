import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import goalIcon from '../../../../icons/goal.jpg';
import missedIcon from '../../../../icons/missed.jpg';
import ownGoalIcon from '../../../../icons/owngoal.jpg';
import redCardIcon from '../../../../icons/red.jpg';
import yellowCardIcon from '../../../../icons/yellow.jpg';
import subsIcon from '../../../../icons/subs.jpg';
import varIcon from '../../../../icons/var.jpg';

const Events = ({ firstHalfEvents, secondHalfEvents, extraTimeEvents, penalties, match }) => {
    const hasMatchStarted = match.status !== 'NS';
    const navigate = useNavigate();

    if (!hasMatchStarted) return null;

    const renderEventIcon = (event) => {
        const iconMap = {
            goal: goalIcon,
            ownGoal: ownGoalIcon,
            substitution: subsIcon,
            yellowCard: yellowCardIcon,
            redCard: redCardIcon,
            var: varIcon,
            missed: missedIcon,
        };

        const imgStyle = {
            width: '20px',
            height: '20px',
            border: '1px solid white',
            borderRadius: '50%',
        };

        if (event.type.includes('Goal')) {
            return <img src={event.detail.includes('Own Goal') ? iconMap.ownGoal : iconMap.goal} alt="Goal" style={imgStyle} />;
        } else if (event.detail.includes('Substitution')) {
            return <img src={iconMap.substitution} alt="Substitution" style={imgStyle} />;
        } else if (event.type.includes('Card')) {
            return <img src={event.detail.includes('Yellow') ? iconMap.yellowCard : iconMap.redCard} alt="Card" style={imgStyle} />;
        } else if (event.type.includes('Var')) {
            return <img src={iconMap.var} alt="VAR" style={imgStyle} />;
        }
        return <img src={iconMap.missed} alt="Event" style={imgStyle} />;
    };

    const handlePlayerClick = (playerId) => {
        navigate(`/player/${playerId}`);
    };

    const renderEventDescription = (event) => {
        console.log(event);
        if (event.type === 'subst') {
            return (
                <EventDescription>
                    {event.player && (
                        <EventPlayer onClick={() => handlePlayerClick(event.player.id)}>
                            {event.player.name}
                        </EventPlayer>
                    )}
                    {event.assist && (
                        <AssistPlayer onClick={() => handlePlayerClick(event.assist.id)}>
                            ({`${event.assist.name}`})
                        </AssistPlayer>
                    )}
                </EventDescription>
            );
        }

        if (event.type === 'Var') {
            return (
                <EventDescription>
                    {event.player && (
                        <EventPlayer onClick={() => handlePlayerClick(event.player.id)}>
                            {event.player.name}
                        </EventPlayer>
                    )}
                    {event.detail && <EventPlayer> ( {event.detail})</EventPlayer>}
                </EventDescription>
            );
        }

        if (event.type.includes('Goal')) {
            return (
                <EventDescription>
                    {event.player && (
                        <EventPlayer onClick={() => handlePlayerClick(event.player.id)}>
                            {event.player.name}
                        </EventPlayer>
                    )}
                    {event.assist && (
                        <AssistPlayer onClick={() => handlePlayerClick(event.assist.id)}>
                            {` ${(event.assist.name)}`}
                        </AssistPlayer>
                    )}
                </EventDescription>
            );
        }

        return null;
    };

    const renderEventItems = (events, homeTeamName) => {
        return events.map((event, index) => (
            <EventItem key={index} isHome={event.team.name === homeTeamName}>
                {event.team.name === homeTeamName ? (
                    <>
                        <EventTime>{event.time.elapsed} {event.time.extra ? `+${event.time.extra}'` : "'"}</EventTime>
                        <EventIcon>{renderEventIcon(event)}</EventIcon>
                        {renderEventDescription(event) || renderPlayer(event.player)}
                    </>
                ) : (
                    <>
                        {renderEventDescription(event) || renderPlayer(event.player)}
                        <EventIcon>{renderEventIcon(event)}</EventIcon>
                        <EventTime>{event.time.elapsed} {event.time.extra ? `+${event.time.extra}'` : "'"}</EventTime>
                    </>
                )}
            </EventItem>
        ));
    };

    const renderPlayer = (player) => (
        <EventPlayer onClick={() => handlePlayerClick(player?.id)}>{player?.name || 'Unknown Player'}</EventPlayer>
    );

    return (
        <EventsSection>
            <HalfSectionInfo>
                <HalfSectionText>1H</HalfSectionText>
                <HalfSectionScore>{match.halfTimeHome} - {match.halfTimeAway}</HalfSectionScore>
            </HalfSectionInfo>
            {renderEventItems(firstHalfEvents, match.homeTeamName)}
            <HalfSectionInfo>
                <HalfSectionText>2H</HalfSectionText>
                <HalfSectionScore>{match.fullTimeHome} - {match.fullTimeAway}</HalfSectionScore>
            </HalfSectionInfo>
            {renderEventItems(secondHalfEvents, match.homeTeamName)}
            {extraTimeEvents.length > 0 && (
                <HalfSectionInfo>
                    <HalfSectionText>Extra Time</HalfSectionText>
                    <HalfSectionScore>{match.extraTimeHome} - {match.extraTimeAway}</HalfSectionScore>
                </HalfSectionInfo>
            )}
            {renderEventItems(extraTimeEvents, match.homeTeamName)}
            {penalties.length > 0 && renderEventItems(penalties, match.homeTeamName)}
        </EventsSection>
    );
};

export default Events;

// Styled Components
const EventItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isHome }) => (isHome ? 'flex-start' : 'flex-end')};
  font-size: 12px;
  margin: 2px 0;
  color: #e0e0e0;
`;

const EventDescription = styled.div`
  color: #f0f0f0;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const EventPlayer = styled.span`
  cursor: pointer;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const AssistPlayer = styled.span`
  font-size: 12px;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const DescriptionText = styled.span`
  color: #f39c12;
  margin-left: 4px;
  font-style: italic;
`;

const EventIcon = styled.div`
  margin: 0 8px;
  font-size: 12px;
  padding: 4px;
`;

const EventTime = styled.div`
  color: #b0b0b0;
  font-size: 12px;
  flex-shrink: 0;
  width: 40px;
  text-align: center;
`;

const EventsSection = styled.div`
  padding: 10px;
  background-color: rgba(28, 30, 36, 0.85);
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 650px;
`;

const HalfSectionInfo = styled.div`
  display: flex;
  background-color: #333;
  font-size: 13px;
  color: #ffffff;
  height: 28px;
  align-items: center;
  margin: 12px 0;
  border-radius: 6px;
  padding: 0 12px;
`;

const HalfSectionText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #e0e0e0;
`;

const HalfSectionScore = styled.div`
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  color: #e0e0e0;
`;
