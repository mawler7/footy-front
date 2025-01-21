import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMatches } from "../../hooks/matches/useFetchMatches";
import { useFavorites } from "../../hooks/matches/useFavorites";
import { useGroupedMatches } from "../../hooks/matches/useGroupedMatches";
import { useSectionExpansion } from "../../hooks/matches/useSectionExpansion";
import MatchesSection from "./MatchesSection";
import Filters from "../filters/Filters";
import { LoadingWrapper, Spinner } from "../../styles/content/GlobalStyles";
import { MatchesContent, MatchesWrapper, PredictionsCounterWrapper } from "../../styles/content/AppContentStyles";
import { useDate } from "../context/DateContext";
import { validateAdvice, validateAwayPrediction, validateHomePrediction, validateUnderOver } from "../../utils/predictionsValidator";


const countPredictions = (matches) => {
  let totalPredictions = 0;
  let truePredictions = 0;

  matches.forEach((match) => {
    const predictions = [
      {
        valid: validateAdvice(match.advice, match.home, match.away, match.homeTeamName, match.awayTeamName, match.status),
        exists: match.advice && match.advice !== "No predictions available",
      },
      {
        valid: validateHomePrediction(match.homePrediction, match.home, match.status),
        exists: Boolean(match.homePrediction),
      },
      {
        valid: validateAwayPrediction(match.awayPrediction, match.away, match.status),
        exists: Boolean(match.awayPrediction),
      },
      {
        valid: validateUnderOver(match.underOver, match.home, match.away, match.status),
        exists: Boolean(match.underOver),
      },
    ];

    predictions.forEach(({ valid, exists }) => {
      if (exists) {
        totalPredictions++;
        if (valid) {
          truePredictions++;
        }
      }
    });
  });

  return { totalPredictions, truePredictions };
};

const Matches = ({ toggleBettingSlip, showBubble }) => {
  const { selectedDate, setSelectedDate } = useDate();
  const { matches, loading } = useFetchMatches(selectedDate);
  const { favorites, toggleFavorite } = useFavorites();
  const { expandedSections, isAllExpanded, toggleAll, toggleSection } = useSectionExpansion();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState(["All"]);

  const liveMatches = matches.filter(
    (match) => match?.status && ["1H", "2H", "HT", "ET", "BT"].includes(match.status)
  );

  const groupedFavorites = useGroupedMatches(matches, (match) => {
    if (!match?.id) {
      console.warn("Invalid favorite match:", match);
      return false;
    }
    return favorites.some((fav) => fav.id === match.id);
  });

  const groupedLive = useGroupedMatches(matches, (match) => {
    if (!match?.status) {
      console.warn("Invalid live match:", match);
      return false;
    }
    return liveMatches.includes(match);
  });

  const groupedScheduled = useGroupedMatches(matches, (match) => {
    if (!match?.status) {
      console.warn("Invalid scheduled match:", match);
      return false;
    }
    return !["FT", "AET", "PEN"].includes(match.status);
  });

  const groupedFinished = useGroupedMatches(matches, (match) => {
    if (!match?.status) {
      console.warn("Invalid finished match:", match);
      return false;
    }
    return ["FT", "AET", "PEN"].includes(match.status);
  });




  const groupedMatches = useMemo(() => ({
    Favorites: groupedFavorites,
    Live: groupedLive,
    Scheduled: groupedScheduled,
    Finished: groupedFinished,
  }), [groupedFavorites, groupedLive, groupedScheduled, groupedFinished]);

  const predictionCounts = useMemo(() => countPredictions(matches), [matches]);

  const handleTabClick = (filter) => {
    if (filter === "All") {
      setActiveFilters(["All"]);
      return;
    }

    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters.filter((f) => f !== "All"), filter]
    );
  };

  const handleMatchClick = (matchId) => navigate(`/fixture/id/${matchId}`);
  const handleLeagueClick = (leagueId) => navigate(`/league/${leagueId}`);

  const percentagePredictions = predictionCounts.totalPredictions
    ? ((predictionCounts.truePredictions / predictionCounts.totalPredictions) * 100).toFixed(2)
    : 0;
  return (
    <MatchesWrapper>
      <Filters
        activeFilters={activeFilters}
        handleTabClick={handleTabClick}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        favoriteCount={groupedFavorites.length || 0}
        liveCount={groupedLive.length || 0}
        scheduledCount={groupedScheduled.length || 0}
        finishedCount={groupedFinished.length || 0}
        changeDate={(days) => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + days)))}
        isAllExpanded={isAllExpanded}
        toggleAll={() => toggleAll(groupedMatches)}
      />

      <PredictionsCounterWrapper>
        {predictionCounts.truePredictions}/{predictionCounts.totalPredictions} ({percentagePredictions}%)
      </PredictionsCounterWrapper>

      {loading ? (
        <LoadingWrapper>
          <Spinner />
        </LoadingWrapper>
      ) : (
        <MatchesContent>
          {Object.entries(groupedMatches).map(([key, matches]) => (
            <MatchesSection
              key={key}
              title={key}
              groupedMatches={matches}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              handleMatchClick={handleMatchClick}
              handleLeagueClick={handleLeagueClick}
              toggleBettingSlip={toggleBettingSlip}
              showBubble={showBubble}
            />
          ))}
        </MatchesContent>
      )}
    </MatchesWrapper>
  );
};

export default Matches;
