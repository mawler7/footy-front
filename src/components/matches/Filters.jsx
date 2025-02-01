import React, { memo, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CalendarWrapper, FilterButtonsWrapper, FiltersWrapper, StyledDatePickerWrapper, TooltipWrapper, Tooltip, ArrowButton } from '../../styles/match/FiltersStyles';
import { Tab } from '../../styles/buttons/buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { filterButtonsConfig, renderFilterButton } from '../../utils/filterHelpers';

const Filters = memo(({
  activeFilters,
  handleTabClick,
  selectedDate,
  setSelectedDate,
  counts,
  changeDate,
  isAllExpanded,
  toggleAll,
}) => {

  const handleDateChange = useCallback((date) => {
    if (date && date.getTime() !== selectedDate.getTime()) {
      setSelectedDate(date);
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <FiltersWrapper>


      <FilterButtonsWrapper>
        {filterButtonsConfig.map((config) =>
          renderFilterButton(config, activeFilters, handleTabClick, counts[config.key])
        )}
        <TooltipWrapper>
          <Tab onClick={toggleAll}>
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
      <CalendarWrapper>
        <ArrowButton onClick={() => changeDate(-1)}>
          <FaArrowLeft />
        </ArrowButton>
        <StyledDatePickerWrapper>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
          />
        </StyledDatePickerWrapper>
        <ArrowButton onClick={() => changeDate(1)}>
          <FaArrowRight />
        </ArrowButton>
      </CalendarWrapper>
    </FiltersWrapper>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.activeFilters === nextProps.activeFilters &&
    prevProps.selectedDate.getTime() === nextProps.selectedDate.getTime() &&
    JSON.stringify(prevProps.counts) === JSON.stringify(nextProps.counts) &&
    prevProps.isAllExpanded === nextProps.isAllExpanded
  );
});

export default Filters;
