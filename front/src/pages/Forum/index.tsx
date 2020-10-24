import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';

import { Container, Content, PerguntasList, Pergunta, Status, Filter, FilterDataOverlay, ActiveCategoriesList, Category } from './styles';
import { Link } from 'react-router-dom';
import { FiMinusCircle } from 'react-icons/fi';

interface IPerguntaData {
  id: number;
  title: string;
  nomeUsuario: string;
  data: string;
  isResolved: boolean;
}

interface IForumCategory {
  id: number;
  name: string;
  selected: boolean;
}

const Forum: React.FC = () => {
  const [perguntas, setPerguntas] = useState<IPerguntaData[]>();
  const [categories, setCategories] = useState<IForumCategory[]>();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const loadPerguntas = useCallback(async (query) => {
    const response = await api.get(`/perguntas?title_like=${query}`);
    setPerguntas(response.data);
  }, []);

  const handleToggleFilter = (selectedCategory: IForumCategory) => {
    if (categories) {
      const updatedCategories = categories.map(element => {
        if (element.id === selectedCategory.id) {
          element.selected = !element.selected;
        } return element;
      });
      setCategories(updatedCategories);
    }
  }

  useEffect(() => {
    api.get('/perguntas?_limit=2').then(response => {
      setPerguntas(response.data);
    });

    api.get('/categories').then(response => {
      let updatedCategoryList: IForumCategory[] = response.data;

      updatedCategoryList.forEach(element => {
        element.selected = false;
      });

      setCategories(updatedCategoryList);
    });
  }, []);

  return (
    <Container>
      <TopMenu />

      <Search searchTitle="pesquise no fórum" loadList={loadPerguntas} />
      <Filter>
        <button onClick={() => setShowFilters(true)}>filtro por categorias</button>
        <ActiveCategoriesList>
          {categories && categories.map(category => category.selected && (
            <div key={category.id}>
              {category.name}
              <button onClick={() => handleToggleFilter(category)}><FiMinusCircle size={15} /></button>
            </div>
          ))}
        </ActiveCategoriesList>
        <FilterDataOverlay isVisible={!!showFilters}>
          <div>
            <button className="voltar" onClick={() => setShowFilters(false)}>voltar</button>
            <h2>Lista de categorias</h2>
            <p>clique nas categorias que deseja adicionar</p>
            {categories && categories.map(category => (
              <Category key={category.id} onClick={() => handleToggleFilter(category)} isSelected={category.selected}>{category.name}</Category>
            ))}
          </div>
        </FilterDataOverlay>
      </Filter>
      <Content>

        <PerguntasList>
          {perguntas && perguntas.map(pergunta => (
            <Pergunta key={pergunta.id}>
              <Link to={`/pergunta/${pergunta.id}`}>
                <h3>{pergunta.title}</h3>
                <p>por {pergunta.nomeUsuario}</p>
              </Link>
              <span>{pergunta.data}</span>
              <Status isResolved={!!pergunta.isResolved} />
            </Pergunta>
          ))}
        </PerguntasList>
      </Content>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Forum;