import React from 'react';
import { SoilAvailability } from '../types/agronomic';
import { TestTube, Layers } from 'lucide-react';

interface SoilAvailabilityFormProps {
  soilData: SoilAvailability;
  onSoilDataChange: (data: SoilAvailability) => void;
}

const nutrientGroups = {
  macronutrients: [
    { key: 'N', name: 'Nitrógeno (N)', unit: 'kg/Ha', color: 'blue' },
    { key: 'P', name: 'Fósforo (P)', unit: 'kg/Ha', color: 'purple' },
    { key: 'K', name: 'Potasio (K)', unit: 'kg/Ha', color: 'red' },
    { key: 'Ca', name: 'Calcio (Ca)', unit: 'kg/Ha', color: 'orange' },
    { key: 'Mg', name: 'Magnesio (Mg)', unit: 'kg/Ha', color: 'green' },
    { key: 'S', name: 'Azufre (S)', unit: 'kg/Ha', color: 'yellow' }
  ],
  micronutrients: [
    { key: 'Fe', name: 'Hierro (Fe)', unit: 'kg/Ha', color: 'gray' },
    { key: 'Mn', name: 'Manganeso (Mn)', unit: 'kg/Ha', color: 'purple' },
    { key: 'Zn', name: 'Zinc (Zn)', unit: 'kg/Ha', color: 'blue' },
    { key: 'Cu', name: 'Cobre (Cu)', unit: 'kg/Ha', color: 'orange' },
    { key: 'B', name: 'Boro (B)', unit: 'kg/Ha', color: 'green' },
    { key: 'Mo', name: 'Molibdeno (Mo)', unit: 'kg/Ha', color: 'indigo' }
  ]
};

export const SoilAvailabilityForm: React.FC<SoilAvailabilityFormProps> = ({
  soilData,
  onSoilDataChange
}) => {
  const updateNutrient = (key: string, value: number) => {
    onSoilDataChange({
      ...soilData,
      [key]: value
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'border-blue-200 focus:border-blue-500 focus:ring-blue-200',
      purple: 'border-purple-200 focus:border-purple-500 focus:ring-purple-200',
      red: 'border-red-200 focus:border-red-500 focus:ring-red-200',
      orange: 'border-orange-200 focus:border-orange-500 focus:ring-orange-200',
      green: 'border-green-200 focus:border-green-500 focus:ring-green-200',
      yellow: 'border-yellow-200 focus:border-yellow-500 focus:ring-yellow-200',
      gray: 'border-gray-200 focus:border-gray-500 focus:ring-gray-200',
      indigo: 'border-indigo-200 focus:border-indigo-500 focus:ring-indigo-200'
    };
    return colorMap[color] || 'border-gray-200 focus:border-gray-500 focus:ring-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-brown-100">
      <h2 className="text-xl font-semibold text-brown-800 mb-6 flex items-center gap-2">
        <Layers className="w-5 h-5" />
        Disponibilidad de Nutrientes en el Suelo
      </h2>

      <div className="space-y-8">
        {/* Macronutrientes */}
        <div>
          <h3 className="text-lg font-medium text-brown-700 mb-4 flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Macronutrientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nutrientGroups.macronutrients.map(({ key, name, unit, color }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {name}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={soilData[key as keyof SoilAvailability]}
                    onChange={(e) => updateNutrient(key, Number(e.target.value))}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border-2 rounded-lg transition-colors ${getColorClasses(color)}`}
                    placeholder="0.0"
                  />
                  <span className="absolute right-3 top-2 text-sm text-gray-500">
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Micronutrientes */}
        <div>
          <h3 className="text-lg font-medium text-brown-700 mb-4 flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Micronutrientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nutrientGroups.micronutrients.map(({ key, name, unit, color }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {name}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={soilData[key as keyof SoilAvailability]}
                    onChange={(e) => updateNutrient(key, Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border-2 rounded-lg transition-colors ${getColorClasses(color)}`}
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-2 text-sm text-gray-500">
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de utilidad */}
        <div className="flex gap-3 pt-4 border-t border-brown-200">
          <button
            onClick={() => onSoilDataChange({
              N: 0, P: 0, K: 0, Ca: 0, Mg: 0, S: 0,
              Fe: 0, Mn: 0, Zn: 0, Cu: 0, B: 0, Mo: 0
            })}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Limpiar Todo
          </button>
          <button
            onClick={() => onSoilDataChange({
              N: 25, P: 15, K: 180, Ca: 800, Mg: 120, S: 20,
              Fe: 4.5, Mn: 2.8, Zn: 1.2, Cu: 0.8, B: 0.6, Mo: 0.15
            })}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Valores Típicos
          </button>
        </div>
      </div>
    </div>
  );
};