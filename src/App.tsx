import { useState, useEffect } from 'react';
import { PageId, Associado } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import HistoriaSection from './components/HistoriaSection';
import EstatutoSection from './components/EstatutoSection';
import DiretoriaSection from './components/DiretoriaSection';
import EsportivaSection from './components/EsportivaSection';
import EventoSection from './components/EventoSection';
import CarteirinhaSection from './components/CarteirinhaSection';
import PagamentoSection from './components/PagamentoSection';
import LoginSection from './components/LoginSection';
import AdminSection from './components/AdminSection';
import PaginaNoticiasSection from './components/PaginaNoticiasSection';
import ExcluirSection from './components/ExcluirSection';
import DjangoSection from './components/DjangoSection';
import { MOCK_ASSOCIADOS } from './data/assgaData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('index');
  const [userSession, setUserSession] = useState<{ loggedIn: boolean; matricula?: string }>({
    loggedIn: false,
  });

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('.html', '') as PageId;
      const validPages: PageId[] = [
        'index',
        'historia',
        'estatuto',
        'diretoria',
        'esportiva',
        'evento',
        'carteirinha-impressa',
        'pagamento',
        'login',
        'admin',
        'pagina',
        'django',
        'excluir',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'index' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (matricula: string) => {
    setUserSession({ loggedIn: true, matricula });
    navigateTo('carteirinha-impressa');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Navbar with all site pages */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'index' && <HomeSection onNavigate={navigateTo} />}
        {currentPage === 'historia' && <HistoriaSection />}
        {currentPage === 'estatuto' && <EstatutoSection />}
        {currentPage === 'diretoria' && <DiretoriaSection />}
        {currentPage === 'esportiva' && <EsportivaSection />}
        {currentPage === 'evento' && <EventoSection />}
        {currentPage === 'carteirinha-impressa' && <CarteirinhaSection />}
        {currentPage === 'pagamento' && <PagamentoSection />}
        {currentPage === 'pagina' && <PaginaNoticiasSection />}
        {currentPage === 'login' && (
          <LoginSection onNavigate={navigateTo} onLoginSuccess={handleLoginSuccess} />
        )}
        {currentPage === 'admin' && (
          <AdminSection onNavigate={navigateTo} />
        )}
        {currentPage === 'django' && <DjangoSection />}
        {currentPage === 'excluir' && <ExcluirSection />}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
