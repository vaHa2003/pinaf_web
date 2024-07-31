import React, { createContext, useEffect, useState } from "react";

// Tạo context  loader
const LoaderContext = createContext();

function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <LoaderContext.Provider value={loading}>{children}</LoaderContext.Provider>
  );
}

export { LoaderContext, LoaderProvider };
