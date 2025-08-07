import { useState, useMemo } from 'react';
import { 
  Crop, 
  SoilAvailability, 
  CalculationResults, 
  NutritionalBalance,
  Fertilizer 
} from '../types/agronomic';
import { efficiencyFactors, conversionFactors, fertilizers } from '../data/cropsData';

export const useNutritionalCalculations = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [expectedYield, setExpectedYield] = useState<number>(0);
  const [soilData, setSoilData] = useState<SoilAvailability>({
    N: 0, P: 0, K: 0, Ca: 0, Mg: 0, S: 0,
    Fe: 0, Mn: 0, Zn: 0, Cu: 0, B: 0, Mo: 0
  });

  const calculationResults = useMemo((): CalculationResults | null => {
    if (!selectedCrop || expectedYield <= 0) return null;

    const balances: Record<string, NutritionalBalance> = {};
    const nutrients = ['N', 'P', 'K', 'Ca', 'Mg', 'S', 'Fe', 'Mn', 'Zn', 'Cu', 'B', 'Mo'];

    // Calcular balances para cada nutriente
    nutrients.forEach(nutrient => {
      const extraction = selectedCrop.extractions[nutrient as keyof typeof selectedCrop.extractions] * expectedYield;
      const available = soilData[nutrient as keyof SoilAvailability];
      const deficit = extraction - available;
      const efficiency = efficiencyFactors[nutrient as keyof typeof efficiencyFactors];
      const corrected_deficit = deficit > 0 ? deficit / efficiency : 0;
      
      // Conversión a forma comercial para macronutrientes
      let commercial_form = corrected_deficit;
      if (nutrient === 'P') commercial_form = corrected_deficit * conversionFactors.P_to_P2O5;
      if (nutrient === 'K') commercial_form = corrected_deficit * conversionFactors.K_to_K2O;
      if (nutrient === 'Ca') commercial_form = corrected_deficit * conversionFactors.Ca_to_CaO;
      if (nutrient === 'Mg') commercial_form = corrected_deficit * conversionFactors.Mg_to_MgO;
      if (nutrient === 'S') commercial_form = corrected_deficit * conversionFactors.S_to_SO3;

      balances[nutrient] = {
        extraction,
        available,
        deficit,
        corrected_deficit,
        commercial_form
      };
    });

    // Algoritmo simple de recomendación de fertilizantes
    const recommended_fertilizers = [];
    let total_cost = 0;

    // Identificar nutrientes deficitarios
    const deficientNutrients = Object.entries(balances)
      .filter(([, balance]) => balance.corrected_deficit > 0)
      .sort(([, a], [, b]) => b.corrected_deficit - a.corrected_deficit);

    // Seleccionar fertilizantes óptimos
    const remainingDeficits = { ...Object.fromEntries(deficientNutrients.map(([nutrient, balance]) => [nutrient, balance.corrected_deficit])) };

    // Priorizar fertilizantes complejos que cubran múltiples nutrientes
    for (const fertilizer of fertilizers) {
      if (Object.keys(remainingDeficits).length === 0) break;

      const canSupply = Object.keys(fertilizer.nutrients).some(nutrient => remainingDeficits[nutrient] > 0);
      
      if (canSupply) {
        // Calcular la cantidad necesaria basada en el nutriente más limitante
        let maxQuantityNeeded = 0;
        let limitingNutrient = '';

        Object.entries(fertilizer.nutrients).forEach(([nutrient, content]) => {
          if (remainingDeficits[nutrient] && content) {
            const quantityNeeded = (remainingDeficits[nutrient] * 1000) / content; // convertir a kg
            if (quantityNeeded > maxQuantityNeeded) {
              maxQuantityNeeded = quantityNeeded;
              limitingNutrient = nutrient;
            }
          }
        });

        if (maxQuantityNeeded > 0) {
          const quantity = Math.min(maxQuantityNeeded, 500); // Límite máximo de aplicación
          const cost = quantity * fertilizer.cost_per_kg;

          recommended_fertilizers.push({
            fertilizer,
            quantity,
            cost
          });

          total_cost += cost;

          // Actualizar déficits restantes
          Object.entries(fertilizer.nutrients).forEach(([nutrient, content]) => {
            if (remainingDeficits[nutrient] && content) {
              const supplied = (quantity * content) / 1000; // convertir de g a kg
              remainingDeficits[nutrient] = Math.max(0, remainingDeficits[nutrient] - supplied);
              if (remainingDeficits[nutrient] <= 0.1) {
                delete remainingDeficits[nutrient];
              }
            }
          });
        }
      }
    }

    return {
      crop: selectedCrop,
      expected_yield: expectedYield,
      balances,
      total_cost,
      recommended_fertilizers
    };
  }, [selectedCrop, expectedYield, soilData]);

  return {
    selectedCrop,
    setSelectedCrop,
    expectedYield,
    setExpectedYield,
    soilData,
    setSoilData,
    calculationResults
  };
};