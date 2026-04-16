import { NextRequest } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';

async function getCallerProfile(serviceClient: ReturnType<typeof createServiceClient>, authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);

  const { data: { user }, error } = await serviceClient.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile } = await serviceClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role === 'admin' ? user : null;
}

export async function PATCH(request: NextRequest) {
  const supabase = createServiceClient();
  const caller = await getCallerProfile(supabase, request.headers.get('authorization'));
  if (!caller) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, role } = await request.json();

  if (!userId || !['admin', 'buyer'].includes(role)) {
    return Response.json({ error: 'Invalid userId or role' }, { status: 400 });
  }

  if (userId === caller.id) {
    return Response.json({ error: 'Cannot change your own role' }, { status: 400 });
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = createServiceClient();
  const caller = await getCallerProfile(supabase, request.headers.get('authorization'));
  if (!caller) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await request.json();

  if (!userId) {
    return Response.json({ error: 'Missing userId' }, { status: 400 });
  }

  if (userId === caller.id) {
    return Response.json({ error: 'Cannot delete yourself' }, { status: 400 });
  }

  // Delete from auth.users — cascades to profiles, favorites, etc.
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
