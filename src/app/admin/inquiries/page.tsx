'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { MOCK_INQUIRIES, MOCK_LISTINGS } from '@/lib/mock-data';
import { fetchInquiries as fetchAllInquiries, fetchListings as fetchAllListings } from '@/lib/data';
import { getStatusLabel } from '@/lib/utils';
import type { Inquiry, Listing } from '@/lib/types';

export default function AdminInquiries() {
  const { supabase } = useAuth();
  const [inquiries, setInquiries] = useState<
    (Inquiry & { listingTitle?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadInquiries() {
      try {
        const [rawInquiries, rawListings] = await Promise.all([
          fetchAllInquiries(),
          fetchAllListings(),
        ]);

        const enriched = rawInquiries.map((inq) => {
          const listing = rawListings.find((l) => l.id === inq.listingId);
          return { ...inq, listingTitle: listing?.title };
        });
        setInquiries(enriched);
      } catch {
        const enriched = MOCK_INQUIRIES.map((inq) => {
          const listing = MOCK_LISTINGS.find((l) => l.id === inq.listingId);
          return { ...inq, listingTitle: listing?.title };
        });
        setInquiries(enriched);
      } finally {
        setLoading(false);
      }
    }
    loadInquiries();
  }, []);

  async function updateStatus(id: string, status: Inquiry['status']) {
    try {
      await supabase.from('inquiries').update({ status }).eq('id', id);
    } catch {
      // Supabase may fail for mock data — update locally anyway
    }
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    );
  }

  function getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'new':
        return 'bg-amber-500/10 text-amber-500';
      case 'responded':
        return 'bg-primary/10 text-primary';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Inquiries</h1>
        <p className="mt-1 text-muted-foreground">
          Manage buyer inquiries and messages
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Buyer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Listing
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <>
                  <tr
                    key={inq.id}
                    className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50"
                    onClick={() =>
                      setExpandedId(expandedId === inq.id ? null : inq.id)
                    }
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {inq.buyerName}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        {inq.buyerEmail}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {inq.buyerPhone}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {inq.listingTitle ?? 'Unknown listing'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {inq.message}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={inq.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(
                            inq.id,
                            e.target.value as Inquiry['status'],
                          );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(inq.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="responded">Responded</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(inq.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {expandedId === inq.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </td>
                  </tr>
                  {expandedId === inq.id && (
                    <tr
                      key={`${inq.id}-expanded`}
                      className="border-b border-border"
                    >
                      <td colSpan={7} className="bg-muted/30 px-6 py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Full Message
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {inq.message}
                          </p>
                          <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                            <span>Email: {inq.buyerEmail}</span>
                            <span>Phone: {inq.buyerPhone}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No inquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
