import type { Emergency } from '../types/ticket';

interface EmergencyCardProps {
  emergency: Emergency;
  onStatusChange?: (emergencyId: string, newStatus: Emergency['status']) => void;
}

export function EmergencyCard({ emergency, onStatusChange }: EmergencyCardProps) {
  const getLevelColor = (level: Emergency['level']) => {
    switch (level) {
      case 'CRÍTICA': return 'bg-red-600 border-red-500 text-red-100';
      case 'ALTA': return 'bg-orange-600 border-orange-500 text-orange-100';
      case 'MÉDIA': return 'bg-yellow-500 border-yellow-400 text-yellow-900';
      case 'BAIXA': return 'bg-blue-600 border-blue-500 text-blue-100';
      case 'MÍNIMA': return 'bg-gray-600 border-gray-500 text-gray-200';
      default: return 'bg-gray-600 border-gray-500 text-gray-200';
    }
  };

  const getStatusColor = (status: Emergency['status']) => {
    switch (status) {
      case 'ATIVO': return 'bg-blue-700 border-blue-500 text-blue-100';
      case 'EM_ANDAMENTO': return 'bg-yellow-600 border-yellow-500';
      case 'RESOLVIDO': return 'bg-green-600 border-green-500';
      case 'FINALIZADO': return 'bg-gray-600 border-gray-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getLevelIcon = (level: Emergency['level']) => {
    switch (level) {
      case 'CRÍTICA': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
      case 'ALTA': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
      case 'MÉDIA': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
      case 'BAIXA': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
      case 'MÍNIMA': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="8" fill="#9ca3af" />
          <text x="10" y="15" textAnchor="middle" fontSize="10" fill="#fff">i</text>
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const getStatusIcon = (status: Emergency['status']) => {
    switch (status) {
      case 'ATIVO': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
      case 'EM_ANDAMENTO': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
      case 'RESOLVIDO': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
      case 'FINALIZADO': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Emergency['status'];
    onStatusChange?.(emergency.id, newStatus);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-5 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col h-full">
      {/* Header with title and centered badges */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white leading-tight mb-3 w-full">
          {emergency.title}
        </h3>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border ${getLevelColor(emergency.level)}`}>
            {getLevelIcon(emergency.level)}
            {emergency.level}
          </span>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border ${getStatusColor(emergency.status)}`}>
            {getStatusIcon(emergency.status)}
            {emergency.status.replace('_', ' ')}
          </span>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-line break-words">
        {emergency.description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Responsável</span>
              <p className="text-sm font-medium text-white break-words whitespace-pre-line">{emergency.responsible}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Localização</span>
              <p className="text-sm font-medium text-white break-words whitespace-pre-line">{emergency.location}</p>
            </div>
          </div>
          
          {emergency.victim && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Vítima(s)</span>
                <p className="text-sm font-medium text-white break-words whitespace-pre-line">{emergency.victim}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Reporter</span>
              <p className="text-sm font-medium text-white break-words whitespace-pre-line">{emergency.reporter}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Criado</span>
              <p className="text-sm font-medium text-white truncate">{formatDate(emergency.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Atualizado</span>
              <p className="text-sm font-medium text-white truncate">{formatDate(emergency.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {onStatusChange && (
        <div className="flex justify-end pt-3 border-t border-gray-700 mt-auto">
          <div className="relative">
            <select 
              value={emergency.status} 
              onChange={handleStatusChange}
              className="appearance-none bg-gray-700 border border-gray-600 rounded-md px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-colors cursor-pointer min-w-[140px]"
            >
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
      )}
    </div>
  );
} 