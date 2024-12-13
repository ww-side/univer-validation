import '@univerjs/design/lib/index.css';
import '@univerjs/ui/lib/index.css';
import '@univerjs/docs-ui/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';

import type { IWorkbookData, UnitModel } from '@univerjs/core';
import type { FUniver } from '@univerjs/facade';
import React from 'react';

import { destroySpreadsheet, getData, initSpreadsheet } from './helpers';

export const Spreadsheet = React.forwardRef(
  (
    {
      data,
    }: {
      data: IWorkbookData;
    },
    ref,
  ) => {
    const spreadsheetRef = React.useRef<FUniver | null>(null);
    const workbookRef = React.useRef<UnitModel<object, number> | null>(null);
    const containerRef = React.useRef(null);

    const getActiveWorkBookData = React.useCallback(() => {
      const activeWorkbook = spreadsheetRef?.current?.getActiveWorkbook();
      return activeWorkbook?.save();
    }, []);

    React.useImperativeHandle(ref, () => ({
      getActiveWorkBookData,
      getData,
    }));

    React.useEffect(() => {
      initSpreadsheet({ containerRef, spreadsheetRef, data });

      return () => {
        destroySpreadsheet({ spreadsheetRef, workbookRef });
      };
    }, [data]);

    return (
      <div
        ref={containerRef}
        style={{ height: '89vh', width: '100%', overflow: 'hidden' }}
      />
    );
  },
);

Spreadsheet.displayName = 'Spreadsheet';
