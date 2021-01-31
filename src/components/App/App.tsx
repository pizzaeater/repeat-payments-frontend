import React from 'react';
import Today from '../../models/Today';
import Expense from '../../models/Expense';
import Income from '../../models/Income';
import DayOccurrence, { sortDayOccurrencesChronologically } from '../../models/DayOccurrence';
import { doesTimeRangeIncludesDate, extendTimeRange, timeRangeFromDays } from '../../models/TimeRange';
import { repeatablesToDayOccurrencesInTimeRange, repeatablesToFindNextDay } from '../../models/Repeatable';
import CalendarDay from '../CalendarDay';
import './App.scss';
import data from '../../.local/data.json';

// TODO: Show calendar like items!? Big day and 3 letters month

const App = () => {
  const [items, setItems] = React.useState<any[]>([]);
  const [totalExpensesBeforeNextIncome, setTotalExpensesBeforeNextIncome] = React.useState<number>(0);
  const [weeksAfter, setWeeksAfter] = React.useState<number>(1);

  React.useEffect(() => {
    const today = new Today();
    const nextIncomeDay = repeatablesToFindNextDay(data.incomes, today.day);
    const timeRangeBeforeNextIncome = timeRangeFromDays(today.day, nextIncomeDay);
    const timeRange = extendTimeRange(timeRangeBeforeNextIncome, 1, weeksAfter);

    const expenses = repeatablesToDayOccurrencesInTimeRange(data.expenses, timeRange, (expense, day) => {
      const isAccented = doesTimeRangeIncludesDate(day.date, timeRangeBeforeNextIncome);
      return new Expense(day, expense.name, expense.price, isAccented);
    });

    const incomes = repeatablesToDayOccurrencesInTimeRange(data.incomes, timeRange, (income, day) => {
      const isAccented = doesTimeRangeIncludesDate(day.date, timeRangeBeforeNextIncome);
      return new Income(day, income.name, isAccented);
    });

    setTotalExpensesBeforeNextIncome(
      expenses
        .filter((expense) => doesTimeRangeIncludesDate(expense.day.date, timeRangeBeforeNextIncome))
        .reduce((total, expense) => total + expense.price, 0)
    );

    setItems(
      [today, ...expenses, ...incomes].sort(sortDayOccurrencesChronologically)
    );
  }, [weeksAfter]);

  const showMoreButtonClickHandler = () => {
    setWeeksAfter((prev) => prev + 1);
  };

  return (
    <div className="App"> {/*TODO: Use cn()*/}
      <ul>
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

const getItemRenderer = (item: any, totalExpensesBeforeNextIncome: number): React.ReactNode => {
  if (item instanceof Today) {
    const today = item as Today;
    return <h2><CalendarDay date={today.day.date} type="today" /> TODAY (need to have {totalExpensesBeforeNextIncome.toFixed(2)})</h2>
  }

  if (item instanceof Expense) {
    const expense = item as Expense;
    return <div style={{
      color: expense.isAccented ? 'darkred' : 'gray',
      background: expense.isAccented ? '#fee' : 'none'
    }}><CalendarDay date={expense.day.date} type="expense" inactive={!expense.isAccented} /> {expense.name} -{expense.price.toFixed(2)}</div>
  }

  if (item instanceof Income) {
    const income = item as Income;
    return <h3 style={{ color: 'green' }}><CalendarDay date={income.day.date} type="income" inactive={!income.isAccented} /> {income.name}</h3>
  }

  return undefined;
};
