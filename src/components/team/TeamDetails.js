import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import TeamHeader from './TeamHeader';
import TabNavigation from './TabNavigation';
import TeamDetailsContent from './TeamDetailsContent';
import { NavContainer } from '../../styles/GlobalStyles';

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [leagueId, setLeagueId] = useState(null);
  const [teamResults, setTeamResults] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!id || id === 'undefined') {
      console.error('Invalid team ID');
      return;
    }

    const fetchTeamData = async () => {
      try {
        const [teamResponse, fixturesResponse] = await Promise.all([
          axios.get(`http://localhost:8080/team/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          axios.get(`http://localhost:8080/fixture/team/id/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
        ]);

        const teamData = teamResponse.data;
        console.log('Team data: ', teamData);
        setTeam(teamData);
        setLeagues(teamData.map(data => data.league));
        setLeagueId(teamData[0]?.league?.id);

        const fixturesData = fixturesResponse.data;
        setTeamResults(fixturesData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [id]);

  return (
    <NavContainer>
      <TeamHeader team={team} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <TeamDetailsContent
        activeTab={activeTab}
        teamResults={teamResults}
        team={team}
        leagueId={leagueId}
        leagues={leagues}
        setLeagueId={setLeagueId}
      />
    </NavContainer>
  );
};

export default TeamDetails;



