import axios from 'axios';
import { useMemo } from 'react';
import {
  Status, TeamWrapper, FixturesTeamLogo, PredictionContainer, PredictionText
} from '../../styles/match/MatchComponentStyles'

export const fetchStandingsData = async (leagueId, filterType, setFixtures, setGroupedStandings) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`http://localhost:8080/leagues/${leagueId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const leagueData = response.data;
    setFixtures(leagueData.fixtures || []);

    const groupedStandings = leagueData.standings.reduce((acc, team) => {
      const groupName = team.group || 'Unknown Group';
      if (!acc[groupName]) acc[groupName] = [];

      const filteredData = team[filterType] || team.all;
      const points = (filteredData.win || 0) * 3 + (filteredData.draw || 0);

      acc[groupName].push({ ...team, filteredData, points });
      return acc;
    }, {});

    setGroupedStandings(groupedStandings);
  } catch (error) {
    console.error('Error fetching standings:', error);
  }
};

export const processStandingsData = (groupedStandings) => {
  const descriptions = Object.values(groupedStandings)
    .flat()
    .map((team) => team.description)
    .filter(Boolean);

  return [...new Set(descriptions)].reduce((acc, desc, idx) => {
    acc[desc] = idx % 2 ? '#27ae60' : '#e74c3c';
    return acc;
  }, {});
};

export const formatPlayerName = (name) => {
  const nameParts = name.split(' ');
  return nameParts.length > 1 ? nameParts.slice(1).join(' ') : name;
};

export const formatPlayerDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

export const useChartConfig = (prediction) => {
  const chartData = useMemo(() => generateChartData(prediction), [prediction]);
  const chartOptions = useMemo(() => generateChartOptions(), []);

  return { chartData, chartOptions };
};

const createGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

const COLORS = {
  home: {
    border: 'rgba(0, 128, 255, 1)',
    point: 'rgba(0, 128, 255, 0.8)',
    gradientStart: 'rgba(0, 128, 255, 0.7)',
    gradientEnd: 'rgba(0, 128, 255, 0.1)',
  },
  away: {
    border: 'rgba(255, 99, 132, 1)',
    point: 'rgba(255, 99, 132, 0.8)',
    gradientStart: 'rgba(255, 99, 132, 0.7)',
    gradientEnd: 'rgba(255, 99, 132, 0.1)',
  },
};

export const generateChartData = (prediction) => ({
  labels: ['Form', 'Attack', 'Defense', 'Goals Comparison', 'Total Comparison'],
  datasets: [
    {
      label: prediction.homeTeamName,
      data: [
        parsePercentage(prediction.homeForm),
        parsePercentage(prediction.homeAtt),
        parsePercentage(prediction.homeDef),
        parsePercentage(prediction.homeGoalsComparison),
        parsePercentage(prediction.homeTotalComparison),
      ],
      borderColor: COLORS.home.border,
      pointBackgroundColor: COLORS.home.point,
      pointRadius: 4,
      borderWidth: 2,
      backgroundColor: (ctx) =>
        createGradient(ctx.chart.ctx, COLORS.home.gradientStart, COLORS.home.gradientEnd),
    },
    {
      label: prediction.awayTeamName,
      data: [
        parsePercentage(prediction.awayForm),
        parsePercentage(prediction.awayAtt),
        parsePercentage(prediction.awayDef),
        parsePercentage(prediction.awayGoalsComparison),
        parsePercentage(prediction.awayTotalComparison),
      ],
      borderColor: COLORS.away.border,
      pointBackgroundColor: COLORS.away.point,
      pointRadius: 4,
      borderWidth: 2,
      backgroundColor: (ctx) =>
        createGradient(ctx.chart.ctx, COLORS.away.gradientStart, COLORS.away.gradientEnd),
    },
  ],
});

export const generateChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
      },
    },
    legend: {
      display: true,
      labels: {
        color: '#ffffff',
        font: { size: 14 },
      },
    },
  },
  scales: {
    r: {
      angleLines: { color: '#6c757d' },
      grid: { color: '#495057' },
      ticks: {
        beginAtZero: true,
        max: 100,
        stepSize: 20,
        color: '#e0e0e0',
        font: { size: 12 },
        z: 1,
        backdropColor: 'rgba(0, 0, 0, 0.5)',
        backdropPadding: 5,
      },
      pointLabels: {
        color: '#ffffff',
        font: { size: 12, weight: 'bold' },
        padding: 2,
      },
    },
  },
});

export const getMatchStatusOrTime = (status, matchDate, elapsed) => {
  const statusMap = {
    FT: 'FT',
    AET: 'AET',
    PEN: 'PEN',
    NS: formatMatchTime(matchDate),
  };
  return statusMap[status] || (['1H', '2H', 'ET'].includes(status) ? `${elapsed}'` : status);
};

export const formatMatchTime = (isoString) => {
  const date = new Date(isoString);
  return date.toTimeString().slice(0, 5);
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

export const groupMatches = (matches, favorites, type) => {
  if (type === 'favorites') {
    return matches.filter((match) => favorites.some((fav) => fav.id === match.id));
  }
  if (type === 'scheduled') {
    return matches.filter(
      (match) =>
        !favorites.some((fav) => fav.id === match.id) && !['FT', 'AET', 'PEN'].includes(match.status)
    );
  }
  if (type === 'finished') {
    return matches.filter((match) => ['FT', 'AET', 'PEN'].includes(match.status));
  }
  return matches;
};

export const filterMatches = (matches, teamName, filter) => {
  return matches.filter((match) => {
    if (filter === 'home') return match.homeTeamName === teamName && match.status === 'FT';
    if (filter === 'away') return match.awayTeamName === teamName && match.status === 'FT';
    return match.status === 'FT';
  });
};

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateTeamForm = (fixtures, teamName) => {
  return fixtures
    .filter(
      (match) => match.homeTeamName === teamName || match.awayTeamName === teamName
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map((match) => {
      const isHome = match.homeTeamName === teamName;
      const teamGoals = isHome ? match.fullTimeHome : match.fullTimeAway;
      const opponentGoals = isHome ? match.fullTimeAway : match.fullTimeHome;

      const result = teamGoals > opponentGoals ? 'W' : teamGoals === opponentGoals ? 'D' : 'L';
      const color = result === 'W' ? '#27ae60' : result === 'D' ? '#f39c12' : '#e74c3c';

      return {
        result,
        color,
        tooltip: `${match.homeTeamName} ${match.fullTimeHome} - ${match.fullTimeAway} ${match.awayTeamName}`,
        matchId: match.id,
      };
    });
};

export const sortTeams = (teams, sortConfig) => {
  if (!Array.isArray(teams)) return [];
  return [...teams].sort((a, b) => {
    const getValue = (team, key) =>
      key === 'team.name'
        ? team.team.name.toLowerCase()
        : key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), team);

    const valueA = getValue(a, sortConfig.key);
    const valueB = getValue(b, sortConfig.key);

    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const formatAdvice = (advice) => {
  if (!advice) return 'No advice available';
  const adviceArray = Array.isArray(advice) ? advice : [advice];
  return adviceArray.map(item => item.split(':')[1]?.trim() || item.trim()).join(', ');
};

export const MatchStatus = ({ status, date, elapsed }) => (
  <Status>{getMatchStatusOrTime(status, date, elapsed)}</Status>
);

export const TeamInfo = ({ logo, name }) => (
  <TeamWrapper>
    <FixturesTeamLogo src={logo || 'default-logo.png'} alt={name} />
    <span>{name}</span>
  </TeamWrapper>
);

export const Prediction = ({ advice, homePrediction, awayPrediction, underOver, homeTeam, awayTeam }) => (
  <PredictionContainer>
    {advice && <PredictionText>{formatAdvice(advice)}</PredictionText>}
    {(homePrediction || awayPrediction || underOver) && (
      <PredictionText>
        {homePrediction && <>{homeTeam}: {homePrediction}<br /></>}
        {awayPrediction && <>{awayTeam}: {awayPrediction}<br /></>}
        {underOver && <>Over/Under: {underOver}</>}
      </PredictionText>
    )}
  </PredictionContainer>
);

export const parsePercentage = (value) => {
  if (typeof value === 'string' && value.includes('%')) {
    const parsedValue = parseFloat(value.replace('%', '').trim());
    return isNaN(parsedValue) ? 0 : parsedValue;
  }
  return parseFloat(value) || 0;
};


