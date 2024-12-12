import React from 'react';
import styled from 'styled-components';

const displayOrder = [
    "expected_goals",
    "ball_possession",
    "total_shots",
    "shots_on_goal",
    "shots_off_goal",
    "blocked_shots",
    "shots_insidebox",
    "shots_outsidebox",
    "total_passes",
    "passes_accurate",
    "passes_percent",
    "fouls",
    "yellow_cards",
    "red_cards",
    "corner_kicks",
    "offsides",
    "goalkeeper_saves",
    "goals_prevented"
];

const maxValues = {
    "expected_goals": 5,
    "ball_possession": 50,
    "total_shots": 25,
    "shots_on_goal": 10,
    "shots_off_goal": 15,
    "blocked_shots": 10,
    "shots_insidebox": 30,
    "shots_outsidebox": 20,
    "total_passes": 800,
    "passes_accurate": 800,
    "passes_percent": 100,
    "fouls": 25,
    "yellow_cards": 10,
    "red_cards": 2,
    "corner_kicks": 15,
    "offsides": 12,
    "goalkeeper_saves": 15,
    "goals_prevented": 5
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const normalizeStatKey = (key) =>
    key.toLowerCase().replace(/\s+/g, '_');

const formatStatValue = (value, statKey) => {
    const parsedValue = parseFloat(value);
    const nonNegativeValue = isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;

    if (statKey === "expected_goals") {
        return nonNegativeValue.toFixed(2);
    }
    if (typeof value === 'string' && value.includes('%')) {
        return `${parseInt(nonNegativeValue, 10)}%`;
    }
    return parseInt(nonNegativeValue, 10);
};

const Statistics = ({ statistics, homeTeamId, awayTeamId }) => {
    const homeStats = statistics?.filter(stat => stat.team?.id?.toString() === homeTeamId?.toString()) || [];
    const awayStats = statistics?.filter(stat => stat.team?.id?.toString() === awayTeamId?.toString()) || [];

    if (!statistics || statistics.length === 0) {
        return;
    }

    return (
        <StatsContainer>
            {displayOrder.map((statKey, index) => {
                const homeStat = homeStats.find(stat => normalizeStatKey(stat.type) === statKey);
                const awayStat = awayStats.find(stat => normalizeStatKey(stat.type) === statKey);

                const maxValue = maxValues[statKey] || 100;

                // Pobierz wartości
                const homeValue = Math.max(0, parseFloat(homeStat?.value || 0));
                const awayValue = Math.max(0, parseFloat(awayStat?.value || 0));

                // Pomijaj statystyki, jeśli obie wartości są 0
                if (homeValue === 0 && awayValue === 0) return null;

                return (
                    <StatRow key={index}>
                        <StatDescription>{capitalizeFirstLetter(statKey.replace('_', ' '))}</StatDescription>
                        <ProgressBar>
                            <HomeProgress
                                value={homeValue}
                                maxValue={maxValue}
                                style={{
                                    backgroundColor: homeValue > 0 ? '#3498db' : 'transparent',
                                    width: `${(homeValue / maxValue) * 50}%`,
                                }}
                            >
                                {formatStatValue(homeValue, statKey)}
                            </HomeProgress>

                            <AwayProgress
                                value={awayValue}
                                maxValue={maxValue}
                                style={{
                                    backgroundColor: awayValue > 0 ? '#e74c3c' : 'transparent',
                                    width: `${(awayValue / maxValue) * 50}%`,
                                }}
                            >
                                {formatStatValue(awayValue, statKey)}
                            </AwayProgress>
                        </ProgressBar>
                    </StatRow>
                );
            })}
        </StatsContainer>
    );
};

export default Statistics;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1c1e24;
  padding:10px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: 100%;
`;

const StatRow = styled.div`
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  position: relative;
`;

const StatDescription = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
  z-index: 1;
`;

const ProgressBar = styled.div`
  position: relative;
  background-color: #2e2e2e;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 22px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const HomeProgress = styled.div`
  position: absolute;
  left: 0;
  background-color: #1abc9c;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  font-size: 11px;
  font-weight: bold;
  color: white;
`;

const AwayProgress = styled.div`
  position: absolute;
  right: 0;
  background-color: #e74c3c;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  `;


export const StatType = styled.span`
  color: #fff;
  width: 30%;
  font-size: 13px;
  text-align: center;
`;

export const StatWrapper = styled.div`
  margin-bottom: 8px;
`;


