import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './sections/Header.jsx';
import Footer from './sections/Footer.jsx';
import { RosterProvider } from './contexts/RosterContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

const Layout = () => {
  return (
    <UserProvider><RosterProvider>
      <Header />
      <main className="pt-20">
        <ToastContainer position="bottom-left" autoClose={2000} />
        <Outlet />
      </main>
      <Footer />
    </RosterProvider></UserProvider>
  );
};

export default Layout;
