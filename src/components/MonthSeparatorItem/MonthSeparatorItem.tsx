import React from 'react';
import { createCn } from 'bem-react-classname';
import MonthSeparator from '../../models/MonthSeparator';
import './MonthSeparatorItem.scss';

const cn = createCn('MonthSeparatorItem');

interface Props {
  monthSeparator: MonthSeparator
}

const MonthSeparatorItem: React.FC<Props> = ({ monthSeparator }) => {
  const date = monthSeparator.monthStartDay.date;

  return (
    <div className={cn()}>
      <span className={cn('month')}>{date.toLocaleString('default', { month: 'long' })}</span>
      <span className={cn('year')}>&nbsp;{date.toLocaleString('default', { year: 'numeric' })}</span>
    </div>
  );
};

export default MonthSeparatorItem;
