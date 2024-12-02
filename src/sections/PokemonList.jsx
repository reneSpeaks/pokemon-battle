import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PokemonCard from '../components/PokemonCard.jsx';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_POKE_API}/pokemon?limit=12&offset=0`)
    .then((response) => {
      setPokemons(response.data.results);
    }).catch((error) => {
      toast.error("Error in PokeAPI Call.", error);
    });
  }, []);

  return (
    <section id="pokemon-list" className="flex flex-row flex-wrap justify-center">
      {pokemons && pokemons.map((pokemon, id) => (
        <PokemonCard pokemonURL={pokemon.url} key={id} />
      ))}
    </section>
  );
};

export default PokemonList;
