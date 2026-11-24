/* =========================================================
   THE PERFECT MATCH — dados dos casais
   Para trocar nomes, fotos, recortes ou perguntas, edite aqui.

   crop.size / crop.pos = como a foto do casal é recortada
   para mostrar só aquele personagem na carta
   (valores CSS de background-size e background-position).
   ========================================================= */

/* desenhos usados nas costas das cartas (sorteados a cada jogo) */
const BACK_IMAGES = [
  "referencias/casal 1.jpeg",
  "referencias/casal 2.jpeg",
  "referencias/casal 3.jpeg",
  "referencias/casal 4.jpeg"
];

const COUPLES = [
  {
    id: "lj-peter",
    film: "Para Todos os Garotos que Já Amei",
    img: "casais/WhatsApp Image 2026-11-20 at 15.33.38.jpeg",
    people: [
      { name: "Lara Jean", crop: { size: "auto 115%", pos: "95% 30%" } },
      { name: "Peter",     crop: { size: "auto 115%", pos: "47% 10%" } }
    ],
    questions: [
      {
        q: "Qual bebidinha o Peter sempre leva para a Lara Jean?",
        options: ["Yakult", "Chá gelado", "Milkshake de morango", "Suco de laranja"],
        answer: 0
      },
      {
        q: "O que Lara Jean e Peter assinam para combinar as regras do namoro de mentira?",
        options: ["Um bilhete na geladeira", "Um contrato", "Um cartão de dia dos namorados", "Uma carta de despedida"],
        answer: 1
      }
    ]
  },
  {
    id: "kitty-minho",
    film: "XO, Kitty",
    img: "casais/WhatsApp Image 2026-11-20 at 15.34.22.jpeg",
    people: [
      { name: "Kitty",  crop: { size: "200% auto", pos: "4% 37%" } },
      { name: "Min Ho", crop: { size: "200% auto", pos: "100% 20%" } }
    ],
    questions: [
      {
        q: "Em qual escola Kitty e Min Ho estudam?",
        options: ["Rydell High", "East Highschool", "KISS", "Constance Billard"],
        answer: 2
      },
      {
        q: "Em que cidade Kitty conhece o Min Ho?",
        options: ["Tóquio", "Seul", "Busan", "Portland"],
        answer: 1
      },
      {
        q: "Onde Minho confessa seus sentimentos por Kitty a primeira vez?",
        options: ["Avião", "Dormitório", "Cafeteria", "Na escola"],
        answer: 0
      },
      {
        q: "Como Min Ho chama Kitty para provocá-la?",
        options: ["Kitty cat", "Song", "Covey", "Novata"],
        answer: 2
      },
      {
        q: "Onde Kitty e Min Ho se conhecem pela primeira vez?",
        options: ["Aeroporto", "Festival de boas vindas", "Refeitório", "Sala de aula"],
        answer: 0
      }
    ]
  },
  {
    id: "adriana-brayden",
    film: "Finding Her Edge",
    img: "casais/WhatsApp Image 2026-11-20 at 15.35.54.jpeg",
    people: [
      { name: "Adriana", crop: { size: "200% auto", pos: "9% 47%" } },
      { name: "Brayden", crop: { size: "200% auto", pos: "100% 30%" } }
    ],
    questions: [
      {
        q: "Qual esporte Adriana e Brayden praticam juntos?",
        options: ["Balé", "Patinação artística em dupla", "Dança no gelo", "Hóquei"],
        answer: 2
      },
      {
        q: "Além de parceiros no gelo, o que Adriana e Brayden fingem ser?",
        options: ["Irmãos", "Namorados", "Melhores amigos", "Rivais"],
        answer: 1
      },
      {
        q: "Qual é o objetivo do namoro falso dos dois?",
        options: ["Atrair patrocinadores", "Fazer ciúmes", "Ganhar seguidores", "Enganar a imprensa"],
        answer: 0
      }
    ]
  },
  {
    id: "sean-flora",
    film: "Beijar é a parte fácil",
    img: "casais/WhatsApp Image 2026-11-20 at 15.39.36.jpeg",
    people: [
      { name: "Flora",  crop: { size: "260% auto", pos: "13% 25%" } },
      { name: "Sean", crop: { size: "260% auto", pos: "80% 25%" } }
    ],
    questions: [
      {
        q: "Onde Flora e Sean passam todos os verões?",
        options: ["Cousins Beach", "Malibu", "Outer Banks", "Cape Cod"],
        answer: 0
      },
      {
        q: "Sean é irmão de qual personagem?",
        options: ["Steven", "Cam", "Jeremiah", "Nicole"],
        answer: 2
      }
    ]
  }
];
