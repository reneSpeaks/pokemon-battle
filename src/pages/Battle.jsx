import { useEffect, useState } from 'react';
import { randomNumber } from '../utils/helper.js';
import PokemonCard from '../components/PokemonCard.jsx';
import { useRoster } from '../contexts/RosterContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Battle = () => {
  const { roster } = useRoster();
  const [enemyURL, setEnemyURL] = useState("");
  const [pokemonURL, setPokemonURL] = useState("");
  const [enemy, setEnemy] = useState({});
  const [pokemon, setPokemon] = useState({});
  const randomEnemy = randomNumber(1, 152)

  useEffect(() => {
    if (roster.length > 0) {
      setPokemonURL(`${import.meta.env.VITE_POKE_API}pokemon/${roster[randomNumber(0, roster.length)].id}`)
    }
    setEnemyURL(`${import.meta.env.VITE_POKE_API}pokemon/${randomEnemy}`);
  },[])

  useEffect(() => {
    axios.get(pokemonURL)
    .then((response) => {
      setPokemon(response.data);
    })
    .catch((error) => {
      toast.error("Error catching Pokemon.", error);
    });

    axios.get(enemyURL)
    .then((response) => {
      setEnemy(response.data);
    })
    .catch((error) => {
      toast.error("Error catching Pokemon.", error);
    })
  }, [pokemonURL, enemyURL]);

  return (
    <section className="min-h-screen flex justify-center items-center text-center gap-4">
      <div>
        <h2>Your Enemy</h2>
        {enemyURL  && <PokemonCard pokemonURL={enemyURL} />}
      </div>
      <div>
        <h2>Your Pokemon</h2>
        {pokemonURL ? (<PokemonCard pokemonURL={pokemonURL} />) : <div className="w-[350px] h-[450px] px-8 py-5 m-4 bg-transparent"></div>}
      </div>
    </section>
  );
};

export default Battle;
