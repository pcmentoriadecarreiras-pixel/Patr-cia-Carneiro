import { AgentType, AgentDefinition } from './types';
import { BrainCircuit, FileText, Users, Layers } from 'lucide-react';
import React from 'react';

export const AGENTS: AgentDefinition[] = [
  {
    id: AgentType.AUTOCONHECIMENTO,
    name: 'Autoconhecimento Profissional',
    description: 'Descubra forças, valores e propósito.',
    icon: 'BrainCircuit'
  },
  {
    id: AgentType.MENTORIA_CV,
    name: 'Mentoria CV & LinkedIn',
    description: 'Otimize seu perfil e currículo.',
    icon: 'FileText'
  },
  {
    id: AgentType.UP_ENTREVISTAS,
    name: 'Up Entrevistas',
    description: 'Simulação e preparação para vagas.',
    icon: 'Users'
  },
  {
    id: AgentType.COMBO_ALL,
    name: 'Combo Carreira 360°',
    description: 'A solução completa para sua recolocação.',
    icon: 'Layers'
  }
];

export const getIcon = (name: string, className?: string) => {
  switch (name) {
    case 'BrainCircuit': return <BrainCircuit className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <Layers className={className} />;
  }
};