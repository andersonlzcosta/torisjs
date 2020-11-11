import React from 'react';
import { AuthProvider } from './auth';
import { AbrigoHookProvider } from '../hooks/AbrigoHook';
import { ToastProvider } from '../hooks/toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AbrigoHookProvider>
      <ToastProvider>{children}</ToastProvider>
    </AbrigoHookProvider>
  </AuthProvider>
)

export default AppProvider;
