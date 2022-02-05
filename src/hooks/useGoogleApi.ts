import React from 'react';
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

export const useGoogleCalendarExport = (): () => void => {
  console.log('>>> useGoogleCalendarExport');

  // TODO: useCallback?
  return async () => {
    const insertCalendarResponse = await gapi.client.request({
      method: 'post',
      path: 'calendar/v3/calendars',
      body: { summary: `My payments ${new Date().toISOString()}` },
    });

    const calendarId = JSON.parse(insertCalendarResponse.body).id;
    console.log('calendarId', calendarId);

    const insertEventResponse = await gapi.client.request({
      method: 'post',
      path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      body: {
        summary: 'Hi from Evgeny',
        transparency: 'transparent',
        start: { date: '2022-02-06' },
        end: { date: '2022-02-06' },
      },
    });

    console.log('insertEventResponse', insertEventResponse);

    // gapi.client.request({
    //   method: 'get',
    //   path: 'calendar/v3/users/me/calendarList',
    // })
    //   .then((res) => {
    //     console.log('calendarList', res);
    //   });
  };
};
