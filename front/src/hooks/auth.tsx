import React, { createContext, useCallback, useState, useContext } from 'react';

export enum credencial {
  Admin = "Admin",
  AbrigoAdmin = "AbrigoAdmin",
  Aluno = "Aluno"
}

interface User {
  id: string;
  nome: string;
  credencial: credencial;
  abrigo: {
    id: number;
  }
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  assignSession({ token, user }: AuthState): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RedeAbrigo:token');
    const user = localStorage.getItem('@RedeAbrigo:user');

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  });

  const assignSession = useCallback(({ token, user }) => {
    localStorage.setItem('@RedeAbrigo:user', JSON.stringify(user));
    localStorage.setItem('@RedeAbrigo:token', JSON.stringify(token));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RedeAbrigo:token');
    localStorage.removeItem('@RedeAbrigo:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, assignSession, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The context must be used within an Auth Provider');
  }

  return context;
}

export { useAuth, AuthProvider }
