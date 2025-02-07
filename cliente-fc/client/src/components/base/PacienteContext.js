import React, { createContext, useContext, useState, useEffect } from 'react';

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [selectedPaciente, setSelectedPaciente] = useState(() => {
    return localStorage.getItem('selectedPaciente') || null;
  });

  useEffect(() => {
    if (selectedPaciente) {
      localStorage.setItem('selectedPaciente', selectedPaciente);
    } else {
      localStorage.removeItem('selectedPaciente');
    }
  }, [selectedPaciente]);

  return (
    <PacienteContext.Provider value={{ selectedPaciente, setSelectedPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePacienteContext = () => useContext(PacienteContext);