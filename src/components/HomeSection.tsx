import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ASSGA_INFO, MOCK_NOTICIAS } from '../data/assgaData';
import {
  Ticket,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Building,
  CreditCard,
  Users,
  Trophy,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (page: PageId) => void;
}

const SLIDER_PHOTOS = [
  {
    src: 'src/imagens/foto2.jpg',
    titulo: 'Equipe Oficial de Futsal da ASSGA',
    descricao: 'Atletas campeões regionais com troféu e medalhas representando São Gonçalo do Amarante',
  },
  {
    src: 'src/imagens/foto1.jpg',
    titulo: 'Confraternização e Família ASSGA',
    descricao: 'União, celebração e acolhimento de todos os associados e amigos da comunidade surda',
  },
  {
    src: 'src/imagens/foto3 (1).jpg',
    titulo: 'Treinos Semanais em Quadra',
    descricao: 'Preparação física, técnica e inclusão esportiva no ginásio poliesportivo',
  },
  {
    src: 'src/imagens/halloween-assga.jpeg',
    titulo: '2º Festa de Halloween da ASSGA',
    descricao: '28 e 29 de novembro de 2026 • O maior evento temático da comunidade surda potiguar',
  },
  {
    src: 'src/imagens/Assga_foto.jpg',
    titulo: 'Brasão Oficial Aprovado da ASSGA',
    descricao: 'Identidade visual definitiva aprovada em assembleia com as mãos em Libras e o símbolo municipal',
  },
];

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slider every 4 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDER_PHOTOS.length) % SLIDER_PHOTOS.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_PHOTOS.length);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Welcome & Identity Bar */}
      <div className="bg-linear-to-r from-[#003366] via-[#004aad] to-[#002855] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-900/60 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src="src/imagens/Assga_foto.jpg"
              alt="Brasão Oficial ASSGA"
              className="w-20 h-24 sm:w-24 sm:h-28 object-contain drop-shadow-md rounded-lg bg-white/5 p-1 border border-white/20"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Fundada em 23/07/2024 • Filiada CBDS & FENEIS
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                <span className="bg-linear-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  ASSGA
                </span>{' '}
                <span className="text-white text-lg sm:text-2xl font-semibold">
                  - Associação dos Surdos
                </span>
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                São Gonçalo do Amarante - RN • Esporte, integração, eventos, cidadania e representatividade da Comunidade Surda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('pagamento')}
              className="px-5 py-3 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>Inscrição 2º Halloween</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('carteirinha-impressa')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Carteirinha de Sócio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Slider (from index.html) */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
        <div
          className="relative h-64 sm:h-96 md:h-[460px] w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {SLIDER_PHOTOS.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.titulo}
                className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white z-20">
                <div className="max-w-2xl bg-slate-950/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Destaque Institucional ASSGA</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                    {slide.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                    {slide.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Controls: Prev / Next buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {SLIDER_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide
                    ? 'w-8 bg-amber-400 shadow-md'
                    : 'w-2.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Highlight: 2º HALLOWEEN ASSGA (The Core Event of the Site) */}
      <section className="bg-linear-to-br from-amber-500/10 via-orange-500/5 to-purple-900/10 p-6 sm:p-10 rounded-3xl border-2 border-amber-400/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-xs font-black px-6 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vagas Limitadas (100 Vagas)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Poster Image */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/60 bg-slate-950">
              <img
                src="src/imagens/halloween-assga.jpeg"
                alt="Poster Oficial do 2º Halloween ASSGA"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Info & Call to Action */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
              🎃 28 e 29 de Novembro de 2026 • 21h às 05h da tarde
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              2º HALLOWEEN DO ASSGA
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A festa mais esperada da comunidade surda! Dois dias imperdíveis com fantasias, integração, dinâmicas culturais em Libras, segurança e muita diversão em São Gonçalo do Amarante.
            </p>

            {/* Pricing & Offer Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Valor Geral</span>
                <span className="text-2xl font-black text-slate-900">R$ 100,00</span>
                <span className="text-[10px] text-slate-500 block">Até 2x no cartão</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-xs">
                <span className="text-[11px] font-bold text-emerald-600 uppercase block">Cupom ASSGA50</span>
                <span className="text-2xl font-black text-emerald-600">R$ 50,00</span>
                <span className="text-[10px] text-emerald-700 block">50% de desconto</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs">
                <span className="text-[11px] font-bold text-blue-600 uppercase block">Chave PIX</span>
                <span className="text-xs font-mono font-bold text-slate-900 block truncate">assgar2019@gmail.com</span>
                <span className="text-[10px] text-slate-500 block">QR Code dinâmico</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('pagamento')}
                className="px-8 py-4 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 cursor-pointer transform hover:-translate-y-1"
              >
                <Ticket className="w-5 h-5 text-slate-950" />
                <span>Fazer Inscrição Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <span className="text-xs text-slate-500 italic">
                *Limite de 100 inscritos. Confirmação instantânea por WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards (Site Modules) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Departamentos & Serviços ASSGA
            </h2>
            <p className="text-xs text-slate-500">
              Acesse os canais de sócio, diretoria, esportes e documentos oficiais
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Carteirinha Impressa */}
          <div
            onClick={() => onNavigate('carteirinha-impressa')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#004aad] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-[#004aad] text-[#004aad] group-hover:text-white flex items-center justify-center transition-colors mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#004aad] text-base mb-1">
                Carteirinha Impressa
              </h3>
              <span className="text-[11px] font-mono text-blue-600 font-semibold block mb-2">
                carteirinha-impressa.html
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Carteirinha oficial do associado com foto, dados oficiais, QR Code e cartão de mensalidade 2026.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#004aad]">
              <span>Abrir carteirinha</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Diretoria */}
          <div
            onClick={() => onNavigate('diretoria')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#004aad] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-[#004aad] text-indigo-600 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#004aad] text-base mb-1">
                Diretoria Executiva
              </h3>
              <span className="text-[11px] font-mono text-indigo-600 font-semibold block mb-2">
                diretoria.html
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Quadro de dirigentes eleitos, membros surdos representantes e gestão participativa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#004aad]">
              <span>Ver diretoria</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Esportiva */}
          <div
            onClick={() => onNavigate('esportiva')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#004aad] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 text-base mb-1">
                Departamento Esportivo
              </h3>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold block mb-2">
                esportiva.html
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Futsal de surdos, torneios regionais da CBDS, treinamentos e galeria de conquistas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Ver esportes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Estatuto Social */}
          <div
            onClick={() => onNavigate('estatuto')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-amber-600 text-base mb-1">
                Estatuto Social
              </h3>
              <span className="text-[11px] font-mono text-amber-600 font-semibold block mb-2">
                estatuto.html
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Regimento, direitos e deveres dos sócios, finalidades institucionais registradas em cartório.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Consultar estatuto</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Notícias e Avisos (from index.html) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Últimas Notícias da ASSGA
            </h2>
            <p className="text-xs text-slate-500">
              Acompanhe as novidades e informes da nossa comunidade
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('pagina')}
            className="text-xs font-bold text-[#004aad] hover:text-[#003366] flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas as notícias</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_NOTICIAS.map((noticia) => (
            <article
              key={noticia.id}
              onClick={() => {
                if (noticia.id === 'not-halloween') {
                  onNavigate('pagamento');
                } else {
                  onNavigate('pagina');
                }
              }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col group border-l-4 hover:border-l-amber-400 border-l-[#004aad]"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {noticia.categoria}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>{noticia.data}</span>
                    <span>•</span>
                    <span>{noticia.autor}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 group-hover:text-[#004aad] transition-colors text-base leading-snug line-clamp-2">
                    {noticia.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {noticia.resumo}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {noticia.id === 'not-halloween' ? (
                    <span className="text-xs font-black text-amber-600 flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5" />
                      Fazer inscrição &rarr;
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#004aad] flex items-center gap-1">
                      Ler mais &rarr;
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">{noticia.tempoLeitura}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Fale Conosco Section (Exact Cards from index.html) */}
      <section className="bg-linear-to-br from-[#e9eef5] to-[#d4e1ed] p-6 sm:p-10 rounded-3xl border border-blue-200/60 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366]">
            Fale Conosco
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Entre em contato com a ASSGA. Estamos à disposição para atender associados, famílias e parceiros.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Endereço */}
          <a
            href="https://maps.google.com/?q=São+Gonçalo+do+Amarante+RN"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#004aad] text-amber-300 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Endereço</span>
            <span className="font-extrabold text-slate-900 text-sm mt-1">São Gonçalo do Amarante - RN</span>
            <span className="text-xs text-slate-500 mt-0.5">Rua da Floresta, 562</span>
          </a>

          {/* Email */}
          <a
            href="mailto:assgar2019@gmail.com"
            className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#004aad] text-amber-300 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</span>
            <span className="font-extrabold text-slate-900 text-sm mt-1">assgar2019@gmail.com</span>
            <span className="text-xs text-slate-500 mt-0.5">Resposta em até 24h</span>
          </a>

          {/* Telefone / WhatsApp */}
          <a
            href="https://wa.me/5584996981248?text=Olá,%20gostaria%20de%20falar%20com%20a%20ASSGA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#004aad] text-amber-300 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp & Telefone</span>
            <span className="font-extrabold text-slate-900 text-sm mt-1">(84) 99698-1248</span>
            <span className="text-xs text-slate-500 mt-0.5">Atendimento em Libras & Texto</span>
          </a>

          {/* CNPJ */}
          <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#004aad] text-amber-300 flex items-center justify-center mb-3 shadow-md">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CNPJ Oficial</span>
            <span className="font-extrabold font-mono text-slate-900 text-sm mt-1">57.242.499/0001-60</span>
            <span className="text-xs text-emerald-600 font-semibold mt-0.5">Entidade Regularizada</span>
          </div>
        </div>
      </section>
    </div>
  );
}
