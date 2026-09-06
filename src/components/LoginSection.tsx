import { useState, type FormEvent } from 'react';
import { PageId } from '../types';
import { User, Lock, ArrowRight, Shield, CheckCircle2, UserPlus } from 'lucide-react';

interface LoginSectionProps {
  onNavigate: (page: PageId) => void;
  onLoginSuccess: (matricula: string) => void;
}

export default function LoginSection({ onNavigate, onLoginSuccess }: LoginSectionProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [matriculaOrEmail, setMatriculaOrEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const normalizeCpf = (value: string) => value.replace(/\D/g, '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      setRegisterSuccess(true);
      setTimeout(() => {
        setIsRegister(false);
        setRegisterSuccess(false);
      }, 2500);
    } else {
      const identifier = matriculaOrEmail.trim();
      const normalizedIdentifier = normalizeCpf(identifier);
      const socios = JSON.parse(localStorage.getItem('assga_socios') || '[]');
      const socio = socios.find((member: { cpf?: string; matricula?: string; email?: string; senha?: string }) => {
        const matchesIdentifier =
          (normalizedIdentifier.length > 0 && normalizeCpf(member.cpf || '') === normalizedIdentifier) ||
          (member.matricula || '').trim().toLowerCase() === identifier.toLowerCase() ||
          (member.email || '').trim().toLowerCase() === identifier.toLowerCase();
        return matchesIdentifier && member.senha === senha.trim();
      });

      if (socio) {
        setLoginError('');
        sessionStorage.setItem('socioLogado', JSON.stringify(socio));
        onLoginSuccess(socio.matricula || identifier);
      } else {
        setLoginError('CPF, matrícula, e-mail ou senha inválidos.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-600 block mb-1">
            login.html • Portal de Acesso
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegister ? 'Nova Filiação na ASSGA' : 'Área do Associado'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister
              ? 'Preencha seus dados para solicitar filiação à Associação dos Surdos'
              : 'Acesse para consultar sua carteirinha, mensalidades e eventos'}
          </p>
        </div>

        {registerSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Solicitação de filiação enviada com sucesso! Redirecionando para login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do sócio"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Identidade Surda / Libras</label>
                <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white">
                  <option>Surdo(a)</option>
                  <option>Deficiente Auditivo</option>
                  <option>Intérprete / Familiar ouvinte</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">CPF</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white"
                />
              </div>
            </>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {isRegister ? 'E-mail ou WhatsApp' : 'CPF, matrícula ou e-mail'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={matriculaOrEmail}
                onChange={(e) => setMatriculaOrEmail(e.target.value)}
                placeholder="Ex: 000.000.000-00 ou ASG-2024-001"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
              />
            </div>
          </div>

          {!isRegister && loginError && (
            <p role="alert" className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {loginError}
            </p>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Senha de Acesso</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Confirmar Pedido de Filiação' : 'Entrar no Sistema'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            {isRegister ? 'Já é associado? Fazer login' : 'Ainda não é sócio? Filie-se agora'}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-slate-500 hover:text-slate-800 cursor-pointer text-[11px]"
          >
            Acesso Diretoria / Admin &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
