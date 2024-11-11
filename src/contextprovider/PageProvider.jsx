// PageViewContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for dompType
export const PageViewContext = createContext();

// Create a provider component
export const PageViewProvider = ({ children }) => {
  const [pageView, setPageView] = useState('Default');

  return (
    <PageViewContext.Provider value={{ pageView, setPageView }}>
      {children}
    </PageViewContext.Provider>
  );
};

// Custom hook to use the PageView context
export const usePageView = () => useContext(PageViewContext);
