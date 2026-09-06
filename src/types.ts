export type PageId =
  | 'index'
  | 'historia'
  | 'estatuto'
  | 'diretoria'
  | 'esportiva'
  | 'evento'
  | 'carteirinha-impressa'
  | 'pagamento'
  | 'login'
  | 'admin'
  | 'pagina'
  | 'django'
  | 'excluir';

export interface Associado {
  id: string;
  matricula: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  tipoSanguineo: string;
  dataFiliacao: string;
  categoria: 'Sócio Efetivo' | 'Sócio Atleta' | 'Sócio Fundador' | 'Sócio Colaborador';
  status: 'Ativo' | 'Pendente' | 'Inadimplente';
  foto: string;
  validadeCarteirinha: string;
  cidade: string;
  estado: string;
  identidadeSurda: 'Surdo(a)' | 'Deficiente Auditivo' | 'Intérprete / Familiar ouvinte';
}

export interface DiretoriaMember {
  id: string;
  nome: string;
  cargo: string;
  gestao: string;
  bio: string;
  foto: string;
  sinalLibras?: string;
  email?: string;
  destaque?: boolean;
}

export interface ModalidadeEsportiva {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  diasTreino: string;
  localTreino: string;
  tecnico: string;
  atletasCount: number;
  conquistas: string[];
}

export interface EventoASSGA {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  categoria: 'Cultural' | 'Esportivo' | 'Assembleia' | 'Curso de Libras' | 'Social' | 'Festa & Confraternização';
  descricao: string;
  gratuito: boolean;
  valor?: number;
  vagas: number;
  inscritosCount: number;
  imagem: string;
  destaque?: boolean;
}

export interface NoticiaASSGA {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  data: string;
  categoria: string;
  autor: string;
  imagem: string;
  tempoLeitura: string;
}

export interface PagamentoRegistro {
  id: string;
  matricula: string;
  nome: string;
  tipo: 'Mensalidade' | 'Anuidade Completa' | 'Doação Voluntária' | 'Inscrição Atleta';
  valor: number;
  data: string;
  metodo: 'PIX' | 'Cartão' | 'Boleto';
  status: 'Confirmado' | 'Aguardando Pagamento' | 'Expirado';
  codigoPix: string;
}
