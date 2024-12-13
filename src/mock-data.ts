import { BooleanNumber, IWorkbookData, LocaleType } from '@univerjs/core';

export const spreadsheetData: IWorkbookData = {
  id: 'workbook-01',
  locale: LocaleType.ZH_CN,
  name: 'universheet',
  sheetOrder: ['sheet-01', 'sheet-02', 'sheet-03'],
  appVersion: '3.0.0-alpha',
  styles: {},
  sheets: {
    'sheet-01': {
      id: 'sheet-01',
      cellData: {
        0: {
          0: {
            v: 'Hello World',
          },
        },
      },
      name: 'sheet1',
      tabColor: 'red',
      hidden: BooleanNumber.FALSE,
      rowCount: 1000,
      columnCount: 20,
      defaultColumnWidth: 93,
      defaultRowHeight: 27,
      showGridlines: 1,
      rowHeader: {
        width: 46,
        hidden: BooleanNumber.FALSE,
      },
      columnHeader: {
        height: 20,
        hidden: BooleanNumber.FALSE,
      },
      rightToLeft: BooleanNumber.FALSE,
    },
    'sheet-02': {
      id: 'sheet-02',
      name: 'sheet2',
      cellData: {},
    },
    'sheet-03': {
      id: 'sheet-03',
      name: 'sheet3',
      cellData: {},
    },
  },
};
