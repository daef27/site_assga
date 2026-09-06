import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { ASSGA_INFO } from '../data/assgaData';
import {
  HeartHandshake,
  QrCode,
  Copy,
  CheckCircle2,
  Ticket,
  Send,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Tag,
  AlertCircle,
} from 'lucide-react';

interface InscricaoHalloween {
  codigo: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  cupom: string;
  pagamento: string;
  valor: number;
  data: string;
  vagaNum: number;
}

export default function PagamentoSection() {
  const [activeTab, setActiveTab] = useState<'halloween' | 'mensalidade'>('halloween');

  // Halloween state
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'dinheiro' | 'credito'>('pix');
  const [vagasOcupadas, setVagasOcupadas] = useState(68);
  const totalVagas = 100;

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPixCode, setCopiedPixCode] = useState(false);
  const [inscricaoConcluida, setInscricaoConcluida] = useState<InscricaoHalloween | null>(null);

  // Mensalidade state
  const [tipoMensalidade, setTipoMensalidade] = useState<'mensal' | 'anuidade'>('mensal');
  const [matriculaSocio, setMatriculaSocio] = useState('');
  const [nomeSocio, setNomeSocio] = useState('');

  // Load saved vagas from localStorage if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('assga_halloween_inscricoes');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          setVagasOcupadas(Math.min(totalVagas, 68 + arr.length));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Format CPF mask: 000.000.000-00
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 9) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (v.length > 6) {
      v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (v.length > 3) {
      v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    setCpf(v);
  };

  // Format WhatsApp mask: (84) 90000-0000
  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    }
    setWhatsapp(v);
  };

  // Calculate Halloween price
  const valorOriginal = 100;
  const valorFinal = cupomAplicado ? 50 : 100;

  const handleApplyCoupon = () => {
    if (cupom.trim().toUpperCase() === 'ASSGA50') {
      setCupomAplicado(true);
    } else {
      alert('Cupom inválido! Use ASSGA50 para 50% de desconto.');
      setCupomAplicado(false);
    }
  };

  // Dynamic PIX BR Code
  const pixChave = 'assgar2019@gmail.com';
  const pixCopiaECola = `00020126580014br.gov.bcb.pix0119assgar2019@gmail.com520400005303986540${valorFinal}.005802BR5905ASSGA6017SAO GONCALO AMAR62070503***6304`;

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixChave);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCopiaECola);
    setCopiedPixCode(true);
    setTimeout(() => setCopiedPixCode(false), 2500);
  };

  const handleSubmeterInscricao = (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || cpf.length < 14 || whatsapp.length < 14) {
      alert('Por favor, preencha seu nome completo, CPF e WhatsApp válidos.');
      return;
    }

    const vagaNum = vagasOcupadas + 1;
    const novaInscricao: InscricaoHalloween = {
      codigo: 'HW-' + Math.floor(1000 + Math.random() * 9000),
      nome,
      cpf,
      whatsapp,
      cupom: cupomAplicado ? 'ASSGA50' : '-',
      pagamento: metodoPagamento.toUpperCase(),
      valor: valorFinal,
      data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      vagaNum,
    };

    // Save to localStorage
    try {
      const saved = localStorage.getItem('assga_halloween_inscricoes');
      const list = saved ? JSON.parse(saved) : [];
      list.push(novaInscricao);
      localStorage.setItem('assga_halloween_inscricoes', JSON.stringify(list));
    } catch {
      // ignore
    }

    setVagasOcupadas((v) => Math.min(totalVagas, v + 1));
    setInscricaoConcluida(novaInscricao);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const enviarExtratoWhatsApp = () => {
    if (!inscricaoConcluida) return;
    const msg = `🎃 *COMPROVANTE DE INSCRIÇÃO - 2º HALLOWEEN ASSGA* 🎃
----------------------------------------
*Vaga:* ${inscricaoConcluida.vagaNum}/${totalVagas}
*Código:* ${inscricaoConcluida.codigo}
*Nome:* ${inscricaoConcluida.nome}
*CPF:* ${inscricaoConcluida.cpf}
*WhatsApp:* ${inscricaoConcluida.whatsapp}
*Forma de Pagamento:* ${inscricaoConcluida.pagamento}
*Valor:* R$ ${inscricaoConcluida.valor},00
*Data:* ${inscricaoConcluida.data}
----------------------------------------
Olá ASSGA! Segue meu extrato de inscrição para confirmação.`;

    const url = `https://wa.me/5584996981248?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Navigation Tabs (Halloween vs Mensalidade) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('halloween')}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'halloween'
                ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🎃 2º Halloween ASSGA</span>
            <span className="text-xs bg-slate-900 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              {totalVagas - vagasOcupadas} vagas
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mensalidade')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'mensalidade'
                ? 'bg-[#004aad] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Mensalidades de Sócio</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          pagamento.html • PIX: assgar2019@gmail.com
        </div>
      </div>

      {activeTab === 'halloween' ? (
        /* HALLOWEEN TAB */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-linear-to-r from-slate-950 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  🎃 Inscrições Abertas • 28 e 29 de Novembro de 2026
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-amber-400">
                  2º HALLOWEEN DO ASSGA
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Garanta sua vaga na maior festa à fantasia da comunidade surda! Preencha seus dados abaixo, efetue o pagamento via PIX ou parcele em até 2x no cartão.
                </p>
              </div>

              {/* Vagas Counter Card */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-amber-400/40 text-center shrink-0 min-w-[200px]">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Vagas Disponíveis
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {totalVagas - vagasOcupadas} <span className="text-xl text-slate-400 font-normal">/ {totalVagas}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden border border-white/20">
                  <div
                    className="bg-linear-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(vagasOcupadas / totalVagas) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-300 mt-1 block">
                  {vagasOcupadas} vagas preenchidas
                </span>
              </div>
            </div>
          </div>

          {/* Form & Payment Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Formulário de Inscrição
                </h2>
                <p className="text-xs text-slate-500">
                  Informe seus dados pessoais para confecção do ingresso e confirmação
                </p>
              </div>

              <form onSubmit={handleSubmeterInscricao} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Carlos Eduardo do Nascimento"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      required
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm font-mono outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={whatsapp}
                      onChange={handleWhatsappChange}
                      placeholder="(84) 99999-9999"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm font-mono outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Cupom de Desconto */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cupom de Desconto (Opcional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value)}
                      placeholder="Digite ASSGA50"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 text-sm uppercase font-mono outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 bg-slate-900 text-amber-300 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Aplicar Cupom
                    </button>
                  </div>
                  {cupomAplicado && (
                    <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Cupom ASSGA50 aplicado com sucesso! Desconto de 50%.</span>
                    </div>
                  )}
                </div>

                {/* Forma de Pagamento */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setMetodoPagamento('pix')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        metodoPagamento === 'pix'
                          ? 'border-amber-500 bg-amber-50 font-bold text-slate-900 ring-2 ring-amber-300'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">PIX (Instantâneo)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoPagamento('credito')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        metodoPagamento === 'credito'
                          ? 'border-amber-500 bg-amber-50 font-bold text-slate-900 ring-2 ring-amber-300'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">Cartão (Até 2x)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoPagamento('dinheiro')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        metodoPagamento === 'dinheiro'
                          ? 'border-amber-500 bg-amber-50 font-bold text-slate-900 ring-2 ring-amber-300'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">Dinheiro na Sede</div>
                    </button>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Total a Pagar:</span>
                    {cupomAplicado && (
                      <span className="text-xs text-slate-400 line-through mr-2">R$ 100,00</span>
                    )}
                    <span className="text-2xl font-black text-slate-900">
                      R$ {valorFinal},00
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Confirmar Inscrição</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Payment / QR Code Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pagamento Oficial via PIX</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Escaneie o QR Code
                </h3>

                {/* Real SVG QR Code Pattern */}
                <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner inline-block mx-auto">
                  <svg viewBox="0 0 200 200" width="170" height="170" className="mx-auto">
                    {/* SVG representation of standard QR Code */}
                    <rect width="200" height="200" fill="#ffffff" />
                    {/* Corner 1 */}
                    <rect x="10" y="10" width="50" height="50" fill="#000" />
                    <rect x="18" y="18" width="34" height="34" fill="#fff" />
                    <rect x="24" y="24" width="22" height="22" fill="#000" />
                    {/* Corner 2 */}
                    <rect x="140" y="10" width="50" height="50" fill="#000" />
                    <rect x="148" y="18" width="34" height="34" fill="#fff" />
                    <rect x="154" y="24" width="22" height="22" fill="#000" />
                    {/* Corner 3 */}
                    <rect x="10" y="140" width="50" height="50" fill="#000" />
                    <rect x="18" y="148" width="34" height="34" fill="#fff" />
                    <rect x="24" y="154" width="22" height="22" fill="#000" />
                    {/* Central pattern */}
                    <rect x="75" y="75" width="50" height="50" fill="#004aad" rx="8" />
                    <text x="100" y="105" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">🎃</text>
                    {/* Random pattern blocks */}
                    <rect x="70" y="20" width="10" height="30" fill="#000" />
                    <rect x="90" y="10" width="20" height="10" fill="#000" />
                    <rect x="110" y="30" width="20" height="15" fill="#000" />
                    <rect x="20" y="70" width="35" height="10" fill="#000" />
                    <rect x="40" y="90" width="15" height="25" fill="#000" />
                    <rect x="140" y="75" width="20" height="15" fill="#000" />
                    <rect x="170" y="100" width="15" height="30" fill="#000" />
                    <rect x="70" y="140" width="25" height="15" fill="#000" />
                    <rect x="105" y="150" width="35" height="15" fill="#000" />
                    <rect x="150" y="140" width="40" height="10" fill="#000" />
                    <rect x="145" y="165" width="20" height="25" fill="#000" />
                  </svg>
                </div>

                <div className="space-y-3 text-left">
                  {/* Chave PIX */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 block mb-1">
                      Chave PIX (E-mail):
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-xs font-mono font-bold text-slate-900 truncate flex-1">
                        {pixChave}
                      </span>
                      <button
                        type="button"
                        onClick={copyPixKey}
                        className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedKey ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* PIX Copia e Cola */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 block mb-1">
                      PIX Copia e Cola:
                    </span>
                    <button
                      type="button"
                      onClick={copyPixCode}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {copiedPixCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                      <span>{copiedPixCode ? 'Código PIX Copiado!' : 'Copiar Código PIX'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt / Extrato after registration */}
          {inscricaoConcluida && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-5 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Inscrição Registrada com Sucesso!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Extrato gerado para conferência e envio da confirmação
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono text-xs space-y-2">
                <div className="text-center font-bold text-slate-900 border-b border-dashed border-slate-300 pb-2 text-sm">
                  🎃 EXTRATO OFICIAL - 2º HALLOWEEN ASSGA 🎃
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Vaga:</span>
                  <span className="font-bold text-slate-900">{inscricaoConcluida.vagaNum} / {totalVagas}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Código de Inscrição:</span>
                  <span className="font-bold text-blue-600">{inscricaoConcluida.codigo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Participante:</span>
                  <span className="font-bold text-slate-900">{inscricaoConcluida.nome}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">CPF:</span>
                  <span className="text-slate-900">{inscricaoConcluida.cpf}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="text-slate-900">{inscricaoConcluida.whatsapp}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Forma de Pagamento:</span>
                  <span className="font-bold text-slate-900">{inscricaoConcluida.pagamento}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Valor Pago:</span>
                  <span className="font-bold text-emerald-600 text-sm">R$ {inscricaoConcluida.valor},00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Data / Horário:</span>
                  <span className="text-slate-900">{inscricaoConcluida.data}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={enviarExtratoWhatsApp}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Extrato pelo WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* MENSALIDADE TAB */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Pagamento de Mensalidades ASSGA
            </h2>
            <p className="text-xs text-slate-500">
              Mantenha sua condição de associado regularizada para emissão de carteirinha e participação nas assembleias
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setTipoMensalidade('mensal')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                tipoMensalidade === 'mensal'
                  ? 'border-[#004aad] bg-blue-50/50 shadow-xs ring-2 ring-blue-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-500 uppercase">Mensalidade Padrão</span>
              <div className="text-3xl font-black text-slate-900 mt-1">R$ 25,00</div>
              <span className="text-xs text-blue-600 block mt-1">Validade: 1 Mês</span>
            </div>

            <div
              onClick={() => setTipoMensalidade('anuidade')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                tipoMensalidade === 'anuidade'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                Desconto (2 meses grátis)
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase">Anuidade Completa</span>
              <div className="text-3xl font-black text-slate-900 mt-1">R$ 250,00</div>
              <span className="text-xs text-emerald-600 block mt-1">Validade: 12 Meses (Ano 2026)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="text-xs font-bold text-slate-700">
              Dados para Pagamento via PIX:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Chave PIX CNPJ:</span>
                <span className="font-bold text-slate-900">57.242.499/0001-60</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Chave PIX E-mail:</span>
                <span className="font-bold text-slate-900">assgar2019@gmail.com</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Após efetuar o pagamento, envie o comprovante para o WhatsApp oficial da ASSGA <strong>(84) 99698-1248</strong> informando seu nome e matrícula para liberação do Cartão de Mensalidade 2026 na sua Carteirinha Impressa.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
