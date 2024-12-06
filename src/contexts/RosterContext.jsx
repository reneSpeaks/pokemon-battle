import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from './UserContext.jsx';
import axios from 'axios';

const RosterContext = createContext(undefined);

export function useRoster() {
  return useContext(RosterContext);
}

export function RosterProvider({ children }) {
  const [roster, setRoster] = useState([]);
  const { user } = useUser();

  async function getRoster() {
    if (user.length === 0) {
      toast.warning('You need to be logged in to do this!');
      return;
    }

    const options = {
      url: import.meta.env.VITE_BACKEND + "/rosters/by-user/" + user[0].id,
      data: {
      },
      config: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user[0].token}`,
        },
      },
    };

    axios.get(options.url, options.config)
    .then(response => {
      setRoster(response.data.pokemonIds)
    })
    .catch((error) => {
      console.error(error.message)
      setRoster([]);
    })
    // console.log(options.url);
  }

  function isRoster(pokemon) {
    return roster.some((item) => item.id === pokemon.id)
  }

  async function addToRoster(pokemon) {
    await getRoster()

    if (roster.length > 5) {
      toast.warning('You can only have up to 6 pokemon in your roster.');
      return;
    }

    if (!isRoster(pokemon)) {
      const newRoster = [...roster, { id: pokemon.id }]

      const options = {
        url: import.meta.env.VITE_BACKEND + "/rosters/by-user/" + user[0].id,
        data: {
          pokemonIds: newRoster
        },
        config: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user[0].token}`,
          },
        },
      };

      axios.put(options.url, options.data, options.config)
      .then(response => {
        setRoster(response.data.pokemonIds);
      }).catch(error => {
        console.log(error);
      })

      setRoster((prevState) => [...prevState, { id: pokemon.id }]);
      toast.success('Successfully added to roster!');
    } else {
      toast.warning('Pokemon already part of roster!');
    }
  }

  async function removeFromRoster(pokemon) {
    await getRoster()

    if (isRoster(pokemon)) {
      const newRoster = roster.filter((item) => item.id !== pokemon.id);
      const options = {
        url: import.meta.env.VITE_BACKEND + "/rosters/by-user/" + user[0].id,
        data: {
          pokemonIds: newRoster
        },
        config: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user[0].token}`,
          },
        },
      };

      axios.put(options.url, options.data, options.config)
      .then(response => {
        setRoster(response.data.pokemonIds);
      })
      .catch((error) => {
        console.log(error);
      })

      toast.warning('Successfully removed from roster!');
    } else {
      toast.warning('Pokemon not part of roster!');
    }
  }

  useEffect(() => {
    if (user.length === 0)  return;
    void getRoster()
  }, [user])

  return (
    <RosterContext.Provider value={{ roster, addToRoster, removeFromRoster, isRoster }}>
      {children}
    </RosterContext.Provider>
  );
}