import { useState, type FormEvent } from 'react';
import { PageId, Associado } from '../types';
import { MOCK_ASSOCIADOS, MOCK_PAGAMENTOS, ASSGA_INFO } from '../data/assgaData';
import { ShieldCheck, Users, CreditCard, DollarSign, Search, Printer, Plus, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface AdminSectionProps {
  onNavigate: (page: PageId) => void;
  onSelectMemberForCard?: (member: Associado) => void;
}

export default function AdminSection({ onNavigate, onSelectMemberForCard }: AdminSectionProps) {
  const [associados, setAssociados] = useState<Associado[]>(MOCK_ASSOCIADOS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    nome: '',
    cpf: '',
    rg: '',
    matricula: `ASG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    email: '',
    telefone: '',
    categoria: 'Sócio Efetivo' as const,
    tipoSanguineo: 'O+',
    identidadeSurda: 'Surdo(a)' as const,
  });

  const filteredAssociados = associados.filter(
    (a) =>
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.cpf.includes(searchTerm)
  );

  const handleAddMember = (e: FormEvent) => {
    e.preventDefault();
    const created: Associado = {
      id: `soc-${Date.now()}`,
      matricula: newMember.matricula,
      nome: newMember.nome,
      email: newMember.email || 'socio@assga.org.br',
      telefone: newMember.telefone || '(84) 90000-0000',
      cpf: newMember.cpf,
      rg: newMember.rg || '0.000.000 SSP',
      dataNascimento: '01/01/1995',
      tipoSanguineo: newMember.tipoSanguineo,
      dataFiliacao: new Date().toLocaleDateString('pt-BR'),
      categoria: newMember.categoria,
      status: 'Ativo',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      validadeCarteirinha: '31/12/2026',
      cidade: 'São Gonçalo do Amarante',
      estado: 'RN',
      identidadeSurda: newMember.identidadeSurda,
    };

    setAssociados([created, ...associados]);
    setShowAddModal(false);
  };

  const handleViewCard = (m: Associado) => {
    if (onSelectMemberForCard) {
      onSelectMemberForCard(m);
    }
    onNavigate('carteirinha-impressa');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>admin.html • Painel Administrativo e Gestão de Sócios</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Painel de Controle da Diretoria ASSGA
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Controle de quadro de associados, emissão de carteirinhas e acompanhamento financeiro.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Novo Sócio</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Total de Sócios</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{associados.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">100% cadastrados</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Carteirinhas Ativas</span>
            <div className="text-2xl font-extrabold text-blue-600 mt-1">{associados.filter(a => a.status === 'Ativo').length}</div>
            <span className="text-[11px] text-slate-500">Validade até 2026</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Mensalidades do Mês</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">R$ 300,00</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Via PIX Automático</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Atletas Inscritos</span>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1">
              {associados.filter(a => a.categoria === 'Sócio Atleta').length}
            </div>
            <span className="text-[11px] text-slate-500">Futsal / Vôlei</span>
          </div>
        </div>
      </div>

      {/* Modal to add new member */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Cadastrar Novo Associado</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newMember.nome}
                  onChange={(e) => setNewMember({ ...newMember, nome: e.target.value })}
                  placeholder="Nome do associado"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Matrícula Gerada</label>
                  <input
                    type="text"
                    readOnly
                    value={newMember.matricula}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CPF</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={newMember.cpf}
                    onChange={(e) => setNewMember({ ...newMember, cpf: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Categoria</label>
                  <select
                    value={newMember.categoria}
                    onChange={(e) => setNewMember({ ...newMember, categoria: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Sócio Efetivo">Sócio Efetivo</option>
                    <option value="Sócio Atleta">Sócio Atleta</option>
                    <option value="Sócio Fundador">Sócio Fundador</option>
                    <option value="Sócio Colaborador">Sócio Colaborador</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Identidade Surda</label>
                  <select
                    value={newMember.identidadeSurda}
                    onChange={(e) => setNewMember({ ...newMember, identidadeSurda: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Surdo(a)">Surdo(a)</option>
                    <option value="Deficiente Auditivo">Deficiente Auditivo</option>
                    <option value="Intérprete / Familiar ouvinte">Intérprete / Familiar ouvinte</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Salvar e Ativar Sócio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900">
            Relação de Associados Cadastrados
          </h2>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, matrícula ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Associado</th>
                <th className="py-3.5 px-4">Matrícula</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Identidade</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssociados.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img
                      src={m.foto}
                      alt={m.nome}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{m.nome}</div>
                      <div className="text-[11px] text-slate-400">{m.cpf}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {m.matricula}
                  </td>
                  <td className="py-3.5 px-4">{m.categoria}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                      {m.identidadeSurda}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleViewCard(m)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Ver Carteirinha</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
