import type { Emergency, EmergencyFilters } from '../types/ticket';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class EmergencyService {
  static async getEmergencies(filters?: EmergencyFilters): Promise<Emergency[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/emergencies?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching emergencies:', error);
      // Return mock data for development
      return this.getMockEmergencies();
    }
  }

  static async updateEmergencyStatus(emergencyId: string, status: Emergency['status']): Promise<Emergency> {
    try {
      const response = await fetch(`${API_BASE_URL}/emergencies/${emergencyId}`, {
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
  }

  private static getMockEmergencies(): Emergency[] {
    return [
      {
        id: '1',
        title: 'Acidente de Trânsito Grave',
        description: 'Colisão múltipla na BR-101, km 45. Várias vítimas feridas.',
        level: 'CRÍTICO',
        status: 'ATIVO',
        responsible: 'Polícia Militar',
        location: 'BR-101, km 45, São Paulo',
        victim: 'João Silva, Maria Santos',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T14:20:00Z',
        reporter: 'Carlos Oliveira'
      },
      {
        id: '2',
        title: 'Incêndio em Edifício Residencial',
        description: 'Fogo no 3º andar do prédio. Fumaça visível. Pessoas presas.',
        level: 'CRÍTICO',
        status: 'EM_ANDAMENTO',
        responsible: 'Corpo de Bombeiros',
        location: 'Rua das Flores, 123, Centro',
        victim: 'Família Silva',
        createdAt: '2024-01-14T09:15:00Z',
        updatedAt: '2024-01-15T11:45:00Z',
        reporter: 'Ana Costa'
      },
      {
        id: '3',
        title: 'Assalto a Banco',
        description: 'Suspeitos armados invadiram agência bancária. Reféns no local.',
        level: 'ALTO',
        status: 'EM_ANDAMENTO',
        responsible: 'Polícia Civil',
        location: 'Banco do Brasil, Av. Principal, 456',
        victim: 'Funcionários e clientes',
        createdAt: '2024-01-13T16:45:00Z',
        updatedAt: '2024-01-14T10:30:00Z',
        reporter: 'Pedro Santos'
      },
      {
        id: '4',
        title: 'Deslizamento de Terra',
        description: 'Deslizamento em área de risco. Casas ameaçadas.',
        level: 'ALTO',
        status: 'ATIVO',
        responsible: 'Defesa Civil',
        location: 'Morro da Babilônia, Zona Sul',
        victim: undefined,
        createdAt: '2024-01-15T08:20:00Z',
        updatedAt: '2024-01-15T08:20:00Z',
        reporter: 'Mariana Lima'
      },
      {
        id: '5',
        title: 'Vazamento de Gás',
        description: 'Vazamento em rede de gás. Área evacuada.',
        level: 'MÉDIO',
        status: 'EM_ANDAMENTO',
        responsible: 'Corpo de Bombeiros',
        location: 'Rua do Comércio, 789, Bairro Industrial',
        victim: undefined,
        createdAt: '2024-01-12T13:10:00Z',
        updatedAt: '2024-01-15T09:15:00Z',
        reporter: 'Roberto Almeida'
      },
      {
        id: '6',
        title: 'Tentativa de Suicídio',
        description: 'Pessoa ameaçando pular de ponte. Negociação em andamento.',
        level: 'CRÍTICO',
        status: 'EM_ANDAMENTO',
        responsible: 'Polícia Militar',
        location: 'Ponte Rio-Niterói, km 8',
        victim: 'João Pereira',
        createdAt: '2024-01-15T15:30:00Z',
        updatedAt: '2024-01-15T16:45:00Z',
        reporter: 'Maria Silva'
      },
      {
        id: '7',
        title: 'Acidente com Produtos Químicos',
        description: 'Vazamento de produtos químicos em fábrica. Área isolada.',
        level: 'ALTO',
        status: 'ATIVO',
        responsible: 'Corpo de Bombeiros',
        location: 'Distrito Industrial, Zona Norte',
        victim: 'Funcionários da fábrica',
        createdAt: '2024-01-15T12:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z',
        reporter: 'Carlos Mendes'
      }
    ];
  }
} 