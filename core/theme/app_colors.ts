// Default color
export const DEFAULT_COLOR = '#E7EAF3';
export const DEFAULT_COLOR_500 = '#71717A';

// Primary color
export const PRIMARY_COLOR = '#008060';
export const PRIMARY_COLOR_500 = '#06C5951A';
export const PRIMARY_COLOR_FOREGROUND = '#ffffff';

// Secondary color
export const SECONDARY_COLOR = '#51596C';
export const SECONDARY_COLOR_FOREGROUND = '#ffffff';

// Success color
export const SUCCESS_COLOR = '#077C76';
export const SUCCESS_COLOR_FOREGROUND = '#ffffff';

// Warning color
export const WARNING_COLOR = '#F1B980';
export const WARNING_COLOR_FOREGROUND = '#ffffff';

// Danger color
export const DANGER_COLOR = '#ee6a5f';
export const DANGER_COLOR_500 = '#cc648f';
export const DANGER_COLOR_FOREGROUND = '#ffffff';

// Overlay color
export const OVERLAY_COLOR = '#000000';

export const darknessColorPalette = [
  '#0A2759', // Azul Profundo
  '#2E8B57', // Verde Mar
  '#008080', // Verde Azulado
  '#008B8B', // Cian Oscuro
  '#20B2AA', // Verde Mar Claro
  '#3CB371', // Verde Mar Medio
];

export const lighterColorPalette = [
  '#66B2A8', // Verde Profundo Claro
  '#66CDAA', // Verde Mar Claro
  '#66B3B3', // Verde Azulado Claro
  'rgba(0,160,96,0.66)', // Verde un poco más claro
  'rgba(0,192,96,0.6)', // Verde claro
];

export const greenColorPalette = [
  'rgba(0,128,96,0.7)', // Verde oscuro
  'rgba(0,160,96,0.66)', // Verde un poco más claro
  'rgba(0,192,96,0.6)', // Verde claro
  'rgba(0,224,96,0.58)', // Verde más claro
  'rgba(0,255,96,0.52)', // Verde muy claro
];

export const colorPalette = [
  '#0A2759', // Azul Profundo
  '#E7EAF3', // Azul Claro
  '#F1B980', // Amarillo Suave
  '#DA1D52', // Rojo Vibrante
  '#51596C', // Azul Grisáceo
  '#FFFFFF', // Blanco
  '#000000', // Negro
];

export const colorGreemPalette = [
    '#077C76', // Verde Profundo
    '#00BD8E1A', // Azul Claro
    '#00BD8E', // verde fluorecente
    '#0A2759', // Azul Vibrante
    '#51596C', // Azul Grisáceo
    '#66B2A8', // Verde Profundo Claro
    '#66CDAA', // Verde Mar Claro
  ];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * lighterColorPalette.length);
  return lighterColorPalette[randomIndex];
}

