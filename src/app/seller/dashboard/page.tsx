'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_INQUIRIES } from '@/lib/mock-data';
import { formatPrice, formatArea, getStatusLabel } from '@/lib/utils';

export default function SellerDashboard() {
  const listings = MOCK_LISTINGS;
  const inquiries = MOCK_INQUIRIES;

  const stats = useMemo(() => {
    const totalListings = listings.length;
    const totalInquiries = inquiries.length;
    const available = listings.filter((l) => l.status === 'available').length;
    const reserved = listings.filter((l) => l.status === 'reserved').length;
    return { totalListings, totalInquiries, available, reserved };
  }, [listings, inquiries]);

  const inquiriesPerListing = useMemo(() => {
    const map: Record<string, number> = {};
    for (const inq of inquiries) {
      map[inq.listingId] = (map[inq.listingId] ?? 0) + 1;
    }
    return map;
  }, [inquiries]);

  const recentInquiries = useMemo(() => {
    return [...inquiries]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [inquiries]);

  function getListingTitle(listingId: string): string {
    const listing = listings.find((l) => l.id === listingId);
    return listing?.title ?? 'Unknown Listing';
  }

  function statusBadge(status: string) {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-800',
      reserved: 'bg-amber-100 text-amber-800',
      sold: 'bg-red-100 text-red-800',
      new: 'bg-blue-100 text-blue-800',
      responded: 'bg-gray-100 text-gray-700',
      closed: 'bg-gray-200 text-gray-500',
    };
    return (
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] ?? 'bg-gray-100 text-gray-600'}`}
      >
        {getStatusLabel(status)}
      </span>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your land listings and track inquiries
          </p>
        </div>
        <Link
          href="/seller/create"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New Listing
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<LayoutDashboard className="h-5 w-5 text-blue-600" />}
          label="Total Listings"
          value={stats.totalListings}
          bg="bg-blue-50"
        />
        <SummaryCard
          icon={<MessageSquare className="h-5 w-5 text-purple-600" />}
          label="Total Inquiries"
          value={stats.totalInquiries}
          bg="bg-purple-50"
        />
        <SummaryCard
          icon={<MapPin className="h-5 w-5 text-green-600" />}
          label="Available Lots"
          value={stats.available}
          bg="bg-green-50"
        />
        <SummaryCard
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          label="Reserved Lots"
          value={stats.reserved}
          bg="bg-amber-50"
        />
      </div>

      {/* Listings Table */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Your Listings</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Area
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Inquiries
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/listing/${listing.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-green-700"
                    >
                      {listing.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {listing.barangay}, {listing.municipality}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatArea(listing.areaSqm)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {formatPrice(listing.pricePHP)}
                  </td>
                  <td className="px-4 py-3">{statusBadge(listing.status)}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {inquiriesPerListing[listing.id] ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        title="Edit listing"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Inquiries
        </h2>
        <div className="mt-4 space-y-3">
          {recentInquiries.map((inq) => (
            <div
              key={inq.id}
              className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">
                    {inq.buyerName}
                  </span>
                  {statusBadge(inq.status)}
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {getListingTitle(inq.listingId)}
                </p>
                <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                  {inq.message}
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xs text-gray-400">
                {new Date(inq.createdAt).toLocaleDateString('en-PH', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
