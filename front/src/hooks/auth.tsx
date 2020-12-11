import { gql, useMutation } from '@apollo/client';
import React, { createContext, useCallback, useState, useContext } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface creadentialsData {
  email: string;
  password: string;
}


interface ILoginResponse {
  login: {
    user: {
      id: string;
      nome: string;
      email: string;
    }
  }
}

const LOGIN = gql`
  mutation UserLogin($email: String!) {
    login(email: $email) {
      user {
        id,
        nome,
        email
      }
    }
  }
`;

interface AuthContextData {
  user: User;
  signIn(credentials: creadentialsData): Promise<void>;
  signOut(): void;
  // updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [userLogin] = useMutation<ILoginResponse>(LOGIN);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RedeAbrigo:token');
    const user = localStorage.getItem('@RedeAbrigo:user');

    if (token && user) {
      // validar token
      // api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await userLogin({ variables: { email } });

    if (!response.data) {
      throw new Error('request not sent');
    }

    if (response.data.login.user == null) {
      throw new Error('usuário não encontrado');
    }

    /// (LINHA ABAIXO) alem do usuario tambem tem que pegar o token
    const { user } = response.data.login;

    localStorage.setItem('@RedeAbrigo:user', JSON.stringify(user));

    /// valida o token (PREENCHER)

    setData({ token: "fasdf", user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RedeAbrigo:token');
    localStorage.removeItem('@RedeAbrigo:user');

    setData({} as AuthState);
  }, []);

  // const updateUser = useCallback((user: User) => {
  //   localStorage.setItem('@GoBarber:user', JSON.stringify(user));

  //   if (process.env.REACT_APP_API_URL && user.avatar_url.includes('undefined')) {
  //     let appUrl: string = process.env.REACT_APP_API_URL;
  //     user.avatar_url = user.avatar_url.replace('undefined/', appUrl);
  //   }

  //   setData({
  //     token: data.token,
  //     user,
  //   });
  // }, [data.token, setData]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
