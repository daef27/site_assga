import { useState } from 'react';
import { PageId } from '../types';
import { ASSGA_INFO } from '../data/assgaData';
import { CreditCard, Menu, X, Users, Trophy, BookOpen, Calendar, HeartHandshake, Shield, Newspaper, Trash2, Home, LogIn, Terminal } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; file: string; icon: any }[] = [
    { id: 'index', label: 'Início', file: 'index.html', icon: Home },
    { id: 'historia', label: 'História', file: 'historia.html', icon: BookOpen },
    { id: 'estatuto', label: 'Estatuto', file: 'estatuto.html', icon: Shield },
    { id: 'diretoria', label: 'Diretoria', file: 'diretoria.html', icon: Users },
    { id: 'esportiva', label: 'Esportiva', file: 'esportiva.html', icon: Trophy },
    { id: 'evento', label: 'Eventos', file: 'evento.html', icon: Calendar },
    { id: 'carteirinha-impressa', label: 'Carteirinha', file: 'carteirinha-impressa.html', icon: CreditCard },
    { id: 'pagamento', label: 'Pagamento', file: 'pagamento.html', icon: HeartHandshake },
    { id: 'django', label: 'Django Python', file: 'django', icon: Terminal },
    { id: 'pagina', label: 'Notícias', file: 'pagina.html', icon: Newspaper },
    { id: 'login', label: 'Área do Sócio', file: 'login.html', icon: LogIn },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-[#003366] via-[#004aad] to-[#002855] text-white border-b border-blue-900/60 shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNav('index')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Real ASSGA Crest Image */}
            <img
              src="src/imagens/Assga_foto.jpg"
              alt="Logo ASSGA"
              className="w-10 h-12 sm:w-11 sm:h-14 object-contain rounded drop-shadow bg-white/10 p-0.5 border border-white/20 group-hover:scale-105 transition-transform"
            />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-amber-200 transition-colors">
                  ASSGA
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 hidden sm:inline-block">
                  Associação dos Surdos
                </span>
              </div>
              <div className="text-[10px] text-blue-200 hidden md:block">
                São Gonçalo do Amarante • Fundada em 23/07/2024
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-blue-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'hover:bg-white/10 hover:text-white'
                  }`}
                  title={item.file}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-blue-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Highlighted Halloween / Carteirinha Button */}
            <button
              type="button"
              onClick={() => handleNav('pagamento')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>🎃 Halloween</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('carteirinha-impressa')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Carteirinha</span>
            </button>

            {/* Admin quick link */}
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-blue-100 border-white/20'
              }`}
              title="Painel Administrativo (admin.html)"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Páginas do Site (assgasite)
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{item.file}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="w-full px-3 py-2 rounded-xl text-xs text-indigo-700 bg-indigo-50 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Painel Administrativo (admin.html)</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('excluir')}
              className="w-full px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Exclusão de Dados / LGPD (excluir.html)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
