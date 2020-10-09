import React, { createContext, useState, useContext } from 'react';
import { IAbrigosData } from '../components/AbrigoForm';


interface AbrigoContextData {
  hookAbrigo: IAbrigosData;
  setHookAbrigo: (abrigoObject: IAbrigosData) => void;
}

const AbrigoContext = createContext<AbrigoContextData>({} as AbrigoContextData);

const AbrigoHookProvider: React.FC = ({ children }) => {

  const [hookAbrigo, setHookAbrigo] = useState<IAbrigosData>({} as IAbrigosData);

  return (
    <AbrigoContext.Provider value={{ hookAbrigo, setHookAbrigo }}>
      {children}
    </AbrigoContext.Provider>
  )
}

function useAbrigo(): AbrigoContextData {
  const context = useContext(AbrigoContext);

  if (!context) {
    throw new Error('The context must be used within an the Provider');
  }

  return context;
}

export { useAbrigo, AbrigoHookProvider }
