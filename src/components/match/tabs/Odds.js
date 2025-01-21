import React, { useState, useEffect, useContext } from 'react';
import {
    OddsContainer,
    OddsColumn,
    BetNameContainer,
    OddsRow,
    OddsCellValue,
    OddCell,
    BetNameRow,
    AdviceContainer,
} from '../../../styles/match/OddsStyles';
import { LoadingWrapper, Spinner } from '../../../styles/content/GlobalStyles';
import { BettingSlipContext } from '../../context/BettingSlipContext';
import { betGroups } from '../../../utils/bettingUtils';
import { AdviceText } from '../../../styles/match/PredictionStyles';
import { cleanAdvice } from '../../../utils/predictionsValidator';

const Odds = ({ odds = [], match, toggleBettingSlip, showBubble }) => {

    const [expandedBetNames, setExpandedBetNames] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { addToBettingSlip } = useContext(BettingSlipContext);



    const addToBettingSlipHandler = ({ betName, value, odd }) => {
        const matchInfo = {
            id: match?.id || null, // Upewnij się, że używasz poprawnego pola
            homeTeamName: match?.homeTeamName || "Unknown",
            awayTeamName: match?.awayTeamName || "Unknown",
            leagueName: match?.leagueName || "Unknown League",
            date: match?.date || "Unknown Date",
        };

        if (!matchInfo.id) {
            console.error("Cannot add bet due to missing match ID:", matchInfo);
            return;
        }

        addToBettingSlip({
            betName,
            value,
            odd,
            matchInfo,
        });

        if (!showBubble && toggleBettingSlip) {
            toggleBettingSlip();
        }
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
        groupOdds(odds.filter((odd) => betNames.includes(odd.betName))).sort(
            (a, b) => betNames.indexOf(a.betName) - betNames.indexOf(b.betName)
        );

    const filterRemainingOdds = (odds, betGroups) => {
        const allDefinedBetNames = [
            ...betGroups.main,
            ...betGroups.secondary,
            ...betGroups.score,
        ];
        return groupOdds(odds.filter((odd) => !allDefinedBetNames.includes(odd.betName)));
    };

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

                                    addToBettingSlip({
                                        betName,
                                        value,
                                        odd: averageOdd,
                                        matchInfo: {
                                            id: match?.id || null,
                                            homeTeamName: match?.homeTeamName || "Unknown",
                                            awayTeamName: match?.awayTeamName || "Unknown",
                                            leagueName: match?.leagueName || "Unknown League",
                                            date: match?.date || "Unknown Date",
                                        },
                                        allBetNames: groupedBets.map((bet) => bet.betName), // Wszystkie unikalne betName
                                        allValues: groupedBets
                                            .find((bet) => bet.betName === betName)
                                            ?.values.map((v) => v.value), // Wszystkie wartości dla tego betName
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


    const renderRemainingOdds = (remainingBets) => (
        <div>
            {remainingBets.map(({ betName, values }) => (
                <div key={betName}>
                    <BetNameRow onClick={() => toggleBetName(betName)}>{betName}</BetNameRow>
                    {expandedBetNames[betName] && (
                        <BetNameContainer>
                            {values.map(({ value, averageOdd }) => (
                                <OddsRow
                                    key={value}
                                    onClick={() =>
                                        addToBettingSlipHandler({
                                            betName,
                                            value,
                                            odd: averageOdd,
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
            ))}
        </div>
    );

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

    const remainingOdds = filterRemainingOdds(odds, betGroups);

    return (
        <>
            <AdviceContainer>
                <AdviceText>
                    <strong>{cleanAdvice(match?.advice)}</strong>
                    <br />
                    <span>
                        <strong>{match?.homeTeamName ?? ''}</strong>: {match?.homePrediction ?? ''}
                    </span>
                    <br />
                    <span>
                        <strong>{match?.awayTeamName ?? ''}</strong>: {match?.awayPrediction ?? ''}
                    </span>
                </AdviceText>
            </AdviceContainer>
            <OddsContainer>

                <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.main))}</OddsColumn>
                <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.secondary))}</OddsColumn>
                <OddsColumn>{renderOddsGroup(filterAndGroupOdds(odds, betGroups.score))}</OddsColumn>
                {remainingOdds.length > 0 && <OddsColumn>{renderRemainingOdds(remainingOdds)}</OddsColumn>}
            </OddsContainer>
        </>
    );
};

export default Odds;
