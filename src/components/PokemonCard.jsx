import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import { capitalize } from '../utils/helper.js';
import { useRoster } from '../contexts/RosterContext.jsx';
import { useUser } from '../contexts/UserContext.jsx';

const PokemonCard = ({ pokemonURL }) => {
  const { user } = useUser()
  const { roster, addToRoster, removeFromRoster, isRoster } = useRoster();
  const [pokemon, setPokemon] = useState(null);
  const [isHeart, setIsHeart] = useState(false);
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  useEffect(() => {
    axios.get(pokemonURL)
    .then((response) => {
      setPokemon(response.data);
    })
    .catch((error) => {
      toast.error("Error catching Pokemon.", error);
    });
  }, []);

  useEffect(() => {
    if (pokemon && roster) {
      setIsHeart(roster.some((item) => item.id === pokemon.id));
    }
  }, [pokemon, roster])

  const handleClick = () => {
    if (user.length > 0) {
      if (!isHeart && pokemon) {
        addToRoster(pokemon);
        setIsHeart(isRoster({ id: pokemon.id }));
      } else if (isHeart && pokemon) {
        removeFromRoster(pokemon);
        setIsHeart(isRoster({ id: pokemon.id }));
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <>
      {pokemon && (
        <div id="pokemon-card" onClick={handleClick} className="m-4 max-w-[350px] w-full h-[450px] px-8 py-5 shadow-xl rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-accent hover:scale-105 duration-200" style={{ background: `radial-gradient(circle at 50% 0%, ${typeColor[pokemon.types[0].type.name]} 36%, #ffffff 36%)` }}>
          <div className="flex flex-row">
            {user.length > 0 && <FaHeart className={isHeart ? "text-red-700 drop-shadow-lg" : "text-white drop-shadow-lg"} />}
            <p className="pokemon-hp w-20 bg-white text-center px-2 py-0 rounded-xl font-normal ml-auto">
              <span className="text-xs tracking-wider font-semibold">HP</span> {pokemon.stats[0].base_stat}
            </p>
          </div>
          <img className="block w-[180px] max-h-[200px] h-full my-5 mx-auto" src={pokemon.sprites.other.dream_world.front_default} alt={capitalize(pokemon.name)} />
          <h2 className="pokemon-name text-center font-semibold">{capitalize(pokemon.name)}</h2>
          <div className="pokemon-types flex justify-around mt-5 mb-10">
            {pokemon.types.map((type, id) => (
              <span key={id} className="text-xs tracking-wider font-semibold py-1 px-5 rounded-xl text-white" style={{ backgroundColor: `${typeColor[pokemon.types[0].type.name]}` }}>{capitalize(type.type.name)}</span>
            ))}
          </div>
          <div className="pokemon-stats flex self-end items-center justify-between text-center">
            <div>
              <h3 className="text-base-200 font-semibold">{pokemon.stats[1].base_stat}</h3>
              <p className="text-base-300">Attack</p>
            </div>
            <div>
              <h3 className="text-base-200 font-semibold">{pokemon.stats[2].base_stat}</h3>
              <p className="text-base-300">Defense</p>
            </div>
            <div>
              <h3 className="text-base-200 font-semibold">{pokemon.stats[3].base_stat}</h3>
              <p className="text-base-300">Speed</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
