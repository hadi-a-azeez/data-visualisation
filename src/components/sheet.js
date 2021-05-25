import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <button
      style={{
        backgroundColor: "#fd7670",
        color: "white",
        borderRadius: "4px",
        padding: "1rem 0.5rem",
        width: "20%",
        marginTop: "5px",
      }}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export csv
    </button>
  );
};
