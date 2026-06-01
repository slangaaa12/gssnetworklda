import { NextResponse } from 'next/server';
import { verifyAdminPassword, setAdminSession } from '@/lib/admin-auth';

export async function POST(request) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Painel admin não configurado. Defina ADMIN_PASSWORD no ficheiro .env.local' },
        { status: 500 }
      );
    }

    const { password } = await request.json();
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Palavra-passe incorrecta' }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no login admin:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
