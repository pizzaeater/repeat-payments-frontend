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
    <CalendarDay date={expense.day.date} type="expense" inactive={!expense.isAccented} />
    {expense.name} -{expense.price.toFixed(2)}
  </Panel>
);

export default ExpenseItem;
