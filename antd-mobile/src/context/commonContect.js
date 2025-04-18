import React, { createContext, useState, useEffect } from 'react';

export const commonContext = createContext();

export const commonProvider = ({ children }) => {

  return (
    <commonContext.Provider value={{ }}>
      {children}
    </commonContext.Provider>
  );
};
