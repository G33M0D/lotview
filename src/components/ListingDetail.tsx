'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowLeft,
  MapPin,
  Ruler,
  FileText,
  Zap,
  Mountain,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Send,
  CheckCircle,
  ImageOff,
  Car,
  Building2,
} from 'lucide-react';
import { Listing, Inquiry } from '@/lib/types';
import { submitInquiry } from '@/lib/data';
import { useAuth } from '@/components/AuthProvider';
import { CURRENCIES } from '@/lib/constants';
import {
  formatPrice,
  formatArea,
  areaToBasketballCourts,
  getStatusColor,
  getStatusLabel,
} from '@/lib/utils';
import { MapProvider } from './MapProvider';
import LotDetailMap from './LotDetailMap';

// Static exchange rates (PHP base) for demo
const EXCHANGE_RATES: Record<string, number> = {
  PHP: 1,
  USD: 0.0178,
  AED: 0.0654,
  SGD: 0.0237,
  EUR: 0.0163,
  GBP: 0.0141,
  JPY: 2.68,
  KRW: 24.5,
  HKD: 0.139,
  SAR: 0.0668,
};

interface ListingDetailProps {
  listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  const { user } = useAuth();
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [copied, setCopied] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [inquiry, setInquiry] = useState<Omit<Inquiry, 'id' | 'listingId' | 'status' | 'createdAt'>>({
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    message: '',
  });

  const statusColor = getStatusColor(listing.status);
  const listingUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/listings/${listing.id}`
    : `https://lotview.app/listings/${listing.id}`;

  const convertedPrice = listing.pricePHP * (EXCHANGE_RATES[selectedCurrency] ?? 1);
  const currencyInfo = CURRENCIES.find((c) => c.code === selectedCurrency);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(listingUrl);
    } catch {
      const input = document.createElement('input');
      input.value = listingUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmitInquiry(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setInquiryError(null);

    const result = await submitInquiry({
      listingId: listing.id,
      buyerName: inquiry.buyerName,
      buyerPhone: inquiry.buyerPhone,
      buyerEmail: inquiry.buyerEmail,
      message: inquiry.message,
      userId: user?.id,
    });

    setSubmitting(false);

    if (result.error) {
      setInquiryError(result.error);
      return;
    }

    setInquirySubmitted(true);
    setInquiry({ buyerName: '', buyerPhone: '', buyerEmail: '', message: '' });
    setTimeout(() => setInquirySubmitted(false), 5000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top section */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {listing.title}
            </h1>
            <p className="mt-1 text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {[listing.barangay, listing.municipality, listing.province].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: statusColor }}
            >
              {getStatusLabel(listing.status)}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                listing.boundaryConfidence === 'survey-based'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {listing.boundaryConfidence === 'survey-based'
                ? 'Survey-based'
                : 'Approximate'}
            </span>
          </div>
        </div>
      </div>

      {/* Map section */}
      <section>
        <MapProvider>
          <LotDetailMap listing={listing} />
        </MapProvider>
      </section>

      {/* Details grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price card */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Price</div>
          <div className="text-2xl font-bold text-primary">
            {formatPrice(listing.pricePHP)}
          </div>
          <button
            onClick={() => setShowCurrencies(!showCurrencies)}
            className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View in other currencies
            {showCurrencies ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Area card */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Ruler className="w-4 h-4" />
            Area
          </div>
          <div className="text-lg font-semibold text-foreground">
            {formatArea(listing.areaSqm)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {areaToBasketballCourts(listing.areaSqm)}
          </div>
        </div>

        {/* Title type */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <FileText className="w-4 h-4" />
            Title Type
          </div>
          <div className="text-lg font-semibold text-foreground">
            {listing.titleType}
          </div>
        </div>

        {/* Zoning */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Building2 className="w-4 h-4" />
            Zoning
          </div>
          <div className="text-lg font-semibold text-foreground">
            {listing.zoning}
          </div>
        </div>

        {/* Road access */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Car className="w-4 h-4" />
            Road Access
          </div>
          <div className="text-lg font-semibold text-foreground">
            {listing.roadAccess}
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Zap className="w-4 h-4" />
            Utilities
          </div>
          <ul className="space-y-1">
            {listing.utilities.map((u) => (
              <li key={u} className="text-sm text-foreground flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Elevation */}
        {listing.elevation != null && (
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Mountain className="w-4 h-4" />
              Elevation
            </div>
            <div className="text-lg font-semibold text-foreground">
              {listing.elevation}m above sea level
            </div>
          </div>
        )}

        {/* Hazard flags */}
        {listing.hazardFlags && listing.hazardFlags.length > 0 && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
              <AlertTriangle className="w-4 h-4" />
              Hazard Flags
            </div>
            <ul className="space-y-1">
              {listing.hazardFlags.map((h) => (
                <li key={h} className="text-sm text-red-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Currency converter section */}
      {showCurrencies && (
        <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Currency Converter
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <label htmlFor="currency" className="text-sm text-muted-foreground">
                Convert to
              </label>
              <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="mt-1 block w-full sm:w-auto rounded-lg border border-border px-3 py-2 text-sm bg-card"
              >
                {CURRENCIES.filter((c) => c.code !== 'PHP').map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Converted price</div>
              <div className="text-2xl font-bold text-foreground mt-1">
                {currencyInfo?.symbol}
                {convertedPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Rate: 1 PHP = {EXCHANGE_RATES[selectedCurrency]} {selectedCurrency} (demo rates)
              </div>
            </div>
          </div>

          {/* Quick rates table */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['USD', 'AED', 'SGD', 'EUR'].map((code) => {
              const cur = CURRENCIES.find((c) => c.code === code);
              const rate = EXCHANGE_RATES[code] ?? 1;
              const converted = listing.pricePHP * rate;
              return (
                <div
                  key={code}
                  className="rounded-lg bg-muted/50 px-3 py-2 text-center cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => setSelectedCurrency(code)}
                >
                  <div className="text-xs text-muted-foreground">{code}</div>
                  <div className="text-sm font-semibold text-foreground">
                    {cur?.symbol}
                    {converted.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Document checklist */}
      <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Document Checklist
        </h2>
        <ul className="space-y-2">
          {listing.documents.map((doc) => (
            <li key={doc.type} className="flex items-center gap-3 text-sm">
              {doc.available ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              <span
                className={
                  doc.available ? 'text-foreground' : 'text-muted-foreground'
                }
              >
                {doc.label}
              </span>
              {doc.available && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Available
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Documents available upon inquiry. Contact the seller for copies.
        </p>
      </section>

      {/* Photo gallery */}
      <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Photos</h2>
        {listing.photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {listing.photos.map((photo, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={photo}
                  alt={`${listing.title} photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageOff className="w-12 h-12 mb-2" />
            <p className="text-sm">No photos uploaded yet</p>
            <p className="text-xs mt-1">
              Contact the seller to request site photos
            </p>
          </div>
        )}
      </section>

      {/* Description */}
      <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Description
        </h2>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {listing.description}
        </p>
      </section>

      {/* Inquiry form */}
      <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Send an Inquiry
        </h2>

        {inquirySubmitted ? (
          <div className="flex items-center gap-3 text-green-700 bg-green-50 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-medium">Inquiry sent successfully!</p>
              <p className="text-sm mt-0.5">
                The seller will get back to you via email or phone.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            {inquiryError && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                Failed to send inquiry: {inquiryError}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={inquiry.buyerName}
                  onChange={(e) =>
                    setInquiry((prev) => ({ ...prev, buyerName: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-border px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                  Phone (with country code)
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={inquiry.buyerPhone}
                  onChange={(e) =>
                    setInquiry((prev) => ({ ...prev, buyerPhone: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-border px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+63 917 123 4567"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={inquiry.buyerEmail}
                onChange={(e) =>
                  setInquiry((prev) => ({ ...prev, buyerEmail: e.target.value }))
                }
                className="block w-full rounded-lg border border-border px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={inquiry.message}
                onChange={(e) =>
                  setInquiry((prev) => ({ ...prev, message: e.target.value }))
                }
                className="block w-full rounded-lg border border-border px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                placeholder="I'm interested in this lot. Can you share more details?"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </section>

      {/* Share section */}
      <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Share This Listing
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Link copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: listing.title,
                    text: `Check out this lot: ${listing.title}`,
                    url: listingUrl,
                  });
                } else {
                  handleCopyLink();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share with Family
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <QRCodeSVG value={listingUrl} size={120} level="M" />
            <span className="text-xs text-muted-foreground">
              Scan to open on phone
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
