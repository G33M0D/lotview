import { createClient } from '@/lib/supabase';
import { MOCK_LISTINGS, MOCK_INQUIRIES } from '@/lib/mock-data';
import { Listing, Inquiry } from '@/lib/types';

// Map Supabase snake_case row to camelCase Listing
export function mapDbToListing(row: Record<string, unknown>): Listing {
  return {
    id: row.id as string,
    sellerId: row.seller_id as string ?? '',
    title: row.title as string,
    description: (row.description as string) ?? '',
    province: row.province as string,
    municipality: row.municipality as string,
    barangay: (row.barangay as string) ?? '',
    polygon: (row.polygon as google.maps.LatLngLiteral[]) ?? [],
    center: (row.center as google.maps.LatLngLiteral) ?? { lat: 0, lng: 0 },
    areaSqm: Number(row.area_sqm) || 0,
    pricePHP: Number(row.price_php) || 0,
    titleType: (row.title_type as Listing['titleType']) ?? 'Tax Declaration',
    zoning: (row.zoning as string) ?? '',
    roadAccess: (row.road_access as string) ?? '',
    utilities: (row.utilities as string[]) ?? [],
    elevation: row.elevation != null ? Number(row.elevation) : undefined,
    hazardFlags: (row.hazard_flags as string[]) ?? [],
    boundaryConfidence: (row.boundary_confidence as Listing['boundaryConfidence']) ?? 'approximate',
    status: (row.status as Listing['status']) ?? 'available',
    photos: (row.photos as string[]) ?? [],
    sketchMapUrl: (row.sketch_map_url as string) ?? undefined,
    documents: (row.documents as Listing['documents']) ?? [],
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
    updatedAt: (row.updated_at as string) ?? new Date().toISOString(),
  };
}

function mapDbToInquiry(row: Record<string, unknown>): Inquiry {
  return {
    id: row.id as string,
    listingId: row.listing_id as string,
    buyerName: row.buyer_name as string,
    buyerPhone: (row.buyer_phone as string) ?? '',
    buyerEmail: row.buyer_email as string,
    message: (row.message as string) ?? '',
    status: (row.status as Inquiry['status']) ?? 'new',
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
  };
}

// Fetch all listings: Supabase first, fall back to mock if empty
export async function fetchListings(): Promise<Listing[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('listings').select('*');
    if (error) throw error;
    const dbListings = (data ?? []).map(mapDbToListing);
    // Only show mock data when no real listings exist
    return dbListings.length > 0 ? dbListings : [...MOCK_LISTINGS];
  } catch {
    return [...MOCK_LISTINGS];
  }
}

// Fetch single listing by ID
export async function fetchListingById(id: string): Promise<Listing | null> {
  // Check mock first
  const mock = MOCK_LISTINGS.find(l => l.id === id);
  if (mock) return mock;

  // Check Supabase
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
    if (error || !data) return null;
    return mapDbToListing(data);
  } catch {
    return null;
  }
}

// Fetch all inquiries
export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapDbToInquiry);
  } catch {
    return [...MOCK_INQUIRIES];
  }
}

// Submit inquiry to Supabase
export async function submitInquiry(inquiry: {
  listingId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  message: string;
  userId?: string;
}): Promise<{ error: string | null }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('inquiries').insert({
      listing_id: inquiry.listingId,
      buyer_name: inquiry.buyerName,
      buyer_phone: inquiry.buyerPhone,
      buyer_email: inquiry.buyerEmail,
      message: inquiry.message,
      user_id: inquiry.userId ?? null,
    });
    if (error) return { error: error.message };
    return { error: null };
  } catch (e) {
    return { error: String(e) };
  }
}
