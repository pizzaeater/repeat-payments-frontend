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
import { useGoogleApi, useGoogleApiConnect, useGoogleCalendarExport } from '../../hooks/useGoogleApi';
import './App.scss';
import data from '../../.local/data.json';

const cn = createCn('App');

const App: React.FC = () => {
  const [weeksAfter, setWeeksAfter] = React.useState<number>(2);
  const [exp, setExp] = React.useState<Expense[]>([]);
  const [items, setItems] = React.useState<(Identifiable)[]>([]);
  const [totalExpensesBeforeNextIncome, setTotalExpensesBeforeNextIncome] = React.useState<number>(0);
  const googleApiLoaded = useGoogleApi();
  const [googleApiConnected, googleApiConnect] = useGoogleApiConnect();
  const exportToCalendar = useGoogleCalendarExport();

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

    const newItems = [today, ...expenses, ...incomes]
      .sort(sortDayOccurrencesChronologically)
      .flatMap((occurrence, i, arr) => {
        if (i === 0 || arr[i - 1].day.date.getMonth() === occurrence.day.date.getMonth()) {
          return [occurrence];
        }

        return [new MonthSeparator(occurrence.day), occurrence];
      });

    setItems(newItems);
    setExp(expenses); // TODO: Migrate to Zustand?
  }, [weeksAfter]);

  const showMoreButtonClickHandler = () => {
    setWeeksAfter((prev) => prev + 1);
  };

  return (
    <div className={cn()}>
      {googleApiLoaded && (
        <>
          {googleApiConnected && (
            <>
              <h2>Connected!</h2>
              <button type="button" onClick={() => exportToCalendar(exp)}>Export</button>
            </>
          )}
          {!googleApiConnected && (
            <button type="button" onClick={googleApiConnect}>Connect to Google Calendar</button>
          )}
        </>
      )}

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
