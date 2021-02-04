import React from 'react';
import { createCn } from 'bem-react-classname';
import MonthSeparator from '../../models/MonthSeparator';
import './MonthSeparatorItem.scss';

const cn = createCn('MonthSeparatorItem');

interface Props {
  monthSeparator: MonthSeparator
}

const MonthSeparatorItem: React.FC<Props> = ({ monthSeparator }) => (
  <div className={cn()}>
    {monthSeparator.monthStartDay.date.toLocaleString('default', { month: 'long', year: 'numeric' })}
  </div>
);

export default MonthSeparatorItem;
