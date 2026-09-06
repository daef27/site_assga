import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization for Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ASSGA - Associação dos Surdos',
    version: '2.0.0',
    timestamp: Date.now(),
  });
});

// HTML legacy page aliases - redirect to React SPA hashes
const htmlRoutes = [
  'admin',
  'carteirinha-impressa',
  'diretoria',
  'esportiva',
  'estatuto',
  'evento',
  'excluir',
  'historia',
  'index',
  'login',
  'pagamento',
  'pagina',
];

htmlRoutes.forEach((route) => {
  app.get(`/${route}.html`, (req, res) => {
    res.redirect(`/#${route}`);
  });
});

// AI Assistant endpoint: Especialista em Acessibilidade, Libras e Direitos da Comunidade Surda
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

    const systemInstruction = `Você é o Assistente Virtual Oficial da ASSGA (Associação dos Surdos, fundada em 1998, filiada à FENEIS e CBDS).
Seu objetivo é orientar associados e a comunidade em geral com respeito, clareza e empatia.
Temas que você domina:
- Língua Brasileira de Sinais (Libras) e Lei Federal 10.436/2002.
- Direitos da pessoa surda segundo o Estatuto da Pessoa com Deficiência (Lei 13.146/2015).
- Emissão e utilidade da Carteirinha Oficial do Associado ASSGA.
- Departamento esportivo da ASSGA (Futsal, Vôlei, Xadrez e Atletismo de Surdos pela CBDS).
- Eventos da comunidade (como o Setembro Azul e Dia Nacional dos Surdos em 26 de Setembro).
- Regras do Estatuto Social e mensalidades associativas.

Responda sempre em português brasileiro de forma acolhedora, objetiva e visualmente bem estruturada.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Não foi possível gerar uma resposta no momento.';
    res.json({ reply: replyText });
  } catch (err: any) {
    res.status(500).json({
      error: 'Erro no assistente',
      message: err.message || 'Falha ao processar solicitação.',
    });
  }
});

// Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portal ASSGA rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
