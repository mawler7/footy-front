import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchMatches } from '../../hooks/matches/useFetchMatches';
import { useFavorites } from '../../hooks/matches/useFavorites';
import { useSortedMatches } from '../../hooks/matches/useSortedMatches';
import { useGroupedMatches } from '../../hooks/matches/useGroupedMatches';
import { useFilteredMatches } from '../../hooks/matches/useFilteredMaches';
import { useSectionExpansion } from '../../hooks/matches/useSectionExpansion';
import { useBettingSlip } from '../../hooks/bettingSlip/useBettingSlip';
import MatchesSection from './MatchesSection';
import Filters from '../filters/Filters';
import { LoadingWrapper, Spinner } from '../../styles/GlobalStyles';
import { MainContent, MatchContent } from '../../styles/content/AppContentStyles';

const MatchesWrapper = ({ selectedDate, setSelectedDate, setBettingSlip, setShowBubble }) => {
  const { matches, loading } = useFetchMatches(selectedDate);
  const { favorites, toggleFavorite } = useFavorites();
  const { sortedFavorites, scheduledMatches, finishedMatches } = useSortedMatches(matches, favorites);
  const { expandedSections, isAllExpanded, setExpandedSections, toggleAllSections } = useSectionExpansion();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = React.useState(['All']);

  const handleAddToSlip = useBettingSlip(setBettingSlip, setShowBubble)

  const favoriteCountForSelectedDate = React.useMemo(() => {
    return matches.filter(
      (match) =>
        favorites.some((fav) => fav.id === match.id) &&
        new Date(match.date).toDateString() === selectedDate.toDateString()
    ).length;
  }, [matches, favorites, selectedDate]);

  const liveMatches = React.useMemo(
    () =>
      matches
        .filter((match) => ['1H', '2H', 'HT', 'ET', 'BT'].includes(match.status))
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    [matches]
  );

  const filteredMatches = useFilteredMatches(
    matches,
    activeFilters,
    sortedFavorites,
    liveMatches,
    scheduledMatches,
    finishedMatches
  );

  const groupedFavorites = useGroupedMatches(
    filteredMatches.filter((match) =>
      favorites.some((fav) => fav.id === match.id)
    )
  );

  const groupedLive = useGroupedMatches(
    filteredMatches.filter(
      (match) =>
        !favorites.some((fav) => fav.id === match.id) &&
        ['1H', '2H', 'HT', 'ET', 'BT'].includes(match.status)
    )
  );

  const groupedScheduled = useGroupedMatches(
    filteredMatches.filter(
      (match) =>
        !favorites.some((fav) => fav.id === match.id) &&
        !['FT', 'AET', 'PEN', '1H', '2H', 'HT', 'ET', 'BT'].includes(match.status)
    )
  );

  const groupedFinished = useGroupedMatches(
    filteredMatches.filter(
      (match) =>
        !favorites.some((fav) => fav.id === match.id) &&
        ['FT', 'AET', 'PEN'].includes(match.status)
    )
  );

  const handleTabClick = (filter) => {
    if (filter === 'All') {
      setActiveFilters(['All']);
      return;
    }

    if (filter === 'Scheduled' || filter === 'Finished') {
      setActiveFilters(
        activeFilters.includes(filter)
          ? activeFilters.filter((f) => f !== filter)
          : [filter]
      );
      return;
    }

    if (filter === 'Live') {
      setActiveFilters(
        activeFilters.includes('Scheduled') || activeFilters.includes('Finished')
          ? ['Live']
          : activeFilters.includes('Live')
            ? activeFilters.filter((f) => f !== 'Live')
            : [...activeFilters.filter((f) => f !== 'All'), 'Live']
      );
      return;
    }

    if (filter === 'Favorites') {
      setActiveFilters((prevFilters) => {
        const updatedFilters = prevFilters.includes('Favorites')
          ? prevFilters.filter((f) => f !== 'Favorites')
          : [...prevFilters.filter((f) => f !== 'All'), 'Favorites'];

        return updatedFilters.length ? updatedFilters : ['All'];
      });
    }
  };

  const handleMatchClick = (matchId) => {
    navigate(`/fixture/id/${matchId}`);
  };

  return (
    <MainContent >
      <Filters
        isAllExpanded={isAllExpanded}
        toggleAllSections={() =>
          toggleAllSections({
            ...groupedFavorites,
            ...groupedLive,
            ...groupedScheduled,
            ...groupedFinished,
          })
        }
        activeFilters={activeFilters}
        handleTabClick={handleTabClick}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        favoriteCount={favoriteCountForSelectedDate}
        liveCount={liveMatches.length}
        scheduledCount={scheduledMatches.length}
        finishedCount={finishedMatches.length}
        changeDate={(days) => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + days);
          setSelectedDate(newDate);
        }}
      />

      {loading ? (
        <LoadingWrapper>
          <Spinner />
        </LoadingWrapper>
      ) : (
        <MatchContent isBettingSlipOpen={setShowBubble}>
          <MatchesSection isBettingSlipOpen={setShowBubble}
            title="Favorites"
            groupedMatches={groupedFavorites}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            handleMatchClick={handleMatchClick}
            handleAddToSlip={handleAddToSlip}

          />
          <MatchesSection isBettingSlipOpen={setShowBubble}
            title="Live"
            groupedMatches={groupedLive}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            handleMatchClick={handleMatchClick}
            handleAddToSlip={handleAddToSlip}
          />
          <MatchesSection isBettingSlipOpen={setShowBubble}
            title="Scheduled"
            groupedMatches={groupedScheduled}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            handleMatchClick={handleMatchClick}
            handleAddToSlip={handleAddToSlip}
          />
          <MatchesSection isBettingSlipOpen={setShowBubble}
            title="Finished"
            groupedMatches={groupedFinished}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            handleMatchClick={handleMatchClick}
            handleAddToSlip={handleAddToSlip}
          />
        </MatchContent>
      )
      }
    </MainContent >
  );
};

export default MatchesWrapper;

