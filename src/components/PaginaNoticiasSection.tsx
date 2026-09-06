import { useState } from 'react';
import { MOCK_NOTICIAS } from '../data/assgaData';
import { NoticiaASSGA } from '../types';
import { Newspaper, Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';

export default function PaginaNoticiasSection() {
  const [selectedNoticia, setSelectedNoticia] = useState<NoticiaASSGA | null>(null);

  if (selectedNoticia) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => setSelectedNoticia(null)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todas as notícias</span>
        </button>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {selectedNoticia.categoria}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {selectedNoticia.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {selectedNoticia.data}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {selectedNoticia.autor}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {selectedNoticia.tempoLeitura}
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-72 sm:h-96 bg-slate-100">
            <img
              src={selectedNoticia.imagem}
              alt={selectedNoticia.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-slate-900 text-base">
              {selectedNoticia.resumo}
            </p>
            <div className="whitespace-pre-line">
              {selectedNoticia.conteudo}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>ASSGA • Comunicação e Imprensa</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link da notícia copiado!');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <Newspaper className="w-3.5 h-3.5 text-blue-600" />
          <span>pagina.html • Informativo e Notícias Oficiais</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Notícias, Acontecimentos e Comunicados da ASSGA
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl mt-1 leading-relaxed">
          Acompanhe os projetos, informes sobre políticas públicas de acessibilidade em Libras, resultados esportivos e avisos da diretoria.
        </p>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_NOTICIAS.map((noticia) => (
          <div
            key={noticia.id}
            onClick={() => setSelectedNoticia(noticia)}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
          >
            <div>
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-blue-600 px-2 py-0.5 rounded-full bg-blue-50">
                    {noticia.categoria}
                  </span>
                  <span>{noticia.data}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                  {noticia.titulo}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {noticia.resumo}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Ler artigo completo</span>
              <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
