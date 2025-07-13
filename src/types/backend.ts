import type { Emergency } from './ticket';

export interface BackendEmergency {
  success: boolean;
  emergency_type: string[]; // Ex: ["policia", "samu"]
  urgency_level: number;    // Ex: 1 a 5
  situation: string;
  confidence_score: number; // 0 a 1
  location?: string | null;
  victim?: string | null;
  reporter?: string | null;
  timestamp?: string; // ISO string
}

// Mapeamento de nível numérico para string
function mapUrgencyLevel(level: number): Emergency['level'] {
  if (level >= 5) return 'CRÍTICA';
  if (level === 4) return 'ALTA';
  if (level === 3) return 'MÉDIA';
  if (level === 2) return 'BAIXA';
  return 'MÍNIMA';
}

// Mapeamento de tipo de emergência para responsável
function mapEmergencyType(types: string[]): string {
  if (types.includes('samu')) return 'SAMU';
  if (types.includes('bombeiros')) return 'Bombeiros';
  if (types.includes('policia')) return 'Polícia';
  return types.join(', ');
}

export function backendToEmergency(
  backend: BackendEmergency,
  id: string // gere um id único, ex: uuid
): Emergency {
  return {
    id,
    title: backend.situation,
    description: backend.situation,
    level: mapUrgencyLevel(backend.urgency_level),
    status: 'ATIVO', // ou outro status inicial
    responsible: mapEmergencyType(backend.emergency_type),
    victim: backend.victim || undefined,
    createdAt: backend.timestamp || new Date().toISOString(),
    updatedAt: backend.timestamp || new Date().toISOString(),
    reporter: backend.reporter || 'Desconhecido',
    confidenceLevel: 'DESCONHECIDO',
  };
} 