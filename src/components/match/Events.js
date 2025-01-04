import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AssistPlayer, EventDescription, EventIcon,
    EventItem, EventPlayer, EventsSection, EventTime,
    HalfSectionInfo, HalfSectionScore, HalfSectionText
} from '../../styles/match/EventsStyles';
import { getEventIcon } from '../../utils/iconUtils';

const Events = ({
    firstHalfEvents = [],
    secondHalfEvents = [],
    extraTimeEvents = [],
    penalties = [],
    match,

}) => {
    const hasMatchStarted = match.status !== 'NS';
    const navigate = useNavigate();

    if (!hasMatchStarted) return null;

    const handlePlayerClick = (playerId) => {
        navigate(`/player/${playerId}`);
    };

    const renderEventDescription = (event) => {
        const { player, assist } = event || {};

        return (
            <EventDescription>
                {player && (
                    <EventPlayer onClick={() => handlePlayerClick(player.id)}>
                        {player.name} {' '}
                    </EventPlayer>
                )}
                {assist && (
                    <AssistPlayer onClick={() => handlePlayerClick(assist.id)}>
                        ({assist.name})
                    </AssistPlayer>
                )}
            </EventDescription>
        );
    };

    const renderEventItems = (events, homeTeamName) => {
        if (!events.length) {
            return;
        }
        return events.map((event, index) => (
            <EventItem key={index} isHome={event.team.name === homeTeamName}>
                {event.team.name === homeTeamName ? (
                    <>
                        <EventTime>{event.time.elapsed} {event.time.extra ? `+${event.time.extra}'` : "'"}</EventTime>
                        <EventIcon>{getEventIcon(event)}</EventIcon>
                        {renderEventDescription(event) || renderPlayer(event.player)}
                    </>
                ) : (
                    <>
                        {renderEventDescription(event) || renderPlayer(event.player)}
                        <EventIcon>{getEventIcon(event)}</EventIcon>
                        <EventTime>{event.time.elapsed} {event.time.extra ? `+${event.time.extra}'` : "'"}</EventTime>
                    </>
                )}
            </EventItem>
        ));
    };

    const renderPlayer = (player) => (
        <EventPlayer onClick={() => handlePlayerClick(player?.id)}>{player?.name || 'Unknown Player'}</EventPlayer>
    );

    const getScore = (home, away, fallbackHome = '', fallbackAway = '') =>
        home !== null && away !== null
            ? `${home} - ${away}`
            : `${fallbackHome} - ${fallbackAway}`;

    const createSection = (label, events, homeScore, awayScore, fallbackHome = '', fallbackAway = '') => ({
        label,
        events,
        score: getScore(homeScore, awayScore, fallbackHome, fallbackAway),
    });

    const sections = [
        createSection(
            '1H',
            firstHalfEvents,
            match.halfTimeHome,
            match.halfTimeAway,
            match.home ?? '',
            match.away ?? ''
        ),
        createSection(
            '2H',
            secondHalfEvents,
            match.fullTimeHome,
            match.fullTimeAway,
            match.home ?? '',
            match.away ?? '-'
        ),
        ...(extraTimeEvents.length
            ? [createSection('Extra Time', extraTimeEvents, match.extraTimeHome, match.extraTimeAway)]
            : []),
        ...(penalties.length ? [{ label: 'Penalties', events: penalties }] : []),
    ];

    return (
        <EventsSection>
            {sections.map(({ label, events, score }, index) => (
                <React.Fragment key={index}>
                    <HalfSectionInfo>
                        <HalfSectionText>{label}</HalfSectionText>
                        {score && <HalfSectionScore>{score}</HalfSectionScore>}
                    </HalfSectionInfo>
                    {renderEventItems(events, match.homeTeamName)}
                </React.Fragment>
            ))}
        </EventsSection>
    );
};

export default Events;

