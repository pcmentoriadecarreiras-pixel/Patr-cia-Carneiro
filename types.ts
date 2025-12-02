export enum AgentType {
  AUTOCONHECIMENTO = 'Autoconhecimento Profissional',
  MENTORIA_CV = 'Mentoria para Currículo e LinkedIn',
  UP_ENTREVISTAS = 'Up Entrevistas',
  COMBO_ALL = 'Combo Completo (Todos os Agentes)'
}

export enum ThemeStyle {
  DARK = 'Dark Luxury',
  LIGHT = 'Clean Minimalist',
  MEDIUM = 'Professional Blue'
}

export interface CarouselSlide {
  id: number;
  subtitle: string;
  headline: string;
  body: string;
  imageKeyword: string; // Used to fetch a relevant background
  cta?: string;
}

export interface GeneratedCreative {
  topic: string;
  targetAudience: string;
  slides: CarouselSlide[];
}

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
}