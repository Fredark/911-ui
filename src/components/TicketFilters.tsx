import type { EmergencyFilters } from '../types/ticket';

interface EmergencyFiltersProps {
  filters: EmergencyFilters;
  onFiltersChange: (filters: EmergencyFilters) => void;
  responsibles: string[];
  locations: string[];
}

export function EmergencyFiltersComponent({ filters, onFiltersChange, responsibles, locations }: EmergencyFiltersProps) {
  const handleFilterChange = (key: keyof EmergencyFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === '' ? undefined : value
    };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filtros</h3>
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={clearFilters} 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Limpar todos
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="status-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Status
          </label>
          <div className="relative">
            <select
              id="status-filter"
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="appearance-none w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-colors cursor-pointer pr-8"
            >
              <option value="">Todos os Status</option>
              <option value="ATIVO">Ativo</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="FINALIZADO">Finalizado</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="level-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Nível
          </label>
          <div className="relative">
            <select
              id="level-filter"
              value={filters.level || ''}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              className="appearance-none w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-colors cursor-pointer pr-8"
            >
              <option value="">Todos os Níveis</option>
              <option value="CRÍTICO">Crítico</option>
              <option value="ALTO">Alto</option>
              <option value="MÉDIO">Médio</option>
              <option value="BAIXO">Baixo</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="responsible-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Responsável
          </label>
          <div className="relative">
            <select
              id="responsible-filter"
              value={filters.responsible || ''}
              onChange={(e) => handleFilterChange('responsible', e.target.value)}
              className="appearance-none w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-colors cursor-pointer pr-8"
            >
              <option value="">Todos os Responsáveis</option>
              {responsibles.map(responsible => (
                <option key={responsible} value={responsible}>{responsible}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="location-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Localização
          </label>
          <div className="relative">
            <select
              id="location-filter"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="appearance-none w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-colors cursor-pointer pr-8"
            >
              <option value="">Todas as Localizações</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 