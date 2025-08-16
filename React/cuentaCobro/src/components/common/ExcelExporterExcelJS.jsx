import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Button from 'react-bootstrap/Button';

const ExcelExporterExcelJS = ({
  buttonId,
  datos = [],
  plantilla = "front/plantilla.xlsx",
  columnas = [],
  filaInicio = 5,
  nombreArchivo = "reporte.xlsx",
  nombreHoja = null,
  children,
}) => {
  const exportar = async () => {
    try {
      // 1. Cargar la plantilla
      const response = await fetch(plantilla);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = nombreHoja
        ? workbook.getWorksheet(nombreHoja)
        : workbook.worksheets[0];

      // --- PASO 1: LEER y GUARDAR el footer ---
      // IMPORTANTE: Ajusta estos valores a tu plantilla
      const filaFooterStart = filaInicio + 1;
      const numFilasFooter = 3;
      
      const footerRowsData = [];
      for (let i = 0; i < numFilasFooter; i++) {
        const sourceRow = worksheet.getRow(filaFooterStart + i);
        if (sourceRow) {
          const rowData = {
            values: sourceRow.values,
            height: sourceRow.height,
            cellStyles: {}
          };
          sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData.cellStyles[colNumber] = cell.style;
          });
          footerRowsData.push(rowData);
        }
      }
      
      // --- PASO 2: ELIMINAR el footer de la hoja ---
      if (footerRowsData.length > 0) {
        worksheet.spliceRows(filaFooterStart, numFilasFooter);
      }
      
      // --- PASO 3: INSERTAR y LLENAR los datos ---
      // Insertar el número de filas vacías necesarias
      const numFilasDatos = datos.length;
      if (numFilasDatos > 1) {
        worksheet.spliceRows(filaInicio, 0, new Array(numFilasDatos - 1).fill([]));
      }

      // Rellenar las filas con los datos y estilos
      datos.forEach((fila, i) => {
        const rowNumber = filaInicio + i;
        const rowExcel = worksheet.getRow(rowNumber);
        
        columnas.forEach((col, j) => {
          const cell = rowExcel.getCell(j + 1);
          cell.value = fila[col.key];

          cell.style.border = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
          };
        });
        rowExcel.commit();
      });

      // --- PASO 4: REINSERTAR el footer al final de los datos ---
      const newFooterStart = filaInicio + numFilasDatos;
      footerRowsData.forEach((rowData, i) => {
        const newRow = worksheet.insertRow(newFooterStart + i, rowData.values);
        newRow.height = rowData.height;
        Object.keys(rowData.cellStyles).forEach(colNumber => {
          newRow.getCell(parseInt(colNumber)).style = rowData.cellStyles[colNumber];
        });
      });

      // --- PASO 5: Crear blob para descargar ---
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, nombreArchivo);
      
    } catch (error) {
      console.error("Error exportando Excel con ExcelJS:", error);
    }
  };

  return (
    <div className="d-flex justify-content-start">
  <Button id={buttonId}  variant="success" onClick={exportar}>{children || "Exportar con Formato"}</Button>
    </div>
   
  );
};

export default ExcelExporterExcelJS;