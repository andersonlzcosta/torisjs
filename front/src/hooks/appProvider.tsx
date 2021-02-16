import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AuthProvider } from './auth';
import { AbrigoHookProvider } from '../hooks/AbrigoHook';
import { ToastProvider } from '../hooks/toast';


const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + '/graphql',
  cache: new InMemoryCache(),
});


const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <AbrigoHookProvider>
        <ToastProvider>{children}</ToastProvider>
      </AbrigoHookProvider>
    </AuthProvider>
  </ApolloProvider>
)

export default AppProvider;
