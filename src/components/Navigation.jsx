import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext.jsx';

const Navigation = () => {
  const { user, handleLogout } = useUser();

  function handleClick() {
    if (user.length > 0) {
      handleLogout();
    } else {
      document.getElementById('login-form').showModal()
    }
  }

  return (
    <div className="drawer max-w-full w-full flex justify-center">
      <nav className="navbar flex justify-between max-w-7xl px-4">
        <label htmlFor="my-drawer" className="cursor-pointer"><FaBars /></label>
        <button onClick={handleClick} className="text-xl cursor-pointer font-bold hover:text-accent active:text-primary">
          {user.length > 0 ? `Log Out` : `Log In`}
        </button>
      </nav>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content text-3xl font-bold min-h-full w-80 p-4">
          <li>
            <NavLink to="/" onClick={() => (document.querySelector('.drawer-toggle').checked = false)} className={({ isActive }) => isActive ? "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer text-accent" : "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer"}>Home</NavLink>
          </li>
          <li>
            <NavLink to="leaderboard" onClick={() => (document.querySelector('.drawer-toggle').checked = false)} className={({ isActive }) => isActive ? "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer text-accent" : "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer"}>Leaderboard</NavLink>
          </li>
          {user.length > 0 && (
            <>
              <li>
                <NavLink to="roster" onClick={() => (document.querySelector('.drawer-toggle').checked = false)} className={({ isActive }) => isActive ? "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer text-accent" : "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer"}>Roster</NavLink>
              </li>
              <li>
                <NavLink to="battle" onClick={() => (document.querySelector('.drawer-toggle').checked = false)} className={({ isActive }) => isActive ? "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer text-accent" : "menu-item hover:after:scale-x-100 inline-block relative cursor-pointer"}>Battle</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
