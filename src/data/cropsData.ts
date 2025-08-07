import { Crop, EfficiencyFactors, ConversionFactors, Fertilizer } from '../types/agronomic';

export const crops: Crop[] = [
  {
    id: 'maiz',
    name: 'Maíz',
    category: 'Cereales',
    extractions: {
      N: 18.5, P: 3.2, K: 19.8, Ca: 2.8, Mg: 2.1, S: 1.8,
      Fe: 52, Mn: 28, Zn: 22, Cu: 8, B: 12, Mo: 0.8
    }
  },
  {
    id: 'soja',
    name: 'Soja',
    category: 'Leguminosas',
    extractions: {
      N: 51.2, P: 5.8, K: 19.5, Ca: 3.2, Mg: 2.8, S: 2.2,
      Fe: 48, Mn: 35, Zn: 18, Cu: 6, B: 15, Mo: 1.2
    }
  },
  {
    id: 'trigo',
    name: 'Trigo',
    category: 'Cereales',
    extractions: {
      N: 22.8, P: 4.1, K: 16.2, Ca: 2.5, Mg: 1.8, S: 2.1,
      Fe: 45, Mn: 25, Zn: 20, Cu: 7, B: 8, Mo: 0.6
    }
  },
  {
    id: 'arroz',
    name: 'Arroz',
    category: 'Cereales',
    extractions: {
      N: 16.8, P: 2.8, K: 22.4, Ca: 3.1, Mg: 2.3, S: 1.6,
      Fe: 58, Mn: 32, Zn: 25, Cu: 9, B: 10, Mo: 0.7
    }
  },
  {
    id: 'tomate',
    name: 'Tomate',
    category: 'Hortalizas',
    extractions: {
      N: 2.8, P: 0.8, K: 4.2, Ca: 1.8, Mg: 0.6, S: 0.4,
      Fe: 12, Mn: 8, Zn: 6, Cu: 2, B: 4, Mo: 0.2
    }
  },
  {
    id: 'papa',
    name: 'Papa',
    category: 'Tubérculos',
    extractions: {
      N: 3.2, P: 1.2, K: 5.8, Ca: 0.8, Mg: 0.4, S: 0.6,
      Fe: 15, Mn: 6, Zn: 4, Cu: 1.5, B: 2, Mo: 0.1
    }
  }
];

export const efficiencyFactors: EfficiencyFactors = {
  N: 0.65,   // 65% eficiencia
  P: 0.20,   // 20% eficiencia
  K: 0.75,   // 75% eficiencia
  Ca: 0.80,  // 80% eficiencia
  Mg: 0.70,  // 70% eficiencia
  S: 0.60,   // 60% eficiencia
  Fe: 0.15,  // 15% eficiencia
  Mn: 0.25,  // 25% eficiencia
  Zn: 0.30,  // 30% eficiencia
  Cu: 0.35,  // 35% eficiencia
  B: 0.40,   // 40% eficiencia
  Mo: 0.50   // 50% eficiencia
};

export const conversionFactors: ConversionFactors = {
  P_to_P2O5: 2.29,     // P × 2.29 = P₂O₅
  K_to_K2O: 1.20,      // K × 1.20 = K₂O
  Ca_to_CaO: 1.40,     // Ca × 1.40 = CaO
  Mg_to_MgO: 1.66,     // Mg × 1.66 = MgO
  S_to_SO3: 2.50       // S × 2.50 = SO₃
};

export const fertilizers: Fertilizer[] = [
  {
    id: 'urea',
    name: 'Urea',
    formula: 'CO(NH₂)₂',
    nutrients: { N: 460 },
    cost_per_kg: 0.85,
    efficiency_rating: 9
  },
  {
    id: 'sulfato_amonio',
    name: 'Sulfato de Amonio',
    formula: '(NH₄)₂SO₄',
    nutrients: { N: 210, S: 240 },
    cost_per_kg: 0.78,
    efficiency_rating: 8
  },
  {
    id: 'fosfato_diamonico',
    name: 'Fosfato Diamónico (DAP)',
    formula: '(NH₄)₂HPO₄',
    nutrients: { N: 180, P: 200 },
    cost_per_kg: 1.20,
    efficiency_rating: 9
  },
  {
    id: 'cloruro_potasio',
    name: 'Cloruro de Potasio',
    formula: 'KCl',
    nutrients: { K: 500 },
    cost_per_kg: 0.95,
    efficiency_rating: 8
  },
  {
    id: 'nitrato_potasio',
    name: 'Nitrato de Potasio',
    formula: 'KNO₃',
    nutrients: { N: 130, K: 380 },
    cost_per_kg: 1.45,
    efficiency_rating: 9
  },
  {
    id: 'sulfato_potasio',
    name: 'Sulfato de Potasio',
    formula: 'K₂SO₄',
    nutrients: { K: 420, S: 180 },
    cost_per_kg: 1.32,
    efficiency_rating: 8
  },
  {
    id: 'cal_agricola',
    name: 'Cal Agrícola',
    formula: 'CaCO₃',
    nutrients: { Ca: 320 },
    cost_per_kg: 0.45,
    efficiency_rating: 7
  },
  {
    id: 'sulfato_magnesio',
    name: 'Sulfato de Magnesio',
    formula: 'MgSO₄·7H₂O',
    nutrients: { Mg: 98, S: 130 },
    cost_per_kg: 0.92,
    efficiency_rating: 8
  },
  {
    id: 'complejo_npk',
    name: 'Complejo NPK 15-15-15',
    formula: 'NPK',
    nutrients: { N: 150, P: 150, K: 150 },
    cost_per_kg: 1.15,
    efficiency_rating: 8
  },
  {
    id: 'micronutrientes',
    name: 'Mezcla de Micronutrientes',
    formula: 'Mix',
    nutrients: { Fe: 80, Mn: 60, Zn: 40, Cu: 20, B: 15, Mo: 2 },
    cost_per_kg: 2.80,
    efficiency_rating: 7
  }
];