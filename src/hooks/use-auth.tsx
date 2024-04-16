import {
  EmployeeModel,
  EmployeeRoleEnum,
} from 'modules/user/components/user-form-type';
import React from 'react';

export const AUTH_KEY = 'auth-key';

export function getAuth(): EmployeeModel | undefined {
  if (typeof window === 'undefined') return;
  const result = localStorage.getItem(AUTH_KEY);
  return result ? JSON.parse(result) : undefined;
}

export function setAuth(value: EmployeeModel | undefined) {
  if (typeof window === 'undefined') return;
  if (value === undefined) {
    localStorage.removeItem(AUTH_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(value));
}

export interface AuthContextProps {
  user: EmployeeModel | undefined;
  handleUser: (value: EmployeeModel | undefined) => void;
  isUser: boolean;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  handleUser: () => {},
  user: undefined,
  isAdmin: false,
  isUser: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState<EmployeeModel | undefined>(undefined);
  const handleUser = React.useCallback((value: EmployeeModel | undefined) => {
    setUser(value);
    setAuth(value);
  }, []);

  const isAdmin = user?.peran === EmployeeRoleEnum.admin;
  const isUser = user?.peran === EmployeeRoleEnum.user;

  //sync when open
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const auth = getAuth();
    setUser(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleUser,
        user,
        isAdmin,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}
