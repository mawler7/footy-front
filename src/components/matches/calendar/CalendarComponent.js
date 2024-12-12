import React from 'react';
import { DatePicker } from 'react-datepicker';

const CalendarComponent = ({ selectedDate, onDateChange }) => {

    return (
        <DatePicker
            selected={selectedDate}
            onChange={date => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
            inline
        />
    );
};

export default CalendarComponent;