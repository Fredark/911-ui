import { useState, useEffect } from 'react';
import type { Emergency } from '../types/ticket';

interface EmergencyPopupProps {
  emergency: Emergency;
  onClose: () => void;
  autoClose?: boolean;
}

export function EmergencyPopup({ emergency, onClose, autoClose = false }: EmergencyPopupProps) {
  const [isClosing, setIsClosing] = useState(false);

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
      case 'EM_ANDAMENTO': return 'bg-yellow-600 border-yellow-500 text-yellow-100';
      case 'RESOLVIDO': return 'bg-green-600 border-green-500 text-green-100';
      case 'FINALIZADO': return 'bg-gray-600 border-gray-500 text-gray-200';
      default: return 'bg-gray-600 border-gray-500 text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  // Handle auto-close with animation
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl ${isClosing ? 'popup-fade-out' : 'popup-enter'}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">
              Nova Emergência
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              {formatDate(emergency.createdAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-3">
          <h4 className="text-white font-semibold text-base mb-2">
            {emergency.title}
          </h4>
          <p className="text-gray-300 text-sm whitespace-pre-line break-words">
            {emergency.description}
          </p>
        </div>
        
        <div className="flex justify-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs font-semibold uppercase border ${getLevelColor(emergency.level)}`}>
            {emergency.level}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold uppercase border ${getStatusColor(emergency.status)}`}>
            {emergency.status.replace('_', ' ')}
          </span>
          <span className="px-2 py-1 rounded text-xs font-semibold text-white bg-gray-600 border border-gray-500">
            {emergency.responsible}
          </span>
        </div>
        
        <div className="text-xs text-gray-400">
          {emergency.victim && (
            <p><span className="font-semibold">Vítima:</span> <span className="break-words whitespace-pre-line">{emergency.victim}</span></p>
          )}
        </div>
      </div>
    </div>
  );
} 
