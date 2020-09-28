import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Container } from './styles';

interface ITabsProps {
  options: ITabElement[];
}

interface ITabElement {
  path: string;
  text: string;
}

const Tabs: React.FC<ITabsProps> = ({ options }) => {
  const [tabList, setTabList] = useState<ITabElement[]>();

  let { url } = useRouteMatch();

  useEffect(() => {
    setTabList(options);
  }, [options]);

  return (
    <Container>
      {tabList && tabList.map(tab => (
        <Link key={tab.path} to={url + tab.path}>
          {tab.text}
        </Link>
      ))}
    </Container>
  );
}

export default Tabs;