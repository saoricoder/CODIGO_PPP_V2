import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Genera un archivo PDF con los datos proporcionados.
 * @param {Array} data - Datos a incluir en el PDF.
 * @param {string} title - Título del documento.
 */
export function generarPDF(data, title) {
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
  const rows = data.map((item) => ({
    id: item.id,
    fecha: new Date(item.fecha).toLocaleString(),
    operacion: item.operacion,
    usuario: item.usuario,
    modulo: item.modulo,
    detalle: item.detalle,
  }));

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
