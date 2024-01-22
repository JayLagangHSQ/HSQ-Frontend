import styles from '../Pages/MyCalendar/calendar.module.css';

export const getStatusColor = (status) => {
  switch (status) {
    case 'good':
      return styles.good;
    case 'late':
      return styles.late;
    case 'absent':
      return styles.absent;
    default:
      return null;
  }
};