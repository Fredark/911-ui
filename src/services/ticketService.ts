import type { Emergency, EmergencyFilters } from '../types/ticket';

const API_BASE_URL = 'http://localhost:8000/api';

const mapUrgencyLevel = (level: number): Emergency['level'] => {
  if (level >= 5) return 'CRÍTICA';
  if (level === 4) return 'ALTA';
  if (level === 3) return 'MÉDIA';
  if (level === 2) return 'BAIXA';
  return 'MÍNIMA';
};

// Função para mapear emergency_type para responsável
const mapEmergencyType = (types: string[]): string => {
  console.log('Mapping emergency_type:', types);
  if (!Array.isArray(types)) return 'Não definido';
  if (types.includes('samu')) return 'SAMU';
  if (types.includes('bombeiros')) return 'Bombeiros';
  if (types.includes('policia')) return 'Polícia';
  console.log('No specific mapping found, returning:', types.join(', '));
  return types.join(', ');
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
    return ocorrencias.map((item: any) => {
      console.log('Processing item:', item);
      const responsible = mapEmergencyType(item.emergency_type);
      console.log('Mapped responsible:', responsible);
      return {
        id: item.id || String(Math.random()),
        title: 'Ocorrência',
        description: item.situation || 'Sem descrição',
        level: mapUrgencyLevel(item.urgency_level || 3),
        status: 'ATIVO', // ou outro status se disponível
        responsible: responsible,
        victim: item.victim || undefined,
        createdAt: item.timestamp || item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || item.timestamp || item.createdAt || new Date().toISOString(),
        reporter: item.reporter || 'Não informado',
        confidenceLevel: 'DESCONHECIDO',
      };
    });
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