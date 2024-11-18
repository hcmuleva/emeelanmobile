import React, { createContext, useContext } from "react";

const PageViewContext = createContext();

export const PageViewProvider = ({ children }) => {
    const pageData = {}; // Add any state or logic

    return (
        <PageViewContext.Provider value={pageData}>
            {children}
        </PageViewContext.Provider>
    );
};

export const usePageView = () => useContext(PageViewContext);
