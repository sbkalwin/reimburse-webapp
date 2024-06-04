import { saveAs } from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

export interface UseJsonToExcelProps<T> {
  data: T[];
  filename?: string;
}

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

export default function useJsonToExcel<T>(props: UseJsonToExcelProps<T>) {
  const { data, filename = 'data' } = props;
  const onExport = React.useCallback(async () => {
    try {
      //create sheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      //create file
      const workbook = XLSX.utils.book_new();
      //add sheet into file
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      const blob = new Blob([excelBuffer], {
        type: EXCEL_TYPE,
      });

      saveAs(blob, filename + EXCEL_EXTENSION);
    } catch (e) {
      console.error(e);
    }
  }, [data, filename]);

  return onExport;
}
