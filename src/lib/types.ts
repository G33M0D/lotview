export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  province: string;
  municipality: string;
  barangay: string;
  polygon: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
  areaSqm: number;
  pricePHP: number;
  titleType: 'TCT' | 'OCT' | 'Tax Declaration';
  zoning: string;
  roadAccess: string;
  utilities: string[];
  elevation?: number;
  hazardFlags?: string[];
  boundaryConfidence: 'approximate' | 'survey-based';
  status: 'available' | 'reserved' | 'sold';
  photos: string[];
  sketchMapUrl?: string;
  documents: DocumentInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentInfo {
  type: 'title' | 'tax_declaration' | 'lot_plan' | 'survey' | 'deed_of_sale';
  available: boolean;
  label: string;
}

export interface Inquiry {
  id: string;
  listingId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  createdAt: string;
}

export interface FamilyReview {
  id: string;
  listingId: string;
  shareToken: string;
  reviewerName: string;
  comment: string;
  createdAt: string;
}
