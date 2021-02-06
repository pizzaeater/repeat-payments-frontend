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

const IncomeItem: React.FC<Props> = ({ income }: Props) => (
  <Panel inactive={income.inactive}>
    <div className={cn({ inactive: income.inactive })}>
      <CalendarDay date={income.day.date} type="income" inactive={income.inactive} />
      <div className={cn('text')}>
        <p className={cn('name')}>{income.name}</p>
        {
          income.sender &&
          <p className={cn('sender')}>{income.sender}</p>
        }
      </div>
    </div>
  </Panel>
);

export default IncomeItem;
