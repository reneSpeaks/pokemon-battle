import { useEffect, useState } from 'react';
import { randomNumber } from '../utils/helper.js';
import PokemonCard from '../components/PokemonCard.jsx';
import { useRoster } from '../contexts/RosterContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext.jsx';

const Battle = () => {
  const { roster } = useRoster();
  const { user } = useUser();
  const [enemyURL, setEnemyURL] = useState("");
  const [pokemonURL, setPokemonURL] = useState("");
  const [enemy, setEnemy] = useState({});
  const [pokemon, setPokemon] = useState({});
  const randomEnemy = randomNumber(1, 152);
  const [score, setScore] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/leaderboards/${user[0].id}`)
    .then(response => {
      setScore(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [user]);

  useEffect(() => {
    if (roster.length > 0) {
      setPokemonURL(`${import.meta.env.VITE_POKE_API}pokemon/${roster[randomNumber(0, roster.length)].id}`);
    }
    setEnemyURL(`${import.meta.env.VITE_POKE_API}pokemon/${randomEnemy}`);
  }, [roster]);

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
    });
  }, [pokemonURL, enemyURL]);

  function updateScore() {
    const options = {
      method: 'PUT',
      url: `${import.meta.env.VITE_BACKEND}/leaderboards/${user[0].id}`,
      config: {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${user[0].token}`,
        },
      },
      data: {
        battlesWon: score.battlesWon,
        battlesLost: score.battlesLost,
        battlesDraw: score.battlesDraw,
        score: score.score,
      },
    };

    axios.put(options.url, options.data, options.config)
    .then(response => {
      toast.success("Leaderboard updated.")
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  function handleFight() {
    if (roster.length > 0 && !pokemon.id) {
      setPokemonURL(`${import.meta.env.VITE_POKE_API}pokemon/${roster[randomNumber(0, roster.length)].id}`);
      toast.info("Reshuffling pokeballs...")
      return;
    }

    if (!pokemon.id || !enemy.id) {
      toast.warning("You need pokemon to fight each other!");
      return;
    }

    const number = randomNumber(1, 101);
    if (number > 50) {
      setScore({
        ...score,
        battlesWon: score.battlesWon + 1,
        score: score.score + 100,
      });
      toast.success("You Win!");
    } else if (number <= 50) {
      setScore({
        ...score,
        battlesLost: score.battlesLost + 1,
        score: score.score - 100,
      });
      toast.warning("You Lose!");
    }

    updateScore();
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center gap-4">
      <div className="flex flex-row gap-4">
        <div>
          <h2>Your Enemy</h2>{enemyURL && <PokemonCard pokemonURL={enemyURL} />}
        </div>
        <div>
          <h2>Your Pokemon</h2>{pokemonURL ? (<PokemonCard pokemonURL={pokemonURL} />) :
          <div className="w-[350px] h-[450px] px-8 py-5 m-4 bg-transparent"></div>}
        </div>
      </div>
      <button className="btn btn-primary w-80" onClick={handleFight}>Fight!</button>
    </section>
  );
};

export default Battle;
