import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState('Menu Principal');

  return (
    <MenuContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);