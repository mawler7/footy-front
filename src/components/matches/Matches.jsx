import React, { useState, useCallback, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMatches } from "../../hooks/matches/useFetchMatches";
import { useFavorites } from "../../hooks/matches/useFavorites";
import { useSectionExpansion } from "../../hooks/matches/useSectionExpansion";
import { useMatchesGrouping } from "../../hooks/matches/useMatchesGrouping";
import GroupedMatches from "./GroupedMatches";
import PredictionsCounter from "./PredictionsCounter";
import { MatchesWrapper, MatchesContent } from "../../styles/content/AppContentStyles";
import { AppStateContext } from "../context/AppStateContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Filters from "./Filters";
import { countPredictions } from "../../utils/predictionsUtils";

const Matches = ({ toggleBettingSlip, showBubble }) => {
  const { selectedDate, setSelectedDate } = useContext(AppStateContext);
  const { matches, loading } = useFetchMatches(selectedDate);
  const { favorites, toggleFavorite } = useFavorites();
  const { expandedSections, isAllExpanded, toggleSection, toggleAll } = useSectionExpansion();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const { groupedFavorites, groupedLive, groupedScheduled, groupedFinished } = useMatchesGrouping(matches, favorites);

  const counts = useMemo(() => ({
    Favorites: groupedFavorites
      ? Object.values(groupedFavorites).reduce((acc, group) => acc + (group.matches?.length || 0), 0)
      : 0,
    Scheduled: groupedScheduled
      ? Object.values(groupedScheduled).reduce((acc, group) => acc + (group.matches?.length || 0), 0)
      : 0,
    Live: groupedLive
      ? Object.values(groupedLive).reduce((acc, group) => acc + (group.matches?.length || 0), 0)
      : 0,
    Finished: groupedFinished
      ? Object.values(groupedFinished).reduce((acc, group) => acc + (group.matches?.length || 0), 0)
      : 0,
  }), [groupedFavorites, groupedScheduled, groupedLive, groupedFinished]);

  const groupedMatches = useMemo(() => ({
    Favorites: groupedFavorites,
    Live: groupedLive,
    Scheduled: groupedScheduled,
    Finished: groupedFinished,
  }), [groupedFavorites, groupedLive, groupedScheduled, groupedFinished]);

  const filteredGroupedMatches = useMemo(() => {
    const activeFilter = activeFilters[0];
    if (activeFilter === "All") return groupedMatches;
    return { [activeFilter]: groupedMatches[activeFilter] };
  }, [groupedMatches, activeFilters]);

  const predictionCounts = useMemo(() => countPredictions(matches), [matches]);

  const handleTabClick = useCallback((filter) => {
    setActiveFilters((prevFilters) =>
      filter === "All" ? ["All"] : prevFilters.includes(filter) ? ["All"] : [filter]
    );
  }, []);

  const changeDate = useCallback(
    (days) => {
      setSelectedDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
      });
    },
    [setSelectedDate]
  );

  const handleMatchClick = useCallback(
    (matchId) => navigate(`/fixture/id/${matchId}`),
    [navigate]
  );

  const handleLeagueClick = useCallback(
    (leagueId) => navigate(`/league/${leagueId}`),
    [navigate]
  );

  return (
    <MatchesWrapper>
      <Filters
        activeFilters={activeFilters}
        handleTabClick={handleTabClick}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        counts={counts}
        changeDate={changeDate}
        isAllExpanded={isAllExpanded}
        toggleAll={() => toggleAll(groupedMatches)}
      />
      <PredictionsCounter {...predictionCounts} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <MatchesContent>
          <GroupedMatches
            filteredGroupedMatches={filteredGroupedMatches}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            handleMatchClick={handleMatchClick}
            handleLeagueClick={handleLeagueClick}
            toggleBettingSlip={toggleBettingSlip}
            showBubble={showBubble}
          />
        </MatchesContent>
      )}
    </MatchesWrapper>
  );
};

export default Matches;
