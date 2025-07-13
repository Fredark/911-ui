import type { Emergency, EmergencyFilters } from '../types/ticket';

const API_BASE_URL = 'http://localhost:8000/api';

const mapUrgencyLevel = (level: number): Emergency['level'] => {
  if (level >= 5) return 'CRÍTICA';
  if (level === 4) return 'ALTA';
  if (level === 3) return 'MÉDIA';
  if (level === 2) return 'BAIXA';
  return 'MÍNIMA';
};

const mapStatus = (status: string): Emergency['status'] => {
  const statusMap: Record<string, Emergency['status']> = {
    'ativo': 'ATIVO',
    'em_andamento': 'EM_ANDAMENTO',
    'resolvido': 'RESOLVIDO',
    'finalizado': 'FINALIZADO'
  };
  return statusMap[status.toLowerCase()] || 'ATIVO';
};

export const getEmergencies = async (filters?: EmergencyFilters): Promise<Emergency[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/ocorrencias?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extrair o array de ocorrências da resposta da API
    const ocorrencias = data.ocorrencias || [];
    
    // Verificar se ocorrencias é um array
    if (!Array.isArray(ocorrencias)) {
      console.error('API response ocorrencias is not an array:', data);
      return [];
    }
    
    // Mapear os dados da API para o formato esperado pelo frontend
    return ocorrencias.map((item: any) => ({
      id: item.id || String(Math.random()),
      title: item.titulo || item.situacao || 'Ocorrência',
      description: item.descricao || item.situacao || 'Sem descrição',
      level: mapUrgencyLevel(item.nivel_urgencia || 3),
      status: mapStatus(item.status || 'ativo'),
      responsible: item.responsavel || 'Não definido',
      location: item.localizacao || 'Local não informado',
      victim: item.vitima || undefined,
      createdAt: item.data_criacao || item.timestamp || new Date().toISOString(),
      updatedAt: item.data_atualizacao || item.timestamp || new Date().toISOString(),
      reporter: item.reporter || item.solicitante || 'Não informado'
    }));
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    throw error;
  }
};

export const updateEmergencyStatus = async (emergencyId: string, status: Emergency['status']): Promise<Emergency> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ocorrencias/${emergencyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating emergency:', error);
    throw error;
  }
}; 