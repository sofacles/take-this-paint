import {
  Dispatch,
  useState,
  SetStateAction,
  PropsWithChildren,
  createContext,
} from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const initialState: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
