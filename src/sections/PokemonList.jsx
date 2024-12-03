import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PokemonCard from '../components/PokemonCard.jsx';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const pokemonCount = 151;
  const limit = 6;

  useEffect(() => {
    const totalCount = pokemons.length;
    const totalPages = Math.ceil(totalCount / limit);

    const startingIndex = (page - 1) * limit;
    const endingIndex = startingIndex + limit;

    let result = [];
    if (endingIndex > totalCount) {
      result = pokemons.slice(startingIndex);
    } else {
      result = pokemons.slice(startingIndex, endingIndex);
    }

    setPagination({
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      results: result,
    });
  }, [pokemons, page]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_POKE_API}/pokemon?limit=${pokemonCount}&offset=0`)
    .then((response) => {
      setPokemons(response.data.results);
    }).catch((error) => {
      toast.error("Error in PokeAPI Call.", error);
    });
  }, []);

  function handlePage(value) {
    if (value === 'inc') {
      if (pagination.hasNextPage) {
        setPage(prevState => prevState + 1);
      }
    } else if (value === 'dec') {
      if (pagination.hasPreviousPage) {
        setPage(prevState => prevState - 1);
      }
    }
  }

  return (
    <section id="pokemon-list" className="flex flex-col justify-center items-center w-screen">
      <div className="join">
        <button className="join-item btn" onClick={() => handlePage('dec')}>«</button>
        <button className="join-item btn btn-disabled">{page}</button>
        <button className="join-item btn" onClick={() => handlePage('inc')}>»</button>
      </div>

      <div className="flex flex-row justify-center w-full flex-wrap">
        {pagination.results && pagination.results.map((pokemon) => (
          <PokemonCard pokemonURL={pokemon.url} key={pokemon.name} />
        ))}
      </div>
    </section>
  );
};

export default PokemonList;
