/* ─────────────────────────────────────────────────────────
 * Types centralizados do projeto Lokitta Edx
 * ───────────────────────────────────────────────────────── */

/** Representa um vídeo no portfólio */
export interface Video {
  id: string;
  title: string;
  channel: string;
}

/** Representa dados de estatísticas */
export interface StatsData {
  views: number;
  subs: number;
  videosCount: number;
  source: string;
}

/** Representa um serviço oferecido */
export interface Service {
  iconName: string;
  title: string;
  description: string;
}

/** Representa um evento na timeline */
export interface TimelineEvent {
  year: string;
  text: string;
}

/** Representa um link de rede social */
export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  iconName: string;
}

/** Estado de abertura/fechamento das janelas */
export interface WindowStates {
  hero: boolean;
  about: boolean;
  services: boolean;
  portfolio: boolean;
  stats: boolean;
  contact: boolean;
}

/** Item exibido na Taskbar */
export interface TaskbarItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
}
