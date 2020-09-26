import React, { useCallback, useState } from 'react';
import { Container } from './styles';

import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';

interface IAvailableTabs {
  name: '/estatisticas' | '/todos' | '/novo';
}

const Profissionais: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<IAvailableTabs>({ name: '/estatisticas' });

  const handleTabChange = useCallback((tabPath: IAvailableTabs) => {
    setCurrentTab({ name: tabPath.name });
  }, [setCurrentTab]);

  return (
    <Container>
      <TopMenu />
      <Tabs
        options={[
          { text: "ver estatísticas", name: "/estatisticas" },
          { text: "ver todos", name: "/todos" },
          { text: "criar novo", name: "/novo" },
        ]}
        onTabChange={handleTabChange}
      />

      {currentTab.name === '/estatisticas' && (
        <p>estatisticas</p>
      )}

      {currentTab.name === '/todos' && (
        <p>todos</p>
      )}

      {currentTab.name === '/novo' && (
        <p>novo</p>
      )}


      <Navbar />
    </Container>
  );
}

export default Profissionais;