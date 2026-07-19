/**
 * CENTRAL DE CONTEÚDO (Anti-Hardcode)
 * 
 * Este arquivo concentra todos os textos, descrições e títulos do site.
 * Para mudar qualquer texto da interface, edite este arquivo em vez de 
 * modificar os componentes React (Clean Architecture).
 */

export const SITE_CONTENT = {
  // Informações Globais
  title: "Naraa_Edx",
  status: "* ONLINE *",
  
  // Hero Section
  hero: {
    description: "Profissional de edição de vídeo e criação de conteúdo com experiência prática produzindo vídeos para YouTube, Shorts, Reels e TikTok. Conteúdos de tecnologia, programação, games e vídeos educativos.",
    quote: "\"Meu objetivo é entregar vídeos claros, dinâmicos e que mantenham a atenção do público.\"",
  },

  // Timeline Section
  timeline: {
    title: "Minha Jornada",
    intro: "Em 2016 decidi criar meu primeiro canal no YouTube. Na época eu gravava e editava meus vídeos em um computador extremamente limitado, equipado com um processador Celeron. Mesmo com todas as dificuldades, passei horas aprendendo edição, design e criação de conteúdo por conta própria.",
    outro: "Se você procura alguém que entende a realidade de quem cria conteúdo e não apenas alguém que aperta botões em um editor de vídeo, estou à disposição para ajudar.",
  },

  // Services Section
  services: {
    title: "O que eu faço",
    level: "Nível: Básico - Intermediário",
    technicalSkillsTitle: "Habilidades Técnicas",
  },

  // Portfolio Section
  portfolio: {
    title: "Trabalhos Editados",
  },

  // Contact Section
  contact: {
    title: "Vamos trabalhar juntos!",
    description: "Estou disponível para novos projetos de edição e parcerias criativas.",
    email: "Naraaedx@gmail.com",
    buttonText: "Enviar Email",
    warningTitle: "Aviso do Sistema:",
    warningText: "Tempos de resposta podem variar dependendo da fila de renderização atual.",
  },

  // Títulos das Janelas (DesktopLayout)
  windows: {
    hero: { title: "naraa_edx.exe" },
    about: { title: "Timeline_Celeron_to_2025.docx" },
    services: { title: "servicos.json" },
    portfolio: { title: "portfolio.mp4" },
    stats: { title: "Estatisticas_Acumuladas.xls" },
    contact: { title: "contato.txt" },
  }
};
