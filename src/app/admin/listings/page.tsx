'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { fetchListings as fetchAllListings } from '@/lib/data';
import { formatPrice, getStatusLabel } from '@/lib/utils';
import type { Listing } from '@/lib/types';

export default function AdminListings() {
  const { supabase } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllListings()
      .then(setListings)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (error) {
        alert('Failed to delete listing: ' + error.message);
      } else {
        setListings((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      // Mock data: remove locally
      setListings((prev) => prev.filter((l) => l.id !== id));
    }
    setDeleteId(null);
  }

  function getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-primary/10 text-primary';
      case 'reserved':
        return 'bg-amber-500/10 text-amber-500';
      case 'sold':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Listings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your lot listings
          </p>
        </div>
        <Link
          href="/admin/listings/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Area
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {listing.title}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                      {listing.municipality}, {listing.province}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                      {listing.areaSqm.toLocaleString()} sqm
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {formatPrice(listing.pricePHP)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(listing.status)}`}
                    >
                      {getStatusLabel(listing.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="View listing"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(listing.id)}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No listings yet. Create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Delete Listing
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
