import React, { useState, useEffect } from 'react';
import {
    OddsContainer,
    OddsColumn,
    BetNameContainer,
    OddsRow,
    OddsCellValue,
    OddCell,
    BetNameRow,
} from '../../styles/match/OddsStyles';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';

const Odds = ({ odds = [], handleAddToSlip, match }) => {
    const [expandedBetNames, setExpandedBetNames] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const betGroups = {
        main: [
            'Match Winner',
            'First Half Winner',
            'Double Chance',
            'Results/Both Teams Score',
            'Result/Total Goals',
            'Both Teams Score',
        ],
        secondary: [
            'Goals Over/Under',
            'Total - Home',
            'Total - Away',
            'Home Win/Under',
            'Away Win/Under',

        ],
        score: ['Exact Score', 'Correct Score - First Half', 'Correct Score - Second Half'],
    };

    const groupOdds = (odds) => {
        const grouped = odds.reduce((acc, { betName, value, odd }) => {
            acc[betName] = acc[betName] || {};
            acc[betName][value] = acc[betName][value] || { totalOdds: 0, count: 0 };
            acc[betName][value].totalOdds += odd;
            acc[betName][value].count += 1;
            return acc;
        }, {});

        return Object.entries(grouped).map(([betName, values]) => ({
            betName,
            values: Object.entries(values).map(([value, { totalOdds, count }]) => ({
                value,
                averageOdd: (totalOdds / count).toFixed(2),
            })),
        }));
    };

    const filterAndGroupOdds = (odds, betNames) =>
        groupOdds(odds.filter((odd) => betNames.includes(odd.betName)))
            .sort((a, b) => betNames.indexOf(a.betName) - betNames.indexOf(b.betName));

    useEffect(() => {
        setExpandedBetNames(
            odds.reduce((acc, { betName }) => {
                acc[betName] = true;
                return acc;
            }, {})
        );

        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [odds]);

    const toggleBetName = (betName) =>
        setExpandedBetNames((prev) => ({ ...prev, [betName]: !prev[betName] }));

    const renderOddsGroup = (groupedBets) =>
        groupedBets.map(({ betName, values }) => (
            <div key={betName}>
                <BetNameRow onClick={() => toggleBetName(betName)}>{betName}</BetNameRow>
                {expandedBetNames[betName] && (
                    <BetNameContainer>
                        {values.map(({ value, averageOdd }) => (
                            <OddsRow
                                key={value}
                                onClick={() =>
                                    handleAddToSlip({
                                        betName,
                                        value,
                                        odd: averageOdd,
                                        matchInfo: match,
                                    })
                                }
                            >
                                <OddsCellValue>{value}</OddsCellValue>
                                <OddCell>{averageOdd}</OddCell>
                            </OddsRow>
                        ))}
                    </BetNameContainer>
                )}
            </div>
        ));


    if (isLoading) {
        return (
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
        );
    }

    if (!odds.length) {
        return <div>No odds available for this match.</div>;
    }

    return (
        <OddsContainer>
            <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.main))}</OddsColumn>
            <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.secondary))}</OddsColumn>
            <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.score))}</OddsColumn>
        </OddsContainer>
    );
};

export default Odds;
