import { useState } from 'react';
import { useLogin } from '../contexts/UserContext.jsx';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const handleLogin = useLogin()
  const [{ username, password }, setFormState] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(previousState => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    try {
      e.preventDefault();
      if (!username || !password) throw new Error('Please fill out all the fields!');

      handleLogin(username, password);

      setFormState(() => ({
        username: '',
        password: '',
      }));

      document.getElementById('login-form').close()

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <dialog id="login-form" className="modal card">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form className="card-body" onSubmit={handleSubmit} >
          <h3 className="font-bold text-2xl text-center">Sign in!</h3>
          <div className="signform-input">
            <input id="signform-username" name="username" type="text" autoComplete="username" required minLength="4" value={username} onChange={handleChange} />
            <label htmlFor="signform-username"> Enter your Username </label>
          </div>
          <div className="signform-input">
            <input id="signform-password" name="password" type="password" autoComplete="off" required minLength="8" value={password} onChange={handleChange} />
            <label htmlFor="signform-password"> Enter your Password </label>
          </div>
          <div className="flex flex-col mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginForm;
