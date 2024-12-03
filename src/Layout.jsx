import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './sections/Header.jsx';
import Footer from './sections/Footer.jsx';
import { RosterProvider } from './contexts/RosterContext.jsx';

const Layout = () => {
  return (
    <RosterProvider>
      <Header />
      <main className="pt-20">
        <ToastContainer position="bottom-left" autoClose={2000} />
        <Outlet />
      </main>
      <Footer />
    </RosterProvider>
  );
};

export default Layout;
