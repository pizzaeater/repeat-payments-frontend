import React from 'react';
import './CalendarDay.scss';

interface Props {
  date: Date
  color: string
  inactive: boolean
}

const CalendarDay: React.FC<Props> = ({ date, color, inactive }) => (
  <div className="CalendarDay">
    <div className="CalendarDay__month" style={{ background: color }}>NOV</div>
    <div className="CalendarDay__day">3</div>
  </div>
);

export default CalendarDay;
