import React from 'react';
import { Header } from './components/Header';
import { CropSelector } from './components/CropSelector';
import { YieldInput } from './components/YieldInput';
import { SoilAvailabilityForm } from './components/SoilAvailabilityForm';
import { CalculationResults } from './components/CalculationResults';
import { useNutritionalCalculations } from './hooks/useNutritionalCalculations';
import { crops } from './data/cropsData';
import { ChevronRight, Info } from 'lucide-react';

function App() {
  const {
    selectedCrop,
    setSelectedCrop,
    expectedYield,
    setExpectedYield,
    soilData,
    setSoilData,
    calculationResults
  } = useNutritionalCalculations();

  const isReadyForCalculation = selectedCrop && expectedYield > 0;
  const hasResults = calculationResults !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-25 to-brown-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Indicador de Progreso */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-4 border border-green-100">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              selectedCrop ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${selectedCrop ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span>Cultivo</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              expectedYield > 0 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${expectedYield > 0 ? 'bg-amber-500' : 'bg-gray-400'}`} />
              <span>Rendimiento</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isReadyForCalculation ? 'bg-brown-100 text-brown-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isReadyForCalculation ? 'bg-brown-500' : 'bg-gray-400'}`} />
              <span>Análisis de Suelo</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              hasResults ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${hasResults ? 'bg-blue-500' : 'bg-gray-400'}`} />
              <span>Resultados</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Panel Izquierdo - Entrada de Datos */}
          <div className="xl:col-span-1 space-y-6">
            <CropSelector
              crops={crops}
              selectedCrop={selectedCrop}
              onCropSelect={setSelectedCrop}
            />
            
            <YieldInput
              expectedYield={expectedYield}
              onYieldChange={(yieldValue) => setExpectedYield(yieldValue)}
              cropName={selectedCrop?.name}
            />

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">Guía de Uso:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Selecciona tu cultivo y rendimiento esperado</li>
                    <li>• Completa los datos de análisis de suelo</li>
                    <li>• Obtén recomendaciones automáticas de fertilización</li>
                    <li>• Los cálculos incluyen factores de eficiencia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Central - Análisis de Suelo */}
          <div className="xl:col-span-1">
            <SoilAvailabilityForm
              soilData={soilData}
              onSoilDataChange={setSoilData}
            />
          </div>

          {/* Panel Derecho - Resultados */}
          <div className="xl:col-span-1">
            {hasResults ? (
              <CalculationResults results={calculationResults} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Esperando Datos</h3>
                  <p className="text-sm">
                    {!selectedCrop 
                      ? "Selecciona un cultivo para comenzar"
                      : expectedYield <= 0 
                      ? "Ingresa el rendimiento esperado"
                      : "Los resultados aparecerán automáticamente"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer con información técnica */}
        <footer className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="text-center text-sm text-gray-600">
            <p className="font-semibold text-green-800 mb-2">AgroNutri Calculator v1.0</p>
            <p>
              Sistema desarrollado para el cálculo preciso de necesidades nutricionales en cultivos.
              Incluye factores de corrección por eficiencia, conversiones a formas comerciales y 
              algoritmos de optimización para recomendaciones de fertilización.
            </p>
            <div className="mt-4 pt-4 border-t border-green-100">
              <p className="text-xs text-green-600">
                Los datos de extracción y factores de corrección están basados en investigación agronómica actualizada.
                Consulte siempre con un especialista para validar las recomendaciones en su contexto específico.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;