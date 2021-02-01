import React from 'react';
import { createCn } from 'bem-react-classname';
import Income from '../../models/Income';
import Panel from '../Panel';
import CalendarDay from '../CalendarDay';
import './IncomeItem.scss';

const cn = createCn('IncomeItem');

interface Props {
  income: Income
}

const IncomeItem: React.FC<Props> = ({ income }) => (
  <Panel inactive={!income.isAccented}>
    <div className={cn({ inactive: !income.isAccented })}>
      <CalendarDay date={income.day.date} type="income" inactive={!income.isAccented} />
      <div className={cn('text')}>{income.name}</div>
    </div>
  </Panel>
);

export default IncomeItem;
