import { createContext, useContext, useState } from 'react';
import { addToStorage, getLocalStorage, removeFromStorage } from '../utils/storage.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserContext = createContext(undefined);
const UserLoginContext = createContext(undefined);
const UserLogoutContext = createContext(undefined);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getLocalStorage(import.meta.env.VITE_USERSTORAGE));

  async function handleLogin(username, password) {

    // TODO: IMPLEMENT FOR BACKEND EVENTUALLY
    // const options = {
    //   url: "" + "/users/login",
    //   data: {
    //     username: username,
    //     password: password,
    //   },
    //   config: {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // };
    // axios.post(options.url, options.data, options.config)
    // .then((response) => {
    //   saveLocalStorage(import.meta.env.VITE_USERSTORAGE, [response.data]);
    //   toast.success('Successfully signed in!');
    //   setUser(() => response.data);
    // })
    // .catch((error) => {
    //   toast.error('Please check your credentials', error);
    // })

    // TODO: REMOVE AFTER IMPLEMENTATION FOR BACKEND
    if (username && password) {
      if (username === import.meta.env.VITE_MOCKUSERNAME && password === import.meta.env.VITE_MOCKPASSWORD) {
        addToStorage(import.meta.env.VITE_USERSTORAGE, { id: 1, username: username });
        setUser(() => [{ id: 1, username: username }]);
        toast.success('Successfully logged in!');
      } else {
        toast.error('Please check your credentials');
      }
    }
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