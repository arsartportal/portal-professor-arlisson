// =======================================
// HOME.JS — DESAFIO DIÁRIO + MISSÃO SEMANAL
// =======================================

// =====================================================
// FIREBASE
// =====================================================

import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// =====================================================
// SISTEMA DE XP / MISSÕES / SCIENCE POINTS
// =====================================================

import { adicionarXPImediato } from "./xp.js";
import { atualizarMissao, atualizarBotaoMissao } from "./missoes.js";
import { carregarSP, adicionarSP } from "./science-points.js";


// =====================================================
// 🧠 BANCO DE PERGUNTAS
// Cada dia usa uma pergunta diferente baseada no dia do ano
// =====================================================

const perguntas = [

{ materia:"Física", pergunta:"Qual é a unidade de força no Sistema Internacional?", opcoes:["Joule","Newton","Watt","Pascal"], correta:1 },
{ materia:"Física", pergunta:"A velocidade é considerada uma grandeza:", opcoes:["Fundamental","Derivada","Qualitativa","Escalar apenas"], correta:1 },
{ materia:"Física", pergunta:"A unidade padrão de massa no SI é:", opcoes:["Grama","Quilograma","Tonelada","Newton"], correta:1 },
{ materia:"Física", pergunta:"Qual é a unidade de potência no SI?", opcoes:["Watt","Joule","Newton","Volt"], correta:0 },
{ materia:"Física", pergunta:"Se um corpo não muda sua velocidade, ele está em:", opcoes:["Movimento acelerado","Equilíbrio","Movimento uniforme","Repouso absoluto"], correta:2 },
{ materia:"Física", pergunta:"A aceleração é definida como:", opcoes:["Variação da posição","Variação da velocidade","Velocidade constante","Força aplicada"], correta:1 },
{ materia:"Física", pergunta:"Qual grandeza mede a quantidade de matéria?", opcoes:["Peso","Força","Massa","Volume"], correta:2 },
{ materia:"Física", pergunta:"A pressão é calculada por:", opcoes:["Força × Área","Força ÷ Área","Massa × Gravidade","Volume ÷ Força"], correta:1 },
{ materia:"Física", pergunta:"O trabalho mecânico depende de:", opcoes:["Força e deslocamento","Massa e tempo","Altura apenas","Velocidade apenas"], correta:0 },
{ materia:"Química", pergunta:"A combustão é classificada como uma reação:", opcoes:["Endotérmica","Exotérmica","Física","Nuclear"], correta:1 },
{ materia:"Química", pergunta:"A água é composta por:", opcoes:["H₂O","CO₂","O₂","NaCl"], correta:0 },
{ materia:"Matemática", pergunta:"3.000.000 em notação científica é:", opcoes:["3 × 10³","3 × 10⁴","3 × 10⁵","3 × 10⁶"], correta:3 },
{ materia:"Matemática", pergunta:"Qual é o resultado de 2²?", opcoes:["2","4","6","8"], correta:1 },
{ materia:"Matemática", pergunta:"A raiz quadrada de 81 é:", opcoes:["7","8","9","10"], correta:2 },
{ materia:"Matemática", pergunta:"50% de 200 é:", opcoes:["50","100","150","200"], correta:1 },
{ materia:"Matemática", pergunta:"Se x + 5 = 12, então x é:", opcoes:["5","6","7","8"], correta:2 },
{ materia:"Física", pergunta:"Qual é a unidade de força no Sistema Internacional?", opcoes:["Joule","Newton","Watt","Pascal"], correta:1 },
{ materia:"Física", pergunta:"Qual é a unidade de potência no SI?", opcoes:["Watt","Joule","Newton","Volt"], correta:0 },
{ materia:"Física", pergunta:"A velocidade é considerada uma grandeza:", opcoes:["Fundamental","Derivada","Qualitativa","Escalar apenas"], correta:1 },
{ materia:"Física", pergunta:"A aceleração é definida como:", opcoes:["Variação da posição","Variação da velocidade","Velocidade constante","Força aplicada"], correta:1 },
{ materia:"Física", pergunta:"Qual grandeza mede a quantidade de matéria?", opcoes:["Peso","Força","Massa","Volume"], correta:2 },
{ materia:"Física", pergunta:"A pressão é calculada por:", opcoes:["Força × Área","Força ÷ Área","Massa × Gravidade","Volume ÷ Força"], correta:1 },
{ materia:"Física", pergunta:"O trabalho mecânico depende de:", opcoes:["Força e deslocamento","Massa e tempo","Altura apenas","Velocidade apenas"], correta:0 },
{ materia:"Física", pergunta:"Se um corpo não muda sua velocidade, ele está em:", opcoes:["Movimento acelerado","Equilíbrio","Movimento uniforme","Repouso absoluto"], correta:2 },
{ materia:"Física", pergunta:"A unidade padrão de massa no SI é:", opcoes:["Grama","Quilograma","Tonelada","Newton"], correta:1 },
{ materia:"Física", pergunta:"A energia elétrica é normalmente medida em:", opcoes:["Newton","Watt","Joule","Pascal"], correta:2 },
{ materia:"Física", pergunta:"A unidade de temperatura no SI é:", opcoes:["Celsius","Kelvin","Fahrenheit","Caloria"], correta:1 },
{ materia:"Física", pergunta:"Qual instrumento mede a temperatura?", opcoes:["Balança","Dinamômetro","Termômetro","Paquímetro"], correta:2 },
{ materia:"Física", pergunta:"A velocidade média é calculada por:", opcoes:["distância × tempo","distância ÷ tempo","tempo ÷ distância","massa ÷ volume"], correta:1 },
{ materia:"Física", pergunta:"A densidade é calculada por:", opcoes:["massa ÷ volume","volume ÷ massa","força ÷ área","massa × volume"], correta:0 },
{ materia:"Física", pergunta:"A unidade de energia muito usada em calorimetria é:", opcoes:["Watt","Caloria","Pascal","Ampère"], correta:1 },
{ materia:"Física", pergunta:"Qual destas é uma grandeza vetorial?", opcoes:["Massa","Tempo","Deslocamento","Temperatura"], correta:2 },
{ materia:"Física", pergunta:"A força resultante nula indica:", opcoes:["Aceleração obrigatória","Equilíbrio","Fusão","Evaporação"], correta:1 },
{ materia:"Física", pergunta:"A unidade de corrente elétrica é:", opcoes:["Volt","Watt","Ampère","Ohm"], correta:2 },
{ materia:"Física", pergunta:"A unidade de resistência elétrica é:", opcoes:["Ohm","Tesla","Volt","Joule"], correta:0 },
{ materia:"Física", pergunta:"Qual grandeza é medida em newton?", opcoes:["Energia","Força","Potência","Pressão"], correta:1 },
{ materia:"Física", pergunta:"A energia cinética depende da:", opcoes:["massa e velocidade","pressão e área","temperatura e volume","resistência e corrente"], correta:0 },
{ materia:"Física", pergunta:"Quando um corpo sobe, sua energia potencial gravitacional:", opcoes:["Diminui","Some","Aumenta","Fica negativa"], correta:2 },
{ materia:"Física", pergunta:"A luz no vácuo se propaga com velocidade aproximada de:", opcoes:["3 × 10⁸ m/s","3 × 10⁶ m/s","300 m/s","3 × 10⁴ m/s"], correta:0 },
{ materia:"Física", pergunta:"O som não se propaga no:", opcoes:["Ar","Água","Vácuo","Ferro"], correta:2 },
{ materia:"Física", pergunta:"A reflexão da luz ocorre quando ela:", opcoes:["Atravessa um corpo","Retorna ao meio de origem","Desaparece","Aumenta de massa"], correta:1 },
{ materia:"Física", pergunta:"A refração acontece quando a luz:", opcoes:["Muda de meio","Para completamente","Vira som","Perde cor"], correta:0 },
{ materia:"Física", pergunta:"O espelho plano forma imagem:", opcoes:["Real e invertida","Virtual e direita","Real e maior","Virtual e invertida"], correta:1 },
{ materia:"Física", pergunta:"A unidade de frequência é:", opcoes:["Hertz","Newton","Watt","Volt"], correta:0 },
{ materia:"Física", pergunta:"Um corpo eletrizado negativamente possui excesso de:", opcoes:["Prótons","Nêutrons","Elétrons","Íons positivos"], correta:2 },
{ materia:"Física", pergunta:"A força de atrito tende a:", opcoes:["Favorecer o movimento","Impedir ou dificultar o movimento","Aumentar a massa","Anular a gravidade"], correta:1 },
{ materia:"Física", pergunta:"A gravidade na Terra vale aproximadamente:", opcoes:["9,8 m/s²","98 m/s²","0,98 m/s²","1 m/s"], correta:0 },
{ materia:"Física", pergunta:"Peso é uma força relacionada à:", opcoes:["Temperatura","Gravidade","Velocidade da luz","Pressão atmosférica"], correta:1 },
{ materia:"Física", pergunta:"Massa e peso são:", opcoes:["Iguais sempre","Grandezas diferentes","Medidos em newton","Grandezas vetoriais iguais"], correta:1 },
{ materia:"Física", pergunta:"A primeira lei de Newton também é chamada de lei da:", opcoes:["Ação e reação","Inércia","Gravitação","Refração"], correta:1 },
{ materia:"Física", pergunta:"A segunda lei de Newton relaciona força, massa e:", opcoes:["Volume","Aceleração","Temperatura","Densidade"], correta:1 },

{ materia:"Química", pergunta:"A água é composta por:", opcoes:["H₂O","CO₂","O₂","NaCl"], correta:0 },
{ materia:"Química", pergunta:"A combustão é classificada como reação:", opcoes:["Endotérmica","Exotérmica","Física","Nuclear"], correta:1 },
{ materia:"Química", pergunta:"O símbolo químico do oxigênio é:", opcoes:["Ox","O","Og","Om"], correta:1 },
{ materia:"Química", pergunta:"O símbolo químico do hidrogênio é:", opcoes:["H","Hi","Hg","Hd"], correta:0 },
{ materia:"Química", pergunta:"O sódio tem símbolo:", opcoes:["So","Sd","Na","S"], correta:2 },
{ materia:"Química", pergunta:"O cloro possui símbolo:", opcoes:["Cl","Co","Cr","C"], correta:0 },
{ materia:"Química", pergunta:"A tabela periódica organiza os elementos por:", opcoes:["Número atômico","Massa do planeta","Cor","Estado físico apenas"], correta:0 },
{ materia:"Química", pergunta:"O número atômico corresponde à quantidade de:", opcoes:["Nêutrons","Prótons","Moléculas","Ligações"], correta:1 },
{ materia:"Química", pergunta:"Átomo eletricamente neutro possui:", opcoes:["Prótons = elétrons","Prótons > elétrons","Só nêutrons","Só elétrons"], correta:0 },
{ materia:"Química", pergunta:"Quando um átomo perde elétrons, ele forma um:", opcoes:["Ânion","Cátion","Isótopo","Gás nobre"], correta:1 },
{ materia:"Química", pergunta:"Quando um átomo ganha elétrons, ele forma um:", opcoes:["Ânion","Cátion","Próton","Neutrino"], correta:0 },
{ materia:"Química", pergunta:"A ligação iônica ocorre geralmente entre:", opcoes:["Metal e ametal","Dois ametais","Dois gases nobres","Dois metais apenas"], correta:0 },
{ materia:"Química", pergunta:"A ligação covalente ocorre geralmente entre:", opcoes:["Metal e ametal","Dois ametais","Metal e gás nobre","Somente metais"], correta:1 },
{ materia:"Química", pergunta:"O pH menor que 7 indica solução:", opcoes:["Básica","Neutra","Ácida","Saturada"], correta:2 },
{ materia:"Química", pergunta:"O pH igual a 7 indica solução:", opcoes:["Ácida","Neutra","Básica","Oxidante"], correta:1 },
{ materia:"Química", pergunta:"O pH maior que 7 indica solução:", opcoes:["Ácida","Neutra","Básica","Radioativa"], correta:2 },
{ materia:"Química", pergunta:"Qual destas substâncias é um ácido?", opcoes:["HCl","NaOH","NaCl","CaCO₃"], correta:0 },
{ materia:"Química", pergunta:"Qual destas substâncias é uma base?", opcoes:["H₂SO₄","NaOH","CO₂","HNO₃"], correta:1 },
{ materia:"Química", pergunta:"A menor partícula de um elemento químico é o:", opcoes:["Mol","Átomo","Próton","Núcleo"], correta:1 },
{ materia:"Química", pergunta:"As substâncias simples são formadas por:", opcoes:["Um único elemento químico","Dois ou mais compostos","Água e sal","Misturas homogêneas"], correta:0 },
{ materia:"Química", pergunta:"O gás carbônico tem fórmula:", opcoes:["CO","CO₂","C₂O","CaO"], correta:1 },
{ materia:"Química", pergunta:"O sal de cozinha tem fórmula:", opcoes:["KCl","NaCl","NaOH","HCl"], correta:1 },
{ materia:"Química", pergunta:"A mudança de estado sólido para líquido chama-se:", opcoes:["Fusão","Solidificação","Condensação","Sublimação"], correta:0 },
{ materia:"Química", pergunta:"A mudança de estado líquido para gasoso chama-se:", opcoes:["Fusão","Vaporização","Condensação","Sublimação"], correta:1 },
{ materia:"Química", pergunta:"A mudança de estado gasoso para líquido chama-se:", opcoes:["Solidificação","Fusão","Condensação","Sublimação"], correta:2 },
{ materia:"Química", pergunta:"Mistura homogênea apresenta:", opcoes:["Uma única fase","Duas fases visíveis","Partes separadas grandes","Somente sólidos"], correta:0 },
{ materia:"Química", pergunta:"Mistura heterogênea apresenta:", opcoes:["Uma única fase","Duas ou mais fases","Somente líquidos","Somente gases"], correta:1 },
{ materia:"Química", pergunta:"A água pura é considerada uma:", opcoes:["Mistura","Substância composta","Substância simples","Liga metálica"], correta:1 },
{ materia:"Química", pergunta:"O oxigênio do ar que respiramos é encontrado principalmente como:", opcoes:["O","O₂","O₃","OH"], correta:1 },
{ materia:"Química", pergunta:"A camada eletrônica de valência é a:", opcoes:["Mais interna","Mais externa","Do meio","Do núcleo"], correta:1 },
{ materia:"Química", pergunta:"Os gases nobres são conhecidos por:", opcoes:["Alta reatividade","Baixa reatividade","Serem líquidos","Não existirem na natureza"], correta:1 },
{ materia:"Química", pergunta:"O ferro tem símbolo químico:", opcoes:["Fe","F","Fr","Ir"], correta:0 },
{ materia:"Química", pergunta:"O ouro tem símbolo químico:", opcoes:["Au","Ag","Go","Or"], correta:0 },
{ materia:"Química", pergunta:"A prata tem símbolo químico:", opcoes:["Pt","Pr","Ag","Pa"], correta:2 },
{ materia:"Química", pergunta:"A ferrugem é resultado de um processo de:", opcoes:["Fusão","Oxidação","Ebulição","Filtração"], correta:1 },

{ materia:"Matemática", pergunta:"3.000.000 em notação científica é:", opcoes:["3 × 10³","3 × 10⁴","3 × 10⁵","3 × 10⁶"], correta:3 },
{ materia:"Matemática", pergunta:"Qual é o resultado de 2²?", opcoes:["2","4","6","8"], correta:1 },
{ materia:"Matemática", pergunta:"A raiz quadrada de 81 é:", opcoes:["7","8","9","10"], correta:2 },
{ materia:"Matemática", pergunta:"50% de 200 é:", opcoes:["50","100","150","200"], correta:1 },
{ materia:"Matemática", pergunta:"Se x + 5 = 12, então x é:", opcoes:["5","6","7","8"], correta:2 },
{ materia:"Matemática", pergunta:"O resultado de 7 + 8 é:", opcoes:["13","14","15","16"], correta:2 },
{ materia:"Matemática", pergunta:"O resultado de 9 × 6 é:", opcoes:["54","45","63","49"], correta:0 },
{ materia:"Matemática", pergunta:"O resultado de 56 ÷ 8 é:", opcoes:["6","7","8","9"], correta:1 },
{ materia:"Matemática", pergunta:"25% corresponde a:", opcoes:["1/2","1/3","1/4","1/5"], correta:2 },
{ materia:"Matemática", pergunta:"A fração 1/2 em decimal é:", opcoes:["0,2","0,25","0,5","0,75"], correta:2 },
{ materia:"Matemática", pergunta:"A fração 3/4 em decimal é:", opcoes:["0,25","0,5","0,75","1,25"], correta:2 },
{ materia:"Matemática", pergunta:"O valor de 10² é:", opcoes:["20","100","1000","10"], correta:1 },
{ materia:"Matemática", pergunta:"O valor de 2³ é:", opcoes:["6","8","4","12"], correta:1 },
{ materia:"Matemática", pergunta:"A raiz quadrada de 64 é:", opcoes:["6","7","8","9"], correta:2 },
{ materia:"Matemática", pergunta:"Se 3x = 18, então x vale:", opcoes:["5","6","7","8"], correta:1 },
{ materia:"Matemática", pergunta:"Se 2x + 4 = 10, então x vale:", opcoes:["2","3","4","5"], correta:1 },
{ materia:"Matemática", pergunta:"O dobro de 15 é:", opcoes:["20","25","30","35"], correta:2 },
{ materia:"Matemática", pergunta:"A metade de 48 é:", opcoes:["22","24","26","28"], correta:1 },
{ materia:"Matemática", pergunta:"O perímetro de um quadrado de lado 5 é:", opcoes:["10","15","20","25"], correta:2 },
{ materia:"Matemática", pergunta:"A área de um quadrado de lado 4 é:", opcoes:["8","12","16","20"], correta:2 },
{ materia:"Matemática", pergunta:"A soma dos ângulos internos de um triângulo é:", opcoes:["90°","180°","270°","360°"], correta:1 },
{ materia:"Matemática", pergunta:"Um ângulo de 90° é chamado de:", opcoes:["Agudo","Obtuso","Reto","Raso"], correta:2 },
{ materia:"Matemática", pergunta:"Um ângulo menor que 90° é:", opcoes:["Reto","Agudo","Obtuso","Raso"], correta:1 },
{ materia:"Matemática", pergunta:"O sucessor de 99 é:", opcoes:["100","98","101","97"], correta:0 },
{ materia:"Matemática", pergunta:"O antecessor de 50 é:", opcoes:["48","49","51","52"], correta:1 },
{ materia:"Matemática", pergunta:"5% de 200 é:", opcoes:["5","10","15","20"], correta:1 },
{ materia:"Matemática", pergunta:"10% de 350 é:", opcoes:["25","30","35","40"], correta:2 },
{ materia:"Matemática", pergunta:"A média aritmética de 6, 8 e 10 é:", opcoes:["7","8","9","10"], correta:1 },
{ materia:"Matemática", pergunta:"O MMC de 4 e 6 é:", opcoes:["8","10","12","24"], correta:2 },
{ materia:"Matemática", pergunta:"O MDC de 12 e 18 é:", opcoes:["2","3","6","9"], correta:2 },

// ==============================
// BLOCO 2 — PERGUNTAS 101 A 200
// ==============================

{ materia:"Física", pergunta:"A unidade de diferença de potencial elétrico é:", opcoes:["Ampère","Ohm","Volt","Tesla"], correta:2 },
{ materia:"Física", pergunta:"A unidade de carga elétrica no SI é:", opcoes:["Coulomb","Joule","Watt","Pascal"], correta:0 },
{ materia:"Física", pergunta:"A terceira lei de Newton é conhecida como lei da:", opcoes:["Inércia","Ação e reação","Gravitação","Conservação"], correta:1 },
{ materia:"Física", pergunta:"A energia potencial elástica está associada à:", opcoes:["Temperatura","Deformação","Velocidade","Pressão"], correta:1 },
{ materia:"Física", pergunta:"O instrumento usado para medir corrente elétrica é o:", opcoes:["Voltímetro","Amperímetro","Ohmímetro","Termômetro"], correta:1 },
{ materia:"Física", pergunta:"O instrumento usado para medir tensão elétrica é o:", opcoes:["Voltímetro","Amperímetro","Barômetro","Calorímetro"], correta:0 },
{ materia:"Física", pergunta:"Em um circuito simples, a função da bateria é fornecer:", opcoes:["Resistência","Energia elétrica","Luz","Atrito"], correta:1 },
{ materia:"Física", pergunta:"A associação de resistores em série apresenta corrente:", opcoes:["Diferente em cada resistor","Igual em todos","Nula sempre","Invertida"], correta:1 },
{ materia:"Física", pergunta:"A associação de resistores em paralelo apresenta tensão:", opcoes:["Igual em todos os ramos","Sempre diferente","Nula","Dependente da massa"], correta:0 },
{ materia:"Física", pergunta:"A unidade de potência elétrica também é:", opcoes:["Newton","Volt","Watt","Coulomb"], correta:2 },
{ materia:"Física", pergunta:"A resistência elétrica de um fio depende, entre outros fatores, do:", opcoes:["Comprimento","Cheiro","Peso do planeta","Volume do ar"], correta:0 },
{ materia:"Física", pergunta:"Em queda livre ideal, todos os corpos caem com a mesma:", opcoes:["Massa","Densidade","Aceleração","Forma"], correta:2 },
{ materia:"Física", pergunta:"O movimento com velocidade constante é chamado de:", opcoes:["Movimento uniformemente variado","Movimento uniforme","Movimento circular","Movimento acelerado"], correta:1 },
{ materia:"Física", pergunta:"No movimento uniformemente variado, a aceleração é:", opcoes:["Nula","Constante","Infinita","Negativa sempre"], correta:1 },
{ materia:"Física", pergunta:"A velocidade média em um gráfico posição × tempo está ligada à:", opcoes:["Inclinação da reta","Área do gráfico","Massa do corpo","Temperatura"], correta:0 },
{ materia:"Física", pergunta:"Quando a aceleração tem o mesmo sentido da velocidade, o corpo:", opcoes:["Diminui a rapidez","Aumenta a rapidez","Fica parado","Perde massa"], correta:1 },
{ materia:"Física", pergunta:"O calor sempre flui espontaneamente do corpo:", opcoes:["Mais frio para o mais quente","Mais quente para o mais frio","Mais leve para o mais pesado","Maior para o menor"], correta:1 },
{ materia:"Física", pergunta:"A mudança do estado líquido para sólido chama-se:", opcoes:["Fusão","Solidificação","Sublimação","Condensação"], correta:1 },
{ materia:"Física", pergunta:"Quando uma substância passa do sólido direto para o gasoso, ocorre:", opcoes:["Fusão","Sublimação","Condensação","Liquefação"], correta:1 },
{ materia:"Física", pergunta:"A propagação de calor por contato direto é chamada de:", opcoes:["Convecção","Radiação","Condução","Refração"], correta:2 },
{ materia:"Física", pergunta:"A propagação de calor no vácuo ocorre por:", opcoes:["Condução","Convecção","Radiação","Fusão"], correta:2 },
{ materia:"Física", pergunta:"Em líquidos e gases, a transmissão de calor com movimento do fluido é:", opcoes:["Condução","Convecção","Reflexão","Difração"], correta:1 },
{ materia:"Física", pergunta:"A imagem formada por um espelho plano tem tamanho:", opcoes:["Menor","Maior","Igual ao objeto","Variável sempre"], correta:2 },
{ materia:"Física", pergunta:"Em um espelho plano, a distância da imagem ao espelho é:", opcoes:["Maior que a do objeto","Menor que a do objeto","Igual à do objeto","Sempre zero"], correta:2 },
{ materia:"Física", pergunta:"A cor branca resulta da:", opcoes:["Ausência total de luz","Mistura de várias cores de luz","Presença de apenas luz vermelha","Refração da luz"], correta:1 },
{ materia:"Física", pergunta:"A frequência de uma onda está relacionada ao número de:", opcoes:["Reflexões","Oscilações por segundo","Choques por minuto","Curvas por metro"], correta:1 },
{ materia:"Física", pergunta:"A unidade de período no SI é:", opcoes:["Hertz","Segundo","Metro","Watt"], correta:1 },
{ materia:"Física", pergunta:"O período de uma onda é o tempo de:", opcoes:["Uma oscilação completa","Duas reflexões","Uma refração","Uma aceleração"], correta:0 },
{ materia:"Física", pergunta:"Quanto maior a frequência, menor o:", opcoes:["Comprimento de onda","Número de oscilações","Valor da energia","Som emitido"], correta:0 },
{ materia:"Física", pergunta:"O eco é um exemplo de:", opcoes:["Refração do som","Absorção do som","Reflexão do som","Polarização"], correta:2 },
{ materia:"Física", pergunta:"A energia não pode ser criada nem destruída, apenas transformada. Isso expressa a lei da:", opcoes:["Ação e reação","Conservação da energia","Gravitação universal","Refração"], correta:1 },
{ materia:"Física", pergunta:"A unidade de pressão no SI é:", opcoes:["Pascal","Newton","Joule","Watt"], correta:0 },
{ materia:"Física", pergunta:"A pressão atmosférica é causada principalmente pelo:", opcoes:["Peso do ar","Calor do Sol","Campo magnético","Movimento da Lua"], correta:0 },
{ materia:"Física", pergunta:"O empuxo é a força que um fluido exerce em um corpo:", opcoes:["Para baixo","Para cima","Horizontalmente","Para o centro"], correta:1 },
{ materia:"Física", pergunta:"Um corpo flutua quando o empuxo é:", opcoes:["Menor que zero","Suficiente para equilibrar seu peso","Nulo","Sempre maior que a pressão"], correta:1 },

{ materia:"Química", pergunta:"O carbono tem número atômico:", opcoes:["4","6","8","12"], correta:1 },
{ materia:"Química", pergunta:"O oxigênio tem número atômico:", opcoes:["6","7","8","10"], correta:2 },
{ materia:"Química", pergunta:"O hidrogênio possui número atômico:", opcoes:["1","2","3","4"], correta:0 },
{ materia:"Química", pergunta:"A matéria é formada por:", opcoes:["Somente moléculas","Átomos e outras partículas","Apenas energia","Luz condensada"], correta:1 },
{ materia:"Química", pergunta:"Prótons possuem carga elétrica:", opcoes:["Negativa","Positiva","Nula","Variável"], correta:1 },
{ materia:"Química", pergunta:"Elétrons possuem carga elétrica:", opcoes:["Positiva","Negativa","Nula","Dupla"], correta:1 },
{ materia:"Química", pergunta:"Nêutrons possuem carga elétrica:", opcoes:["Positiva","Negativa","Nula","Alternada"], correta:2 },
{ materia:"Química", pergunta:"O núcleo do átomo é formado por:", opcoes:["Prótons e nêutrons","Elétrons e prótons","Somente elétrons","Íons"], correta:0 },
{ materia:"Química", pergunta:"Os elétrons localizam-se:", opcoes:["No núcleo","Na eletrosfera","No próton","No nêutron"], correta:1 },
{ materia:"Química", pergunta:"Átomos do mesmo elemento com diferentes números de nêutrons são:", opcoes:["Íons","Isóbaros","Isótopos","Cátions"], correta:2 },
{ materia:"Química", pergunta:"A soma de prótons e nêutrons corresponde ao número:", opcoes:["Atômico","De massa","De Avogadro","Molar"], correta:1 },
{ materia:"Química", pergunta:"Uma substância formada por moléculas iguais é considerada:", opcoes:["Mistura","Substância pura","Solução","Liga"], correta:1 },
{ materia:"Química", pergunta:"A separação de sólido e líquido por filtro chama-se:", opcoes:["Destilação","Filtração","Decantação","Centrifugação"], correta:1 },
{ materia:"Química", pergunta:"A separação de líquidos miscíveis com diferentes pontos de ebulição chama-se:", opcoes:["Filtração","Catação","Destilação","Peneiração"], correta:2 },
{ materia:"Química", pergunta:"A separação entre água e óleo pode ser feita por:", opcoes:["Decantação","Fusão","Sublimação","Cromatografia"], correta:0 },
{ materia:"Química", pergunta:"Em uma solução, a substância dissolvida é chamada de:", opcoes:["Solvente","Soluto","Precipitado","Catalisador"], correta:1 },
{ materia:"Química", pergunta:"Em uma solução aquosa, a água geralmente é o:", opcoes:["Soluto","Solvente","Ácido","Sal"], correta:1 },
{ materia:"Química", pergunta:"O ar atmosférico é um exemplo de mistura:", opcoes:["Heterogênea","Homogênea","Simples","Composta"], correta:1 },
{ materia:"Química", pergunta:"Leite é geralmente classificado como uma mistura:", opcoes:["Homogênea simples","Heterogênea coloidal","Substância pura","Elemento químico"], correta:1 },
{ materia:"Química", pergunta:"A evaporação é uma forma de vaporização:", opcoes:["Lenta","Instantânea","Explosiva","Sólida"], correta:0 },
{ materia:"Química", pergunta:"A ebulição é uma forma de vaporização:", opcoes:["Lenta e superficial","Rápida em toda a massa do líquido","Somente no congelamento","Somente no vácuo"], correta:1 },
{ materia:"Química", pergunta:"O processo de transformação do vapor em líquido é chamado de:", opcoes:["Fusão","Condensação","Sublimação","Calefação"], correta:1 },
{ materia:"Química", pergunta:"O ozônio é uma forma alotrópica do:", opcoes:["Carbono","Oxigênio","Nitrogênio","Hidrogênio"], correta:1 },
{ materia:"Química", pergunta:"Diamante e grafite são formas alotrópicas do:", opcoes:["Oxigênio","Carbono","Ferro","Enxofre"], correta:1 },
{ materia:"Química", pergunta:"A massa molecular da água é a soma das massas atômicas de:", opcoes:["1 H e 1 O","2 H e 1 O","1 H e 2 O","2 H e 2 O"], correta:1 },
{ materia:"Química", pergunta:"O gás nitrogênio é encontrado no ar principalmente como:", opcoes:["N","N₂","NO₂","NH₃"], correta:1 },
{ materia:"Química", pergunta:"Na classificação periódica, os elementos estão distribuídos em:", opcoes:["Linhas e colunas","Círculos e raios","Camadas e fases","Níveis e subníveis visíveis"], correta:0 },
{ materia:"Química", pergunta:"As linhas horizontais da tabela periódica são chamadas de:", opcoes:["Famílias","Períodos","Grupos","Blocos"], correta:1 },
{ materia:"Química", pergunta:"As colunas verticais da tabela periódica são chamadas de:", opcoes:["Períodos","Séries","Famílias ou grupos","Níveis"], correta:2 },
{ materia:"Química", pergunta:"Os metais alcalinos estão na família:", opcoes:["1","2","17","18"], correta:0 },
{ materia:"Química", pergunta:"Os halogênios pertencem à família:", opcoes:["1","2","17","18"], correta:2 },
{ materia:"Química", pergunta:"Os gases nobres pertencem à família:", opcoes:["16","17","18","1"], correta:2 },
{ materia:"Química", pergunta:"O elemento mais abundante no universo é o:", opcoes:["Oxigênio","Carbono","Hidrogênio","Hélio"], correta:2 },
{ materia:"Química", pergunta:"Uma reação química produz novas:", opcoes:["Partes do átomo","Substâncias","Espécies de prótons","Leis físicas"], correta:1 },
{ materia:"Química", pergunta:"A fotossíntese é um exemplo de processo:", opcoes:["Químico","Apenas físico","Nuclear","Mecânico"], correta:0 },

{ materia:"Matemática", pergunta:"O valor de 15 + 27 é:", opcoes:["40","41","42","43"], correta:2 },
{ materia:"Matemática", pergunta:"O valor de 13 × 4 é:", opcoes:["48","50","52","54"], correta:2 },
{ materia:"Matemática", pergunta:"O resultado de 96 ÷ 12 é:", opcoes:["6","7","8","9"], correta:2 },
{ materia:"Matemática", pergunta:"A fração 2/5 em decimal é:", opcoes:["0,2","0,4","0,5","0,25"], correta:1 },
{ materia:"Matemática", pergunta:"A fração 1/4 em decimal é:", opcoes:["0,25","0,5","0,75","0,4"], correta:0 },
{ materia:"Matemática", pergunta:"75% em forma decimal é:", opcoes:["0,75","7,5","0,075","75,0"], correta:0 },
{ materia:"Matemática", pergunta:"0,5 corresponde a:", opcoes:["50%","5%","500%","0,5%"], correta:0 },
{ materia:"Matemática", pergunta:"A expressão 4 + 3 × 2 vale:", opcoes:["14","10","11","12"], correta:1 },
{ materia:"Matemática", pergunta:"A expressão (4 + 3) × 2 vale:", opcoes:["10","12","14","16"], correta:2 },
{ materia:"Matemática", pergunta:"A raiz quadrada de 100 é:", opcoes:["8","9","10","11"], correta:2 },
{ materia:"Matemática", pergunta:"O valor de 5² é:", opcoes:["10","20","25","15"], correta:2 },
{ materia:"Matemática", pergunta:"O valor de 3³ é:", opcoes:["6","9","18","27"], correta:3 },
{ materia:"Matemática", pergunta:"Se x - 7 = 9, então x é:", opcoes:["14","15","16","17"], correta:2 },
{ materia:"Matemática", pergunta:"Se 4x = 32, então x vale:", opcoes:["6","7","8","9"], correta:2 },
{ materia:"Matemática", pergunta:"Se x/5 = 3, então x vale:", opcoes:["10","12","15","18"], correta:2 },
{ materia:"Matemática", pergunta:"O triplo de 12 é:", opcoes:["24","36","48","30"], correta:1 },
{ materia:"Matemática", pergunta:"A terça parte de 27 é:", opcoes:["7","8","9","10"], correta:2 },
{ materia:"Matemática", pergunta:"A área de um retângulo de lados 3 e 8 é:", opcoes:["11","24","16","48"], correta:1 },
{ materia:"Matemática", pergunta:"O perímetro de um retângulo de lados 2 e 6 é:", opcoes:["8","12","16","20"], correta:2 },
{ materia:"Matemática", pergunta:"Um ângulo de 180° é chamado de:", opcoes:["Reto","Agudo","Raso","Obtuso"], correta:2 },
{ materia:"Matemática", pergunta:"Um ângulo maior que 90° e menor que 180° é:", opcoes:["Agudo","Obtuso","Reto","Completo"], correta:1 },
{ materia:"Matemática", pergunta:"O sucessor de 199 é:", opcoes:["198","200","201","299"], correta:1 },
{ materia:"Matemática", pergunta:"O antecessor de 1000 é:", opcoes:["999","998","1001","990"], correta:0 },
{ materia:"Matemática", pergunta:"20% de 150 é:", opcoes:["25","30","35","40"], correta:1 },
{ materia:"Matemática", pergunta:"30% de 200 é:", opcoes:["50","60","70","80"], correta:1 },
{ materia:"Matemática", pergunta:"A média aritmética de 4, 6 e 8 é:", opcoes:["5","6","7","8"], correta:1 },
{ materia:"Matemática", pergunta:"A média de 10, 20 e 30 é:", opcoes:["15","20","25","30"], correta:1 },
{ materia:"Matemática", pergunta:"O MMC de 3 e 5 é:", opcoes:["8","10","12","15"], correta:3 },
{ materia:"Matemática", pergunta:"O MDC de 20 e 30 é:", opcoes:["5","10","15","20"], correta:1 },
{ materia:"Matemática", pergunta:"O número primo entre as opções é:", opcoes:["9","15","17","21"], correta:2 },
{ materia:"Matemática", pergunta:"O número par entre as opções é:", opcoes:["13","17","22","25"], correta:2 },
{ materia:"Matemática", pergunta:"A soma de dois números pares é sempre:", opcoes:["Ímpar","Par","Primo","Negativa"], correta:1 },
{ materia:"Matemática", pergunta:"A soma de um número par com um ímpar é sempre:", opcoes:["Par","Ímpar","Primo","Zero"], correta:1 },
{ materia:"Matemática", pergunta:"Na equação 2x + 1 = 9, o valor de x é:", opcoes:["3","4","5","6"], correta:1 },
{ materia:"Matemática", pergunta:"Na equação x + 12 = 20, o valor de x é:", opcoes:["6","7","8","9"], correta:2 },

// ==============================
// BLOCO 3 — PERGUNTAS 201 A 300
// ==============================

{ materia:"Física", pergunta:"A unidade de energia no SI é:", opcoes:["Watt","Pascal","Joule","Ohm"], correta:2 },
{ materia:"Física", pergunta:"A potência mede a rapidez com que a energia é:", opcoes:["Criada","Transportada","Transformada ou consumida","Pesada"], correta:2 },
{ materia:"Física", pergunta:"A fórmula da densidade é:", opcoes:["massa ÷ volume","volume ÷ massa","força ÷ área","massa × volume"], correta:0 },
{ materia:"Física", pergunta:"A força peso é calculada por:", opcoes:["P = m + g","P = m ÷ g","P = m × g","P = g ÷ m"], correta:2 },
{ materia:"Física", pergunta:"A energia potencial gravitacional depende da massa, da gravidade e da:", opcoes:["Pressão","Altura","Velocidade","Temperatura"], correta:1 },
{ materia:"Física", pergunta:"A energia cinética está associada ao:", opcoes:["Calor","Movimento","Estado físico","Volume"], correta:1 },
{ materia:"Física", pergunta:"Um corpo em repouso tem velocidade:", opcoes:["Constante e diferente de zero","Igual a zero","Maior que a aceleração","Negativa sempre"], correta:1 },
{ materia:"Física", pergunta:"No MRU, o gráfico posição × tempo é:", opcoes:["Uma parábola","Uma reta","Um círculo","Uma senoide"], correta:1 },
{ materia:"Física", pergunta:"No MUV, o gráfico velocidade × tempo é:", opcoes:["Uma reta","Um círculo","Uma curva fechada","Sempre horizontal"], correta:0 },
{ materia:"Física", pergunta:"A aceleração média é dada por:", opcoes:["Δs ÷ Δt","Δv ÷ Δt","v ÷ s","m ÷ t"], correta:1 },
{ materia:"Física", pergunta:"Quando a força resultante sobre um corpo aumenta, sua aceleração tende a:", opcoes:["Diminuir","Aumentar","Sumir","Ficar sempre zero"], correta:1 },
{ materia:"Física", pergunta:"Se a massa aumenta e a força permanece a mesma, a aceleração:", opcoes:["Aumenta","Diminui","Não muda","Dobra sempre"], correta:1 },
{ materia:"Física", pergunta:"A inércia é a tendência de um corpo de:", opcoes:["Mudar de cor","Resistir a mudanças de movimento","Aumentar a massa","Perder energia"], correta:1 },
{ materia:"Física", pergunta:"O atrito é maior, em geral, em superfícies:", opcoes:["Mais lisas","Mais rugosas","Sem contato","Molhadas sempre"], correta:1 },
{ materia:"Física", pergunta:"Em um lançamento vertical para cima, no ponto mais alto a velocidade é:", opcoes:["Máxima","Nula","Negativa infinita","Igual à gravidade"], correta:1 },
{ materia:"Física", pergunta:"Na subida de um corpo lançado verticalmente, a aceleração da gravidade aponta:", opcoes:["Para cima","Para baixo","Para frente","Para o lado"], correta:1 },
{ materia:"Física", pergunta:"O calor específico de uma substância indica a quantidade de calor necessária para variar:", opcoes:["A massa do corpo","1°C de sua temperatura","Seu volume em 1 litro","Sua pressão total"], correta:1 },
{ materia:"Física", pergunta:"Quando dois corpos atingem a mesma temperatura, eles estão em:", opcoes:["Movimento uniforme","Equilíbrio térmico","Equilíbrio químico","Fusão"], correta:1 },
{ materia:"Física", pergunta:"A escala Celsius marca a fusão da água em:", opcoes:["0°C","32°C","100°C","273°C"], correta:0 },
{ materia:"Física", pergunta:"A ebulição da água ao nível do mar ocorre em:", opcoes:["0°C","50°C","100°C","212°C"], correta:2 },
{ materia:"Física", pergunta:"A escala Kelvin é uma escala:", opcoes:["Relativa","Absoluta","Decimal","Logarítmica"], correta:1 },
{ materia:"Física", pergunta:"0 K corresponde ao chamado:", opcoes:["Ponto de fusão","Zero absoluto","Calor latente","Equilíbrio térmico"], correta:1 },
{ materia:"Física", pergunta:"Em uma onda, a distância entre duas cristas consecutivas é o:", opcoes:["Período","Comprimento de onda","Amplitude","Pulso"], correta:1 },
{ materia:"Física", pergunta:"A amplitude de uma onda está relacionada à:", opcoes:["Energia da onda","Velocidade da luz","Temperatura do meio","Pressão atmosférica"], correta:0 },
{ materia:"Física", pergunta:"Ondas mecânicas precisam de:", opcoes:["Vácuo","Meio material","Luz intensa","Campo elétrico"], correta:1 },
{ materia:"Física", pergunta:"A luz é uma onda:", opcoes:["Mecânica","Eletromagnética","Sonora","Térmica"], correta:1 },
{ materia:"Física", pergunta:"A sombra se forma devido à propagação:", opcoes:["Curva da luz","Retilínea da luz","Circular da luz","Térmica da luz"], correta:1 },
{ materia:"Física", pergunta:"A lente convergente é mais espessa:", opcoes:["Nas bordas","No centro","Igualmente em toda parte","Em um lado só"], correta:1 },
{ materia:"Física", pergunta:"A lente divergente é mais fina:", opcoes:["Nas bordas","No centro","No foco","Na base"], correta:1 },
{ materia:"Física", pergunta:"O arco-íris é explicado principalmente por fenômenos de:", opcoes:["Reflexão e dispersão","Condução e convecção","Apenas difração","Eletrização"], correta:0 },
{ materia:"Física", pergunta:"O trovão é percebido depois do relâmpago porque o som tem velocidade:", opcoes:["Maior que a luz","Menor que a luz","Igual à da luz","Nula no ar"], correta:1 },
{ materia:"Física", pergunta:"Quando um fio é percorrido por corrente elétrica, ele pode produzir:", opcoes:["Campo magnético","Somente calor","Somente luz","Somente massa"], correta:0 },
{ materia:"Física", pergunta:"Ímãs possuem dois polos chamados:", opcoes:["Positivo e negativo","Norte e sul","Leste e oeste","Claro e escuro"], correta:1 },
{ materia:"Física", pergunta:"Polos iguais de dois ímãs se:", opcoes:["Atraem","Repelem","Anulam","Fundem"], correta:1 },
{ materia:"Física", pergunta:"Polos diferentes de dois ímãs se:", opcoes:["Repelem","Atraem","Desmagnetizam","Neutralizam"], correta:1 },

{ materia:"Química", pergunta:"O elemento químico presente em todos os compostos orgânicos é o:", opcoes:["Oxigênio","Carbono","Hidrogênio","Nitrogênio"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do metano é:", opcoes:["CH₄","C₂H₆","CO₂","CH₃OH"], correta:0 },
{ materia:"Química", pergunta:"A fórmula da amônia é:", opcoes:["NH₃","NO₂","N₂O","HNO₃"], correta:0 },
{ materia:"Química", pergunta:"A fórmula do ácido sulfúrico é:", opcoes:["HCl","H₂SO₄","NaOH","H₂CO₃"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do ácido nítrico é:", opcoes:["HNO₃","H₂SO₄","NaNO₃","NH₄OH"], correta:0 },
{ materia:"Química", pergunta:"A fórmula do hidróxido de sódio é:", opcoes:["NaCl","NaOH","Na₂O","HNa"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do carbonato de cálcio é:", opcoes:["CaO","CaCO₃","CaCl₂","COCa"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do gás oxigênio é:", opcoes:["O","O₂","O₃","O₄"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do gás hidrogênio é:", opcoes:["H","H₂","H₃","H₄"], correta:1 },
{ materia:"Química", pergunta:"A fórmula do ácido clorídrico é:", opcoes:["HCl","ClH₂","NaCl","HClO"], correta:0 },
{ materia:"Química", pergunta:"Uma reação de neutralização ocorre entre:", opcoes:["Ácido e base","Sal e metal","Óxido e água sempre","Dois ácidos"], correta:0 },
{ materia:"Química", pergunta:"Em uma reação química, a soma das massas dos reagentes e dos produtos tende a ser:", opcoes:["Diferente","Igual","Aleatória","Nula"], correta:1 },
{ materia:"Química", pergunta:"A lei da conservação das massas é associada a:", opcoes:["Dalton","Lavoisier","Bohr","Rutherford"], correta:1 },
{ materia:"Química", pergunta:"O modelo atômico com elétrons em órbitas quantizadas foi proposto por:", opcoes:["Thomson","Bohr","Dalton","Lavoisier"], correta:1 },
{ materia:"Química", pergunta:"No modelo de Thomson, o átomo era comparado a:", opcoes:["Sistema solar","Bola de bilhar","Pudim de passas","Nuvem eletrônica"], correta:2 },
{ materia:"Química", pergunta:"O modelo de Dalton considerava o átomo como:", opcoes:["Divisível em camadas","Uma esfera maciça","Formado por órbitas","Apenas energia"], correta:1 },
{ materia:"Química", pergunta:"Rutherford concluiu que o átomo possui:", opcoes:["Núcleo pequeno e denso","Somente elétrons","Massa distribuída uniformemente","Ausência de núcleo"], correta:0 },
{ materia:"Química", pergunta:"Os elétrons de valência são importantes para explicar:", opcoes:["A cor do núcleo","As ligações químicas","O ponto de fusão da água","A gravidade"], correta:1 },
{ materia:"Química", pergunta:"Uma molécula formada por átomos iguais pode ser:", opcoes:["Substância simples","Substância composta","Mistura heterogênea","Solução aquosa"], correta:0 },
{ materia:"Química", pergunta:"Uma molécula formada por átomos diferentes é uma:", opcoes:["Substância simples","Substância composta","Partícula alfa","Mistura coloidal"], correta:1 },
{ materia:"Química", pergunta:"O átomo de cloro tende a:", opcoes:["Ganhar 1 elétron","Perder 2 elétrons","Ganhar 2 prótons","Perder todos os elétrons"], correta:0 },
{ materia:"Química", pergunta:"O átomo de sódio tende a:", opcoes:["Ganhar 1 elétron","Perder 1 elétron","Ganhar 2 elétrons","Permanecer sempre neutro"], correta:1 },
{ materia:"Química", pergunta:"A ligação entre sódio e cloro forma:", opcoes:["CO₂","NaCl","H₂O","NH₃"], correta:1 },
{ materia:"Química", pergunta:"Os compostos iônicos costumam apresentar altos pontos de:", opcoes:["Fusão e ebulição","Condensação apenas","Sublimação apenas","Evaporação"], correta:0 },
{ materia:"Química", pergunta:"Substâncias covalentes são comuns entre elementos:", opcoes:["Metálicos","Ametálicos","Radioativos apenas","Alcalinos"], correta:1 },
{ materia:"Química", pergunta:"Em geral, metais são bons condutores de:", opcoes:["Luz apenas","Calor e eletricidade","Somente calor","Somente eletricidade em líquidos"], correta:1 },
{ materia:"Química", pergunta:"O mercúrio, à temperatura ambiente, é um metal:", opcoes:["Gasoso","Líquido","Sólido","Plasmático"], correta:1 },
{ materia:"Química", pergunta:"A água sanitária é usada principalmente por sua ação:", opcoes:["Desinfetante","Combustível","Lubrificante","Corrosiva neutra"], correta:0 },
{ materia:"Química", pergunta:"A ferrugem se forma com a presença de oxigênio e:", opcoes:["Gelo","Umidade","Luz ultravioleta apenas","Areia"], correta:1 },
{ materia:"Química", pergunta:"A queima de combustíveis fósseis contribui para aumentar a concentração de:", opcoes:["Oxigênio","Gás carbônico","Hélio","Ozônio estratosférico"], correta:1 },
{ materia:"Química", pergunta:"O principal componente do gás de cozinha é o:", opcoes:["Metano ou GLP","Oxigênio puro","Nitrogênio líquido","Cloro"], correta:0 },
{ materia:"Química", pergunta:"A unidade usada para quantidade de matéria no SI é o:", opcoes:["Mol","Grama","Litro","Átomo"], correta:0 },
{ materia:"Química", pergunta:"O número de Avogadro é aproximadamente:", opcoes:["6,02 × 10²³","3,0 × 10⁸","9,8","1,6 × 10⁻¹⁹"], correta:0 },
{ materia:"Química", pergunta:"A massa atômica é expressa geralmente em:", opcoes:["u","kg","m","L"], correta:0 },
{ materia:"Química", pergunta:"O etanol é um exemplo de:", opcoes:["Álcool","Sal","Óxido","Base forte"], correta:0 },

{ materia:"Matemática", pergunta:"O valor de 18 + 25 é:", opcoes:["41","42","43","44"], correta:2 },
{ materia:"Matemática", pergunta:"O resultado de 14 × 5 é:", opcoes:["65","70","75","80"], correta:1 },
{ materia:"Matemática", pergunta:"O resultado de 144 ÷ 12 é:", opcoes:["10","11","12","13"], correta:2 },
{ materia:"Matemática", pergunta:"A fração 3/5 em decimal é:", opcoes:["0,3","0,4","0,5","0,6"], correta:3 },
{ materia:"Matemática", pergunta:"A fração 7/10 em decimal é:", opcoes:["0,07","0,7","7,0","0,17"], correta:1 },
{ materia:"Matemática", pergunta:"40% em forma decimal é:", opcoes:["0,04","0,4","4,0","40,0"], correta:1 },
{ materia:"Matemática", pergunta:"0,25 corresponde a:", opcoes:["2,5%","25%","250%","0,25%"], correta:1 },
{ materia:"Matemática", pergunta:"A expressão 20 - 3 × 4 vale:", opcoes:["68","8","17","32"], correta:1 },
{ materia:"Matemática", pergunta:"A expressão (20 - 3) × 4 vale:", opcoes:["68","60","72","64"], correta:0 },
{ materia:"Matemática", pergunta:"A raiz quadrada de 121 é:", opcoes:["9","10","11","12"], correta:2 },
{ materia:"Matemática", pergunta:"O valor de 6² é:", opcoes:["12","18","24","36"], correta:3 },
{ materia:"Matemática", pergunta:"O valor de 4³ é:", opcoes:["16","32","64","48"], correta:2 },
{ materia:"Matemática", pergunta:"Se x - 15 = 20, então x é:", opcoes:["25","30","35","40"], correta:2 },
{ materia:"Matemática", pergunta:"Se 5x = 45, então x vale:", opcoes:["7","8","9","10"], correta:2 },
{ materia:"Matemática", pergunta:"Se x/4 = 6, então x vale:", opcoes:["20","22","24","26"], correta:2 },
{ materia:"Matemática", pergunta:"O quádruplo de 7 é:", opcoes:["21","24","28","32"], correta:2 },
{ materia:"Matemática", pergunta:"A quinta parte de 35 é:", opcoes:["5","6","7","8"], correta:2 },
{ materia:"Matemática", pergunta:"A área de um retângulo de lados 7 e 5 é:", opcoes:["12","30","35","40"], correta:2 },
{ materia:"Matemática", pergunta:"O perímetro de um retângulo de lados 4 e 9 é:", opcoes:["13","22","26","36"], correta:2 },
{ materia:"Matemática", pergunta:"Um ângulo de 360° é chamado de:", opcoes:["Raso","Obtuso","Completo","Agudo"], correta:2 },
{ materia:"Matemática", pergunta:"O sucessor de 999 é:", opcoes:["1000","1001","998","1099"], correta:0 },
{ materia:"Matemática", pergunta:"O antecessor de 1 é:", opcoes:["0","2","-1","10"], correta:0 },
{ materia:"Matemática", pergunta:"15% de 200 é:", opcoes:["20","25","30","35"], correta:2 },
{ materia:"Matemática", pergunta:"12% de 300 é:", opcoes:["24","30","36","42"], correta:2 },
{ materia:"Matemática", pergunta:"A média aritmética de 5, 7 e 9 é:", opcoes:["6","7","8","9"], correta:1 },
{ materia:"Matemática", pergunta:"A média de 12, 18 e 24 é:", opcoes:["16","18","20","22"], correta:1 },
{ materia:"Matemática", pergunta:"O MMC de 6 e 8 é:", opcoes:["12","24","36","48"], correta:1 },
{ materia:"Matemática", pergunta:"O MDC de 24 e 36 é:", opcoes:["6","8","12","18"], correta:2 },
{ materia:"Matemática", pergunta:"O número primo entre as opções é:", opcoes:["21","27","29","33"], correta:2 },
{ materia:"Matemática", pergunta:"O número ímpar entre as opções é:", opcoes:["10","14","18","19"], correta:3 },
{ materia:"Matemática", pergunta:"O produto de dois números negativos é:", opcoes:["Negativo","Positivo","Zero","Imaginário"], correta:1 },
{ materia:"Matemática", pergunta:"O produto de um número positivo por um negativo é:", opcoes:["Positivo","Negativo","Zero","Par"], correta:1 },
{ materia:"Matemática", pergunta:"Na equação 3x + 2 = 11, o valor de x é:", opcoes:["2","3","4","5"], correta:1 },
{ materia:"Matemática", pergunta:"Na equação x + 25 = 40, o valor de x é:", opcoes:["10","15","20","25"], correta:1 },
{ materia:"Matemática", pergunta:"A fração equivalente a 2/4 é:", opcoes:["1/2","2/3","3/4","4/5"], correta:0 }

];


// =====================================================
// CONTROLE DO CONTADOR REGRESSIVO
// =====================================================

let intervaloContadorDesafio = null;


// =====================================================
// UTILIDADES
// =====================================================

// Emoji das matérias
function obterEmojiMateria(materia){
if(materia === "Física") return "⚡";
if(materia === "Química") return "⚗️";
if(materia === "Matemática") return "📐";
return "📘";
}

// converte data para formato YYYY-MM-DD usando horário local
function formatarData(data){
const ano = data.getFullYear();
const mes = String(data.getMonth()+1).padStart(2,"0");
const dia = String(data.getDate()).padStart(2,"0");
return `${ano}-${mes}-${dia}`;
}

// calcula o dia do ano
function diaDoAno(){
const hoje = new Date();
const inicio = new Date(hoje.getFullYear(),0,0);
return Math.floor((hoje - inicio) / 86400000);
}

// formata milissegundos em HHh MMm SSs
function formatarTempoRestante(ms){

if(ms <= 0) return "00h 00m 00s";

const totalSegundos = Math.floor(ms / 1000);
const horas = Math.floor(totalSegundos / 3600);
const minutos = Math.floor((totalSegundos % 3600) / 60);
const segundos = totalSegundos % 60;

return `${String(horas).padStart(2,"0")}h ${String(minutos).padStart(2,"0")}m ${String(segundos).padStart(2,"0")}s`;
}

// calcula quanto falta até a próxima meia-noite local
function calcularTempoAteMeiaNoite(){

const agora = new Date();

const meiaNoite = new Date(
agora.getFullYear(),
agora.getMonth(),
agora.getDate() + 1,
0,0,0,0
);

return meiaNoite.getTime() - agora.getTime();
}


// =====================================================
// CONTADOR DO DESAFIO
// =====================================================

function iniciarContadorDesafio(mensagemBase = "⏳ Próxima pergunta em:"){

const el = document.getElementById("contadorDesafio");
const status = document.getElementById("statusXP");
const btn = document.getElementById("btnResponder");

if(!el) return;

// evita múltiplos intervalos ao mesmo tempo
if(intervaloContadorDesafio){
clearInterval(intervaloContadorDesafio);
intervaloContadorDesafio = null;
}

function atualizar(){

const tempoRestante = calcularTempoAteMeiaNoite();

if(tempoRestante <= 0){

el.innerHTML = "✅ Nova pergunta disponível!";
status.innerHTML = "";
btn.disabled = false;

clearInterval(intervaloContadorDesafio);
intervaloContadorDesafio = null;

return;
}

el.innerHTML = `${mensagemBase} ${formatarTempoRestante(tempoRestante)}`;
}

atualizar();
intervaloContadorDesafio = setInterval(atualizar,1000);
}

function pararContadorDesafio(){

const el = document.getElementById("contadorDesafio");

if(intervaloContadorDesafio){
clearInterval(intervaloContadorDesafio);
intervaloContadorDesafio = null;
}

if(el){
el.innerHTML = "";
}

}


// =====================================================
// TOGGLE DO CARD (abrir/fechar desafio)
// =====================================================

function toggleDesafio(){

const card = document.getElementById("cardDesafio");
card.classList.toggle("expandido");

}

window.toggleDesafio = toggleDesafio;


// =====================================================
// CARREGAR PERGUNTA DO DIA
// =====================================================

function carregarPergunta(){

// define qual pergunta usar hoje
const indice = diaDoAno() % perguntas.length;
const p = perguntas[indice];

// mostra pergunta e matéria
document.getElementById("materiaPergunta").innerText =
`${obterEmojiMateria(p.materia)} ${p.materia}`;

document.getElementById("perguntaTexto").innerText = p.pergunta;

// cria as opções
const div = document.getElementById("opcoes");
div.innerHTML = "";

p.opcoes.forEach((op,i)=>{

div.innerHTML += `
<label>
<input type="radio" name="quiz" value="${i}">
${op}
</label>
`;

});

}


// =====================================================
// RESPONDER PERGUNTA
// =====================================================

async function responderPergunta(){

const botao = document.getElementById("btnResponder");
botao.disabled = true;

const user = auth.currentUser;

if(!user){
alert("Faça login.");
botao.disabled = false;
return;
}

// datas locais
const agora = new Date();
const hoje = formatarData(agora);

const dataOntem = new Date();
dataOntem.setDate(dataOntem.getDate() - 1);
const ontem = formatarData(dataOntem);

// documento do usuário
const ref = doc(db,"usuarios",user.uid);
const snap = await getDoc(ref);

let ultimo = null;
let streak = 0;
let maiorStreak = 0;

if(snap.exists()){

const dados = snap.data();

ultimo = dados.ultimoQuizDiario || null;
streak = dados.streakAtual || 0;
maiorStreak = dados.maiorStreak || 0;

}

// impedir resposta duplicada
if(ultimo === hoje){

document.getElementById("statusXP").innerHTML =
"⏳ Você já respondeu hoje.";

botao.disabled = true;
iniciarContadorDesafio("⏳ Próxima pergunta em:");
return;

}

// verificar opção marcada
const marcada = document.querySelector('input[name="quiz"]:checked');

if(!marcada){
alert("Selecione uma alternativa.");
botao.disabled = false;
return;
}

// resposta correta do dia
const indice = diaDoAno() % perguntas.length;
const correta = perguntas[indice].correta;


// =====================================================
// RESPOSTA ERRADA
// =====================================================

if(parseInt(marcada.value) !== correta){

document.getElementById("statusXP").innerHTML =
"❌ Resposta incorreta.";

await setDoc(ref,{
ultimoQuizDiario:hoje,
streakAtual:0
},{merge:true});

atualizarVisualStreak(0);
botao.disabled = true;
iniciarContadorDesafio("⏳ Tente novamente em:");
return;

}


// =====================================================
// RESPOSTA CORRETA
// =====================================================

// atualizar streak
if(ultimo === ontem){
streak += 1;
}else{
streak = 1;
}

if(streak > maiorStreak){
maiorStreak = streak;
}


// =====================================================
// XP
// =====================================================

const XP_BASE = 20;
const bonus = (streak - 1) * 5;
const xpTotal = XP_BASE + bonus;

// adiciona XP real
await adicionarXPImediato(xpTotal);

// recompensa Science Points
await adicionarSP(5);

// salvar progresso do desafio primeiro
await setDoc(ref,{
ultimoQuizDiario:hoje,
streakAtual:streak,
maiorStreak:maiorStreak
},{merge:true});

// agora atualiza missão semanal
await atualizarMissao(user.uid,"desafio");

// recarrega barra da missão
await carregarMissao(user.uid);


// =====================================================
// FEEDBACK VISUAL
// =====================================================

document.getElementById("statusXP").innerHTML =
`🔥 +${xpTotal} XP! (Streak: ${streak} dias)`;

atualizarVisualStreak(streak);
iniciarContadorDesafio("⏳ Próxima pergunta em:");


// confetti
if(typeof confetti === "function"){

confetti({
particleCount:120,
spread:70,
origin:{y:0.6}
});

}

}


// =====================================================
// ATUALIZAÇÃO VISUAL DA STREAK
// =====================================================

function atualizarVisualStreak(streak){

document.getElementById("streakInfo").innerHTML =
`🔥 Streak atual: ${streak} dias`;

document.getElementById("miniStreak").innerText =
`🔥 ${streak}`;

const barra = document.getElementById("streakBarFill");

if(barra){
barra.style.width = Math.min(streak * 10,100) + "%";
}

const cardDesafio = document.getElementById("cardDesafio");

if(streak >= 5){
cardDesafio.classList.add("streak-alta");
}else{
cardDesafio.classList.remove("streak-alta");
}

}


// =====================================================
// CARREGAR MISSÃO SEMANAL
// =====================================================

async function carregarMissao(uid){

    const ref = doc(db,"usuarios",uid);
    const snap = await getDoc(ref);

    const texto = document.getElementById("textoMissao");
    const barra = document.getElementById("barraMissao");

    if(!snap.exists()){
        if(barra) barra.style.width = "0%";
        if(texto) texto.innerText = "0 de 5 desafios concluídos";
        atualizarBotaoMissao(null);
        return;
    }

    const dados = snap.data();
    const missao = dados?.missaoSemanal || null;
    const desafios = Number(missao?.desafios || 0);

    console.log("missaoSemanal:", missao);
    console.log("desafios:", desafios);

    if(barra){
        barra.style.width = `${Math.min((desafios / 5) * 100, 100)}%`;
    }

    if(texto){
        texto.innerText = `${desafios} de 5 desafios concluídos`;
    }

    atualizarBotaoMissao(missao);
}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

auth.onAuthStateChanged(async(user)=>{

if(!user) return;

// carregar Science Points
carregarSP();

// carregar pergunta do dia
carregarPergunta();

// carregar missão semanal
await carregarMissao(user.uid);

const hoje = formatarData(new Date());

const ref = doc(db,"usuarios",user.uid);
const snap = await getDoc(ref);

const btn = document.getElementById("btnResponder");
const status = document.getElementById("statusXP");

if(snap.exists()){

const dados = snap.data();

if(dados.ultimoQuizDiario === hoje){

btn.disabled = true;
status.innerHTML = "⏳ Você já respondeu hoje.";
iniciarContadorDesafio("⏳ Próxima pergunta em:");

}else{

btn.disabled = false;
status.innerHTML = "";
pararContadorDesafio();

}

// atualizar streak
if(dados.streakAtual){
atualizarVisualStreak(dados.streakAtual);
}else{
atualizarVisualStreak(0);
}

}else{

btn.disabled = false;
status.innerHTML = "";
atualizarVisualStreak(0);
pararContadorDesafio();

}

});


// =====================================================
// EXPÕE FUNÇÃO PARA O HTML
// =====================================================

window.responderPergunta = responderPergunta;