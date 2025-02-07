import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Button } from '@mui/material';
import LogoImage from '../assets/img/logo-fcc.png';

const PDFGenerator = ({ atencion, historia, paciente, personalSalud, signosVitales }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Funciones auxiliares
    const addLine = (y) => doc.line(10, y, 200, y);
    const addTitle = (text, y) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text(text, 10, y);
      addLine(y + 1);
    };

    // Función para asegurar que una sección no se divida entre páginas
    const ensureSpace = (height) => {
      const pageHeight = doc.internal.pageSize.height;
      if (doc.lastAutoTable && doc.lastAutoTable.finalY + height > pageHeight - 20) {
        doc.addPage();
        return 20; // Margen superior en la nueva página
      }
      return doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60;
    };

    // Añadir logo
    const logoUrl = LogoImage;
    doc.addImage(logoUrl, 'PNG', 10, 10, 20, 20);

    // Título
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("Reporte de Atención Médica", 50, 25);

    // Información del paciente y atención
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Paciente: ${paciente.nombre_paciente} ${paciente.apellidos_paciente}`, 50, 35);
    doc.text(`Fecha: ${new Date(atencion.fecha_atencion).toLocaleDateString()}`, 140, 35);
    doc.text(`Personal de Salud: ${personalSalud.nombres_personal} ${personalSalud.apellidos_personal}`, 140, 40);

    addLine(45);

    // Datos del paciente
    addTitle("Datos del Paciente", 55);

    const pacienteData = [
      ["Nombre", paciente.nombre_paciente, "Apellido", paciente.apellidos_paciente],
      ["Nacionalidad", paciente.nacionalidad_paciente, "Tipo DNI", paciente.tipo_dni_paciente],
      ["DNI", paciente.dni_paciente, "Dirección", paciente.direccion_paciente],
      ["Teléfono", paciente.telefono_paciente, "Email", paciente.email_paciente],
      ["Tipo de Sangre", paciente.tiposangre_paciente, "Edad", paciente.edad_paciente.toString()],
      ["Fecha de Nacimiento", new Date(paciente.fecha_paciente).toLocaleDateString(), "Género", paciente.genero_paciente],
      ["Familiar Cuidador", paciente.familiar_cuidador, "Parentesco", paciente.parentesco_familiar],
      ["Teléfono Cuidador", paciente.telefono_cuidador, "", ""]
    ];

    doc.autoTable({
      startY: 60,
      body: pacienteData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [240, 240, 240], cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { fontStyle: 'bold', fillColor: [240, 240, 240], cellWidth: 40 },
        3: { cellWidth: 50 }
      },
      columns: [
        { header: '', dataKey: 'attribute1' },
        { header: '', dataKey: 'value1' },
        { header: '', dataKey: 'attribute2' },
        { header: '', dataKey: 'value2' }
      ],
      margin: { left: 10, right: 10 }
    });

    // Signos vitales
    let startY = ensureSpace(60);
    addTitle("Signos Vitales", startY);
    const signosVitalesData = [
      ['Presión Arterial', signosVitales.presion_arterial || 'No registrado'],
      ['Frecuencia Cardíaca', signosVitales.pulso || 'No registrado'],
      ['Temperatura', signosVitales.temperatura || 'No registrado'],
      ['Peso', signosVitales.peso || 'No registrado'],
      ['Talla', signosVitales.talla || 'No registrado']
    ];
    doc.autoTable({
      startY: startY + 5,
      head: [['Signo', 'Valor']],
      body: signosVitalesData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 40 } },
      margin: { left: 10, right: 10 }
    });

    // Motivo de consulta y problema actual
    startY = ensureSpace(40);
    addTitle("Motivo de Consulta y Problema Actual", startY);
    const motivoProblemaData = [
      ["Motivo", atencion.motivo_consulta || 'No especificado'],
      ["Problema", atencion.problema_actual || 'No especificado']
    ];
    doc.autoTable({
      startY: startY + 5,
      body: motivoProblemaData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [240, 240, 240], cellWidth: 50 },
        1: { cellWidth: 130 }
      },
      columns: [
        { header: '', dataKey: 'attribute' },
        { header: '', dataKey: 'value' }
      ],
      margin: { left: 10, right: 10 }
    });

    // Revisión Actual del Sistema
    startY = ensureSpace(60);
    addTitle("Revisión Actual del Sistema", startY);
    const revisionData = (typeof atencion.revision_actual_sistema === 'string' ? JSON.parse(atencion.revision_actual_sistema) : atencion.revision_actual_sistema)
      .filter(item => item.cpChecked)
      .map(item => [item.organ, item.description || 'Sin descripción']);
    doc.autoTable({
      startY: startY + 5,
      head: [['Órgano', 'Descripción']],
      body: revisionData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 150 } },
      margin: { left: 10, right: 10 }
    });

    // Examen Físico
    startY = ensureSpace(60);
    addTitle("Examen Físico", startY);
    const examenData = (typeof atencion.examen_fisico === 'string' ? JSON.parse(atencion.examen_fisico) : atencion.examen_fisico)
      .filter(item => item.cpChecked)
      .map(item => [item.region, item.description || 'Sin descripción']);
    doc.autoTable({
      startY: startY + 5,
      head: [['Región', 'Descripción']],
      body: examenData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 150 } },
      margin: { left: 10, right: 10 }
    });

    // Plan de Tratamiento
    startY = ensureSpace(40);
    addTitle("Plan de Tratamiento", startY);
    const planTratamientoData = [
    ["Plan de Tratamiento", atencion.plan_tratamiento || 'No especificado']
    ];
    doc.autoTable({
    startY: startY + 5,
    body: planTratamientoData,
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
        0: { fontStyle: 'bold', fillColor: [240, 240, 240], cellWidth: 50 },
        1: { cellWidth: 130 }
    },
    columns: [
        { header: '', dataKey: 'attribute' },
        { header: '', dataKey: 'value' }
    ],
    margin: { left: 10, right: 10 }
    });

    // Prescripciones
    startY = ensureSpace(60);
    addTitle("Prescripciones", startY);
    const prescripcionesData = (typeof atencion.prescripciones === 'string' ? JSON.parse(atencion.prescripciones) : atencion.prescripciones)
      .map(item => [item.medicamento, item.presentacion, item.dosis]);
    doc.autoTable({
      startY: startY + 5,
      head: [['Medicamento', 'Presentación', 'Dosis']],
      body: prescripcionesData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 10, right: 10 }
    });

    // Diagnóstico
    startY = ensureSpace(60);
    addTitle("Diagnóstico", startY);
    const diagnosticoData = (typeof atencion.diagnostico === 'string' ? JSON.parse(atencion.diagnostico) : atencion.diagnostico)
      .map(item => [item.enfermedad, item.tipoEnfermedad, item.codigoEnfermedad]);
    doc.autoTable({
      startY: startY + 5,
      head: [['Enfermedad', 'Tipo', 'Código']],
      body: diagnosticoData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 10, right: 10 }
    });

    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, 100, 290, null, null, 'center');
    }

    const pdfBlob = doc.output('blob');
    
    // Creamos una URL a partir del Blob
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Abrimos una nueva pestaña con el PDF
    window.open(blobUrl, '_blank');

    // Liberamos la URL del objeto después de un breve delay para asegurar que se haya abierto
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  };

  return (
    <Button variant="contained" color="primary" onClick={generatePDF}>
      Generar Informe
    </Button>
  );
};

export default PDFGenerator;