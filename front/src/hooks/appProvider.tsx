import React from 'react';
import { AbrigoHookProvider } from '../hooks/AbrigoHook';
import { ToastProvider } from '../hooks/toast';

const AppProvider: React.FC = ({ children }) => (
  <AbrigoHookProvider>
    <ToastProvider>{children}</ToastProvider>
  </AbrigoHookProvider>
)

export default AppProvider;
