import React from 'react';
import Summary from './Summary';
import Standings from '../common/standings/Standings';
import Squad from '../team/Squad';

const TeamDetailsContent = ({ activeTab, teamResults, team, leagueId, leagues, setLeagueId }) => {
    switch (activeTab) {
        case 'summary':
            return <Summary fixtures={teamResults} teamName={team?.[0]?.info.name} />;
        case 'standings':
            return leagueId ? (
                <Standings
                    leagueId={leagueId}
                    singleLeagueMode={false}
                    leagues={leagues}
                    onLeagueChange={setLeagueId}
                />
            ) : null;
        case 'squad':
            return <Squad id={team?.[0]?.info.id} />;
        default:
            return null;
    }
};

export default TeamDetailsContent;