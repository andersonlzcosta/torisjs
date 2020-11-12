import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface creadentialsData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: creadentialsData): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  // const [data, setData] = useState<AuthState>(() => {
  //   const token = localStorage.getItem('@GoBarber:token');
  //   const user = localStorage.getItem('@GoBarber:user');

  //   if (token && user) {
  //     api.defaults.headers.authorization = `Bearer ${token}`;
  //     return { token, user: JSON.parse(user) }
  //   }

  //   return {} as AuthState;
  // });

  const [data, setData] = useState<AuthState>(() => {
    return {
      token: "temp-token",
      user: {
        id: "1",
        name: "renan",
        email: "email",
        avatar_url: "url"
      }
    }
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    if (process.env.REACT_APP_API_URL && user.avatar_url.includes('undefined')) {
      let appUrl: string = process.env.REACT_APP_API_URL;
      user.avatar_url = user.avatar_url.replace('undefined/', appUrl);
    }

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    if (process.env.REACT_APP_API_URL && user.avatar_url.includes('undefined')) {
      let appUrl: string = process.env.REACT_APP_API_URL;
      user.avatar_url = user.avatar_url.replace('undefined/', appUrl);
    }

    setData({
      token: data.token,
      user,
    });
  }, [data.token, setData]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
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
