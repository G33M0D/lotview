'use client';

import { useEffect, useState } from 'react';
import { Users as UsersIcon, Shield, ShieldOff, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
}

export default function AdminUsers() {
  const { supabase, user } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(data ?? []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [supabase]);

  async function getAuthHeaders() {
    const { data } = await supabase.auth.getSession();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.session?.access_token}`,
    };
  }

  async function handleRoleChange(userId: string, newRole: string) {
    setActionLoading(userId);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Failed to update role');
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(userId: string) {
    setActionLoading(userId);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Failed to remove user');
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } finally {
      setActionLoading(null);
      setConfirmDelete(null);
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
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="mt-1 text-muted-foreground">
          Registered users on LotView
        </p>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
          <div className="rounded-full bg-muted p-4">
            <UsersIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No users yet
          </h3>
          <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
            When buyers register on LotView, they will appear here. Users can
            sign up with Google or email.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = u.id === user?.id;
                  const isProcessing = actionLoading === u.id;
                  const isConfirmingDelete = confirmDelete === u.id;

                  return (
                    <tr
                      key={u.id}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                            {(u.full_name ?? u.email ?? '?')
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {u.full_name ?? 'Unnamed'}
                            </p>
                            {isSelf && (
                              <span className="text-xs text-muted-foreground">
                                (you)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-muted-foreground">
                          {u.email ?? '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.role === 'admin'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {u.role ?? 'buyer'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(u.created_at)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {isSelf ? (
                          <p className="text-right text-xs text-muted-foreground">
                            &mdash;
                          </p>
                        ) : isConfirmingDelete ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-red-400">
                              Remove this user?
                            </span>
                            <button
                              onClick={() => handleDelete(u.id)}
                              disabled={isProcessing}
                              className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              {isProcessing ? 'Removing...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              disabled={isProcessing}
                              className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() =>
                                handleRoleChange(
                                  u.id,
                                  u.role === 'admin' ? 'buyer' : 'admin'
                                )
                              }
                              disabled={isProcessing}
                              title={
                                u.role === 'admin'
                                  ? 'Demote to buyer'
                                  : 'Make admin'
                              }
                              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                            >
                              {u.role === 'admin' ? (
                                <ShieldOff className="h-4 w-4" />
                              ) : (
                                <Shield className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => setConfirmDelete(u.id)}
                              disabled={isProcessing}
                              title="Remove user"
                              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
