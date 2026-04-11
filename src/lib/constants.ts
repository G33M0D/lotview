// Panay center coordinates
export const PANAY_CENTER = { lat: 11.0, lng: 122.5 };
export const DEFAULT_ZOOM = 10;
export const LOT_DETAIL_ZOOM = 17;

// Municipalities in Panay for filter dropdown
export const MUNICIPALITIES = [
  'Iloilo City',
  'Roxas City',
  'Kalibo',
  'San Jose de Buenavista',
  'Jordan',
  'Pavia',
  'Oton',
  'Santa Barbara',
  'Cabatuan',
  'Jaro',
  'Mandurriao',
  'La Paz',
  'Molo',
  'Arevalo',
  'Leganes',
  'Zarraga',
  'New Lucena',
  'Dumangas',
  'Barotac Nuevo',
  'Ajuy',
] as const;

// Status colors
export const STATUS_COLORS = {
  available: '#22c55e',
  reserved: '#f59e0b',
  sold: '#ef4444',
} as const;

// Currency options for OFW converter
export const CURRENCIES = [
  { code: 'PHP', symbol: '\u20b1', name: 'Philippine Peso' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'AED', symbol: '\u062f.\u0625', name: 'UAE Dirham' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'EUR', symbol: '\u20ac', name: 'Euro' },
  { code: 'GBP', symbol: '\u00a3', name: 'British Pound' },
  { code: 'JPY', symbol: '\u00a5', name: 'Japanese Yen' },
  { code: 'KRW', symbol: '\u20a9', name: 'Korean Won' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'SAR', symbol: '\u0631.\u0633', name: 'Saudi Riyal' },
] as const;

export const BASKETBALL_COURT_SQM = 420;
