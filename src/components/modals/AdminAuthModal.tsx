import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, Eye, EyeOff, X, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const DEFAULT_ADMIN_PIN = 'pipo2026';
const PIN_STORAGE_KEY = 'pipo_admin_pin_v1';

export function getStoredAdminPin(): string {
  return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_ADMIN_PIN;
}

export const AdminAuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  showToast
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Mode for changing password
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredAdminPin();
    if (pin.trim() === correctPin.trim()) {
      if (rememberMe) {
        localStorage.setItem('pipo_admin_session', 'true');
      } else {
        sessionStorage.setItem('pipo_admin_session', 'true');
      }
      onLogin();
      setError('');
      setPin('');
      showToast('Sesión de administrador iniciada correctamente.');
      onClose();
    } else {
      setError('Clave incorrecta. Por favor intente nuevamente.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredAdminPin();
    if (currentPinInput.trim() !== correctPin.trim()) {
      setError('La clave actual es incorrecta.');
      return;
    }
    if (newPinInput.length < 4) {
      setError('La nueva clave debe tener al menos 4 caracteres.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setError('Las nuevas claves no coinciden.');
      return;
    }

    localStorage.setItem(PIN_STORAGE_KEY, newPinInput.trim());
    showToast('Clave de administrador actualizada con éxito.');
    setIsChangingPin(false);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {isAdmin ? 'Panel de Control del Administrador' : 'Acceso Restringido - Administrador'}
              </h2>
              <p className="text-[11px] text-slate-300">
                {isAdmin ? 'Sesión activa autorizada' : 'Hotel Pipo Internacional • Dpto. de Cumplimiento'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isAdmin ? (
            /* Logged in state */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start space-x-3 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-950">Está autenticado como Administrador</p>
                  <p className="mt-0.5 text-emerald-800">
                    Tiene acceso a la configuración de la empresa, credenciales de Supabase, visualización de expedientes de clientes y herramientas de exportación.
                  </p>
                </div>
              </div>

              {!isChangingPin ? (
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsChangingPin(true); setError(''); }}
                    className="w-full py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 border border-gray-300 transition-colors"
                  >
                    <Key className="w-4 h-4 text-gray-600" />
                    <span>Cambiar clave de acceso administrativo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      showToast('Sesión de administrador cerrada.', 'info');
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 shadow-xs transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Cerrar Sesión de Administrador</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleChangePin} className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-gray-800">Actualizar Clave de Acceso</div>
                  {error && (
                    <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Clave Actual</label>
                    <input 
                      type="password"
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Ingrese clave actual"
                      required
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Nueva Clave</label>
                    <input 
                      type="password"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      required
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Confirmar Nueva Clave</label>
                    <input 
                      type="password"
                      value={confirmPinInput}
                      onChange={(e) => setConfirmPinInput(e.target.value)}
                      placeholder="Repita la nueva clave"
                      required
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="w-1/2 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs"
                    >
                      Guardar Clave
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Login form */
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Este módulo es de uso exclusivo para el <strong>Oficial de Cumplimiento</strong> o personal administrativo del <strong>Hotel Pipo Internacional</strong>.
              </p>

              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Clave de Administrador
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(''); }}
                    placeholder="Ingrese su clave..."
                    required
                    autoFocus
                    className="w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2 p-2 bg-blue-50/70 border border-blue-100 rounded text-[11px] text-blue-800">
                  <span className="font-semibold">Clave inicial de fábrica:</span> <code className="bg-blue-200/60 px-1 py-0.5 rounded font-mono font-bold text-blue-900">pipo2026</code> (puede cambiarla una vez que ingrese).
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600 cursor-pointer">
                  Mantener sesión iniciada en este navegador
                </label>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Ingresar al Panel</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
