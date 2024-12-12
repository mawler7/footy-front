import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Odds = ({
    odds = [],
    setShowBubble,
    matchInfo,
    bettingSlip = [],
    setBettingSlip,
    handleAddToSlip,
    match,
}) => {
    const [expandedBetNames, setExpandedBetNames] = useState({});



    useEffect(() => {
        const initialExpandedState = odds.reduce((acc, odd) => {
            acc[odd.betName] = true;
            return acc;
        }, {});
        setExpandedBetNames(initialExpandedState);
    }, [odds]);

    const predefinedBetOrder = [
        'Match Winner', 'First Half Winner', 'Double Chance', 'Results/Both Teams Score',
        'HT/FT Double', 'Result/Total Goals', 'Total - Home', 'Total - Away',
        'Home Win/Under', 'Away Win/Under', 'Goals Over/Under',
        'Goals Over/Under First Half', 'Corners Over Under', 'Cards Over/Under',
        'Yellow Over/Under', 'Both Teams Score', 'Both Teams To Score in Both Halves',
        'Both Teams to Score 1st Half - 2nd Half', 'To Score In Both Halves By Teams',
        'Halftime Result/Both Teams Score', 'Exact Score', 'Correct Score - First Half',
        'Correct Score - Second Half', 'Anytime Goal Scorer'
    ];

    const groupOdds = (odds) => {
        const grouped = odds.reduce((acc, odd) => {
            if (!acc[odd.betName]) {
                acc[odd.betName] = {};
            }
            const valueKey = odd.value;
            if (!acc[odd.betName][valueKey]) {
                acc[odd.betName][valueKey] = { totalOdds: 0, count: 0, value: odd.value };
            }
            acc[odd.betName][valueKey].totalOdds += odd.odd;
            acc[odd.betName][valueKey].count += 1;

            return acc;
        }, {});

        return Object.entries(grouped)
            .map(([betName, values]) => ({
                betName,
                values: Object.values(values).map(valueData => ({
                    ...valueData,
                    averageOdd: (valueData.totalOdds / valueData.count).toFixed(2),
                })),
            }));
    };

    const sortValuesWithinGroup = (values) => {
        return values.sort((a, b) => {
            const priority = ['Home', 'Draw', 'Away'];
            const indexA = priority.findIndex(keyword => a.value.includes(keyword));
            const indexB = priority.findIndex(keyword => b.value.includes(keyword));

            if (indexA !== -1 && indexB !== -1) {
                if (indexA === indexB) {
                    const matchA = a.value.match(/(\d+(\.\d+)?)/);
                    const matchB = b.value.match(/(\d+(\.\d+)?)/);

                    if (matchA && matchB) {
                        const valueA = parseFloat(matchA[0]);
                        const valueB = parseFloat(matchB[0]);
                        return valueA - valueB;
                    }
                }
                return indexA - indexB;
            }

            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            const matchA = a.value.match(/(\d+(\.\d+)?)/);
            const matchB = b.value.match(/(\d+(\.\d+)?)/);

            if (matchA && matchB) {
                const valueA = parseFloat(matchA[0]);
                const valueB = parseFloat(matchB[0]);
                return valueA - valueB;
            }

            return a.value.localeCompare(b.value);
        });
    };

    const filterGroupAndSortOdds = (odds) => {
        const filtered = odds.filter(odd => predefinedBetOrder.includes(odd.betName) || odd.betName.includes('Over') || odd.betName.includes('Under'));
        const grouped = groupOdds(filtered);
        grouped.forEach(group => {
            group.values = sortValuesWithinGroup(group.values);
        });
        return grouped;
    };



    const toggleBetName = (betName) => {
        setExpandedBetNames(prevState => ({
            ...prevState,
            [betName]: !prevState[betName],
        }));
    };

    const groupedAndSortedOdds = filterGroupAndSortOdds(odds);
    const sortedGroupedOdds = predefinedBetOrder
        .filter(betName => groupedAndSortedOdds.find(group => group.betName === betName))
        .map(betName => groupedAndSortedOdds.find(group => group.betName === betName));

    return (
        <>
            {(match.advice || match.homePrediction || match.awayPrediction || match.overUnder) && (
                <PredictionsHeader>
                    {match.advice && (
                        <PredictionText>{match.advice}</PredictionText>
                    )}
                    {(match.homePrediction || match.awayPrediction || match.overUnder) && (
                        <GoalsText>
                            {match.homePrediction && (
                                <>
                                    {match.homeTeamName}: {match.homePrediction}<br />
                                </>
                            )}
                            {match.awayPrediction && (
                                <>
                                    {match.awayTeamName}: {match.awayPrediction}<br />
                                </>
                            )}
                            {match.overUnder && (
                                <>{match.overUnder}</>
                            )}
                        </GoalsText>
                    )}
                </PredictionsHeader>
            )}
            {sortedGroupedOdds.length > 0 && (
                <OddsContainer>

                    {sortedGroupedOdds.map((betGroup, index) => (
                        <div key={index}>
                            <BetNameRow onClick={() => toggleBetName(betGroup.betName)}>
                                <OddsNameAndValuesCell>{betGroup.betName}</OddsNameAndValuesCell>
                            </BetNameRow>
                            {expandedBetNames[betGroup.betName] && (
                                <BetNameContainer>
                                    {betGroup.values.map((value, i) => (
                                        <OddsRow
                                            key={i}
                                            onClick={() => handleAddToSlip({
                                                betName: betGroup.betName,
                                                value: value.value,
                                                odd: value.averageOdd,
                                                matchInfo: `${match.homeTeamName || 'Home Team'} vs ${match.awayTeamName || 'Away Team'}`,
                                            })}
                                        >
                                            <OddsCellValue>{value.value}</OddsCellValue>
                                            <OddCell>{value.averageOdd}</OddCell>
                                        </OddsRow>
                                    ))}
                                </BetNameContainer>
                            )}
                        </div>
                    ))}
                </OddsContainer>
            )}
        </>
    );
};

export default Odds;


const OddsContainer = styled.div`
  background-color: rgba(28, 30, 36, 0.85);
    border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
 
 width: max(650px);
 
 
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`;

const OddsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #3f434b;
  background-color: #31363f;
  border-radius: 5px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #424951;
  }
`;

const OddsNameAndValuesCell = styled.div`
  flex: 1;
  text-align: left;
  color: #d1d5db;
  font-size: 12px;
  font-weight: 500;
`;

const BetNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  border-radius: 6px;
  padding: 5px;

`;

const OddCell = styled.div`
  flex: 1;
  text-align: right;
  color: #e5e7eb;
  font-size: 11px;
  font-weight: 500;
`;

const BetNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #2e3440;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: #e4e7ec;
  margin-top: 6px;
  transition: background-color 0.15s;

  &:hover {
    background-color: #3c4451;
  }
`;

const OddsCellValue = styled.div`
  flex: 1;
  color: #e0e0e0;
  font-size: 11px;
  font-weight: 500;
  width: 40px;
`;

const OddsHeader = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #24272c;
  border-bottom: 1px solid #4a4f58;
  font-weight: bold;
  font-size: 12px;
  color: #f1f1f1;
    border-radius:10px;
`;

const PredictionsHeader = styled.div`
  height: 60px;
  max-width: 650px;
  width: 100%;
  background-color: #1f2227;
 
  margin-top: 6px;
  margin-bottom: 12px;
  border-radius: 5px;
  color: #dcdcdc;
  padding: 8px;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  position: relative;

  img {
    margin-top: 4px;
    margin-bottom: 4px;
    width: 26px;
    height: 26px;
    margin-right: 10px;
    object-fit: contain;
  }
`;

const PredictionText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
`;


const GoalsText = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.3;
`;
