import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AvisoRol from './AvisoRol.jsx';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container py-4 principal">
        <AvisoRol />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
