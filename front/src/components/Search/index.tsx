import React, { useCallback, useState } from 'react';
import { Container, SearchBox } from './styles';

import Lupa from '../../images/lupa.svg';

interface ISearchProps {
  searchTitle: string;
  loadList: (query: string) => void;
}

const Search: React.FC<ISearchProps> = ({ searchTitle, loadList }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, [setInputValue]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (inputValue) {
      loadList(inputValue);
    }
  }, [loadList, inputValue]);

  const handleClearInput = useCallback(() => {
    setInputValue('');
    loadList('');
  }, []);

  return (
    <Container>
      <h2>{searchTitle}</h2>
      <SearchBox>
        <form onSubmit={handleSubmit} onReset={handleClearInput}>
          <input type="text" name="search" id="search" placeholder="pesquisar" onChange={handleChange} />
          <button type="submit"><img src={Lupa} /></button>
          {!!inputValue && (
            <button type="reset">limpar</button>
          )}
        </form>
        <p>pesquise por nome, endereço ou responsável</p>
      </SearchBox>
    </Container>
  );
}

export default Search;