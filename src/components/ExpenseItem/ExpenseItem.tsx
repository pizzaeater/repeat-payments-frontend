import React from 'react';
import { createCn } from 'bem-react-classname';
import Expense from '../../models/Expense';
import Panel from '../Panel';
import CalendarDay from '../CalendarDay';
import './ExpenseItem.scss';

const cn = createCn('ExpenseItem');

interface Props {
  expense: Expense
}

const ExpenseItem: React.FC<Props> = ({ expense }) => (
  <Panel inactive={!expense.isAccented}>
    <div className={cn({ inactive: !expense.isAccented })}>
      <CalendarDay date={expense.day.date} type="expense" inactive={!expense.isAccented} />
      <div className={cn('text')}>{expense.name}</div>
      <div className={cn('amount')}>{expense.price.toFixed(2)} €</div>
    </div>
  </Panel>
);

export default ExpenseItem;
