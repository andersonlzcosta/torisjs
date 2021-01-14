import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import { gql, useQuery } from '@apollo/client';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';

import { Container, Content, PerguntasList, Pergunta, Status, Filter, FilterDataOverlay, ActiveCategoriesList, Category } from './styles';
import { Link, useLocation } from 'react-router-dom';
import { FiMinusCircle } from 'react-icons/fi';

interface IPerguntaData {
  id: number;
  titulo: string;
  nomeUsuario: string;
  createdAt: string;
  foiResolvido: boolean;
}

interface IForumCategory {
  id: number;
  name: string;
  selected: boolean;
}

const GET_FORUM_PERGUNTAS = gql`
query{
  verForumPerguntas{
    id,
    titulo,
    foiResolvido,
    createdAt
  }
}`;

interface IPerguntasQuery {
  verForumPerguntas: IPerguntaData[];
}

const Forum: React.FC = () => {
  const [perguntas, setPerguntas] = useState<IPerguntaData[]>();
  const [categories, setCategories] = useState<IForumCategory[]>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  let query = useLocation().search;

  const { refetch } = useQuery<IPerguntasQuery>(GET_FORUM_PERGUNTAS, {
    onCompleted(data) {
      let updatedPerguntas: IPerguntaData[] = [];
      data.verForumPerguntas.forEach(pergunta => {
        const date = new Date(Number(pergunta.createdAt));
        updatedPerguntas.push({
          ...pergunta,
          createdAt: `${date.getDate()}/${date.getMonth() + 1}`
        });
      });
      setPerguntas(updatedPerguntas);
    }
  });

  const searchPerguntas = useCallback(async (query) => {
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
    // api.get('/perguntas?_limit=10').then(response => {
    //   setPerguntas(response.data);
    // });

    // api.get('/categories').then(response => {
    //   let updatedCategoryList: IForumCategory[] = response.data;

    //   updatedCategoryList.forEach(element => {
    //     element.selected = false;
    //   });

    //   setCategories(updatedCategoryList);
    // });
    if (query === '?refetch') {
      refetch();
    }
  }, [query]);

  return (
    <Container>
      <TopMenu />

      <Search searchTitle="pesquise no fórum" loadList={searchPerguntas} />
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
                <h3>{pergunta.titulo}</h3>
                <p>por {pergunta.nomeUsuario}</p>
              </Link>
              <span>{pergunta.createdAt}</span>
              <Status isResolved={!!pergunta.foiResolvido} />
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