import { createContext, useContext, useState } from 'react';
import { addToStorage, getLocalStorage, isStored, removeFromStorage } from '../utils/storage.js';
import { toast } from 'react-toastify';
import { useUser } from './UserContext.jsx';

const RosterContext = createContext(undefined);

export function useRoster() {
  return useContext(RosterContext);
}

export function RosterProvider({ children }) {
  const [roster, setRoster] = useState(getLocalStorage(import.meta.env.VITE_ROSTERSTORAGE));
  const { user } = useUser();

  async function addToRoster(pokemon) {
    if (user.length === 0) {
      toast.warning('You need to be logged in to do this!');
      return;
    }

    const localStorage = getLocalStorage(import.meta.env.VITE_ROSTERSTORAGE);
    if (localStorage.length > 5) {
      toast.warning('You can only have up to 6 pokemon in your roster.');
      return;
    }

    if (!isStored(import.meta.env.VITE_ROSTERSTORAGE, pokemon)) {
      addToStorage(import.meta.env.VITE_ROSTERSTORAGE, { id: pokemon.id });
      setRoster((prevState) => [...prevState, { id: pokemon.id }]);
      toast.success('Successfully added to roster!');
    } else {
      toast.warning('Pokemon already part of roster!');
    }
  }

  function removeFromRoster(pokemon) {
    if (user.length === 0) {
      toast.warning('You need to be logged in to do this!');
      return;
    }

    if (isStored(import.meta.env.VITE_ROSTERSTORAGE, pokemon)) {
      removeFromStorage(import.meta.env.VITE_ROSTERSTORAGE, pokemon);
      setRoster((prevState) => prevState.filter((item) => item.id !== pokemon.id));
      toast.warning('Successfully removed from roster!');
    } else {
      toast.warning('Pokemon not part of roster!');
    }
  }

  return (
    <RosterContext.Provider value={{ roster, addToRoster, removeFromRoster }}>
      {children}
    </RosterContext.Provider>
  );
}