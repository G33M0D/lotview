import { STATUS_COLORS, BASKETBALL_COURT_SQM } from './constants';

export function formatPrice(php: number): string {
  return `\u20b1${php.toLocaleString('en-PH')}`;
}

export function formatArea(sqm: number): string {
  const hectares = sqm / 10000;
  if (hectares >= 0.01) {
    return `${sqm.toLocaleString()} sqm (${hectares.toFixed(2)} ha)`;
  }
  return `${sqm.toLocaleString()} sqm`;
}

export function areaToBasketballCourts(sqm: number): string {
  const courts = sqm / BASKETBALL_COURT_SQM;
  if (courts < 1) {
    const pct = Math.round(courts * 100);
    return `about ${pct}% of a basketball court`;
  }
  const rounded = Math.round(courts * 10) / 10;
  return `about ${rounded} basketball court${rounded !== 1 ? 's' : ''}`;
}

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] ?? '#9ca3af';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
    new: 'New',
    responded: 'Responded',
    closed: 'Closed',
  };
  return labels[status] ?? status;
}

export function generateShareUrl(listingId: string): string {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://lotview.app';
  return `${baseUrl}/listings/${listingId}`;
}

export function generateFamilyReviewToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
