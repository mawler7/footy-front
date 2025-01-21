import React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaListAlt,
  FaStar,
  FaCalendarAlt,
  FaPlay,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import {
  CalendarWrapper,
  FilterButtonsWrapper,
  FiltersWrapper,
  StyledDatePickerWrapper,
  Tooltip, TooltipWrapper
} from '../../styles/match/FiltersStyles';
import { Tab } from '../../styles/buttons/buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  isAllExpanded,
  toggleAll,
}) => {
  return (
    <FiltersWrapper>
      <CalendarWrapper>
        <Tab onClick={() => changeDate(-1)}>
          <FaArrowLeft />
        </Tab>
        <StyledDatePickerWrapper>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
          />
        </StyledDatePickerWrapper>
        <Tab onClick={() => changeDate(1)}>
          <FaArrowRight />
        </Tab>
      </CalendarWrapper>
      <FilterButtonsWrapper>
        <TooltipWrapper>
          <Tab
            $isActive={activeFilters.includes('All')}
            onClick={() => handleTabClick('All')}
          >
            <FaListAlt />
          </Tab>
          <Tooltip>All</Tooltip>
        </TooltipWrapper>
        <TooltipWrapper>
          <Tab
            $isActive={activeFilters.includes('Favorites')}
            onClick={() => handleTabClick('Favorites')}
            disabled={favoriteCount === 0}
          >
            <FaStar />
          </Tab>
          <Tooltip>Favorites</Tooltip>
        </TooltipWrapper>
        <TooltipWrapper>
          <Tab
            $isActive={activeFilters.includes('Scheduled')}
            onClick={() => handleTabClick('Scheduled')}
            disabled={scheduledCount === 0}
          >
            <FaCalendarAlt />
          </Tab>
          <Tooltip>Scheduled</Tooltip>
        </TooltipWrapper>
        <TooltipWrapper>
          <Tab
            $isActive={activeFilters.includes('Live')}
            onClick={() => handleTabClick('Live')}
            disabled={liveCount === 0}
          >
            <FaPlay />
          </Tab>
          <Tooltip>Live</Tooltip>
        </TooltipWrapper>
        <TooltipWrapper>
          <Tab
            $isActive={activeFilters.includes('Finished')}
            onClick={() => handleTabClick('Finished')}
            disabled={finishedCount === 0}
          >
            <FaCheckCircle />
          </Tab>
          <Tooltip>Finished</Tooltip>
        </TooltipWrapper>
        <TooltipWrapper>
          <Tab onClick={() => toggleAll()}>
            {isAllExpanded ? (
              <>
                <FaChevronUp />
                <Tooltip>Collapse All</Tooltip>
              </>
            ) : (
              <>
                <FaChevronDown />
                <Tooltip>Expand All</Tooltip>
              </>
            )}
          </Tab>
        </TooltipWrapper>
      </FilterButtonsWrapper>
    </FiltersWrapper>
  );
};


export default Filters;
