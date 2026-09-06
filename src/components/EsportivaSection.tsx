import { useState, type FormEvent } from 'react';
import { MOCK_MODALIDADES, ASSGA_INFO } from '../data/assgaData';
import { Trophy, Calendar, MapPin, User, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function EsportivaSection() {
  const [selectedMod, setSelectedMod] = useState(MOCK_MODALIDADES[0]);
  const [inscricaoSuccess, setInscricaoSuccess] = useState(false);
  const [atletaForm, setAtletaForm] = useState({
    nome: '',
    matricula: '',
    modalidade: 'Futsal de Surdos (Masculino & Feminino)',
    posicao: '',
    telefone: '',
  });

  const handleInscricao = (e: FormEvent) => {
    e.preventDefault();
    setInscricaoSuccess(true);
    setTimeout(() => setInscricaoSuccess(false), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
          <Trophy className="w-3.5 h-3.5 text-emerald-600" />
          <span>esportiva.html • Departamento Desportivo da ASSGA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Desporto de Surdos: Inclusão, Treinamento e Conquistas
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl mt-1 leading-relaxed">
          O esporte é um dos pilares de união da comunidade surda. Nossas equipes são filiadas à Federação Estadual e à CBDS (Confederação Brasileira de Desportos de Surdos), com comunicação tática 100% visual em Libras.
        </p>
      </div>

      {/* Photo Banner of the Futsal Team */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 text-white relative">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 h-64 sm:h-80 overflow-hidden">
            <img
              src="src/imagens/foto3 (1).jpg"
              alt="Equipe de Futsal da ASSGA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 p-6 sm:p-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Orgulho Potiguar</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Guerreiros das Quadras
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Com táticas e instruções 100% visuais em Libras, a equipe de Futsal da ASSGA compete em alto nível nos campeonatos estaduais e nacionais organizados sob chancela da CBDS.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Sports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_MODALIDADES.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between hover:border-emerald-400 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 px-2 py-0.5 rounded-md bg-emerald-50">
                    {mod.categoria}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {mod.nome}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {mod.atletasCount} Atletas
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {mod.descricao}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Horários:</strong> {mod.diasTreino}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Local:</strong> {mod.localTreino}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Treinador / Coordenador:</strong> {mod.tecnico}</span>
                </div>
              </div>

              {/* Conquistas */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Principais Títulos Recentes:
                </span>
                <ul className="space-y-1">
                  {mod.conquistas.map((c, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Athlete Registration Form */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ficha de Inscrição para Treinos</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Deseja treinar ou representar a ASSGA em competições?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Preencha seus dados para receber o contato do coordenador técnico esportivo e participar dos treinos de adaptação.
          </p>

          {inscricaoSuccess && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Inscrição enviada com sucesso! A coordenação desportiva entrará em contato via WhatsApp/Vídeo em Libras.</span>
            </div>
          )}

          <form onSubmit={handleInscricao} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do atleta"
                  value={atletaForm.nome}
                  onChange={(e) => setAtletaForm({ ...atletaForm, nome: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Matrícula de Sócio (se houver)</label>
                <input
                  type="text"
                  placeholder="Ex: ASG-2024-001"
                  value={atletaForm.matricula}
                  onChange={(e) => setAtletaForm({ ...atletaForm, matricula: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Modalidade Desejada</label>
                <select
                  value={atletaForm.modalidade}
                  onChange={(e) => setAtletaForm({ ...atletaForm, modalidade: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                >
                  <option value="Futsal de Surdos (Masculino & Feminino)">Futsal de Surdos</option>
                  <option value="Voleibol de Surdos">Voleibol de Surdos</option>
                  <option value="Xadrez e Damas dos Surdos">Xadrez e Damas</option>
                  <option value="Atletismo & Corrida de Rua">Atletismo & Corrida</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">WhatsApp para Contato</label>
                <input
                  type="text"
                  required
                  placeholder="(00) 00000-0000"
                  value={atletaForm.telefone}
                  onChange={(e) => setAtletaForm({ ...atletaForm, telefone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
            >
              Enviar Ficha de Atleta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
