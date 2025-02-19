import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Genera un archivo PDF con los datos proporcionados.
 * @param {Array} data - Datos a incluir en el PDF.
 * @param {string} title - Título del documento.
 */
export function generarPDF(data, title) {
  console.log('Fecha original:', data[0]?.fecha);
  console.log('Tipo de fecha:', typeof data[0]?.fecha);
  console.log('Datos recibidos:', data[0]); // Para ver el formato de los datos
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(12);
  doc.setTextColor(99);

  // Definir las columnas de la tabla actualizadas
  const columns = [
    { header: "ID", dataKey: "id" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Operación", dataKey: "operacion" },
    { header: "Usuario", dataKey: "usuario" },
    { header: "Módulo", dataKey: "modulo" },
    { header: "Detalle", dataKey: "detalle" },
  ];
  // Mapeo de datos con la nueva estructura
  const rows = data.map((item) => {
    let formattedDate;
    try {
      if (!item.fecha) {
        formattedDate = 'Fecha no disponible';
      } else {
        const rawDate = item.fecha.replace('T', ' ').split('.')[0];
        const date = new Date(rawDate);
        
        if (isNaN(date.getTime())) {
          formattedDate = 'Fecha no disponible';
        } else {
          formattedDate = date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
        }
      }
    } catch (error) {
      console.error('Error al formatear fecha:', item.fecha);
      formattedDate = 'Fecha no disponible';
    }

    return {
      id: item.id,
      fecha: formattedDate,
      operacion: item.operacion,
      usuario: item.usuario,
      modulo: item.modulo,
      detalle: item.detalle,
    };
  });
  // Generar la tabla en el PDF
  doc.autoTable({
    head: [columns.map((col) => col.header)],
    body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    startY: 30,
    styles: {
      fontSize: 10,
      cellPadding: 2,
    },
    columnStyles: {
      detalle: { cellWidth: 60 },
    },
  });

  // Guardar el PDF
  doc.save(`${title}.pdf`);
}
