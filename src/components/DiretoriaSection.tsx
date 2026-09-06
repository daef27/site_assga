import { MOCK_DIRETORIA } from '../data/assgaData';
import { Users, Mail, Award, CheckCircle2, Video } from 'lucide-react';

export default function DiretoriaSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-2">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>diretoria.html • Gestão 2024 - 2027</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Diretoria Executiva e Conselho Fiscal da ASSGA
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl mt-1 leading-relaxed">
          Composta por membros eleitos democraticamente em Assembleia Geral de Associados, nossa diretoria atua de forma voluntária e dedicada pelo fortalecimento dos direitos e inclusão da comunidade surda.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DIRETORIA.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:border-indigo-400 transition-all"
          >
            <div>
              <div className="h-48 relative overflow-hidden bg-slate-800">
                <img
                  src={m.foto}
                  alt={m.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase">
                    {m.cargo}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {m.nome}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px] pb-2 border-b border-slate-100">
                  <span>Mandato: <strong className="text-slate-700">{m.gestao}</strong></span>
                  <span className="text-indigo-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Eleito
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {m.bio}
                </p>

                {m.sinalLibras && (
                  <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                    <span className="font-bold shrink-0">🤟 Libras:</span>
                    <span>{m.sinalLibras}</span>
                  </div>
                )}
              </div>
            </div>

            {m.email && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Contato oficial:</span>
                <a
                  href={`mailto:${m.email}`}
                  className="text-indigo-600 font-medium hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Mail className="w-3 h-3" />
                  <span>{m.email}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
