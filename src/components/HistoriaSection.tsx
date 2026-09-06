import { ASSGA_INFO } from '../data/assgaData';
import { History, Award, Heart, Shield, CheckCircle2, Flag } from 'lucide-react';

export default function HistoriaSection() {
  const milestones = [
    {
      ano: '1998',
      titulo: 'Fundação da ASSGA',
      descricao: 'No dia 15 de Outubro de 1998, um grupo pioneiro de 24 líderes e jovens surdos reuniu-se para fundar a Associação dos Surdos, buscando criar um espaço autônomo de acolhimento, conversação em Libras e representação jurídica.',
    },
    {
      ano: '2002',
      titulo: 'A Luta pela Lei de Libras (Lei 10.436/2002)',
      descricao: 'Mobilização ativa junto à FENEIS e aos poderes municipais e estaduais para a consagração da Língua Brasileira de Sinais como língua de expressão legal da comunidade surda.',
    },
    {
      ano: '2008',
      titulo: 'Criação do Departamento Esportivo & Filiação à CBDS',
      descricao: 'Organização formal das equipes de Futsal e Vôlei de Surdos, conquistando o primeiro título regional e filiando a entidade à Confederação Brasileira de Desportos de Surdos.',
    },
    {
      ano: '2015',
      titulo: 'Conquista da Sede Social Própria',
      descricao: 'Inauguração do centro de convivência, salas de aula para cursos de Libras, ginásio para treinos e auditório para assembleias com apoio de doações e associados.',
    },
    {
      ano: '2024–2026',
      titulo: 'Era Digital, Inclusão e Carteirinha Inteligente',
      descricao: 'Modernização de toda a gestão, emissão digital de carteirinhas com QR Code, portal de transparência, transmissões em vídeo em Libras e expansão de projetos educacionais.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
          <History className="w-3.5 h-3.5 text-blue-600" />
          <span>historia.html • Memória e Identidade</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Nossa História e Conquistas da Comunidade Surda
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl mt-2 leading-relaxed">
          Desde a sua fundação em 1998, a {ASSGA_INFO.nome} tem sido um pilar de acolhimento, afirmação linguística, garantia de direitos fundamentais e celebração da cultura surda.
        </p>
      </div>

      {/* Pillars Grid: Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Flag className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Missão</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Assegurar a plena cidadania da comunidade surda através da valorização da Libras, do acesso à educação bilíngue, da inclusão no mercado de trabalho e do desenvolvimento pelo esporte.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Visão</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ser referência regional e nacional em protagonismo surdo, promovendo uma sociedade sem barreiras de comunicação, onde a cultura e os direitos dos surdos sejam respeitados.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Valores</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Orgulho da identidade surda, solidariedade mútua, ética, transparência financeira, espírito desportivo e defesa incondicional da Língua Brasileira de Sinais.
          </p>
        </div>
      </div>

      {/* Galeria Histórica de Fotos */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Galeria Histórica & Memória Fotográfica
          </h2>
          <p className="text-xs text-slate-500">
            Registros inesquecíveis da nossa trajetória em São Gonçalo do Amarante
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
            <div className="h-52 overflow-hidden bg-slate-900">
              <img
                src="src/imagens/foto1.jpg"
                alt="Brasão Oficial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Identidade Visual
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">
                Aprovação do Brasão e Mascote
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Celebração da união entre o símbolo de São Gonçalo e a Língua de Sinais.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
            <div className="h-52 overflow-hidden bg-slate-900">
              <img
                src="src/imagens/foto2.jpg"
                alt="Confraternização"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                Comunidade & Afeto
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">
                Confraternização de Final de Ano
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Encontro anual de associados, voluntários e famílias surdas.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
            <div className="h-52 overflow-hidden bg-slate-900">
              <img
                src="src/imagens/foto3 (1).jpg"
                alt="Futsal de Surdos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                Desporto & Superação
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">
                Campeões Regionais de Futsal
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Nossos atletas representando São Gonçalo do Amarante na CBDS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Linha do Tempo: Conquistas Marcantes
        </h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-10">
              <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-xs" />
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono font-bold text-xs">
                    {m.ano}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {m.titulo}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {m.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
