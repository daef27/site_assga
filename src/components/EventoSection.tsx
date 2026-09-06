import { useState } from 'react';
import { MOCK_EVENTOS, ASSGA_INFO } from '../data/assgaData';
import { EventoASSGA } from '../types';
import { Calendar, MapPin, Clock, Users, CheckCircle2, Ticket } from 'lucide-react';

export default function EventoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [confirmedEventId, setConfirmedEventId] = useState<string | null>(null);

  const categories = ['Todos', 'Cultural', 'Esportivo', 'Assembleia', 'Curso de Libras'];

  const filteredEventos = selectedCategory === 'Todos'
    ? MOCK_EVENTOS
    : MOCK_EVENTOS.filter((e) => e.categoria === selectedCategory);

  const handleInscricao = (id: string) => {
    setConfirmedEventId(id);
    setTimeout(() => setConfirmedEventId(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>evento.html • Calendário Oficial de Eventos e Cursos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Eventos, Encontros e Cursos da ASSGA
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl mt-1 leading-relaxed">
          Participe das nossas assembleias, comemorações da cultura surda, festivais de integração e cursos de Libras para surdos e ouvintes.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEventos.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="h-48 relative overflow-hidden bg-slate-800">
                <img
                  src={evt.imagem}
                  alt={evt.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {evt.categoria}
                  </span>
                  {evt.destaque && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold">
                      ★ Destaque
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono font-bold">
                  {evt.gratuito ? 'Entrada Gratuita' : `R$ ${evt.valor},00`}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {evt.titulo}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.descricao}
                </p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span><strong>Data:</strong> {evt.data}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span><strong>Horário:</strong> {evt.horario}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span><strong>Local:</strong> {evt.local}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      {evt.inscritosCount} de {evt.vagas} vagas preenchidas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {confirmedEventId === evt.id ? (
                <div className="w-full py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Presença confirmada! Comprovante enviado.</span>
                </div>
              ) : (
                <>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Aberto a sócios e comunidade
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInscricao(evt.id)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Garantir Vaga</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
