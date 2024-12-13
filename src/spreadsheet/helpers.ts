import {
  IWorkbookData,
  LocaleType,
  type UnitModel,
  Univer,
  UniverInstanceType,
} from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { FUniver } from '@univerjs/facade';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';
import type React from 'react';

import '@univerjs/sheets-data-validation-ui/lib/index.css';
import '@univerjs/sheets-data-validation/facade';
import { UniverDataValidationPlugin } from '@univerjs/data-validation';
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation';
import { UniverSheetsDataValidationUIPlugin } from '@univerjs/sheets-data-validation-ui';

export const initSpreadsheet = ({
  containerRef,
  spreadsheetRef,
  data = {},
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  spreadsheetRef: React.MutableRefObject<FUniver | null>;
  data: Partial<IWorkbookData>;
}) => {
  if (!containerRef.current) {
    throw Error('container not initialized');
  }
  const spreadsheet = new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    locales: {},
  });
  spreadsheetRef.current = FUniver.newAPI(spreadsheet);

  spreadsheet.registerPlugin(UniverRenderEnginePlugin);
  spreadsheet.registerPlugin(UniverUIPlugin, {
    container: containerRef.current,
    toolbar: false,
    footer: false,
    header: false,
    contextMenu: false,
  });

  spreadsheet.registerPlugin(UniverDocsPlugin, {
    hasScroll: false,
  });
  spreadsheet.registerPlugin(UniverDocsUIPlugin);

  spreadsheet.registerPlugin(UniverSheetsPlugin);
  spreadsheet.registerPlugin(UniverSheetsUIPlugin);

  spreadsheet.registerPlugin(UniverDataValidationPlugin);
  spreadsheet.registerPlugin(UniverSheetsDataValidationPlugin);
  spreadsheet.registerPlugin(UniverSheetsDataValidationUIPlugin, {
    showEditOnDropdown: true,
  });

  const sheet = spreadsheetRef?.current?.getActiveWorkbook()?.getActiveSheet();
  const ranges = sheet?.getRange(0, 0, 10, 10);

  const dataValidationBuilder = FUniver.newDataValidation();
  const dataValidation = dataValidationBuilder
    .requireNumberBetween(-Infinity, Infinity)
    .build();
  ranges?.setDataValidation(dataValidation);

  spreadsheet.createUnit(UniverInstanceType.UNIVER_SHEET, data);
};

export const destroySpreadsheet = ({
  spreadsheetRef,
  workbookRef,
}: {
  spreadsheetRef: React.MutableRefObject<FUniver | null>;
  workbookRef: React.MutableRefObject<UnitModel<object, number> | null>;
}) => {
  spreadsheetRef.current = null;
  workbookRef.current = null;
};

export const getData = (
  workbookRef: React.MutableRefObject<UnitModel<object, number> | null>,
) => {
  if (!workbookRef.current) {
    throw new Error('Workbook is not initialized');
  }
};
