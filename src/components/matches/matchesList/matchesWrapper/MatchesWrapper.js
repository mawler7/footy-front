import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useFetchMatches } from '../../../../hooks/useFetchMatches';
import { useSortedMatches } from '../../../../hooks/useSortedMatches';
import MatchesTable from '../matchesTable/MatchesTable';
import { AuthContext } from '../../../context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import BaseButton from '../../../common/BaseButton';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const MatchesWrapper = ({ selectedDate, setSelectedDate, bettingSlip, setBettingSlip, setShowBubble }) => {
  const [isAllExpanded, setIsAllExpanded] = useState(true)
  const { matches, loading, error } = useFetchMatches(selectedDate);
  const { sortType, leagueOrder } = useContext(AuthContext);
  const [activeFilters, setActiveFilters] = useState(['All']);
  const navigate = useNavigate();
  const [favoriteMatches, setFavoriteMatches] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteMatches');
    return Array.isArray(JSON.parse(storedFavorites)) ? JSON.parse(storedFavorites) : [];
  });


  const toggleAllSections = () => {
    const updatedState = {};
    Object.keys(expandedSections).forEach((leagueId) => {
      updatedState[leagueId] = !isAllExpanded;
    });
    setExpandedSections(updatedState);
    setIsAllExpanded(!isAllExpanded);
  };

  const [expandedSections, setExpandedSections] = useState(() => {
    const cachedState = JSON.parse(localStorage.getItem('expandedSections')) || {};
    return cachedState;
  });

  useEffect(() => {
    localStorage.setItem('expandedSections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  const saveFavoritesToLocalStorage = debounce((favorites) => {
    localStorage.setItem('favoriteMatches', JSON.stringify(Array.from(favorites)));
  }, 500);

  useEffect(() => {
    saveFavoritesToLocalStorage(favoriteMatches);
  }, [favoriteMatches]);


  const sortedMatches = useSortedMatches(matches, leagueOrder);

  const handleTabClick = (filterName) => {
    setActiveFilters((prevFilters) => {
      if (filterName === 'All') return ['All'];
      const updatedFilters = prevFilters.includes(filterName)
        ? prevFilters.filter((filter) => filter !== filterName)
        : [...prevFilters.filter((filter) => filter !== 'All'), filterName];
      return updatedFilters.length === 0 ? ['All'] : updatedFilters;
    });
  };

  const handleAddToSlip = (betName, value, odd, match) => {
    const getTeamLabel = (homeTeam, awayTeam) => `${homeTeam || 'Unknown Home Team'} vs ${awayTeam || 'Unknown Away Team'}`;
    const newBet = {
      teamLabel: getTeamLabel(match.homeTeamName, match.awayTeamName),
      betName: betName || 'Unknown Bet',
      value: value || 'N/A',
      odd: parseFloat(odd) || 1.0,
      matchInfo: getTeamLabel(match.homeTeamName, match.awayTeamName),
    };

    setBettingSlip((prevSlip) => [...prevSlip, newBet]);
    setShowBubble(true);
  };

  const toggleFavorite = (event, matchId) => {
    event.stopPropagation();
    setFavoriteMatches((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(matchId)
        ? prevFavorites.filter((id) => id !== matchId)
        : [...prevFavorites, matchId];
      return updatedFavorites;
    });
  };

  const handleMatchClick = (matchId) => {
    navigate(`/fixture/id/${matchId}`);
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <MainContent>
      <Filters>
        <CalendarWrapper>
          <ArrowButton onClick={() => changeDate(-1)}>
            <FaArrowLeft />
          </ArrowButton>
          <CustomDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <ArrowButton onClick={() => changeDate(1)}>
            <FaArrowRight />
          </ArrowButton>
        </CalendarWrapper>
        <FilterButtonsWrapper>
          <AllButton
            $isActive={activeFilters.includes('All')}
            onClick={() => handleTabClick('All')}
          >
            All
          </AllButton>
          <FavoritesButton
            $isActive={activeFilters.includes('Favorites')}
            onClick={() => handleTabClick('Favorites')}
          >
            Favorites
          </FavoritesButton>
          <LiveButton
            $isActive={activeFilters.includes('Live')}
            onClick={() => handleTabClick('Live')}
          >
            Live
          </LiveButton>
        </FilterButtonsWrapper>
      </Filters>
      <Controls>
        <CollapseExpandButton onClick={toggleAllSections}>
          {isAllExpanded ? 'Collapse All' : 'Expand All'}
        </CollapseExpandButton>
      </Controls>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>
          {error} <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
        </ErrorMessage>
      ) : (
        <MatchesTable
          sortType={sortType}
          matches={sortedMatches}
          favorites={Array.from(favoriteMatches)}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          bettingSlip={bettingSlip}
          setBettingSlip={setBettingSlip}
          setShowBubble={setShowBubble}
          toggleFavorite={toggleFavorite}
          handleAddToSlip={handleAddToSlip}
          handleMatchClick={handleMatchClick}
        />
      )}
    </MainContent>
  );
};

export default MatchesWrapper;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end; /* Umieszcza przycisk po prawej stronie */
  margin-bottom: 10px;
  margin-right: 10px;
`;

const CollapseExpandButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(28, 30, 36, 0.85)' : 'rgb(68, 76, 78)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#c0c4c6')};
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 24px;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(85, 94, 97, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const RetryButton = styled(BaseButton)`
  margin-top: 10px;
`;

const LoadingMessage = styled.div`
  color: white;
  text-align: center;
  padding: 30px;
`;

const AllButton = styled(BaseButton)`
  background: ${({ $isActive }) => ($isActive ? 'rgba(28, 30, 36, 0.85)' : 'rgb(68, 76, 78)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#c0c4c6')};
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 34px;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(85, 94, 97, 0.5)' : 'none')};

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const FavoritesButton = styled(AllButton)`
  width: 120px;
`;

const LiveButton = styled(AllButton)`
  width: 80px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Umożliwia rozciągnięcie kontenerów */
  background-color: rgba(28, 30, 36, 0.7);
  border-radius: 10px;
  width: 100%;
  max-width: 670px;
  min-width: 370px;
  @media (max-width: 768px) {
    min-width: 370px;
  }
  padding: 5px;
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Wyśrodkowanie poziome */
  justify-content: center; /* Wyśrodkowanie pionowe */
  gap: 10px; /* Odstęp między datą a filtrami */
  margin: 10px 0; /* Dodatkowe odstępy od reszty strony */
`;

const ArrowButton = styled.button`
  background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgba(28, 30, 36, 0.85)')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#c0c4c6')};
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(85, 94, 97, 0.5)' : 'none')};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CustomDatePicker = styled(DatePicker)`
  padding: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100px;
  height: 34px;
  background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgba(28, 30, 36, 0.85)')};
  color: #ffffff;
  text-align: center;
  font-weight: 400;
  font-size: 0.8rem;
  transition: background 0.3s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 30px;
    font-size: 0.8rem;
  }
`;

export const Status = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  color: white;
`;

const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: center; /* Wyśrodkowanie przycisków */
  gap: 10px;
`;

const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;
