export interface Emergency {
  id: string;
  title: string;
  description: string;
  level: 'CRÍTICA' | 'ALTA' | 'MÉDIA' | 'BAIXA' | 'MÍNIMA';
  status: 'ATIVO' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'FINALIZADO';
  responsible: string;
  location: string;
  victim?: string;
  createdAt: string;
  updatedAt: string;
  reporter: string;
}

export interface EmergencyFilters {
  status?: Emergency['status'];
  level?: Emergency['level'];
  responsible?: string;
  location?: string;
} 