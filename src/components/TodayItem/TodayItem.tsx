import React from 'react';
import { createCn } from 'bem-react-classname';
import Today from '../../models/Today';
import Panel from '../Panel';
import CalendarDay from '../CalendarDay';
import './TodayItem.scss';

const cn = createCn('TodayItem');

interface Props {
  today: Today
  amount: number
}

const IncomeItem: React.FC<Props> = ({ today, amount }) => (
  <Panel>
    <div className={cn()}>
      <CalendarDay date={today.day.date} type="today" />
      <div className={cn('text')}>Сегодня</div>
      <div className={cn('amount')}>{amount.toFixed(2)} €</div>
    </div>
  </Panel>
);

export default IncomeItem;
