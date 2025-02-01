import React from 'react';

const EventUtils = {
    getEventIcon: (event) => {
        switch (event.type) {
            case 'goal':
                return '⚽';
            case 'ownGoal':
                return '❌';
            case 'card':
                return '🟨';
            case 'subst':
                return '🔄';
            default:
                return null;
        }
    },

    getEventPositionStyle: (eventType) => {
        switch (eventType) {
            case 'goal':
            case 'ownGoal':
                return { bottom: '55px', right: '5px' };
            case 'card':
                return { bottom: '55px', left: '10px' };
            case 'substitution':
                return { bottom: '20px', right: '5px' };
            default:
                return { bottom: '-10px', right: '-10px' };
        }
    },

    renderEventDescription: (event, handlePlayerClick) => {
        const { player, assist } = event || {};
        return (
            <>
                {player && (
                    <span
                        onClick={() => handlePlayerClick(player.id)}
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {player.name}{' '}
                    </span>
                )}
                {assist && (
                    <span
                        onClick={() => handlePlayerClick(assist.id)}
                        style={{ cursor: 'pointer', color: 'gray' }}
                    >
                        ({assist.name})
                    </span>
                )}
            </>
        );
    },

    renderEventItems: (events, teamName, handlePlayerClick) => {
        if (!events.length) return null;

        return events.map((event, index) => (
            <div
                key={index}
                style={{
                    display: 'flex',
                    justifyContent: event.team.name === teamName ? 'flex-start' : 'flex-end',
                }}
            >
                {event.team.name === teamName ? (
                    <>
                        <span>{`${event.time.elapsed}${event.time.extra ? '+' + event.time.extra : ''}'`}</span>
                        <span>{EventUtils.getEventIcon(event)}</span>
                        {EventUtils.renderEventDescription(event, handlePlayerClick)}
                    </>
                ) : (
                    <>
                        {EventUtils.renderEventDescription(event, handlePlayerClick)}
                        <span>{EventUtils.getEventIcon(event)}</span>
                        <span>{`${event.time.elapsed}${event.time.extra ? '+' + event.time.extra : ''}'`}</span>
                    </>
                )}
            </div>
        ));
    },
};

export default EventUtils;
