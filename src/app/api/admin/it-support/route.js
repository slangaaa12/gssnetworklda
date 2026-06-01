import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getItSupportSubmissions } from '@/lib/submissions';

/** @deprecated Use /api/admin/submissions */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const submissions = await getItSupportSubmissions();
  return NextResponse.json({ submissions });
}
