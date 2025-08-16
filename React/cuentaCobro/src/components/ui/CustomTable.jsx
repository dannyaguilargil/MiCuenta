import { configDatatable,configuracionTablaConButton } from "../../lib/datatable";
import { useMemo } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import 'datatables.net-buttons-bs5';               // Extensión Buttons (estilos BS5)
import 'datatables.net-buttons/js/buttons.html5.min.js'; // Definiciones de botón HTML5 (Excel/PDF)
import 'datatables.net-buttons/js/buttons.print.min.js'; // Botón de impresión (opcional)
// Estilos CSS de DataTables+Bootstrap 5 y de Buttons BS5:
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';

import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

import 'datatables.net-select-bs5/css/select.bootstrap5.min.css';
import 'datatables.net-searchpanes-bs5/css/searchPanes.bootstrap5.min.css';
import 'datatables.net-select';
import 'datatables.net-select-bs5';
import 'datatables.net-searchpanes';
import 'datatables.net-searchpanes-bs5';

// Módulos de exportación:
import jszip from 'jszip';
window.JSZip = jszip;
import pdfMake from 'pdfmake/build/pdfmake.min.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
// Asignar fuentes a pdfMake
pdfMake.vfs = pdfFonts.vfs;

// import "datatables.net-responsive-dt";
import logoImsalud from "../../assets/logocompleto.webp"
import "./table.css"
import { useRef, useEffect, useState } from "react";

// import { LazyLoadImage } from "react-lazy-load-image-component";


const CustomTable = ({conButtonExcel, columns, data, title, tableId, button, show, configuracionTabla}) => {

  const configuracion = configuracionTabla || configDatatable;

 DataTable.use(DT);
  const tableRef = useRef(null);

  useEffect(() => {
    // Acceder a la instancia de DataTables después de que se monte
    const dtInstance = tableRef.current?.dtInstance;

    // Limpieza al desmontar
    return () => {
      if (dtInstance) {
        dtInstance.destroy(true); // Destruir con limpieza profunda
      }
    };
  }, [data, columns]);

  return (
    <>
      <div className={`table-responsive ${tableId}`}>
        {title && <>
          <center><img className="mb-4" width="150px" height="53.77px" src={logoImsalud} alt="Logo imsalud" /></center>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <h5>{title}</h5>
            {button ? (
              <button className="btnAddEnte btn btn-secondary" type="button" style={{border:"1px solid grey" }} onClick={show}> + </button>
           ) : ""}
          </div></>}
           
        
        <DataTable
          key={`${tableId}`}
          ref={tableRef}
          data={data}
          columns={columns}
          options={conButtonExcel ? configuracionTablaConButton :configuracion}
          className=" responsive order-column"
        >
       
          <thead></thead>
        </DataTable>
      </div>

    </>
  );
};

export default CustomTable;
