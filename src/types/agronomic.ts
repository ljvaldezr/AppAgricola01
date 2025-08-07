export interface Crop {
  id: string;
  name: string;
  category: string;
  extractions: NutrientExtractions;
}

export interface NutrientExtractions {
  // Macronutrientes (kg/ton)
  N: number;    // Nitrógeno
  P: number;    // Fósforo puro
  K: number;    // Potasio puro
  Ca: number;   // Calcio
  Mg: number;   // Magnesio
  S: number;    // Azufre
  // Micronutrientes (g/ton)
  Fe: number;   // Hierro
  Mn: number;   // Manganeso
  Zn: number;   // Zinc
  Cu: number;   // Cobre
  B: number;    // Boro
  Mo: number;   // Molibdeno
}

export interface SoilAvailability {
  // Macronutrientes (kg/Ha)
  N: number;
  P: number;
  K: number;
  Ca: number;
  Mg: number;
  S: number;
  // Micronutrientes (kg/Ha)
  Fe: number;
  Mn: number;
  Zn: number;
  Cu: number;
  B: number;
  Mo: number;
}

export interface EfficiencyFactors {
  N: number;
  P: number;
  K: number;
  Ca: number;
  Mg: number;
  S: number;
  Fe: number;
  Mn: number;
  Zn: number;
  Cu: number;
  B: number;
  Mo: number;
}

export interface ConversionFactors {
  P_to_P2O5: number;
  K_to_K2O: number;
  Ca_to_CaO: number;
  Mg_to_MgO: number;
  S_to_SO3: number;
}

export interface Fertilizer {
  id: string;
  name: string;
  formula: string;
  nutrients: Partial<NutrientExtractions>;
  cost_per_kg: number;
  efficiency_rating: number;
}

export interface NutritionalBalance {
  extraction: number;
  available: number;
  deficit: number;
  corrected_deficit: number;
  commercial_form: number;
}

export interface CalculationResults {
  crop: Crop;
  expected_yield: number;
  balances: Record<string, NutritionalBalance>;
  total_cost: number;
  recommended_fertilizers: Array<{
    fertilizer: Fertilizer;
    quantity: number;
    cost: number;
  }>;
}