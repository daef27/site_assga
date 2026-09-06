import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ASSGA - Associação Desportiva',
    version: '2.0.0',
    timestamp: Date.now(),
  });
});

app.get(['/welcome', '/api/welcome'], (req, res) => {
  res.json({ greeting: 'Olá, ASSGA! Bem-vindo ao portal oficial.' });
});

// Lazy initialization for Gemini AI client (server-side)
let aiClient = null;
function getAi() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiClient;
}

// In-memory data store replicating index.php schema
let configData = [{
  id: 1,
  senha: 'ASSGA2026',
  nome_associacao: 'ASSGA - Associação de Surdos de São Gonçalo do Amarante',
  endereco: 'São Gonçalo do Amarante - RN',
  email: 'assgar2019@gmail.com',
  telefone: '(84) 99698-1248',
  cnpj: '57.242.499/0001-60',
  logoImg: 'src/imagens/Assga_foto.jpg',
  faviconImg: 'src/imagens/Assga_foto.jpg'
}];

let noticiasData = [
  {
    id: 1,
    titulo: '2º HALLOWEEN ASSGA',
    conteudo: 'Estão abertas as inscrições para o 2º HALLOWEEN ASSGA! Prepare-se para um grande evento nos dias 28 e 29 de novembro de 2026 com muita diversão, esporte, integração e confraternização.',
    imagem: 'src/imagens/halloween-assga.jpeg',
    data: '15/08/2026'
  },
  {
    id: 2,
    titulo: 'Equipe de Futsal da ASSGA em Destaque',
    conteudo: 'Nossos atletas representam com orgulho a comunidade surda em competições regionais, trazendo medalhas, troféus e fortalecendo o esporte inclusivo potiguar.',
    imagem: 'src/imagens/foto2.jpg',
    data: '20/08/2026'
  },
  {
    id: 3,
    titulo: 'Confraternização e União da Família ASSGA',
    conteudo: 'Momentos especiais de confraternização, reencontros e celebração entre atletas, diretoria e associados surdos de São Gonçalo do Amarante.',
    imagem: 'src/imagens/foto1.jpg',
    data: '25/08/2026'
  },
  {
    id: 4,
    titulo: 'Treinos e Modalidades Esportivas da ASSGA',
    conteudo: 'A ASSGA segue com treinos regulares no ginásio municipal, incentivando novos associados a praticarem futsal e atividades recreativas.',
    imagem: 'src/imagens/foto3 (1).jpg',
    data: '01/09/2026'
  }
];

let eventosData = [
  {
    id: 1,
    titulo: '2º HALLOWEEN ASSGA',
    descricao: 'Grande festa com esporte, diversão, premiações e confraternização comunitária. Parcelamento em até 2x no cartão ou via PIX CNPJ 57.242.499/0001-60.',
    data: '28 e 29 de Novembro de 2026',
    data_inicio: '28/11/2026',
    data_fim: '29/11/2026',
    horario: '21h às 17h',
    local: 'São Gonçalo do Amarante - RN',
    vagas: 150,
    valor: 100.00,
    preco: '100,00',
    status: 'aberto',
    imagem: 'src/imagens/halloween-assga.jpeg',
    linkInscricao: 'pagamento.html'
  },
  {
    id: 2,
    titulo: 'Torneio Intermunicipal de Futsal da ASSGA',
    descricao: 'Campeonato de futsal com equipes convidadas do Rio Grande do Norte, premiações em troféus e medalhas.',
    data: '10 e 11 de Outubro de 2026',
    data_inicio: '10/10/2026',
    data_fim: '11/10/2026',
    local: 'Ginásio Poliesportivo de São Gonçalo do Amarante - RN',
    vagas: 16,
    valor: 150.00,
    preco: '150,00',
    status: 'aberto',
    imagem: 'src/imagens/foto2.jpg',
    linkInscricao: 'pagamento.html'
  }
];

let diretoriaData = [{
  id: 1,
  nome: 'Diretoria Executiva',
  cargo: 'Presidência',
  descricao: 'Gestão e representação da Associação Desportiva ASSGA',
  email: 'assgar2019@gmail.com',
  telefone: '(84) 99698-1248'
}];

let estatutoData = [{
  id: 1,
  conteudo: '<p>Documento oficial que regulamenta os princípios, direitos e deveres dos associados da ASSGA.</p>'
}];

let historiaData = {
  id: 1,
  titulo: 'Nossa História',
  subtitulo: 'Conheça a trajetória da ASSGA, desde sua fundação até os dias atuais.',
  data: 'Fundada em 2019',
  imagem: 'src/imagens/Assga_foto.jpg',
  texto: 'A ASSGA - Associação Desportiva foi fundada em 2019 na cidade de São Gonçalo do Amarante - RN, com o objetivo de promover o esporte, a integração social e o bem-estar da comunidade. Um grupo de apaixonados por esportes se uniu para criar uma associação que pudesse oferecer atividades esportivas de qualidade para todas as idades.',
  textoExtra: '<p><i class="fas fa-star" style="color:#ffd700;"></i> A ASSGA é feita de pessoas, histórias e conquistas. Cada passo é uma vitória!</p>',
  itens: [
    {
      id: 1,
      titulo: 'Fundação da ASSGA',
      data: '2019',
      texto: 'Início das atividades da Associação Desportiva ASSGA em São Gonçalo do Amarante - RN, unindo atletas, apoiadores e a comunidade.',
      imagem: 'src/imagens/Assga_foto.jpg'
    },
    {
      id: 2,
      titulo: 'Primeiros Torneios e Campeonatos',
      data: '2020 - 2021',
      texto: 'Realização dos primeiros campeonatos com grande participação e entusiasmo da comunidade desportiva.',
      imagem: 'src/imagens/foto1.jpg'
    },
    {
      id: 3,
      titulo: 'Expansão e Conquistas Esportivas',
      data: '2022 - 2024',
      texto: 'Crescimento contínuo, integração social e expansão de modalidades esportivas com destaque regional.',
      imagem: 'src/imagens/foto2.jpg'
    },
    {
      id: 4,
      titulo: 'Presença Digital e Eventos Especiais',
      data: '2026',
      texto: 'Consolidação da presença digital, carteirinhas de sócios e realizações como o 2º Halloween ASSGA.',
      imagem: 'src/imagens/foto3 (1).jpg'
    }
  ]
};

let inscricoesData = [];

// API Handler supporting both `?api=<action>` and `/api/<action>`
function handleApiAction(action, req, res) {
  switch (action) {
    case 'noticias':
      return res.json([...noticiasData].reverse());
    case 'salvar_noticia': {
      const item = req.body;
      if (item.id) {
        const idx = noticiasData.findIndex(n => n.id === Number(item.id));
        if (idx !== -1) noticiasData[idx] = { ...noticiasData[idx], ...item };
      } else {
        item.id = Date.now();
        noticiasData.push(item);
      }
      return res.json({ status: 'ok' });
    }
    case 'excluir_noticia': {
      const id = Number(req.query.id);
      noticiasData = noticiasData.filter(n => n.id !== id);
      return res.json({ status: 'ok' });
    }

    case 'eventos':
      return res.json([...eventosData].reverse());
    case 'salvar_evento': {
      const item = req.body;
      if (item.id) {
        const idx = eventosData.findIndex(e => e.id === Number(item.id));
        if (idx !== -1) eventosData[idx] = { ...eventosData[idx], ...item };
      } else {
        item.id = Date.now();
        eventosData.push(item);
      }
      return res.json({ status: 'ok' });
    }
    case 'excluir_evento': {
      const id = Number(req.query.id);
      eventosData = eventosData.filter(e => e.id !== id);
      return res.json({ status: 'ok' });
    }

    case 'diretoria':
      return res.json(diretoriaData);
    case 'salvar_membro': {
      const item = req.body;
      if (item.id) {
        const idx = diretoriaData.findIndex(d => d.id === Number(item.id));
        if (idx !== -1) diretoriaData[idx] = { ...diretoriaData[idx], ...item };
      } else {
        item.id = Date.now();
        diretoriaData.push(item);
      }
      return res.json({ status: 'ok' });
    }
    case 'excluir_membro': {
      const id = Number(req.query.id);
      diretoriaData = diretoriaData.filter(d => d.id !== id);
      return res.json({ status: 'ok' });
    }

    case 'estatuto':
      return res.json(estatutoData);
    case 'salvar_estatuto': {
      const item = req.body;
      if (estatutoData.length > 0) {
        estatutoData[0].conteudo = item.conteudo;
      } else {
        estatutoData.push({ id: 1, conteudo: item.conteudo });
      }
      return res.json({ status: 'ok' });
    }

    case 'historia':
      return res.json(historiaData);
    case 'salvar_historia': {
      historiaData = { ...historiaData, ...req.body };
      return res.json({ status: 'ok' });
    }

    case 'inscricoes':
      return res.json([...inscricoesData].reverse());
    case 'salvar_inscricao': {
      const item = req.body;
      item.id = Date.now();
      item.codigo = 'ASSGA-' + Date.now();
      item.data = new Date().toLocaleString('pt-BR');
      inscricoesData.push(item);
      return res.json({ status: 'ok' });
    }
    case 'alterar_pagamento': {
      const id = Number(req.query.id);
      const status = req.query.status;
      const target = inscricoesData.find(i => i.id === id);
      if (target) target.status_pagamento = status;
      return res.json({ status: 'ok' });
    }
    case 'excluir_inscricao': {
      const id = Number(req.query.id);
      inscricoesData = inscricoesData.filter(i => i.id !== id);
      return res.json({ status: 'ok' });
    }
    case 'resetar_inscricoes': {
      inscricoesData = [];
      return res.json({ status: 'ok' });
    }

    case 'config':
      return res.json(configData);
    case 'salvar_config': {
      configData[0] = { ...configData[0], ...req.body };
      return res.json({ status: 'ok' });
    }

    case 'login': {
      const senha = req.body?.senha;
      if (senha === configData[0].senha) {
        return res.json({ status: 'ok', admin: true });
      }
      return res.json({ status: 'erro', msg: 'Senha incorreta' });
    }

    default:
      return res.json({ status: 'erro', msg: 'Ação inválida' });
  }
}

// AI Assistant endpoint (Server-side Gemini)
app.post('/api/assistente-libras', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const ai = getAi();
    if (!ai) {
      return res.status(503).json({
        error: 'Chave GEMINI_API_KEY não configurada no ambiente.',
      });
    }

    const systemInstruction = `Você é o Assistente Virtual Oficial da ASSGA (Associação Desportiva / Associação dos Surdos de São Gonçalo do Amarante - RN).
Você orienta associados, atletas e a comunidade surda sobre esportes (futsal, campeonatos), eventos (como o 2º Halloween ASSGA), carteirinha de associado, estatuto social e Língua Brasileira de Sinais (Libras).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Olá! Como posso ajudar você na ASSGA?';
    res.json({ reply: replyText });
  } catch (err) {
    res.status(500).json({
      error: 'Erro no assistente',
      message: err.message || 'Falha ao processar solicitação.',
    });
  }
});

let sliderData = [
  { imagem: 'src/imagens/foto2.jpg', texto: 'Equipe Oficial de Futsal da ASSGA - Conquistas e Esporte' },
  { imagem: 'src/imagens/foto1.jpg', texto: 'Confraternização e União da Comunidade ASSGA' },
  { imagem: 'src/imagens/foto3 (1).jpg', texto: 'Atletas e Treinos da Associação Desportiva ASSGA' },
  { imagem: 'src/imagens/halloween-assga.jpeg', texto: '2º Festa de Halloween do ASSGA - 28 e 29 de Novembro' },
  { imagem: 'src/imagens/Assga_foto.jpg', texto: 'ASSGA - Associação de Surdos de São Gonçalo do Amarante' }
];

// In-memory collection API compatible with /api/data?collection=...
app.get('/api/data', (req, res) => {
  const collection = String(req.query.collection || '').trim().toLowerCase();
  switch (collection) {
    case 'config': {
      const { senha, ...publicConfig } = configData[0] || {};
      return res.json(publicConfig);
    }
    case 'noticias':
      return res.json(noticiasData);
    case 'eventos':
      return res.json(eventosData);
    case 'diretoria':
      return res.json(diretoriaData);
    case 'estatuto':
      return res.json(estatutoData);
    case 'historia':
      return res.json(historiaData);
    case 'slider':
      return res.json(sliderData);
    case 'inscricoes':
    case 'socios':
      return res.status(403).json({ error: 'Acesso restrito. Dados pessoais não são públicos.' });
    default:
      return res.json([]);
  }
});

app.post('/api/data', (req, res) => {
  const collection = String(req.query.collection || '').trim().toLowerCase();
  const payload = req.body;
  switch (collection) {
    case 'config':
      if (payload && typeof payload === 'object') {
        configData[0] = { ...configData[0], ...payload };
      }
      break;
    case 'noticias':
      if (Array.isArray(payload)) noticiasData = payload;
      break;
    case 'eventos':
      if (Array.isArray(payload)) eventosData = payload;
      break;
    case 'diretoria':
      if (Array.isArray(payload)) diretoriaData = payload;
      break;
    case 'estatuto':
      if (Array.isArray(payload)) estatutoData = payload;
      break;
    case 'historia':
      if (payload && typeof payload === 'object') historiaData = payload;
      break;
    case 'slider':
      if (Array.isArray(payload)) sliderData = payload;
      break;
  }
  return res.json({ status: 'ok', collection });
});

// Intercept ?api= queries on any route
app.use((req, res, next) => {
  if (req.query.api) {
    return handleApiAction(req.query.api, req, res);
  }
  next();
});

// Dedicated /api/:action route
app.all('/api/:action', (req, res) => {
  return handleApiAction(req.params.action, req, res);
});

// Backward compatibility for legacy PHP URLs
app.get('/admin.php', (req, res) => {
  res.redirect(301, '/admin.html');
});

app.get('/index.php', (req, res) => {
  res.redirect(301, '/');
});

// Serve static assets
const staticRoot = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : __dirname;

// Explicit static routes for images to ensure availability across all subpaths
app.use('/src/imagens', express.static(path.join(__dirname, 'public/src/imagens')));
app.use('/src/imagens', express.static(path.join(__dirname, 'src/imagens')));
app.use('/imagens', express.static(path.join(__dirname, 'public/src/imagens')));
app.use('/imagens', express.static(path.join(__dirname, 'src/imagens')));

if (fs.existsSync(path.join(__dirname, 'public'))) {
  app.use(express.static(path.join(__dirname, 'public')));
}
app.use(express.static(staticRoot));

// Clean URLs matching vercel.json rewrites
const cleanPages = [
  'admin',
  'carteirinha-impressa',
  'diretoria',
  'esportiva',
  'estatuto',
  'evento',
  'historia',
  'login',
  'logo',
  'pagamento',
];

cleanPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    const filePath = path.join(staticRoot, `${page}.html`);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    res.sendFile(path.join(staticRoot, 'index.html'));
  });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ASSGA site server running on http://0.0.0.0:${PORT}`);
});
