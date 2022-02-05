/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Expense from '../models/Expense';
import { CLIENT_ID } from '../.local/env';

// Array of API discovery doc URLs for APIs used by the quickstart
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

declare global { // TODO Move from here? Why?
  interface Window {
    onGapiLoad: () => void;
  }
}

export const useGoogleApi = (): boolean => {
  console.log('>>> useGoogleApi');

  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.onGapiLoad = () => {
      function onAuthApiLoad() {
        console.log('> onAuthApiLoad gapi', gapi);

        setLoaded(true);

        // gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPES }, (token) => {
        //   console.log('token', token);
        // });
      }

      gapi.load('client:auth2', onAuthApiLoad);
    };

    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js?onload=onGapiLoad';
    document.body.appendChild(gapiScript);
  }, []);

  return loaded;
};

export const useGoogleApiConnect = (): [boolean, () => void] => {
  console.log('>>> useGoogleApiConnect');

  const [connected, setConnected] = React.useState<boolean>(false);

  // TODO: useCallback?
  return [connected, () => {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
    }, (token) => {
      console.log('token', token);

      setConnected(true);
    });
  }];
};

const encodeDate = (date: Date): string => [
  date.getFullYear(),
  ('00' + (date.getMonth() + 1)).slice(-2), // eslint-disable-line prefer-template
  ('00' + date.getDate()).slice(-2) // eslint-disable-line prefer-template
].join('-');

type A = (_: Expense[]) => void;
export const useGoogleCalendarExport = (): A => {
  console.log('>>> useGoogleCalendarExport');

  // TODO: useCallback?
  return async (expenses: Expense[]) => {
    const insertCalendarResponse = await gapi.client.request({
      method: 'post',
      path: 'calendar/v3/calendars',
      body: { summary: `My payments ${new Date().toISOString()}` },
    });

    const calendarId = JSON.parse(insertCalendarResponse.body).id;
    console.log('calendarId', calendarId);

    // @ts-ignore
    const batch: gapi.client.HttpBatch = gapi.client.newBatch();
    // TODO: Add to declare?

    expenses.forEach((expense) => {
      const formattedDay = encodeDate(expense.day.date);

      const insertEventRequest = gapi.client.request({
        method: 'post',
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        body: {
          summary: `${expense.name} ${expense.price}`,
          transparency: 'transparent',
          start: { date: formattedDay },
          end: { date: formattedDay },
        },
      });
      batch.add(insertEventRequest);
    });

    batch.execute((res) => {
      console.log('batch res', res);
    });
  };
};
