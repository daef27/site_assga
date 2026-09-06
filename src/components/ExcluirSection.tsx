import { useState, type FormEvent } from 'react';
import { ASSGA_INFO } from '../data/assgaData';
import { Trash2, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ExcluirSection() {
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [motivo, setMotivo] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!confirmCheckbox) return;
    setRequested(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-2">
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>excluir.html • Solicitação de Exclusão de Cadastro (LGPD)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Exclusão de Cadastro e Desfiliação
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), o associado tem o direito de solicitar a exclusão de seus dados pessoais dos nossos registros.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Atenção aos efeitos da desfiliação:</span>
          </div>
          <ul className="list-disc pl-5 text-[11px] text-amber-800/90 space-y-1">
            <li>Sua Carteirinha de Sócio será imediatamente invalidada no sistema oficial.</li>
            <li>Você perderá o direito a voto em Assembleias Gerais e aos treinos das equipes esportivas de surdos.</li>
            <li>Dados fiscais de pagamentos anteriores serão mantidos exclusivamente pelo prazo legal exigido pela Receita Federal.</li>
          </ul>
        </div>

        {requested ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-900">
              Solicitação Registrada com Sucesso!
            </h3>
            <p className="text-xs text-emerald-700">
              Protocolo: <strong>LGPD-{Date.now().toString().slice(-6)}</strong>. A Secretaria Geral da ASSGA processará o pedido no prazo de até 5 dias úteis e enviará a confirmação para o contato informado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Número de Matrícula
              </label>
              <input
                type="text"
                required
                placeholder="Ex: ASG-2024-001"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                CPF do Titular
              </label>
              <input
                type="text"
                required
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Motivo da Solicitação (opcional)
              </label>
              <textarea
                rows={3}
                placeholder="Conte-nos brevemente o motivo de sua saída para nos ajudar a melhorar..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="confirm-exclusion"
                required
                checked={confirmCheckbox}
                onChange={(e) => setConfirmCheckbox(e.target.checked)}
                className="mt-0.5 rounded-sm border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <label htmlFor="confirm-exclusion" className="text-slate-600 text-[11px] leading-tight cursor-pointer">
                Estou ciente de que a exclusão cancelará minha filiação à ASSGA e tornará minha carteirinha inativa.
              </label>
            </div>

            <button
              type="submit"
              disabled={!confirmCheckbox}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Solicitar Exclusão Definitiva</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
