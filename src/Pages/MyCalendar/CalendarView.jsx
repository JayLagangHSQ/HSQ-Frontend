import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';
import { getStatusColor } from '../../Util/utils';

const CalendarView = ({ data }) => {
  const [date, setDate] = useState(new Date());

  const getDateStatusColor = (date) => {
    const matchingDate = data.find((item) => new Date(item.date).toDateString() === date.toDateString());
    return matchingDate ? getStatusColor(matchingDate.status) : null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const color = getDateStatusColor(date);
      return color;
    }
    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        className={styles.calendar}
        calendarType='gregory'
      />
    </div>
  );
};

export default CalendarView;
