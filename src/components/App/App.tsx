import React from 'react';
import { createCn } from 'bem-react-classname';
import Today from '../../models/Today';
import Expense from '../../models/Expense';
import Income from '../../models/Income';
import MonthSeparator from '../../models/MonthSeparator';
import DayOccurrence, { sortDayOccurrencesChronologically } from '../../models/DayOccurrence';
import { doesTimeRangeIncludesDate, extendTimeRange, timeRangeFromDays } from '../../models/TimeRange';
import { repeatablesToDayOccurrencesInTimeRange, repeatablesToFindNextDay } from '../../models/Repeatable';
import ExpenseItem from '../ExpenseItem';
import IncomeItem from '../IncomeItem';
import TodayItem from '../TodayItem';
import './App.scss';
import data from '../../.local/data.json';

const cn = createCn('App');

const App = () => {
  const [items, setItems] = React.useState<(DayOccurrence | MonthSeparator)[]>([]);
  const [totalExpensesBeforeNextIncome, setTotalExpensesBeforeNextIncome] = React.useState<number>(0);
  const [weeksAfter, setWeeksAfter] = React.useState<number>(1);

  React.useEffect(() => {
    const today = new Today();
    const nextIncomeDay = repeatablesToFindNextDay(data.incomes, today.day);
    const timeRangeBeforeNextIncome = timeRangeFromDays(today.day, nextIncomeDay);
    const timeRange = extendTimeRange(timeRangeBeforeNextIncome, 1, weeksAfter);

    const expenses = repeatablesToDayOccurrencesInTimeRange(data.expenses, timeRange, (expense, day) => {
      const inactive = !doesTimeRangeIncludesDate(day.date, timeRangeBeforeNextIncome);
      return new Expense(day, expense.name, expense.receiver, expense.price, inactive);
    });

    const incomes = repeatablesToDayOccurrencesInTimeRange(data.incomes, timeRange, (income, day) => {
      const inactive = !doesTimeRangeIncludesDate(day.date, timeRangeBeforeNextIncome);
      return new Income(day, income.name, income.sender, inactive);
    });

    setTotalExpensesBeforeNextIncome(
      expenses
        .filter((expense) => doesTimeRangeIncludesDate(expense.day.date, timeRangeBeforeNextIncome))
        .reduce((total, expense) => total + expense.price, 0)
    );

    const items = [today, ...expenses, ...incomes]
      .sort(sortDayOccurrencesChronologically)
      .flatMap((occurrence, i, arr) => {
        if (i === 0 || arr[i - 1].day.date.getMonth() === occurrence.day.date.getMonth()) {
          return [occurrence];
        }

        return [new MonthSeparator(occurrence.day), occurrence];
      });

    setItems(items);
  }, [weeksAfter]);

  const showMoreButtonClickHandler = () => {
    setWeeksAfter((prev) => prev + 1);
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {items.map((item, i) => (
          <li key={i}>
            {getItemRenderer(item, totalExpensesBeforeNextIncome)}
          </li>
        ))}
      </ul>
      <button onClick={showMoreButtonClickHandler}>Show 1 week more...</button>
    </div>
  );
};

export default App;

const getItemRenderer = (item: DayOccurrence | MonthSeparator, totalExpensesBeforeNextIncome: number): React.ReactNode => {
  if (item instanceof Today) {
    return <TodayItem today={item as Today} amount={totalExpensesBeforeNextIncome} />
  }

  if (item instanceof Expense) {
    return <ExpenseItem expense={item as Expense} />
  }

  if (item instanceof Income) {
    return <IncomeItem income={item as Income} />
  }

  if (item instanceof MonthSeparator) {
    const separator = item as MonthSeparator;
    // TODO: Create MonthSeparatorItem component.
    return <h1 style={{ background: 'yellow', textAlign: 'center' }}>
      -- {separator.monthStartDay.date.toLocaleString('default', { month: 'long', year: 'numeric' })} --
    </h1>
  }

  return undefined;
};
