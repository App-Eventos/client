import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    //Almacena la información del usuario, que se obtiene del localStorage al cargar la aplicación. Si no hay usuario almacenado, se inicializa como null.
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated:
      localStorage.getItem("isAuthenticated") === "true" || false,
  });

  useEffect(() => {
    console.log("Estado actualizado:", state); // Verifica que el estado se actualice correctamente
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isAuthenticated", state.isAuthenticated.toString());
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
