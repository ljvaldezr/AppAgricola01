import React from 'react';
import { CalculationResults as Results } from '../types/agronomic';
import { Calculator, TrendingUp, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

interface CalculationResultsProps {
  results: Results;
}

export const CalculationResults: React.FC<CalculationResultsProps> = ({ results }) => {
  const macronutrients = ['N', 'P', 'K', 'Ca', 'Mg', 'S'];
  const micronutrients = ['Fe', 'Mn', 'Zn', 'Cu', 'B', 'Mo'];

  const getNutrientStatus = (balance: any) => {
    if (balance.deficit <= 0) {
      return { status: 'sufficient', color: 'green', icon: CheckCircle };
    } else {
      return { status: 'deficient', color: 'red', icon: AlertTriangle };
    }
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Resultados del Análisis Nutricional
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-700">Cultivo</span>
            </div>
            <div className="text-xl font-bold text-green-800">{results.crop.name}</div>
            <div className="text-sm text-gray-600">{results.expected_yield} t/Ha</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Costo Total</span>
            </div>
            <div className="text-xl font-bold text-blue-800">${results.total_cost.toFixed(2)}</div>
            <div className="text-sm text-gray-600">por hectárea</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-700">Fertilizantes</span>
            </div>
            <div className="text-xl font-bold text-purple-800">{results.recommended_fertilizers.length}</div>
            <div className="text-sm text-gray-600">recomendados</div>
          </div>
        </div>
      </div>

      {/* Balance de Macronutrientes */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Balance de Macronutrientes
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-green-200 p-3 text-left font-medium text-green-800">Nutriente</th>
                <th className="border border-green-200 p-3 text-right font-medium text-green-800">Extracción (kg/Ha)</th>
                <th className="border border-green-200 p-3 text-right font-medium text-green-800">Disponible (kg/Ha)</th>
                <th className="border border-green-200 p-3 text-right font-medium text-green-800">Déficit (kg/Ha)</th>
                <th className="border border-green-200 p-3 text-right font-medium text-green-800">Corrección (kg/Ha)</th>
                <th className="border border-green-200 p-3 text-center font-medium text-green-800">Estado</th>
              </tr>
            </thead>
            <tbody>
              {macronutrients.map((nutrient) => {
                const balance = results.balances[nutrient];
                const status = getNutrientStatus(balance);
                const StatusIcon = status.icon;
                
                return (
                  <tr key={nutrient} className="hover:bg-gray-50">
                    <td className="border border-green-200 p-3 font-medium">{nutrient}</td>
                    <td className="border border-green-200 p-3 text-right">{formatNumber(balance.extraction)}</td>
                    <td className="border border-green-200 p-3 text-right">{formatNumber(balance.available)}</td>
                    <td className="border border-green-200 p-3 text-right">
                      {balance.deficit <= 0 ? 'N/R' : formatNumber(balance.deficit)}
                    </td>
                    <td className="border border-green-200 p-3 text-right">
                      {balance.corrected_deficit <= 0 ? 'N/R' : formatNumber(balance.corrected_deficit)}
                    </td>
                    <td className="border border-green-200 p-3 text-center">
                      <div className={`flex items-center justify-center gap-1 text-${status.color}-600`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {status.status === 'sufficient' ? 'Suficiente' : 'Deficitario'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Balance de Micronutrientes */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">
          Balance de Micronutrientes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {micronutrients.map((nutrient) => {
            const balance = results.balances[nutrient];
            const status = getNutrientStatus(balance);
            const StatusIcon = status.icon;
            
            return (
              <div key={nutrient} className="bg-orange-25 p-4 rounded-lg border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-orange-800">{nutrient}</span>
                  <div className={`flex items-center gap-1 text-${status.color}-600`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {status.status === 'sufficient' ? 'OK' : 'Déficit'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-600">Extracción:</span>
                    <span className="font-medium">{formatNumber(balance.extraction, 2)} kg/Ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">Disponible:</span>
                    <span className="font-medium">{formatNumber(balance.available, 2)} kg/Ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">Corrección:</span>
                    <span className="font-medium">
                      {balance.corrected_deficit <= 0 ? 'N/R' : formatNumber(balance.corrected_deficit, 2) + ' kg/Ha'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recomendaciones de Fertilizantes */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">
          Plan de Fertilización Recomendado
        </h3>
        
        {results.recommended_fertilizers.length > 0 ? (
          <div className="space-y-4">
            {results.recommended_fertilizers.map((rec, index) => (
              <div key={index} className="bg-purple-25 p-4 rounded-lg border border-purple-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-purple-800">{rec.fertilizer.name}</h4>
                    <p className="text-sm text-purple-600">{rec.fertilizer.formula}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-800">{formatNumber(rec.quantity)} kg/Ha</div>
                    <div className="text-sm text-purple-600">${rec.cost.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex gap-4">
                    <span>Eficiencia: {rec.fertilizer.efficiency_rating}/10</span>
                    <span>Costo/kg: ${rec.fertilizer.cost_per_kg.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-800">Costo Total de Fertilización:</span>
                <span className="text-xl font-bold text-purple-900">${results.total_cost.toFixed(2)}/Ha</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No se requieren fertilizantes adicionales.</p>
            <p className="text-sm mt-2">El suelo tiene suficientes nutrientes disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
};