import { PageId } from '../types';
import { ASSGA_INFO } from '../data/assgaData';
import { HeartHandshake, MapPin, Phone, Mail, ShieldCheck, CreditCard } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white mt-16 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 p-1 flex items-center justify-center text-white font-extrabold text-xs">
                <span className="text-white">AS</span>
                <span className="text-amber-400 text-[10px]">SGA</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  ASSGA
                </h3>
                <p className="text-[11px] text-blue-300">Associação dos Surdos</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Entidade civil sem fins lucrativos dedicada à inclusão, defesa da cidadania, promoção da Libras e desenvolvimento do desporto de surdos.
            </p>

            <div className="text-[11px] text-slate-500 font-mono space-y-1">
              <div>CNPJ: {ASSGA_INFO.cnpj}</div>
              <div>Fundação: {ASSGA_INFO.fundacao}</div>
            </div>
          </div>

          {/* Links Col 1: Institucional */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Institucional
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('index')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Início (index.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('historia')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  História e Memória (historia.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('estatuto')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Estatuto Social Registrado (estatuto.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('diretoria')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diretoria Executiva (diretoria.html)
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Serviços & Sócios */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Serviços & Sócios
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('carteirinha-impressa')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Carteirinha Impressa (carteirinha-impressa.html)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('esportiva')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dep. Esportivo & Treinos (esportiva.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('evento')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Calendário de Eventos (evento.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pagamento')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mensalidades e Doações (pagamento.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pagina')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Notícias e Artigos (pagina.html)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Área do Associado (login.html)
                </button>
              </li>
            </ul>
          </div>

          {/* Sede & Contato */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Sede Social & Contato
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{ASSGA_INFO.endereco}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{ASSGA_INFO.telefone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{ASSGA_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('excluir')}
                className="text-rose-400 hover:text-rose-300 text-[11px] underline cursor-pointer"
              >
                Gerenciamento e Exclusão de Dados LGPD (excluir.html)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-slate-300">
              © 2026 ASSGA - Todos os direitos reservados | CNPJ: 57.242.499/0001-60
            </p>
            <p className="text-[11px] text-slate-500">
              Associação dos surdos de são Gonçalo do amarante • Fundada em 23/07/2024
            </p>
          </div>

          {/* Social Media Links (as in index.html) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/assga_2019/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram ASSGA"
              className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform"
            >
              <span className="font-bold text-xs">IG</span>
            </a>

            <a
              href="https://www.youtube.com/@ASSGAESPORTES"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube ASSGA"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform"
            >
              <span className="font-bold text-xs">YT</span>
            </a>

            <a
              href="https://wa.me/5584996981248?text=Ol%C3%A1%2C%20eu%20estou%20aqui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ASSGA"
              className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href="mailto:assgar2019@gmail.com"
              aria-label="Email ASSGA"
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
