import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMinusCircle } from 'react-icons/fi';
import { useQuery } from '@apollo/client';

import TopMenu from '../../components/TopMenu';
import Navbar from '../../components/Navbar';
import NavbarDesktop from '../../components/NavbarDesktop';
import Search from '../../components/Search';
import { GET_FORUM_PERGUNTAS } from './apolloQueries';

import { Container, Content, PerguntasList, Pergunta, NoPergunta, Status, Filter, FilterDataOverlay, ActiveCategoriesList, Category } from './styles';

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

interface IPerguntasQuery {
  verForumPerguntas: IPerguntaData[];
}

const Forum: React.FC = () => {
  const [parsedPerguntas, setParsedPerguntas] = useState<IPerguntaData[]>();
  const [categories, setCategories] = useState<IForumCategory[]>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  let query = useLocation().search;

  const { data: perguntas } = useQuery<IPerguntasQuery>(GET_FORUM_PERGUNTAS);

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

  const handleSetPerguntas = () => {
    if (perguntas) {
      const parsedPerguntas = perguntas.verForumPerguntas.map(pergunta => {
        const date = new Date(Number(pergunta.createdAt));
        const updatedPergunta = {
          id: pergunta.id,
          titulo: pergunta.titulo,
          nomeUsuario: pergunta.nomeUsuario,
          createdAt: `${date.getDate()}/${date.getMonth() + 1}`,
          foiResolvido: pergunta.foiResolvido
        };
        return updatedPergunta;
      });

      setParsedPerguntas(parsedPerguntas);
    }
  }

  console.log(parsedPerguntas);
  useEffect(() => {
    handleSetPerguntas();
  }, [perguntas]);

  return (
    <Container>
      <TopMenu />

      {/* <Filter>
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
      </Filter> */}
      <Content>

        <PerguntasList>
          {parsedPerguntas && parsedPerguntas.map(pergunta => (
            <Pergunta key={pergunta.id}>
              <Link to={`/pergunta/${pergunta.id}`}>
                <h3>{pergunta.titulo}</h3>
                <p>por {pergunta.nomeUsuario}</p>
              </Link>
              <span>{pergunta.createdAt}</span>
              <Status isResolved={!!pergunta.foiResolvido} />
            </Pergunta>
          ))}

          {parsedPerguntas && (
            <NoPergunta>
              Nenhuma pergunta foi encontrada.
            </NoPergunta>
          )}
        </PerguntasList>
      </Content>

      <Navbar />
      <NavbarDesktop />
    </Container>
  );
}

export default Forum;