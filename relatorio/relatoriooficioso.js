export default function RelatorioPortalPage() {
  const cardsTurma = [
    { titulo: 'Alunos ativos', valor: '32', subtitulo: '+18% neste mês' },
    { titulo: 'Acessos ao portal', valor: '1.284', subtitulo: '+27% em relação ao mês anterior' },
    { titulo: 'Desafios realizados', valor: '186', subtitulo: '74% da turma participou' },
    { titulo: 'XP médio da turma', valor: '4.320 XP', subtitulo: 'Nível médio 12' },
  ];

  const acessos = [
    { periodo: 'Seg', acessos: 42 },
    { periodo: 'Ter', acessos: 58 },
    { periodo: 'Qua', acessos: 67 },
    { periodo: 'Qui', acessos: 74 },
    { periodo: 'Sex', acessos: 63 },
    { periodo: 'Sáb', acessos: 28 },
    { periodo: 'Dom', acessos: 19 },
  ];

  const evolucao = [
    { mes: 'Jan', desempenho: 48, xp: 1200 },
    { mes: 'Fev', desempenho: 56, xp: 1700 },
    { mes: 'Mar', desempenho: 63, xp: 2400 },
    { mes: 'Abr', desempenho: 71, xp: 3100 },
    { mes: 'Mai', desempenho: 79, xp: 3900 },
    { mes: 'Jun', desempenho: 86, xp: 4500 },
  ];

  const protagonismo = [
    { nome: 'João', pontos: 98, acessos: 41 },
    { nome: 'Mariazinha', pontos: 92, acessos: 37 },
    { nome: 'Pedro', pontos: 85, acessos: 33 },
    { nome: 'Ana', pontos: 79, acessos: 28 },
    { nome: 'Lucas', pontos: 72, acessos: 24 },
  ];

  const dificuldades = [
    { conteudo: 'Função do 2º grau', valor: 72 },
    { conteudo: 'Leis de Newton', valor: 61 },
    { conteudo: 'Trigonometria', valor: 58 },
    { conteudo: 'Eletrodinâmica', valor: 44 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Relatórios do Portal</h1>
            <p className="text-slate-400 mt-2 text-lg">
              Acompanhe turma, desempenho individual e protagonismo dos alunos em tempo real.
            </p>
          </div>

          <div className="flex gap-3">
            <select className="bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm">
              <option>Escola: Todas</option>
              <option>Boto de Menezes</option>
              <option>Maria Geny</option>
            </select>

            <select className="bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm">
              <option>Turma: 1º Ano A</option>
              <option>2º Ano A</option>
              <option>3º Ano B</option>
            </select>
          </div>
        </div>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Dashboard da Turma</h2>
            <p className="text-slate-400">Resumo geral da participação e do uso do portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {cardsTurma.map((card) => (
              <div key={card.titulo} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                <p className="text-slate-400 text-sm">{card.titulo}</p>
                <h3 className="text-3xl font-bold mt-2">{card.valor}</h3>
                <p className="text-emerald-400 text-sm mt-3">{card.subtitulo}</p>
              </div>
            ))}
          </div>

          <div className="grid xl:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Acessos por período</h3>
                  <p className="text-slate-400 text-sm">Número de acessos ao longo da semana</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={acessos}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="acessos" stroke="#38bdf8" fill="#0ea5e9" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-1">Participação da turma</h3>
              <p className="text-slate-400 text-sm mb-5">Desafios, quizzes e recompensas concluídas</p>

              <div className="space-y-5">
                {[
                  { nome: 'Desafios realizados', valor: 74 },
                  { nome: 'Quizzes concluídos', valor: 81 },
                  { nome: 'Recompensas resgatadas', valor: 63 },
                  { nome: 'Missões semanais', valor: 57 },
                ].map((item) => (
                  <div key={item.nome}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.nome}</span>
                      <span className="font-semibold">{item.valor}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${item.valor}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Relatório Automático do Aluno</h2>
            <p className="text-slate-400">Dados individuais, evolução e principais dificuldades.</p>
          </div>

          <div className="grid xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-1">Evolução do desempenho</h3>
              <p className="text-slate-400 text-sm mb-4">Percentual de evolução ao longo dos meses</p>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={evolucao}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="mes" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="desempenho" stroke="#22c55e" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Resumo do aluno</h3>
                <p className="text-slate-400 text-sm">Exemplo de relatório individual</p>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                <p className="text-slate-400 text-sm">Aluno</p>
                <p className="text-2xl font-bold">João</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <p className="text-slate-400 text-xs">XP</p>
                  <p className="text-xl font-bold">5.820</p>
                </div>
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <p className="text-slate-400 text-xs">Nível</p>
                  <p className="text-xl font-bold">15</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                <p className="text-slate-400 text-sm">Recompensas obtidas</p>
                <p className="font-semibold mt-2">12 resgates • 8 badges • 3 conquistas raras</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-1">Conteúdos com maior dificuldade</h3>
            <p className="text-slate-400 text-sm mb-5">Tópicos em que os alunos apresentam menor desempenho</p>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dificuldades} layout="vertical">
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="conteudo" type="category" stroke="#94a3b8" width={120} />
                <Tooltip />
                <Bar dataKey="valor" fill="#f59e0b" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Painel de Protagonismo</h2>
            <p className="text-slate-400">Quem mais participa espontaneamente do portal e realiza atividades por iniciativa própria.</p>
          </div>

          <div className="grid xl:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">Ranking de protagonismo</h3>

              <div className="space-y-4">
                {protagonismo.map((aluno, index) => (
                  <div key={aluno.nome} className="flex items-center gap-4 bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{aluno.nome}</p>
                        <p className="text-cyan-300 font-bold">{aluno.pontos} pts</p>
                      </div>
                      <p className="text-slate-400 text-sm">{aluno.acessos} acessos espontâneos no mês</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-1">Atividades sem solicitação do professor</h3>
              <p className="text-slate-400 text-sm mb-5">Distribuição das ações realizadas espontaneamente</p>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Quiz extra', value: 35 },
                      { name: 'Desafio semanal', value: 28 },
                      { name: 'Forum', value: 22 },
                      { name: 'Sugestões', value: 15 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    <Cell fill="#38bdf8" />
                    <Cell fill="#22c55e" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#a855f7" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
