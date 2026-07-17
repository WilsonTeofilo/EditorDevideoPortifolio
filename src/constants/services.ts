import type { Service } from "@/types";

/**
 * Lista de serviços oferecidos.
 * iconName refere-se ao nome do ícone do Lucide React.
 */
export const SERVICES: Service[] = [
  {
    iconName: "PlayCircle",
    title: "Edicao para YouTube",
    description:
      "Cortes, transicoes, trilha sonora, legendas e limpeza de audio para videos longos e Shorts.",
  },
  {
    iconName: "PlayCircle",
    title: "Reels & TikTok",
    description:
      "Edicao vertical dinamica com memes, efeitos sonoros e ritmo para reter a audiencia.",
  },
  {
    iconName: "Briefcase",
    title: "Thumbnails",
    description:
      "Criacao de thumbnails com design atrativo e conceitos de contraste para atrair cliques.",
  },
];

/**
 * Lista de habilidades exibida abaixo dos serviços.
 */
export const SKILLS: string[] = [
  "Transicoes",
  "Cortes",
  "Limpeza de Audio",
  "Memes",
  "Efeitos Sonoros",
  "Trilhas Sonoras",
  "Legendas",
  "Design Basico",
  "Thumbnails",
];
