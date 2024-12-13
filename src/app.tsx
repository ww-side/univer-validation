import React from 'react';
import { Spreadsheet } from '~/spreadsheet';
import { spreadsheetData } from '~/mock-data';

export const App: React.FC = () => {
  const spreadsheetRef = React.useRef();

  return <Spreadsheet ref={spreadsheetRef} data={spreadsheetData} />;
};
