import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.jsx';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  function logScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logScroll);
    }

    watchScroll();
    return () => window.removeEventListener('scroll', logScroll);
  });

  return (
    <header className={scrollY > 0 ? "flex justify-center fixed t-0 z-50 w-screen bg-base-300 border-b-2 border-accent" : "flex justify-center fixed t-0 z-50 w-screen"}>
      <Navigation />
    </header>
  );
};

export default Header;
