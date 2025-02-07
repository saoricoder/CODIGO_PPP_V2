import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Button } from '@mui/material';

const PDFReportGenerator = ({ paciente = {}, terapias = [] }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    const addRect = (x, y, w, h, color) => {
      doc.setFillColor(...color);
      doc.rect(x, y, w, h, 'F');
    };
    
    const addBorderedRect = (x, y, w, h, color) => {
      addRect(x, y, w, h, color);
      doc.setDrawColor(0);
      doc.rect(x, y, w, h);
    };
    
    const addText = (text, x, y, maxWidth) => {
      doc.setFontSize(6); // Reduced font size
      doc.text(text, x, y, { maxWidth: maxWidth });
    };
    
    doc.setTextColor(0, 0, 0);
    
    // Patient Information Header
    addBorderedRect(10, 10, 190, 8, [200, 255, 200]);
    addText("ESTABLECIMIENTO", 12, 15, 46);
    addText("NOMBRE", 60, 15, 38);
    addText("APELLIDO", 100, 15, 38);
    addText("SEXO (M/F)", 140, 15, 18);
    addText("N° H.C.I.A.", 160, 15, 18);
    addText("N° HISTORIA CLINICA", 180, 15, 18);
    
    // Patient Information Data
    addBorderedRect(10, 18, 190, 8, [255, 255, 255]);
    addText("Fundación Con Cristo", 12, 23, 46);
    addText(paciente.nombre_paciente || "", 60, 23, 38);
    addText(paciente.apellidos_paciente || "", 100, 23, 38);
    addText(paciente.genero_paciente || "", 140, 23, 18);
    addText(paciente.id_paciente || "", 160, 23, 18);
    addText(paciente.id_paciente || "", 180, 23, 18);
    
    // Main sections
    addBorderedRect(10, 26, 190, 8, [180, 180, 255]);
    addText("1 EVOLUCION", 12, 31, 90);
    addText("2 PRESCRIPCIONES", 107, 31, 90);
    
    // Headers for Evolution and Prescriptions
    addBorderedRect(10, 34, 190, 8, [200, 255, 200]);
    addText("FECHA (DIA/MES/AÑO)", 12, 38, 31);
    addText("HORA", 45, 38, 18);
    addText("NOTAS DE EVOLUCION", 65, 38, 38);
    addText("FARMACOTERAPIA E INDICACIONES", 107, 38, 69);
    addText("FIRMA AL PIE DE CADA", 178, 38, 20);
    addText("PARA ENFERMERIA Y OTRO PERSONAL", 107, 41, 69);
    addText("PRESCRIPCIÓN", 178, 41, 20);
    
    // Data rows with side borders
    let y = 42;
    terapias.forEach((terapia, index) => {
      const date = new Date(terapia.fecha_hora);
      const dateString = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeString = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      
      const notasHeight = Math.max(
        doc.getTextDimensions(terapia.notas_evolucion || "", { maxWidth: 38 }).h,
        doc.getTextDimensions(terapia.farmacoterapia_indicaciones || "", { maxWidth: 69 }).h
      );
      
      const rowHeight = Math.max(8, notasHeight + 2);
      
      addBorderedRect(10, y, 190, rowHeight, [255, 255, 255]);
      addText(dateString, 12, y + 4, 31);
      addText(timeString, 45, y + 4, 18);
      addText(terapia.notas_evolucion || "", 65, y + 4, 38);
      addText(terapia.farmacoterapia_indicaciones || "", 107, y + 4, 69);
      
      y += rowHeight;
    });
    
    // Add vertical lines
    doc.line(10, 34, 10, y);
    doc.line(43, 34, 43, y);
    doc.line(63, 34, 63, y);
    doc.line(105, 26, 105, y);
    doc.line(176, 34, 176, y);
    doc.line(200, 34, 200, y);
    
    doc.save("patient_report.pdf");
  };

  return (
    <Button variant="contained" color="primary" onClick={generatePDF}>
      Generar Informe de Terapias
    </Button>
  );
};

export default PDFReportGenerator;