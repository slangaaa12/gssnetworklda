import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getAllSubmissions } from '@/lib/submissions';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const data = await getAllSubmissions();
  return NextResponse.json(data);
}
