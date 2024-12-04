import PokemonCard from '../components/PokemonCard.jsx';
import { useRoster } from '../contexts/RosterContext.jsx';

const RosterList = () => {
  const { roster } = useRoster();

  return (
    <section id="roster-list" className="min-h-screen">
      <div className="flex flex-row justify-center w-full flex-wrap">
        {roster && roster.map((pokemon) => (
          <PokemonCard pokemonURL={`${import.meta.env.VITE_POKE_API}pokemon/${pokemon.id}`} key={pokemon.id} />
        ))}
      </div>
    </section>
  );
};

export default RosterList;
