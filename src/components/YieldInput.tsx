import React from 'react';
import { TrendingUp, Scale } from 'lucide-react';

interface YieldInputProps {
  expectedYield: number;
  onYieldChange: (yieldValue: number) => void;
  cropName?: string;
}

export const YieldInput: React.FC<YieldInputProps> = ({
  expectedYield,
  onYieldChange,
  cropName
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Rendimiento Esperado
      </h2>
      
      <div className="space-y-4">
        {cropName && (
          <p className="text-amber-700 bg-amber-50 p-3 rounded-lg">
            Cultivo seleccionado: <span className="font-semibold">{cropName}</span>
          </p>
        )}
        
        <div className="flex items-center gap-4">
          <Scale className="w-6 h-6 text-amber-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Toneladas por Hectárea (t/Ha)
            </label>
            <input
              type="number"
              value={expectedYield}
              onChange={(e) => onYieldChange(Number(e.target.value))}
              min="0"
              step="0.1"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors text-lg font-medium"
              placeholder="Ej: 8.5"
            />
          </div>
          <div className="text-right">
            <div className="text-sm text-amber-600">Rango típico</div>
            <div className="text-lg font-semibold text-amber-800">
              {cropName === 'Maíz' && '6-12 t/Ha'}
              {cropName === 'Soja' && '2-4 t/Ha'}
              {cropName === 'Trigo' && '3-8 t/Ha'}
              {cropName === 'Arroz' && '4-10 t/Ha'}
              {cropName === 'Tomate' && '40-80 t/Ha'}
              {cropName === 'Papa' && '20-50 t/Ha'}
              {!cropName && '-- t/Ha'}
            </div>
          </div>
        </div>
        
        {expectedYield > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">Proyección de Producción</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-amber-600">Por hectárea:</span>
                <span className="ml-2 font-semibold text-amber-800">{expectedYield.toFixed(1)} ton</span>
              </div>
              <div>
                <span className="text-amber-600">Por 10 hectáreas:</span>
                <span className="ml-2 font-semibold text-amber-800">{(expectedYield * 10).toFixed(1)} ton</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};