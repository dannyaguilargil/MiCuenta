import logoImsalud from "../assets/logocompleto.webp"

const configDatatable = {
  responsive: true, // Hace la tabla responsiva
  paging: true, // Habilita la paginación
  searching: true, // Habilita la búsqueda
  ordering: true, // Habilita el ordenamiento
  info: true, // Muestra información de la tabla
  buttons: ['excel', 'pdf'], // botones de exportación
  // scrollX: true,
  scrollY: false, // Desactiva el scroll vertical
  dom: '<"custom-header-container d-flex flex-wrap justify-content-between align-items-center gap-4 mb-2"<"d-flex align-items-center"l><"d-flex justify-content-between align-items-center"f>>rt <"row mt-3 flex-column flex-md-row"<"col mb-2 mb-md-0"i><"col text-md-end"p>> <"d-flex flex-start mt-2" B>',
  destroy: true,
   searchPanes: {
    cascadePanes: true,
    viewTotal: true,
    initCollapsed: true,
    layout: 'columns-5'
  },
  language: {
     searchPanes: {
          clearMessage: 'Limpiar todos',
          collapse: {0: 'Filtros', _: 'Filtros (%d)'},
          title: {
            _: 'Filtros seleccionados - %d',
            0: 'Ningún filtro seleccionado'
          }
        },
    processing: "Procesando...",
    lengthMenu: "Mostrar _MENU_ registros",
    zeroRecords: "No se encontraron resultados",
    emptyTable: "Ningun dato está en la tabla",
    info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    infoFiltered: "(filtrado de un total de _MAX_ registros)",
    search: "Buscar:",
    infoThousands: ",",
    loadingRecords: "Cargando...",
    aria: {
      sortAscending: ": Activar para ordenar la columna de manera ascendente",
      sortDescending: ": Activar para ordenar la columna de manera descendente",
    },
    buttons: {
      copy: "Copiar",
      colvis: "Visibilidad",
    },
    paginate: {
      first: "Primero",
      last: "Último",
      // next: "Siguiente",
      // previous: "Anterior"
    }
    }
};

const configuracionTablaConButton = {
  responsive: true, // Hace la tabla responsiva
  paging: true, // Habilita la paginación
  searching: true, // Habilita la búsqueda
  ordering: true, // Habilita el ordenamiento
  info: true, // Muestra información de la tabla
  buttons: [
  {
    extend: 'excelHtml5',
    text: 'Exportar TODO (incluyendo ocultos)',
    title: 'Reporte_Completo',
    exportOptions: {
      columns: function (idx, data, node) {
        return true;
      },
      modifier: {
        page: 'all'
      }
    }
  },
  {
    extend: 'pdfHtml5',
    text: 'Exportar PDF (todo)',
    orientation: 'landscape', // ← Orientación horizontal
    title: 'Reporte_Completo',
    pageSize: 'A4', 
    exportOptions: {
      columns: function (idx, data, node) {
        return true;
      },
      modifier: {
        page: 'all'
      }
    }
  }
],
  // scrollX: true,
  scrollY: false, // Desactiva el scroll vertical
  dom: '<"custom-header-container d-flex flex-wrap justify-content-between align-items-center gap-4 mb-2"<"d-flex align-items-center"l><"d-flex justify-content-between align-items-center"f>>rt <"row mt-3 flex-column flex-md-row"<"col mb-2 mb-md-0"i><"col text-md-end"p>> <"d-flex flex-start mt-2" B>',
  destroy: true,
   searchPanes: {
    cascadePanes: true,
    viewTotal: true,
    initCollapsed: true,
    layout: 'columns-5'
  },
  language: {
     searchPanes: {
          clearMessage: 'Limpiar todos',
          collapse: {0: 'Filtros', _: 'Filtros (%d)'},
          title: {
            _: 'Filtros seleccionados - %d',
            0: 'Ningún filtro seleccionado'
          }
        },
    processing: "Procesando...",
    lengthMenu: "Mostrar _MENU_ registros",
    zeroRecords: "No se encontraron resultados",
    emptyTable: "Ningun dato está en la tabla",
    info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    infoFiltered: "(filtrado de un total de _MAX_ registros)",
    search: "Buscar:",
    infoThousands: ",",
    loadingRecords: "Cargando...",
    aria: {
      sortAscending: ": Activar para ordenar la columna de manera ascendente",
      sortDescending: ": Activar para ordenar la columna de manera descendente",
    },
    buttons: {
      copy: "Copiar",
      colvis: "Visibilidad",
    },
    paginate: {
      first: "Primero",
      last: "Último",
      // next: "Siguiente",
      // previous: "Anterior"
    }
    }
   
};

export { configDatatable,configuracionTablaConButton };





