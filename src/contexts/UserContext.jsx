import { createContext, useContext, useState } from 'react';
import { addToStorage, getLocalStorage, removeFromStorage } from '../utils/storage.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserContext = createContext(undefined);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getLocalStorage(import.meta.env.VITE_USERSTORAGE));

  async function handleLogin(username, password) {
    const options = {
      url: import.meta.env.VITE_BACKEND + "/login",
      data: {
        username: username,
        password: password,
      },
      config: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    };

    axios.post(options.url, options.data, options.config)
    .then((response) => {
      addToStorage(import.meta.env.VITE_USERSTORAGE, response.data);
      toast.success('Successfully signed in!');
      setUser([response.data]);
    })
    .catch((error) => {
      toast.error('Please check your credentials', error);
    })
  }

  function handleLogout() {
    const localStorage = getLocalStorage(import.meta.env.VITE_USERSTORAGE);
    removeFromStorage(import.meta.env.VITE_USERSTORAGE, localStorage[0]);
    toast.warning('Successfully signed out!');
    setUser([]);
  }

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}