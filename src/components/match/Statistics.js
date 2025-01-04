import React from 'react';
import { ProgressBar, StatLabel, StatRow, StatsContainer, Value, Values } from '../../styles/match/StatisticsStyles';

const displayOrder = [
    "expected_goals", "ball_possession", "total_shots", "shots_on_goal",
    "shots_off_goal", "blocked_shots", "shots_insidebox", "shots_outsidebox",
    "total_passes", "passes_accurate", "passes_percent", "fouls",
    "yellow_cards", "red_cards", "corner_kicks", "offsides",
    "goalkeeper_saves", "goals_prevented",
];

const maxValues = {
    "expected_goals": 5, "ball_possession": 100, "total_shots": 25,
    "shots_on_goal": 15, "shots_off_goal": 15, "blocked_shots": 10,
    "shots_insidebox": 30, "shots_outsidebox": 20, "total_passes": 800,
    "passes_accurate": 800, "passes_percent": 100, "fouls": 30,
    "yellow_cards": 10, "red_cards": 5, "corner_kicks": 20, "offsides": 10,
    "goalkeeper_saves": 15, "goals_prevented": 10,
};

const capitalizeFirstLetter = (string) =>
    string.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const normalizeStatKey = (key) => key.toLowerCase().replace(/\s+/g, '_');

const formatStatValue = (value, statKey) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) || parsedValue < 0 ? '0' : parsedValue.toFixed(statKey === "expected_goals" ? 2 : 0);
};

const renderStatRow = (statKey, homeValue, awayValue, maxValue) => {
    if (homeValue === 0 && awayValue === 0) return null;

    const homeWidth = (homeValue / maxValue) * 100;
    const awayWidth = (awayValue / maxValue) * 100;

    return (
        <StatRow key={statKey}>
            <StatLabel>{capitalizeFirstLetter(statKey)}</StatLabel>
            <Values>
                <Value>{formatStatValue(homeValue, statKey)}</Value>
            </Values>
            <ProgressBar>
                <div
                    style={{
                        width: `${homeWidth}%`,
                        backgroundColor: '#4caf50',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                    }}
                />
                <div
                    style={{
                        width: `${awayWidth}%`,
                        backgroundColor: '#f44336',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                    }}
                />
            </ProgressBar>
            <Values>
                <Value>{formatStatValue(awayValue, statKey)}</Value>
            </Values>
        </StatRow>
    );
};

const Statistics = ({ statistics, homeTeamId, awayTeamId }) => {
    if (!statistics || statistics.length === 0) {
        return null;
    }

    const homeStats = statistics.filter((stat) => stat.team?.id?.toString() === homeTeamId?.toString());
    const awayStats = statistics.filter((stat) => stat.team?.id?.toString() === awayTeamId?.toString());

    return (
        <StatsContainer>
            {displayOrder.map((statKey) => {
                const homeStat = homeStats.find((stat) => normalizeStatKey(stat.type) === statKey);
                const awayStat = awayStats.find((stat) => normalizeStatKey(stat.type) === statKey);
                const maxValue = maxValues[statKey] || 100;
                const homeValue = Math.max(0, parseFloat(homeStat?.value || 0));
                const awayValue = Math.max(0, parseFloat(awayStat?.value || 0));
                return renderStatRow(statKey, homeValue, awayValue, maxValue);
            })}
        </StatsContainer>
    );
};

export default Statistics;
