import React, { useEffect, useState } from 'react';
import { Container } from './styles';

interface ITabsProps {
  options: ITabElement[];
  onTabChange: (tabName: Omit<ITabElement, 'text'>) => void;
}

interface ITabElement {
  name: '/estatisticas' | '/todos' | '/novo';
  text: string;
}

const Tabs: React.FC<ITabsProps> = ({ options, onTabChange }) => {
  const [tabList, setTabList] = useState<ITabElement[]>();

  useEffect(() => {
    setTabList(options);
  }, [options]);

  return (
    <Container>
      {tabList && tabList.map(tab => (
        <button key={tab.name} onClick={() => onTabChange({ name: tab.name })}>
          {tab.text}
        </button>
      ))}
    </Container>
  );
}

export default Tabs;