import React from 'react';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  CalendarWrapper,
  CustomDatePicker,
  FilterButtonsWrapper,
  FiltersWrapper,
  ArrowButton,
  FilterButton,
  ControlsContainer,
} from '../../styles/match/FiltersStyles';
import { CollapseExpandButton } from '../../styles/buttons/buttons';

const Filters = ({
  activeFilters = [],
  handleTabClick,
  selectedDate,
  setSelectedDate,
  favoriteCount = 0,
  liveCount = 0,
  scheduledCount = 0,
  finishedCount = 0,
  changeDate,
  isAllExpanded, toggleAllSections
}) => {
  return (
    <FiltersWrapper>
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
      <FilterButtonsWrapper >
        <FilterButton
          $isActive={activeFilters.includes('All')}
          onClick={() => handleTabClick('All')}
          disabled={false}
        >
          All
        </FilterButton>


        <FilterButton
          $isActive={activeFilters.includes('Favorites')}
          onClick={() => handleTabClick('Favorites')}
          disabled={favoriteCount === 0}
          $width="110px"
        >
          Favorites{favoriteCount > 0 ? ` (${favoriteCount})` : ''}
        </FilterButton>
        <FilterButton
          $isActive={activeFilters.includes('Scheduled')}
          onClick={() => handleTabClick('Scheduled')}
          disabled={scheduledCount === 0}
        >
          Scheduled
        </FilterButton>
        <FilterButton
          $isActive={activeFilters.includes('Live')}
          onClick={() => handleTabClick('Live')}
          disabled={liveCount === 0}
        >
          Live
        </FilterButton>
        <FilterButton
          $isActive={activeFilters.includes('Finished')}
          onClick={() => handleTabClick('Finished')}
          disabled={finishedCount === 0}
        >
          Finished
        </FilterButton>
        <ControlsContainer>
          <CollapseExpandButton onClick={toggleAllSections}>
            {isAllExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </CollapseExpandButton>
        </ControlsContainer>
      </FilterButtonsWrapper>

    </FiltersWrapper>
  );
};

export default Filters;
