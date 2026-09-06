import { useState } from 'react';
import { Associado } from '../types';
import { MOCK_ASSOCIADOS, ASSGA_INFO } from '../data/assgaData';
import { Printer, Download, CheckCircle2, ShieldCheck, QrCode, User, CreditCard, Sparkles, RefreshCw } from 'lucide-react';

export default function CarteirinhaSection() {
  const [selectedMember, setSelectedMember] = useState<Associado>(MOCK_ASSOCIADOS[0]);
  const [customEditing, setCustomEditing] = useState(false);
  const [customData, setCustomData] = useState<Associado>(MOCK_ASSOCIADOS[0]);
  const [isCopiedValidation, setIsCopiedValidation] = useState(false);

  const activeData = customEditing ? customData : selectedMember;

  const handlePrint = () => {
    window.print();
  };

  const copyValidationLink = () => {
    const link = `https://assgasite.org.br/validar?matricula=${activeData.matricula}&cpf=${activeData.cpf.replace(/\D/g, '')}`;
    navigator.clipboard.writeText(link);
    setIsCopiedValidation(true);
    setTimeout(() => setIsCopiedValidation(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>carteirinha-impressa.html • Emissão Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Carteirinha Oficial do Associado ASSGA
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Documento oficial de identificação do membro da Associação dos Surdos. Válido em todo território nacional para comprovação de filiação, acesso a eventos, campeonatos desportivos e benefícios estatutários.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="btn-print-carteirinha"
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Carteirinha (A4)</span>
            </button>

            <button
              type="button"
              onClick={copyValidationLink}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border border-slate-200"
            >
              {isCopiedValidation ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <QrCode className="w-4 h-4 text-slate-600" />}
              <span>{isCopiedValidation ? 'Link de Validação Copiado!' : 'Link QR de Validação'}</span>
            </button>
          </div>
        </div>

        {/* Member Selector Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Selecione o Associado de Teste:
          </span>
          <div className="flex flex-wrap gap-2">
            {MOCK_ASSOCIADOS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMember(m);
                  setCustomData(m);
                  setCustomEditing(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  !customEditing && selectedMember.id === m.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <User className="w-3 h-3" />
                <span>{m.nome.split(' ')[0]} ({m.matricula})</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomEditing(!customEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                customEditing
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {customEditing ? 'Editando Dados Personalizados' : 'Editar Dados na Carteirinha'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Modal / Bar if editing */}
      {customEditing && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Personalizar Dados em Tempo Real para Impressão</span>
            </h3>
            <span className="text-xs text-amber-700">As alterações aparecem imediatamente no cartão abaixo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
              <input
                type="text"
                value={customData.nome}
                onChange={(e) => setCustomData({ ...customData, nome: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Número de Matrícula</label>
              <input
                type="text"
                value={customData.matricula}
                onChange={(e) => setCustomData({ ...customData, matricula: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">CPF</label>
              <input
                type="text"
                value={customData.cpf}
                onChange={(e) => setCustomData({ ...customData, cpf: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Categoria de Sócio</label>
              <select
                value={customData.categoria}
                onChange={(e) => setCustomData({ ...customData, categoria: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Sócio Efetivo">Sócio Efetivo</option>
                <option value="Sócio Atleta">Sócio Atleta</option>
                <option value="Sócio Fundador">Sócio Fundador</option>
                <option value="Sócio Colaborador">Sócio Colaborador</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Identidade Surda / Libras</label>
              <select
                value={customData.identidadeSurda}
                onChange={(e) => setCustomData({ ...customData, identidadeSurda: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Surdo(a)">Surdo(a)</option>
                <option value="Deficiente Auditivo">Deficiente Auditivo</option>
                <option value="Intérprete / Familiar ouvinte">Intérprete / Familiar ouvinte</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tipo Sanguíneo</label>
              <input
                type="text"
                value={customData.tipoSanguineo}
                onChange={(e) => setCustomData({ ...customData, tipoSanguineo: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Data de Validade</label>
              <input
                type="text"
                value={customData.validadeCarteirinha}
                onChange={(e) => setCustomData({ ...customData, validadeCarteirinha: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Cidade / Estado</label>
              <input
                type="text"
                value={`${customData.cidade} - ${customData.estado}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  setCustomData({
                    ...customData,
                    cidade: parts[0]?.trim() || '',
                    estado: parts[1]?.trim() || 'RN',
                  });
                }}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Printable Area - Two Cards Side-by-Side (Frente & Verso) */}
      <div className="carteirinha-print-container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Visualização de Impressão • Formato ID Padrão (Frente & Verso)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Tamanho de Impressão: 85.6mm x 54mm (Cartão PVC / Papel Foto)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-center">
          {/* ================= FRENTE DA CARTEIRINHA ================= */}
          <div className="relative mx-auto w-full max-w-[460px] aspect-[1.586/1] bg-linear-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-2xl shadow-xl overflow-hidden border border-blue-700/60 p-5 flex flex-col justify-between select-none">
            {/* Background Guilloché / Decorative Shapes */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-blue-400/30 pb-3">
              <div className="flex items-center gap-3">
                {/* Logo ASSGA */}
                <div className="w-11 h-14 rounded-lg bg-white/10 p-0.5 border border-white/30 flex items-center justify-center shadow-md">
                  <img
                    src="src/imagens/Assga_foto.jpg"
                    alt="Brasão ASSGA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-[13px] font-extrabold tracking-wide uppercase text-white drop-shadow-xs">
                    ASSGA • ASSOCIAÇÃO DOS SURDOS
                  </div>
                  <div className="text-[9px] text-blue-200 tracking-wider uppercase font-semibold">
                    São Gonçalo do Amarante - RN • Fundada em 23/07/2024
                  </div>
                </div>
              </div>

              {/* Tag Libras / Selo */}
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold tracking-wider uppercase">
                  {activeData.identidadeSurda}
                </span>
                <div className="text-[8px] text-blue-300 font-mono mt-0.5">CNPJ: 57.242.499/0001-60</div>
              </div>
            </div>

            {/* Body: Photo + Personal Details */}
            <div className="relative z-10 grid grid-cols-12 gap-3.5 items-center my-auto py-2">
              {/* Photo 3x4 */}
              <div className="col-span-4 flex flex-col items-center">
                <div className="w-24 h-28 sm:w-26 sm:h-32 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-slate-800">
                  <img
                    src={activeData.foto}
                    alt={activeData.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-1 text-[9px] text-blue-200 font-mono font-bold tracking-tight">
                  MATRÍCULA: {activeData.matricula}
                </span>
              </div>

              {/* Data Fields */}
              <div className="col-span-8 space-y-1.5 text-left">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-blue-300 font-semibold block">
                    Nome do Associado
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight block truncate">
                    {activeData.nome}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-blue-300 block">CPF</span>
                    <span className="font-mono text-white font-semibold">{activeData.cpf}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-blue-300 block">RG</span>
                    <span className="font-mono text-white font-semibold">{activeData.rg}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-blue-300 block">Nasc.</span>
                    <span className="font-mono text-white">{activeData.dataNascimento}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-blue-300 block">Tipo Sang.</span>
                    <span className="font-mono font-bold text-rose-300">{activeData.tipoSanguineo}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-blue-300 block">Filiação</span>
                    <span className="font-mono text-white">{activeData.dataFiliacao}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[8px] uppercase tracking-wider text-blue-300 block">Categoria</span>
                  <span className="text-[11px] font-extrabold text-amber-300 uppercase">
                    ★ {activeData.categoria}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="relative z-10 flex items-center justify-between border-t border-blue-400/30 pt-2 text-[9px]">
              <div className="flex items-center gap-1.5 text-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">STATUS: REGULARIZADO</span>
              </div>
              <div className="font-mono text-white">
                VALIDADE: <span className="font-bold text-amber-300 text-[10px]">{activeData.validadeCarteirinha}</span>
              </div>
            </div>
          </div>

          {/* ================= VERSO DA CARTEIRINHA ================= */}
          <div className="relative mx-auto w-full max-w-[460px] aspect-[1.586/1] bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden border border-slate-700 p-5 flex flex-col justify-between select-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Header Verso */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-700 pb-2">
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">
                  ASSGA • Entidade Filiada FENEIS & CBDS
                </div>
                <div className="text-[8px] text-slate-400">
                  {ASSGA_INFO.endereco} • Tel/WhatsApp: {ASSGA_INFO.telefone}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-900/60 border border-blue-700 flex items-center justify-center text-blue-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Legal Text & Rules */}
            <div className="relative z-10 my-auto py-1 text-[8.5px] leading-relaxed text-slate-300 space-y-1">
              <p className="font-semibold text-slate-200">
                Amparo Legal: Lei Federal nº 10.436/2002 (Reconhecimento da Libras) e Estatuto Social da ASSGA (Art. 5º).
              </p>
              <p className="text-slate-400 text-[8px]">
                Este documento é pessoal e intransferível, atestando a qualidade de sócio ativo da Associação dos Surdos. Válido mediante comprovação de identidade com foto e adimplência estatutária.
              </p>
              <p className="text-amber-300/90 text-[8px] font-semibold">
                Em caso de perda ou extravio, comunique imediatamente a Secretaria Geral da ASSGA pelo e-mail: {ASSGA_INFO.email}
              </p>
            </div>

            {/* Validation QR Code + Signature */}
            <div className="relative z-10 grid grid-cols-12 gap-3 items-center border-t border-slate-700 pt-2.5">
              {/* QR Code SVG */}
              <div className="col-span-4 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white shadow-xs">
                  {/* Generated QR Code representation */}
                  <svg className="w-14 h-14" viewBox="0 0 100 100" fill="currentColor">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="42" y="10" width="10" height="30" fill="#0f172a" />
                    <rect x="42" y="55" width="10" height="35" fill="#0f172a" />
                    <rect x="65" y="45" width="25" height="10" fill="#0f172a" />
                    <rect x="65" y="65" width="10" height="25" fill="#0f172a" />
                    <rect x="80" y="80" width="10" height="10" fill="#0f172a" />
                  </svg>
                </div>
                <div className="text-[8px] text-slate-400 leading-tight">
                  <span className="font-bold text-white block">VALIDAR</span>
                  Aponte a câmera para consultar status
                </div>
              </div>

              {/* President Signature */}
              <div className="col-span-8 text-center flex flex-col items-center justify-end">
                <div className="font-serif italic text-blue-300 text-xs tracking-wider opacity-85 select-none font-bold">
                  Roberto Alves da Silva
                </div>
                <div className="w-44 border-t border-slate-500 my-0.5" />
                <div className="text-[8px] text-slate-400 uppercase font-semibold">
                  Presidente Executivo da ASSGA
                </div>
                <div className="text-[7.5px] text-slate-500 font-mono">
                  GESTÃO DEMOCRÁTICA E PARTICIPATIVA 2024–2027
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cutting and Lamination instructions for print */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">💡 Dica para Impressão:</span>
            <span>Utilize papel fotográfico glossy ou papel cartão 240g. Recorte nas bordas e dobre ou plastifique para maior durabilidade.</span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer shrink-0"
          >
            Imprimir Agora
          </button>
        </div>
      </div>
    </div>
  );
}
