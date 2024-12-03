import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './sections/Header.jsx';
import Footer from './sections/Footer.jsx';
import { RosterProvider } from './contexts/RosterContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import LoginForm from './components/LoginForm.jsx';

const Layout = () => {
  return (
    <UserProvider><RosterProvider>
      <Header />
      <div className="relative">
        <main className="flex flex-col relative pt-20 pb-5 z-10 items-center mb-24 bg-base-100 border-b-2 border-primary border-solid">
          <ToastContainer position="bottom-left" autoClose={2000} /> <LoginForm /> <Outlet />
        </main>
        <Footer />
      </div>
    </RosterProvider></UserProvider>
);
};

export default Layout;
