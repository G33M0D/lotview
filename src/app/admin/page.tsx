'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  MessageSquare,
  Users as UsersIcon,
  Plus,
  ArrowRight,
  TrendingUp,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { MOCK_LISTINGS, MOCK_INQUIRIES } from '@/lib/mock-data';
import { fetchListings, fetchInquiries } from '@/lib/data';
import { formatPrice, getStatusLabel } from '@/lib/utils';
import type { Listing, Inquiry } from '@/lib/types';

interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalInquiries: number;
  newInquiries: number;
  registeredUsers: number;
}

export default function AdminDashboard() {
  const { supabase } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    activeListings: 0,
    totalInquiries: 0,
    newInquiries: 0,
    registeredUsers: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<
    (Inquiry & { listingTitle?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [listingData, inquiryData] = await Promise.all([
          fetchListings(),
          fetchInquiries(),
        ]);

        // Get user count from Supabase (separate since it's not in data.ts)
        let userCount = 0;
        try {
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          userCount = count ?? 0;
        } catch {
          // ignore
        }

        setStats({
          totalListings: listingData.length,
          activeListings: listingData.filter((l) => l.status === 'available')
            .length,
          totalInquiries: inquiryData.length,
          newInquiries: inquiryData.filter((i) => i.status === 'new').length,
          registeredUsers: userCount,
        });

        const enriched = inquiryData.slice(0, 5).map((inq) => {
          const listing = listingData.find((l) => l.id === inq.listingId);
          return { ...inq, listingTitle: listing?.title };
        });
        setRecentInquiries(enriched);
      } catch {
        // Fallback to mock data on error
        setStats({
          totalListings: MOCK_LISTINGS.length,
          activeListings: MOCK_LISTINGS.filter((l) => l.status === 'available')
            .length,
          totalInquiries: MOCK_INQUIRIES.length,
          newInquiries: MOCK_INQUIRIES.filter((i) => i.status === 'new').length,
          registeredUsers: 0,
        });
        setRecentInquiries(
          MOCK_INQUIRIES.slice(0, 5).map((inq) => {
            const listing = MOCK_LISTINGS.find(
              (l) => l.id === inq.listingId,
            );
            return { ...inq, listingTitle: listing?.title };
          }),
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [supabase]);

  const STAT_CARDS = [
    {
      label: 'Total Listings',
      value: stats.totalListings,
      icon: MapPin,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active Listings',
      value: stats.activeListings,
      icon: TrendingUp,
      color: 'text-primary-light',
      bgColor: 'bg-primary-light/10',
    },
    {
      label: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'New Inquiries',
      value: stats.newInquiries,
      icon: Bell,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Registered Users',
      value: stats.registeredUsers,
      icon: UsersIcon,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of your LotView listings and inquiries
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, bgColor }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className={`rounded-lg p-2 ${bgColor}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent inquiries */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No inquiries yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {inq.buyerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {inq.buyerName}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          inq.status === 'new'
                            ? 'bg-amber-500/10 text-amber-500'
                            : inq.status === 'responded'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {getStatusLabel(inq.status)}
                      </span>
                    </div>
                    {inq.listingTitle && (
                      <p className="text-xs text-muted-foreground">
                        Re: {inq.listingTitle}
                      </p>
                    )}
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {inq.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/listings/create"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Create Listing</p>
                <p className="text-sm text-muted-foreground">
                  Add a new lot listing with map boundaries
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <div className="rounded-lg bg-secondary/10 p-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  View All Inquiries
                </p>
                <p className="text-sm text-muted-foreground">
                  Review and respond to buyer messages
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
