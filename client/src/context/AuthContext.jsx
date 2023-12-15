import { createContext, useContext, useState } from "react";
import {
  saveData,
  saveToken,
  cleanLocalStorage,
  getData,
  getToken,
} from "../utils";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [username, setUsername] = useState(getData());
  const [token, setToken] = useState(getToken());

  const login = (data, token) => {
    saveData(data);
    saveToken(token);

    setUsername(data);
    setToken(token);
  };

  const logout = () => {
    cleanLocalStorage();

    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
