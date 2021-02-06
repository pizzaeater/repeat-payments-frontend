import React from 'react';
import DayOccurrence from '../../models/DayOccurrence';
import Today from '../../models/Today';
import Expense from '../../models/Expense';
import Income from '../../models/Income';
import MonthSeparator from '../../models/MonthSeparator';
import ExpenseItem from '../ExpenseItem';
import IncomeItem from '../IncomeItem';
import TodayItem from '../TodayItem';
import MonthSeperatorItem from '../MonthSeparatorItem';

export const getItemRenderer = (item: DayOccurrence | MonthSeparator, totalExpensesBeforeNextIncome: number): React.ReactNode => {
  if (item instanceof Today) {
    return <TodayItem today={item as Today} amount={totalExpensesBeforeNextIncome} />;
  }

  if (item instanceof Expense) {
    return <ExpenseItem expense={item as Expense} />;
  }

  if (item instanceof Income) {
    return <IncomeItem income={item as Income} />;
  }

  if (item instanceof MonthSeparator) {
    return <MonthSeperatorItem monthSeparator={item as MonthSeparator} />;
  }

  return undefined;
};
