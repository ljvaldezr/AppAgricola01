import React from 'react';
import { Leaf, Calculator, BarChart3 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AgroNutri Calculator</h1>
              <p className="text-green-100 text-sm">Sistema de Cálculo Nutricional Agronómico</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-green-100">
              <Calculator className="w-5 h-5" />
              <span className="text-sm">Análisis Preciso</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">Recomendaciones Optimizadas</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-sm text-green-50">
            Calcula las necesidades nutricionales específicas de tus cultivos y obtén recomendaciones 
            precisas de fertilización basadas en extracciones por tonelada y análisis de suelo.
          </p>
        </div>
      </div>
    </header>
  );
};