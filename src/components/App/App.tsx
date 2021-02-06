import React from 'react';
import { createCn } from 'bem-react-classname';
import Identifiable from '../../models/Identifiable';
import Today from '../../models/Today';
import Expense from '../../models/Expense';
import Income from '../../models/Income';
import MonthSeparator from '../../models/MonthSeparator';
import { sortDayOccurrencesChronologically } from '../../models/DayOccurrence';
import { doesTimeRangeIncludesDate, extendTimeRange, timeRangeFromDays } from '../../models/TimeRange';
import { repeatablesToDayOccurrencesInTimeRange, repeatablesToFindNextDay } from '../../models/Repeatable';
import { getItemRenderer } from './getItemRenderer';
import './App.scss';
import data from '../../.local/data.json';

const cn = createCn('App');

const App: React.FC = () => {
  const [items, setItems] = React.useState<(Identifiable)[]>([]);
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

    const itemsToSet = [today, ...expenses, ...incomes]
      .sort(sortDayOccurrencesChronologically)
      .flatMap((occurrence, i, arr) => {
        if (i === 0 || arr[i - 1].day.date.getMonth() === occurrence.day.date.getMonth()) {
          return [occurrence];
        }

        return [new MonthSeparator(occurrence.day), occurrence];
      });

    setItems(itemsToSet);
  }, [weeksAfter]);

  const showMoreButtonClickHandler = () => {
    setWeeksAfter((prev) => prev + 1);
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {items.map((item) => (
          <li key={item.id}>
            {getItemRenderer(item, totalExpensesBeforeNextIncome)}
          </li>
        ))}
      </ul>
      <button type="button" onClick={showMoreButtonClickHandler}>Show 1 week more...</button>
    </div>
  );
};

export default App;
