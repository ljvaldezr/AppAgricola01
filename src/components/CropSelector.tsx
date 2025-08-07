import React from 'react';
import { Crop } from '../types/agronomic';
import { Wheat, Sprout, Grape } from 'lucide-react';

interface CropSelectorProps {
  crops: Crop[];
  selectedCrop: Crop | null;
  onCropSelect: (crop: Crop) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Cereales':
      return <Wheat className="w-5 h-5" />;
    case 'Leguminosas':
      return <Sprout className="w-5 h-5" />;
    case 'Hortalizas':
    case 'Tubérculos':
      return <Grape className="w-5 h-5" />;
    default:
      return <Sprout className="w-5 h-5" />;
  }
};

export const CropSelector: React.FC<CropSelectorProps> = ({
  crops,
  selectedCrop,
  onCropSelect
}) => {
  const categories = Array.from(new Set(crops.map(crop => crop.category)));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
        {getCategoryIcon('')}
        Selección de Cultivo
      </h2>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-medium text-green-700 mb-3 flex items-center gap-2">
            {getCategoryIcon(category)}
            {category}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {crops
              .filter(crop => crop.category === category)
              .map(crop => (
                <button
                  key={crop.id}
                  onClick={() => onCropSelect(crop)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-md ${
                    selectedCrop?.id === crop.id
                      ? 'border-green-500 bg-green-50 shadow-md transform scale-[1.02]'
                      : 'border-green-200 bg-white hover:border-green-300 hover:bg-green-25'
                  }`}
                >
                  <div className="font-medium text-green-800">{crop.name}</div>
                  <div className="text-sm text-green-600 mt-1">
                    N: {crop.extractions.N} kg/ton | P: {crop.extractions.P} kg/ton | K: {crop.extractions.K} kg/ton
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};