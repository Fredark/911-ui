import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Emergency, EmergencyFilters } from '../types/ticket';
import { EmergencyService } from '../services/ticketService';
import { EmergencyCard } from './TicketCard';
import { EmergencyFiltersComponent } from './TicketFilters';
import { EmergencyPopup } from './EmergencyPopup';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const LOCAL_STORAGE_KEY = 'emergencies_seen_ids';

export function EmergencyDashboard() {
  const [filters, setFilters] = useState<EmergencyFilters>({});
  const [popups, setPopups] = useState<Emergency[]>([]);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch emergencies with react-query polling
  const {
    data: fetchedEmergencies,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ['emergencies', filters],
    queryFn: () => EmergencyService.getEmergencies(filters),
    refetchInterval: 5000,
  });

  // Recupera IDs já vistos do localStorage
  useEffect(() => {
    if (initialized && emergencies.length > 0) {
      const seenIds = emergencies.map(e => e.id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seenIds));
    }
  }, [initialized, emergencies]);

  // Atualiza popups apenas para emergências realmente novas
  useEffect(() => {
    if (fetchedEmergencies) {
      setInitialized(true);
      // Recupera IDs já vistos do localStorage
      const seenIds: string[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      setEmergencies(prevEmergencies => {
        // Detecta emergências realmente novas
        const newEmergencies = fetchedEmergencies.filter((newEmergency: Emergency) =>
          !prevEmergencies.some((existing: Emergency) => existing.id === newEmergency.id)
        );
        // Só mostra popup para emergências que não estão no localStorage
        newEmergencies.forEach((emergency: Emergency) => {
          if (!seenIds.includes(emergency.id)) {
            setPopups(prev => [...prev, emergency]);
            // Adiciona o ID ao localStorage
            const updatedSeen = [...seenIds, emergency.id];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSeen));
          }
        });
        return fetchedEmergencies;
      });
    }
  }, [fetchedEmergencies]);

  const handleStatusChange = async (emergencyId: string, newStatus: Emergency['status']) => {
    try {
      await EmergencyService.updateEmergencyStatus(emergencyId, newStatus);
      // Update the local state
      setEmergencies(prevEmergencies =>
        prevEmergencies.map(emergency =>
          emergency.id === emergencyId ? { ...emergency, status: newStatus } : emergency
        )
      );
    } catch (err) {
      console.error('Error updating emergency status:', err);
      // You could show a toast notification here
    }
  };

  const handleFiltersChange = (newFilters: EmergencyFilters) => {
    setFilters(newFilters);
  };

  const closePopup = (emergencyId: string) => {
    setPopups(prev => prev.filter(p => p.id !== emergencyId));
  };

  // Extract unique responsibles and locations for filters
  const responsibles = useMemo(() => {
    const uniqueResponsibles = new Set(emergencies.map(emergency => emergency.responsible));
    return Array.from(uniqueResponsibles).sort();
  }, [emergencies]);

  const locations = useMemo(() => {
    const uniqueLocations = new Set(emergencies.map(emergency => emergency.location));
    return Array.from(uniqueLocations).sort();
  }, [emergencies]);

  // Filter emergencies based on current filters
  const filteredEmergencies = useMemo(() => {
    return emergencies.filter(emergency => {
      if (filters.status && emergency.status !== filters.status) return false;
      if (filters.level && emergency.level !== filters.level) return false;
      if (filters.responsible && emergency.responsible !== filters.responsible) return false;
      if (filters.location && emergency.location !== filters.location) return false;
      return true;
    });
  }, [emergencies, filters]);

  const stats = useMemo(() => {
    const total = emergencies.length;
    const ativo = emergencies.filter(e => e.status === 'ATIVO').length;
    const emAndamento = emergencies.filter(e => e.status === 'EM_ANDAMENTO').length;
    const resolvido = emergencies.filter(e => e.status === 'RESOLVIDO').length;
    const finalizado = emergencies.filter(e => e.status === 'FINALIZADO').length;

    return { total, ativo, emAndamento, resolvido, finalizado };
  }, [emergencies]);

  if (isError) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-red-900 border border-red-700 rounded-xl text-center">
        <h2 className="text-xl font-semibold text-red-200 mb-2">Erro</h2>
        <p className="text-red-300 mb-6">{(error as Error)?.message || 'Falha ao buscar emergências. Tente novamente.'}</p>
        <button 
          type="button"
          onClick={() => refetch()} 
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Popup notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end z-50" style={{ pointerEvents: 'none' }}>
        {popups.map((emergency, index) => (
          <div
            key={`${emergency.id}-${index}`}
            className={index !== 0 ? '-mt-8' : ''}
            style={{ zIndex: 100 + index, pointerEvents: 'auto' }}
          >
            <EmergencyPopup
              emergency={emergency}
              onClose={() => closePopup(emergency.id)}
              autoClose={true}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700 flex-shrink-0 flex items-center gap-3">
        {/* Botão de abrir filtros no mobile */}
        <button
          type="button"
          className="md:hidden inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Filtros
        </button>
        <h1 className="text-2xl font-bold text-white">🚨 Emergências</h1>
      </div>

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixa em telas grandes */}
        <div className="hidden md:block w-64 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto flex-shrink-0">
          <EmergencyFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            responsibles={responsibles}
            locations={locations}
          />
        </div>

        {/* Sidebar drawer no mobile */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-64 max-w-xs flex-1 flex-col bg-gray-800 border-r border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Filtros</h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <EmergencyFiltersComponent
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    responsibles={responsibles}
                    locations={locations}
                  />
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-0 flex-1" aria-hidden="true" />
            </div>
          </Dialog>
        </Transition.Root>

        {/* Main content */}
        <div className="flex-1 p-2 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold text-white">{stats.total}</div>
                </div>
                <div className="text-xs font-medium text-gray-300">Total</div>
              </div>
              
              <div className="bg-purple-900 border border-purple-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold text-purple-200">{stats.ativo}</div>
                </div>
                <div className="text-xs font-medium text-purple-300">Ativo</div>
              </div>
              
              <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold text-yellow-200">{stats.emAndamento}</div>
                </div>
                <div className="text-xs font-medium text-yellow-300">Em Andamento</div>
              </div>
              
              <div className="bg-green-900 border border-green-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold text-green-200">{stats.resolvido}</div>
                </div>
                <div className="text-xs font-medium text-green-300">Resolvido</div>
              </div>
              
              <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold text-blue-200">{stats.finalizado}</div>
                </div>
                <div className="text-xs font-medium text-blue-300">Finalizado</div>
              </div>
            </div>
          </div>

          {isLoading && !initialized ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
              <p className="text-gray-300 text-sm">Carregando emergências...</p>
            </div>
          ) : filteredEmergencies.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">Nenhuma emergência encontrada</h3>
              <p className="text-gray-300 text-sm">
                {Object.keys(filters).length > 0 
                  ? 'Tente ajustar seus filtros para ver mais emergências.'
                  : 'Nenhuma emergência está disponível no momento.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredEmergencies.map(emergency => (
                <EmergencyCard
                  key={emergency.id}
                  emergency={emergency}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 