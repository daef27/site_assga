import { useState } from 'react';
import { ESTATUTO_CAPITULOS, ASSGA_INFO } from '../data/assgaData';
import { BookOpen, Search, Download, Printer, CheckCircle } from 'lucide-react';

export default function EstatutoSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = ESTATUTO_CAPITULOS.map((cap) => {
    const matchingArtigos = cap.artigos.filter(
      (art) =>
        art.texto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.num.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cap.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cap, artigos: matchingArtigos };
  }).filter((cap) => cap.artigos.length > 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>estatuto.html • Marco Jurídico Registrado em Cartório</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Estatuto Social da ASSGA
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1">
              Documento legal registrado que rege os direitos e deveres dos associados, a estrutura de gestão da Diretoria Executiva e as normas de funcionamento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer border border-slate-200"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Estatuto</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por artigo, palavra (ex: sócio, direitos, diretoria)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs text-slate-500">
              Exibindo capítulos e artigos correspondentes a "{searchTerm}".
            </div>
          )}
        </div>
      </div>

      {/* Chapters list */}
      <div className="space-y-6">
        {filteredChapters.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            Nenhum artigo encontrado para a pesquisa "{searchTerm}".
          </div>
        ) : (
          filteredChapters.map((cap, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 font-mono tracking-wider block">
                    {cap.numero}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {cap.titulo}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {cap.artigos.map((art, aIdx) => (
                  <div key={aIdx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block mb-1 font-mono text-blue-700">
                      {art.num}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{art.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
